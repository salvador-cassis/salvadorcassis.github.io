/* Anillo de 12 tiempos, lectura de BPM y desbloqueo de audio. Compartido por Metrónomo y Solo compás. */
(function () {
  var TOTAL = 12;
  var BEAT_NAMES = ["doce", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "(un)"];
  var ALT_BEAT_NAMES = ["1", "+", "2", "+", "3", "+", "1", "+", "2", "+", "3", "+"];
  var COLORS = { fg: "#14100a", accent: "#e97417", dim: "#d0c4b4", onAccent: "#ffffff" };
  var INNER_RATIO = 0.70;
  var ACCENT_PATTERN = [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0].map(Boolean);

  function unlockAudio(existing) {
    try { navigator.audioSession.type = "playback"; } catch (e) {}
    var ctx = existing, created = false;
    if (!ctx) {
      var Ctor = window.AudioContext || window.webkitAudioContext;
      ctx = new Ctor();
      created = true;
    }
    if (ctx.state === "suspended") ctx.resume();
    var silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, 22050);
    silent.connect(ctx.destination);
    silent.start(0);
    return { ctx: ctx, created: created };
  }

  /* opts: { box, variant: 'solid'|'outline', getState: () => ({beat, palmas, alt}), onToggle(beat), onCenterClick() } */
  function createRing(opts) {
    var box = opts.box;
    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    box.appendChild(canvas);

    function draw() {
      var st = opts.getState();
      var currentBeat = st.beat, palmas = st.palmas, variant = opts.variant;
      var ctx = canvas.getContext("2d");
      var dpr = window.devicePixelRatio || 1;
      var W = canvas.width / dpr, H = canvas.height / dpr;
      var cx = W / 2, cy = H / 2, half = Math.min(W, H) / 2;
      var R_METRO = half * 0.84, R_PALMAS = half * INNER_RATIO, s = half / 100;
      var names = st.alt ? ALT_BEAT_NAMES : BEAT_NAMES;
      function pos(i, r) {
        var a = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
        return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
      }
      function dot(x, y, r, color) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      ctx.strokeStyle = COLORS.dim;
      ctx.beginPath(); ctx.arc(cx, cy, R_METRO, 0, Math.PI * 2); ctx.stroke();
      if (variant === "outline") {
        ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.arc(cx, cy, R_PALMAS, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      var active = [];
      palmas.forEach(function (v, i) { if (v) active.push(i); });
      if (active.length >= 2) {
        ctx.beginPath();
        active.forEach(function (i, idx) {
          var p = pos(i, R_PALMAS);
          if (idx === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
        });
        ctx.closePath();
        ctx.lineJoin = "round";
        ctx.globalAlpha = variant === "solid" ? 1 : 0.1;
        ctx.fillStyle = COLORS.accent; ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = COLORS.accent; ctx.lineWidth = 1.6 * s; ctx.stroke();
      }
      if (variant === "outline") {
        for (var i = 0; i < TOTAL; i++) {
          var p = pos(i, R_PALMAS), isOn = !!palmas[i], isCur = i === currentBeat, dotR, fill;
          if (isCur && isOn) { dotR = 9.5 * s; fill = COLORS.fg; }
          else if (isCur) { dotR = 5 * s; fill = "rgba(20,16,10,0.6)"; }
          else if (isOn) { dotR = 7 * s; fill = COLORS.accent; }
          else { dotR = 3 * s; fill = COLORS.dim; }
          if (isCur && isOn) dot(p[0], p[1], dotR + 7 * s, "rgba(20,16,10,0.1)");
          dot(p[0], p[1], dotR, fill);
        }
      }
      for (var j = 0; j < TOTAL; j++) {
        var q = pos(j, R_METRO);
        if (j === currentBeat) dot(q[0], q[1], (ACCENT_PATTERN[j] ? 6.5 : 4.5) * s, COLORS.fg);
        else if (ACCENT_PATTERN[j]) dot(q[0], q[1], 3.6 * s, COLORS.accent);
        else dot(q[0], q[1], 1.8 * s, COLORS.dim);
      }
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      var labelColor = variant === "solid" ? COLORS.onAccent : COLORS.fg;
      ctx.fillStyle = labelColor;
      if (currentBeat >= 0) {
        var size = Math.floor(W * 0.17), style = "200";
        if (currentBeat === 3) style = st.alt ? "900" : "700";
        else if (currentBeat === 10) style = "italic 200";
        ctx.font = style + " " + size + "px Helvetica Neue,Arial,sans-serif";
        if (currentBeat === 3 && st.alt) {
          ctx.strokeStyle = labelColor; ctx.lineWidth = 3.5 * s; ctx.lineJoin = "round";
          ctx.strokeText(names[currentBeat], cx, cy);
        }
        ctx.fillText(names[currentBeat], cx, cy);
      } else {
        ctx.beginPath();
        ctx.moveTo(cx - 9 * s, cy - 14 * s); ctx.lineTo(cx + 15 * s, cy); ctx.lineTo(cx - 9 * s, cy + 14 * s);
        ctx.closePath(); ctx.fill();
      }
      canvas.setAttribute("aria-label", currentBeat >= 0 ? "Tiempo " + names[currentBeat] : "Compás de 12 tiempos");
    }

    function fit() {
      var dpr = window.devicePixelRatio || 1, size = box.clientWidth || 400;
      canvas.width = size * dpr; canvas.height = size * dpr;
    }
    fit();
    new ResizeObserver(fit).observe(box);
    (function loop() { draw(); requestAnimationFrame(loop); })();

    box.addEventListener("click", function (e) {
      var rect = canvas.getBoundingClientRect();
      var W = rect.width, cx = W / 2, cy = W / 2, R = (W / 2) * INNER_RATIO;
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      if (opts.onCenterClick && Math.hypot(mx - cx, my - cy) < R * 0.6) { opts.onCenterClick(); return; }
      if (!opts.onToggle) { if (opts.onCenterClick) opts.onCenterClick(); return; }
      var best = -1, bestD = 36;
      for (var i = 0; i < TOTAL; i++) {
        var a = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
        var d = Math.hypot(mx - (cx + Math.cos(a) * R), my - (cy + Math.sin(a) * R));
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best >= 0) opts.onToggle(best);
    });
  }

  /* Pulsación larga (600 ms) o Enter/Espacio sobre el BPM alterna la cuenta. */
  function bindBpm(valueEl, flashEl, onToggle) {
    var press = null, flashT = null;
    function toggle() {
      var alt = onToggle();
      flashEl.textContent = alt ? "1 + 2 + 3 +" : "doce un dos";
      flashEl.dataset.on = "true";
      clearTimeout(flashT);
      flashT = setTimeout(function () { flashEl.dataset.on = "false"; }, 1000);
    }
    function cancel() { if (press) { clearTimeout(press); press = null; } }
    valueEl.addEventListener("pointerdown", function () { cancel(); press = setTimeout(function () { press = null; toggle(); }, 600); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { valueEl.addEventListener(ev, cancel); });
    valueEl.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    valueEl.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  }

  window.Compas = { TOTAL: TOTAL, ACCENT_PATTERN: ACCENT_PATTERN, unlockAudio: unlockAudio, createRing: createRing, bindBpm: bindBpm };
})();
