# AGENTS.md - Developer Guidelines for mi-web

## Project Overview

Minimalist portfolio website for Salvador Cassis (musical artist and educator). **Static HTML/CSS site with no build tools, frameworks, or dependencies.**

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Design system using vanilla CSS (hardcoded hex values, no CSS variables)

---

## Commands

### Running the Site
```bash
python3 -m http.server 8000   # Using Python
php -S localhost:8000         # Using PHP
npx serve                     # Using npx
```

### Linting
```bash
npx html-validate index.html  # HTML validation
npx stylelint style.css       # CSS linting
```

### Testing
No automated tests. Manual verification required:
- Page loads without errors
- Navigation links work
- Form validation works
- Responsive layout at mobile/tablet/desktop widths

---

## Code Style Guidelines

### General Principles
- **Simplicity first**: Prefer simple, readable code over clever solutions
- **No dependencies**: Avoid adding libraries, frameworks, or build tools
- **Content-first**: Design serves content
- **Accessibility**: Semantic HTML, keyboard navigation, focus states
- **Language**: Spanish (es) throughout

### HTML Conventions

1. **Semantic structure**:
   ```html
   <header>      -- Site header with h1 and nav
   <main>        -- Primary content
     <section>   -- Major content areas with id anchors
       <article> -- Individual items within sections
   <footer>     -- Copyright notice
   ```

2. **Section IDs**: lowercase with hyphens (`id="inicio"`, `id="proyectos"`, `id="contacto"`)

3. **Links**: Use internal anchor links for navigation
   ```html
   <a href="#proyectos">Proyectos</a>
   <a href="mailto:example@email.com">Email</a>
   ```

4. **Forms**: Include labels and validation attributes
   ```html
   <label for="nombre">Nombre</label>
   <input type="text" id="nombre" name="nombre" required>
   ```

5. **Meta tags**: Always include viewport and description
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="description" content="...">
   ```

### CSS Conventions

1. **Organization**: Comment headers for logical sections
   ```css
   /* --------------------
      RESET + BASE
   -------------------- */
   ```

2. **Selectors**: Prefer type/class/ID selectors, avoid deep nesting
   ```css
   #contacto input { }
   /* Avoid: body main section#contacto form div.form-group input { } */
   ```

3. **Units**: rem for font sizes/padding, px for borders. No viewport units.

4. **Colors**: Hardcode hex values (no CSS custom properties/variables)

5. **Responsive**: Mobile-first with min-width breakpoints
   ```css
   @media (min-width: 768px) { }
   ```

6. **Focus states**: Required for accessibility
   ```css
   input:focus {
     outline: none;
     border-color: #111;
     box-shadow: 0 0 0 1px #111;
   }
   ```

7. **Button states**: Include hover and active states
   ```css
   button:hover { background-color: #333; }
   button:active { transform: scale(0.98); }
   ```

### Naming Conventions
- Classes/IDs: lowercase with hyphens (kebab-case)
  ```css
  .form-group { }
  #contact-form { }
  ```

### Typography (from actual code)
- Font family: System UI stack (-apple-system, BlinkMacSystemFont, "Segoe UI", etc.)
- Max content width: 820px centered
- Line height: 1.65 (1.7 on desktop)
- Font sizes: h1=2.2rem (desktop 2.5rem), h2=1.5rem (desktop 1.75rem), body=16px (desktop 17px)
- Section padding: 4rem (desktop 5rem)

---

## Common Tasks

### Adding a project
```html
<article>
  <h3>Project Name</h3>
  <p>Description...</p>
</article>
```

### Updating colors
Modify hex values in `style.css`. Current palette:
- Primary text: `#111`
- Muted text: `#555` / `#666`
- Borders: `#ddd`
- Background: `#fafafa`

### Adding a new section
1. Create `<section id="unique-id">` in `index.html`
2. Add navigation link in `<nav><ul>`
3. Add styles in `style.css` if needed

---

## Notes for Agents

- Do NOT add build tools (webpack, vite, etc.) without explicit permission
- Do NOT add JavaScript frameworks or libraries
- Do NOT add CSS frameworks (Tailwind, Bootstrap, etc.)
- Do NOT use CSS custom properties (use hardcoded hex values)
- Keep changes minimal and focused on the specific task
- Test changes manually in browser before considering complete
