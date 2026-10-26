/* Motor del Solo compás: loops reales con cambio de tempo (WSOLA en AudioWorklet) y cambios solo en "doce", "tres" o "seis". */
(function () {
  var LOOPS = [
    { file: "alegrias-132.wav", bpm: 132 }, { file: "alegrias-144.wav", bpm: 144 },
    { file: "alegrias-152.wav", bpm: 152 }, { file: "alegrias-160.wav", bpm: 160 },
    { file: "bulerias-200.wav", bpm: 200 }, { file: "bulerias-250.wav", bpm: 250 }
  ];
  var BASE = "audio/", WORKLET_URL = "soundtouch-processor.js", WORKLET_NAME = "soundtouch-processor";
  var WSOLA = { sequenceMs: 40, seekWindowMs: 15, overlapMs: 8 };
  var MASTER_GAIN = 0.8, LATENCY = 0.04, XFADE = 0.01, LOOKAHEAD = 0.15, TICK_MS = 50, START_DELAY = 0.05;
  var RATIO_MIN = 0.5, RATIO_MAX = 2, RATIO_EPS = 0.001, BEATS = 12, IDEAL_STRETCH = 0.08, HYST = 0.015;
  var SWITCH_POINTS = [0, 3 / 12, 6 / 12];

  function logDist(t, b) { return Math.abs(Math.log(t / b)); }
  function pickLoop(target, loops, currentBpm) {
    var best = loops[0], bestD = logDist(target, best.bpm);
    loops.forEach(function (l) { var d = logDist(target, l.bpm); if (d < bestD) { best = l; bestD = d; } });
    if (currentBpm !== undefined) {
      var cur = loops.find(function (l) { return l.bpm === currentBpm; });
      if (cur && logDist(target, cur.bpm) - bestD < HYST) return cur;
    }
    return best;
  }
  function elapsed(acc, last, ratio, t) { return Math.max(0, acc + (t - last) * ratio); }
  function nextSwitch(t, el, dur, ratio) {
    var frac = (((el % dur) + dur) % dur) / dur;
    var ahead = SWITCH_POINTS.find(function (p) { return p > frac + 1e-9; });
    var f2 = ahead === undefined ? SWITCH_POINTS[0] : ahead;
    var delta = ahead === undefined ? 1 - frac + f2 : f2 - frac;
    return { time: t + (delta * dur) / ratio, frac: f2 };
  }
  function beatIndex(pos, dur) {
    var p = ((pos % dur) + dur) % dur;
    return Math.min(BEATS - 1, Math.floor((p / dur) * BEATS));
  }
  function clampRatio(r) { return Math.min(RATIO_MAX, Math.max(RATIO_MIN, r)); }

  var bpms = LOOPS.map(function (l) { return l.bpm; });
  var RANGE = {
    min: Math.ceil(Math.min.apply(null, bpms) * (1 - IDEAL_STRETCH) - 1e-9),
    max: Math.floor(Math.max.apply(null, bpms) * (1 + IDEAL_STRETCH) + 1e-9)
  };

  function Engine(onStatus) {
    this.onStatus = onStatus || function () {};
    this.ctx = null; this.master = null; this.workletReady = null;
    this.raw = {}; this.decoded = {}; this.ready = [];
    this.current = null; this.fading = null; this.pending = null;
    this.target = 0; this.timer = null; this.generation = 0; this.status = "idle";
    var self = this;
    this.onVisibility = function () { if (document.visibilityState === "visible") self.syncState(); };
  }
  var P = Engine.prototype;

  P.setStatus = function (s, d) { this.status = s; this.onStatus(s, d); };
  P.fetchRaw = function (entry) {
    if (!this.raw[entry.file]) {
      var self = this;
      this.raw[entry.file] = fetch(BASE + encodeURIComponent(entry.file)).then(function (res) {
        if (!res.ok) throw new Error("No se pudo cargar el audio.");
        return res.arrayBuffer();
      });
      this.raw[entry.file].catch(function () { delete self.raw[entry.file]; });
    }
    return this.raw[entry.file];
  };
  P.prefetch = function (bpm) { this.fetchRaw(pickLoop(bpm, LOOPS)).catch(function () {}); };
  P.decode = function (entry) {
    var self = this;
    if (!this.decoded[entry.file]) {
      this.decoded[entry.file] = this.fetchRaw(entry).then(function (ab) {
        return self.ctx.decodeAudioData(ab.slice(0));
      }).then(function (buffer) {
        var d = { entry: entry, buffer: buffer, bpm: (BEATS * 60) / buffer.duration };
        self.ready.push(d);
        self.ready.sort(function (a, b) { return a.bpm - b.bpm; });
        return d;
      });
      this.decoded[entry.file].catch(function () { delete self.decoded[entry.file]; });
    }
    return this.decoded[entry.file];
  };

  P.start = function (targetBpm) {
    var self = this;
    var r = Compas.unlockAudio(this.ctx);
    this.ctx = r.ctx;
    if (r.created) {
      this.master = this.ctx.createGain();
      this.master.gain.value = MASTER_GAIN;
      this.master.connect(this.ctx.destination);
      this.ctx.onstatechange = function () { self.syncState(); };
      document.addEventListener("visibilitychange", this.onVisibility);
    }
    var ctx = this.ctx;
    if (!ctx.audioWorklet || typeof AudioWorkletNode === "undefined") {
      this.setStatus("unsupported", "Este navegador no permite el modo Solo compás. Abre la página por https en Chrome o Safari actualizados.");
      return Promise.resolve();
    }
    var gen = ++this.generation;
    this.target = targetBpm;
    this.setStatus("loading");
    if (!this.workletReady) this.workletReady = ctx.audioWorklet.addModule(WORKLET_URL);
    return this.workletReady.then(function () {
      return self.decode(pickLoop(targetBpm, LOOPS));
    }).then(function (first) {
      if (gen !== self.generation) return;
      self.current = self.makeChain(first, ctx.currentTime + START_DELAY, clampRatio(targetBpm / first.bpm), 1, 0);
      self.timer = setInterval(function () { self.tick(); }, TICK_MS);
      self.setStatus("playing");
      self.loadRemaining(gen);
    }).catch(function (e) {
      self.workletReady = null;
      self.setStatus("error", e && e.message ? e.message : "No se pudo iniciar el audio.");
    });
  };

  P.makeChain = function (loop, when, ratio, initialGain, offsetFrac) {
    var self = this, ctx = this.ctx;
    var gain = ctx.createGain(); gain.gain.value = initialGain; gain.connect(this.master);
    var st = new AudioWorkletNode(ctx, WORKLET_NAME, {
      numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2], processorOptions: WSOLA
    });
    st.onprocessorerror = function () { self.setStatus("error", "El navegador no pudo procesar el audio."); };
    st.connect(gain);
    var src = ctx.createBufferSource();
    src.buffer = loop.buffer; src.loop = true; src.playbackRate.value = ratio;
    st.parameters.get("playbackRate").value = ratio;
    src.connect(st);
    var offset = offsetFrac * loop.buffer.duration;
    src.start(when, offset);
    return { loop: loop, src: src, st: st, gain: gain, startTime: when, acc: offset, lastChange: when, ratio: ratio };
  };

  P.loadRemaining = function (gen) {
    var self = this;
    var sorted = LOOPS.slice().sort(function (a, b) { return logDist(self.target, a.bpm) - logDist(self.target, b.bpm); });
    sorted.reduce(function (chain, e) {
      return chain.then(function () {
        if (gen !== self.generation) return;
        return self.decode(e).then(function () {
          if (gen === self.generation) self.setTargetBpm(self.target);
        }, function () {});
      });
    }, Promise.resolve());
  };

  // El tempo nuevo entra en el próximo punto de cambio, con una cadena nueva; nunca a mitad del loop.
  P.setTargetBpm = function (bpm) {
    this.target = bpm;
    if (!this.ctx || !this.current) return;
    var c = this.current, best = pickLoop(bpm, this.ready, c.loop.bpm);
    var ratio = clampRatio(bpm / best.bpm);
    this.pending = best !== c.loop || Math.abs(ratio - c.ratio) > RATIO_EPS ? best : null;
  };

  P.tick = function () {
    if (!this.ctx || !this.current || !this.pending || this.fading) return;
    var now = this.ctx.currentTime, c = this.current;
    var el = elapsed(c.acc, c.lastChange, c.ratio, now);
    var pt = nextSwitch(now, el, c.loop.buffer.duration, c.ratio);
    if (pt.time - now <= LOOKAHEAD) this.switchAt(pt.time, pt.frac);
  };

  P.switchAt = function (t, frac) {
    var self = this, old = this.current;
    var next = this.makeChain(this.pending, t, clampRatio(this.target / this.pending.bpm), 0, frac);
    var f = t + LATENCY;
    next.gain.gain.setValueAtTime(0, f - XFADE);
    next.gain.gain.linearRampToValueAtTime(1, f + XFADE);
    old.gain.gain.setValueAtTime(1, f - XFADE);
    old.gain.gain.linearRampToValueAtTime(0, f + XFADE);
    old.src.stop(f + XFADE + 0.05);
    old.src.onended = function () { self.disconnect(old); if (self.fading === old) self.fading = null; };
    this.fading = old; this.current = next; this.pending = null;
  };

  P.getBeat = function () {
    if (this.status !== "playing" || !this.ctx || !this.current) return -1;
    var heard = this.ctx.currentTime - (this.ctx.outputLatency || 0) - LATENCY;
    var chain = heard >= this.current.startTime || !this.fading ? this.current : this.fading;
    if (heard < chain.startTime) return -1;
    return beatIndex(elapsed(chain.acc, chain.lastChange, chain.ratio, heard), chain.loop.buffer.duration);
  };

  P.stop = function () {
    var self = this;
    this.generation++;
    if (this.timer !== null) { clearInterval(this.timer); this.timer = null; }
    var now = this.ctx ? this.ctx.currentTime : 0;
    [this.current, this.fading].forEach(function (chain) {
      if (!chain) return;
      try { chain.gain.gain.setTargetAtTime(0, now, 0.01); chain.src.stop(now + 0.06); } catch (e) {}
      chain.src.onended = function () { self.disconnect(chain); };
    });
    this.current = null; this.fading = null; this.pending = null;
    this.setStatus("idle");
  };

  P.resume = function () {
    var self = this;
    this.ctx = Compas.unlockAudio(this.ctx).ctx;
    return this.ctx.resume().catch(function () {}).then(function () { self.syncState(); });
  };

  P.syncState = function () {
    if (!this.current) return;
    var s = this.ctx && this.ctx.state;
    if (s === "running") { if (this.status === "suspended") this.setStatus("playing"); }
    else if (this.status === "playing") this.setStatus("suspended");
  };

  P.disconnect = function (c) {
    try { c.src.disconnect(); c.st.disconnect(); c.gain.disconnect(); } catch (e) {}
  };

  window.SoloCompasEngine = Engine;
  window.SoloCompasRange = RANGE;
  window.SoloCompasDefaultBpm = LOOPS[0].bpm;
})();
