# Salvador Cassis — Portfolio

Sitio web personal de Salvador Cassis, artista educador y productor musical.

## Tecnologías

- HTML5 semántico
- CSS vanilla (sin frameworks)
- Sin build tools ni dependencias

## Estructura

```
mi-web/
├── index.html    # Página principal
├── style.css    # Estilos
├── CNAME        # Dominio personalizado
└── AGENTS.md   # Guía para agentes IA
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
- **Enfoque**: Formación, Enfoque, Búsqueda actual
- **Contacto**: Formulario y email

## Strudel

Sección de Arte medial incluye un REPL embebido de [Strudel](https://strudel.cc/) para live coding musical.
