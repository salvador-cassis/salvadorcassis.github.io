# AGENTS.md - Developer Guidelines for salvadorcassis.com

> **Fuente de verdad:** `codigo/CLAUDE.md` (directorio padre). Claude Code es la herramienta principal — ese archivo siempre estará más actualizado que este.
> Este archivo cubre convenciones técnicas de implementación. Ante cualquier contradicción, CLAUDE.md tiene precedencia absoluta.

## Project Overview

Minimalist portfolio website for Salvador Cassis (artista-educador). **Static HTML/CSS/JS site with no build tools, frameworks, or dependencies.**

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Vanilla CSS with CSS custom properties (design tokens in `:root`)

---

## Commands

### Running the Site
```bash
python3 -m http.server 8000   # Ejecutar desde codigo/salvadorcassis.com/
```

### HTML Validation
```bash
npx html-validate index.html
npx html-validate --formatter stylish .
```

### CSS Linting
```bash
npx stylelint style.css
npx stylelint "**/*.css"
```

### Manual Testing Checklist
No automated tests exist (static HTML/CSS site). After any change, verify:
- [ ] Page loads without console errors
- [ ] All navigation links work correctly
- [ ] Mobile menu toggles on/off
- [ ] Strudel overlay is keyboard-accessible (Tab, Enter, Space)
- [ ] Responsive layout works at 768px and 820px breakpoints
- [ ] All external links have `target="_blank" rel="noopener noreferrer"`
- [ ] Skip link works for keyboard users

---

## Design Tokens (style.css `:root`)

Always use `var(--token)` — never hardcode hex values in new CSS.

```css
:root {
  --color-bg:           #EDE6DA;   /* crema cálido */
  --color-surface:      #E2D9CA;
  --color-text:         #1E1208;   /* casi negro */
  --color-text-muted:   #4A3E33;
  --color-accent:       #A04E40;   /* terracota — CTA, links, énfasis */
  --color-accent-hover: #893D34;
  --color-accent-ui:    #3A6642;   /* verde — tags, elementos UI */
  --color-border:       #C8B49A;
  --color-bg-input:     #FAF5EE;
  --color-focus-ring:   rgba(160, 78, 64, 0.15);

  /* /lab (dark theme) */
  --color-lab-bg:       #1A1A12;
  --color-lab-surface:  #252518;
  --color-lab-text:     #E8DEC8;
  --color-lab-accent:   #C47A50;
  --color-lab-tag-bg:   #2A3A18;
  --color-lab-border:   #3E4A28;

  --font-display:  'Space Grotesk', sans-serif;
  --font-body:     'DM Sans', sans-serif;
  --font-mono:     'IBM Plex Mono', monospace;
  --fw-regular: 400; --fw-medium: 500; --fw-semibold: 600; --fw-bold: 700;
  --max-width: 820px;
}
```

---

## Code Style Guidelines

### HTML Conventions

**Semantic Structure:**
```html
<header>    -- Site header with name, tagline and nav
<main>      -- Primary content
  <section> -- Major content areas with id anchors
    <article> -- Individual items within sections
<footer>   -- Copyright notice
```

**Required Attributes:**
- Section IDs: lowercase with hyphens (`id="practica"`, `id="proyectos"`)
- Meta tags: viewport, description, Open Graph (og:title, og:description, og:image, og:url, og:type)
- External links: `target="_blank" rel="noopener noreferrer"`
- Images: `alt` text required, include `width` and `height` attributes
- Interactive elements: `aria-label` for buttons without text

**Skip Link (required):**
```html
<a href="#hero" class="skip-link">Saltar al contenido</a>
```

### CSS Conventions

**Organization:**
- Section comments with dividers: `/* -------------------- SECTION NAME -------------------- */`
- No deep nesting; prefer type/class/ID selectors
- Use `rem` for font sizes/padding, `px` for borders only
- Use `var(--token)` — do NOT hardcode hex values in new CSS

**Responsive Design:**
- Mobile-first with `min-width` breakpoints: 768px (tablet), 820px (desktop)
- Max content width: `var(--max-width)` (820px) centered

**Interactive States (required):**
```css
a:focus-visible, button:focus-visible, [role="button"]:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

### JavaScript Conventions

**Placement:** Inline `<script>` at end of body, never in `<head>`

**Accessibility:**
- Use `aria-expanded`, `aria-label`, `role`, `tabindex`
- Menu toggle: `aria-label="Menú"` and `aria-expanded="false"`

### Naming Conventions
- Classes/IDs: lowercase with hyphens (kebab-case)
- Examples: `.hero-portrait`, `#main-nav`, `.project-context`

---

## Site Sections (in order)

`#hero` → `#practica` → `#proyectos` → `#instituciones` → `#enfoque` → `#lab-callout` → `#contacto`

---

## Common Tasks

### Adding a Project
```html
<article>
  <h3>Nombre del proyecto</h3>
  <p class="project-context">Contexto · Lugar · Año</p>
  <p>Descripción del proyecto...</p>
</article>
```

### Adding Images
```html
<img src="images/example.jpg" alt="Descripción" width="820" height="auto" loading="lazy">
```

### Adding a New Section
1. Create `<section id="unique-id">` in `index.html`
2. Add navigation link in `<nav><ul>`
3. Add styles in `style.css` using `var(--token)` values

---

## Hard Constraints

- Do NOT add build tools (webpack, vite, etc.)
- Do NOT add JavaScript frameworks or libraries
- Do NOT add Tailwind, Bootstrap, or CSS frameworks
- Do NOT hardcode hex values in new CSS — use `var(--token)`
- All content in Spanish (`lang="es"`)
- Keep changes minimal and focused on the specific task
