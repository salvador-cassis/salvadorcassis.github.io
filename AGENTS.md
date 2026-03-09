# AGENTS.md - Developer Guidelines for mi-web

## Project Overview

Minimalist portfolio website for Salvador Cassis (artist-educator and musician). **Static HTML/CSS/JS site with no build tools, frameworks, or dependencies.**

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Design system using vanilla CSS with hardcoded hex values

---

## Commands

### Running the Site
```bash
python3 -m http.server 8000   # Using Python (Recommended)
php -S localhost:8000        # Using PHP
npx serve                    # Using npx
```

### HTML Validation
```bash
npx html-validate index.html              # Validate single file
npx html-validate --formatter stylish .   # Validate all files
```

### CSS Linting
```bash
npx stylelint style.css         # Lint single file
npx stylelint "**/*.css"        # Lint all CSS files
```

### Testing
No automated tests. Manual verification checklist:
- [ ] Page loads without console errors
- [ ] All navigation links work correctly
- [ ] Mobile menu toggles on/off
- [ ] Strudel embed loads only on overlay click (lazy-loaded)
- [ ] Strudel overlay is keyboard-accessible (Tab, Enter, Space)
- [ ] Responsive layout works at mobile/tablet/desktop widths
- [ ] All external links open in new tabs with proper security attributes

---

## Site Structure

### Sections (in order)
- **Hero** (`#hero`) — Portrait, name, subtitle, description
- **Lo que hago** (`#practica`) — Educación artística, Música, Exploración tecnológica
- **Proyectos** (`#proyectos`) — Ritos Cotidianos, Sonidos que me rodean, EP, Tangos 1 (Strudel embed)
- **Enfoque** (`#enfoque`) — Manifesto: IBA, proceso sobre resultado, sonido como identidad
- **Colaboración** (`#colaboracion`) — Oferta para instituciones y artistas
- **Contacto** (`#contacto`) — Email directo (no form)

### Navigation
`Lo que hago · Proyectos · Enfoque · Colaboración · Contacto`

---

## Code Style Guidelines

### General Principles
- **Simplicity first**: Prefer simple, readable code over clever solutions
- **No dependencies**: Never add libraries, frameworks, or build tools
- **Content-first**: Design serves content, not the other way around
- **Accessibility**: Semantic HTML, keyboard navigation, focus states required
- **Language**: Spanish (es) throughout all content

### HTML Conventions

**Semantic Structure:**
```html
<header>     -- Site header with name, tagline and nav
<main>       -- Primary content
  <section>  -- Major content areas with id anchors
    <article> -- Individual items within sections
<footer>    -- Copyright notice
```

**Required Elements:**
- Section IDs: lowercase with hyphens (`id="practica"`, `id="proyectos"`, `id="contacto"`)
- Meta tags: viewport, description, Open Graph (og:title, og:description, og:image, og:url, og:type)
- External links: `target="_blank" rel="noopener noreferrer"`

### CSS Conventions

**Organization:**
- Section comments with dividers: `/* -------------------- SECTION NAME -------------------- */`
- Prefer type/class/ID selectors, avoid deep nesting
- Use rem for font sizes/padding, px for borders only

**Color Palette — Autumn:**
- Primary text: `#2c2218` (dark warm brown)
- Heading text: `#3d3028` (warm brown)
- Muted text: `#6d5c4d` / `#7d6c5d` (warm browns)
- Borders: `#d9cfc2` / `#e6ddd2` (warm light)
- Background: `#f5f0e8` (warm cream)
- Input background: `#fffdf9` (warm white)
- Accent (interactive): `#3d6b4f` (Forest Green)
- Accent hover: `#325a42` (darker Forest Green)

**Responsive Design:**
- Mobile-first with min-width breakpoints
- Standard breakpoints: 768px (tablet), 820px (desktop)
- Max content width: 820px centered

**Typography Scale:**
- h1: 2.8rem mobile / 3.2rem desktop, weight 700
- h2: 1.8rem mobile / 2rem desktop, weight 600
- h3: 1.1rem, weight 600
- Body: 16px mobile / 17px desktop

**Interactive States (required):**
```css
input:focus { outline: none; border-color: #3d6b4f; box-shadow: 0 0 0 1px #3d6b4f; }
a:hover { opacity: 0.6; }
nav a:hover::after { width: 100%; } /* Forest Green underline */
```

### JavaScript Conventions

**Placement & Loading:**
- Inline `<script>` at end of body, never in `<head>`
- Scripts run after DOM is parsed

**Accessibility Attributes:**
- Use `aria-expanded`, `aria-label`, `role`, `tabindex` for interactive elements

**Strudel Embed:**
- Lazy-loaded: iframe uses `data-src`, `src` is set only on overlay click
- Overlay handles both click and keyboard events (Enter/Space)

### Naming Conventions
- Classes/IDs: lowercase with hyphens (kebab-case)
- Examples: `.hero-portrait`, `#main-nav`, `.project-context`, `.strudel-embed`

---

## Common Tasks

### Adding a Project
```html
<article>
  <h3>Nombre del proyecto</h3>
  <p class="project-context">Contexto · Lugar</p>
  <p>Descripción del proyecto...</p>
</article>
```

### Updating Colors
Modify hex values in `style.css`. Do NOT use CSS custom properties. Refer to the Autumn palette above.

### Adding a New Section
1. Create `<section id="unique-id">` in `index.html`
2. Add navigation link in `<nav><ul>`
3. Add styles in `style.css` if needed

---

## Notes for Agents

- Do NOT add build tools (webpack, vite, etc.) without explicit permission
- Do NOT add JavaScript frameworks or libraries
- Do NOT add CSS frameworks (Tailwind, Bootstrap, etc.)
- Do NOT use CSS custom properties
- Keep changes minimal and focused on the specific task
- Test changes manually in browser before considering complete
- Prioritize this AGENTS.md over .github/copilot-instructions.md
