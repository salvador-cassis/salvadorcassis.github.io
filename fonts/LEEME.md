# Fuentes alojadas en el sitio

## comico-400.woff2

- **Familia:** Comico
- **Diseño:** Frode Bo Helland — Indian Type Foundry (ITF)
- **Licencia:** ITF Free Font License (FFL). Permite uso personal y comercial,
  incluido el uso web y el alojamiento en el propio servidor.
- **Origen:** https://www.fontshare.com/fonts/comico
- **Uso en este sitio:** solo en `/regalos/` — título y controles del paseo.
  Es una fuente *unicase* (no tiene caja baja: todo se ve en mayúsculas), por eso
  nunca debe usarse en texto corrido ni en los pies de foto. Ver `DESIGN.md`,
  sección "La Regla de Una Familia".
- **Por qué está alojada aquí y no en el CDN de Fontshare:** los navegadores con
  protección anti-fingerprinting (Brave, Safari con Lockdown, extensiones de
  bloqueo) bloquean las peticiones a CDN de fuentes de terceros, y la fuente no
  llegaba a cargar.
- **Subset:** recortada a latín básico + latín extendido (acentos, ñ, ¿, ¡, «»)
  con `pyftsubset`. De 296 KB a 65 KB. No incluye las flechas `←` `→` porque la
  fuente original no las trae; esos caracteres caen al fallback tipográfico.
