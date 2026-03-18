# Copilot Instructions for salvadorcassis.com

> **Fuente de verdad:** `codigo/CLAUDE.md`. Claude Code es la herramienta principal — ese archivo siempre estará más actualizado que este. Ante contradicciones, CLAUDE.md tiene precedencia absoluta.


## Project Overview
Static portfolio website for Salvador Cassis, an artista-educador from Región de La Araucanía, Chile. No build tools, frameworks, or dependencies.

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Design tokens via CSS custom properties + mobile-first layout

## Design System

### Tokens (`:root` in style.css)
Always use `var(--token)` — never hardcode hex values.

```css
--color-bg:           #EDE6DA;   /* crema cálido */
--color-text:         #1E1208;
--color-text-muted:   #4A3E33;
--color-accent:       #A04E40;   /* terracota — CTA, links, énfasis */
--color-accent-hover: #893D34;
--color-accent-ui:    #3A6642;   /* verde — tags, UI elements */
--color-border:       #C8B49A;
--font-display:       'Space Grotesk', sans-serif;
--font-body:          'DM Sans', sans-serif;
--font-mono:          'IBM Plex Mono', monospace;
--max-width:          820px;
```

### Responsive Design
Mobile-first with `min-width` breakpoints at 768px and 820px. Max content width: `var(--max-width)`.

### Focus States (required)
```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

## HTML Structure

```html
<header> — Navigation with internal anchor links
<main>
  <section id="..."> — Major content areas
    <article> — Individual projects or items
<footer>
```

Sections in order: `#hero` → `#practica` → `#proyectos` → `#instituciones` → `#enfoque` → `#lab-callout` → `#contacto`

**Required on all pages:**
- `<a href="#hero" class="skip-link">Saltar al contenido</a>` (accessibility)
- External links: `target="_blank" rel="noopener noreferrer"`
- Images: `alt`, `width`, `height` attributes

## Development Notes

- **No build process** — serve files directly
- **Language**: Spanish (`lang="es"`) throughout
- **JS**: Inline `<script>` at end of `<body>`, never in `<head>`
- **Classes/IDs**: kebab-case (`#main-nav`, `.hero-portrait`)

## Common Tasks

**Adding a project**: Add `<article>` with `<h3>` and `<p class="project-context">` inside `#proyectos`.

**Adding a section**: Create `<section id="unique-id">`, link in nav, add styles using `var(--token)`.

**Updating colors**: Modify `:root` tokens in `style.css` — do not change individual selectors.
