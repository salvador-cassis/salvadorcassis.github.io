# Salvador Cassis — Portfolio

Sitio web personal de Salvador Cassis, artista educador y productor musical.

## Tecnologías

- HTML5 semántico
- CSS vanilla (sin frameworks)
- Sin build tools ni dependencias

## Estructura

```
salvadorcassis.com/
├── index.html          # Página principal
├── style.css           # Estilos
├── CNAME               # Dominio personalizado
├── AGENTS.md           # Guía para agentes IA
├── proyectos/          # Páginas individuales por proyecto (SEO)
│   ├── ritos-cotidianos/
│   ├── sonidos-que-me-rodean/
│   └── animate/
├── lab/                # Laboratorio interactivo (Strudel, piezas)
│   ├── index.html
│   ├── compas-flamenco/
│   ├── pandero-web/
│   └── piezas/tangos-1/
└── regalos/            # Galería personal
```

## Desarrollo

### Ejecutar localmente

```bash
# Python
python3 -m http.server 8000

# o PHP
php -S localhost:8000

# o npx
npx serve
```

Luego abrir http://localhost:8000

### Editar código

1. Modificar `index.html` o `style.css`
2. Ver cambios en el navegador (con live reload si está disponible)

## Deployment

El sitio está configurado para deploy automático via GitHub Pages. 
Los cambios hechos push a `main` se publican automáticamente.

## Secciones

- **Práctica**: Educación, Música, Arte medial, Producción
- **Proyectos**: páginas individuales optimizadas para SEO
- **Instituciones**: sección de conversión institucional
- **Enfoque**: Formación, Enfoque, Búsqueda actual
- **Lab**: laboratorio interactivo con live coding
- **Contacto**: Formulario (Web3Forms) y email

## Strudel

Sección de Arte medial incluye un REPL embebido de [Strudel](https://strudel.cc/) para live coding musical.
