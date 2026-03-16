# AGENTS.md - Developer Guidelines for mi-web

## Project Overview

Minimalist portfolio website for Salvador Cassis (artist-educador y músico). **Static HTML/CSS/JS site with no build tools, frameworks, or dependencies.**

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Vanilla CSS with hardcoded hex values (no CSS custom properties)

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
npx html-validate index.html               # Validate single file
npx html-validate --formatter stylish .   # Validate all files
```

### CSS Linting
```bash
npx stylelint style.css                     # Lint single file
npx stylelint "**/*.css"                    # Lint all CSS files
```

### Manual Testing Checklist
No automated tests exist (static HTML/CSS site). After any change, verify:
- [ ] Page loads without console errors
- [ ] All navigation links work correctly
- [ ] Mobile menu toggles on/off
- [ ] Strudel overlay is keyboard-accessible (Tab, Enter, Space)
- [ ] Responsive layout works at mobile/tablet/desktop widths
- [ ] All external links have `target="_blank" rel="noopener noreferrer"`
- [ ] Skip link works for keyboard users

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
- Use rem for font sizes/padding, px for borders only
- No CSS custom properties — use hardcoded hex values

**Color Palette — Autumn:**
- Primary text: `#2c2218` | Heading text: `#3d3028`
- Muted text: `#6d5c4d` / `#7d6c5d` | Borders: `#d9cfc2` / `#e6ddd2`
- Background: `#f5f0e8` | Accent: `#3d6b4f` (Forest Green)

**Responsive Design:**
- Mobile-first with min-width breakpoints: 768px (tablet), 820px (desktop)
- Max content width: 820px centered

**Typography Scale:**
- h1: 2.8rem mobile / 3.2rem desktop, weight 700
- h2: 1.8rem mobile / 2rem desktop, weight 600
- h3: 1.1rem, weight 600 | Body: 16px mobile / 17px desktop

**Interactive States (required):**
```css
a:focus-visible, button:focus-visible, [role="button"]:focus-visible {
  outline: 2px solid #3d6b4f;
  outline-offset: 3px;
  border-radius: 2px;
}
a:hover { opacity: 0.6; }
nav a:hover::after { width: 100%; }
```

### JavaScript Conventions

**Placement:** Inline `<script>` at end of body, never in `<head>`

**Pattern:**
```javascript
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('active');
});
```

**Accessibility:**
- Use `aria-expanded`, `aria-label`, `role`, `tabindex`
- Menu toggle: `aria-label="Menú"` and `aria-expanded="false"`

### Naming Conventions
- Classes/IDs: lowercase with hyphens (kebab-case)
- Examples: `.hero-portrait`, `#main-nav`, `.project-context`

### Error Handling
- No try/catch needed for simple DOM manipulation
- Check element exists before adding event listeners
- Use optional chaining: `document.querySelector('.menu-toggle')?.addEventListener(...)`

---

## Site Sections (in order)
- **Hero** (`#hero`) — Portrait, name, subtitle, credentials
- **Lo que hago** (`#practica`) — Educación artística, Música
- **Proyectos** (`#proyectos`) — Ritos Cotidianos, Sonidos que me rodean, Tangos 1
- **Trabajo con instituciones** (`#instituciones`)
- **Enfoque** (`#enfoque`) — IBA, proceso sobre resultado, sonido como identidad
- **Contacto** (`#contacto`) — Formulario con web3forms

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
<div class="project-gallery">
  <img src="images/example.jpg" alt="Descripción" width="820" height="auto" loading="lazy">
</div>
```

### Adding a New Section
1. Create `<section id="unique-id">` in `index.html`
2. Add navigation link in `<nav><ul>`
3. Add styles in `style.css` if needed

---

## Notes for Agents

- Do NOT add build tools (webpack, vite, etc.) without explicit permission
- Do NOT add JavaScript frameworks or libraries
- Do NOT use CSS custom properties
- Do NOT add Tailwind, Bootstrap, or CSS frameworks
- Keep changes minimal and focused on the specific task
- Test changes manually in browser before considering complete
- This AGENTS.md takes precedence over .github/copilot-instructions.md