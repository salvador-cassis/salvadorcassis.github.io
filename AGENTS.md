# AGENTS.md - Developer Guidelines for mi-web

## Project Overview

This is a minimalist portfolio website for Salvador Cassis (musical artist and educator). It's a **static HTML/CSS site with no build tools, frameworks, or dependencies**.

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections
- `style.css` — Design system using vanilla CSS

---

## Commands

Since this is a static HTML/CSS project with no build tools, there are no npm scripts or build commands.

### Running the Site

Simply open `index.html` in a browser, or serve it locally:

```bash
# Using Python
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using npx serve
npx serve
```

### Linting

There is no formal linter configured. For HTML, you can use:
```bash
# Validate HTML
npx html-validate index.html
```

For CSS, you can use:
```bash
# Lint CSS with stylelint
npx stylelint style.css
```

### Testing

No automated tests exist for this project. Manual testing should verify:
- Page loads without errors
- All navigation links work
- Form validation works
- Responsive layout at mobile/tablet/desktop widths

---

## Code Style Guidelines

### General Principles

- **Simplicity first**: Prefer simple, readable code over clever solutions
- **No dependencies**: Avoid adding external libraries, frameworks, or build tools
- **Content-first**: Design serves content, not the other way around
- **Accessibility**: Use semantic HTML and ensure keyboard navigation works
- **Language**: Spanish (es) for all content

### HTML Conventions

1. **Semantic structure**: Use proper HTML5 elements
   ```html
   <header>      -- Site header with h1 and nav
   <main>        -- Primary content
     <section>   -- Major content areas with id anchors
       <article> -- Individual items within sections
   <footer>     -- Copyright notice
   ```

2. **Section IDs**: Use lowercase with hyphens for section IDs used in navigation
   ```html
   <section id="inicio">
   <section id="proyectos">
   <section id="contacto">
   ```

3. **Links**: Use internal anchor links for site navigation
   ```html
   <a href="#proyectos">Proyectos</a>
   <a href="mailto:example@email.com">Email</a>
   ```

4. **Forms**: Include proper labels and validation attributes
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

1. **Organization**: Use comment headers to divide logical sections
   ```css
   /* --------------------
      RESET + BASE
   -------------------- */
   ```

2. **Selectors**: Prefer type selectors and specific class/ID selectors. Avoid deep nesting.
   ```css
   /* Good */
   #contacto input { }
   header nav ul { }
   
   /* Avoid */
   body main section#contacto form div.form-group input { }
   ```

3. **Units**: Use rem for font sizes and padding, px for borders. Avoid viewport units.

4. **Colors**: Hardcode hex values in CSS; do not use CSS custom properties unless the copilot-instructions.md specifies otherwise (the existing codebase uses hardcoded hex values, not variables).

5. **Responsive**: Use media queries with min-width breakpoints (mobile-first approach)
   ```css
   @media (min-width: 768px) { }
   ```

6. **Form styling**: Include focus states for accessibility
   ```css
   input:focus {
     outline: none;
     border-color: #111;
     box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.1);
   }
   ```

7. **Button states**: Include hover and active states
   ```css
   button:hover { }
   button:active { transform: scale(0.98); }
   ```

### Naming Conventions

- **Classes/IDs**: lowercase with hyphens (kebab-case)
  ```css
  .form-group { }
  #contact-form { }
  ```

- **Variables**: Not used in current codebase (hardcoded values preferred for simplicity)

### Error Handling

- No JavaScript error handling needed (static site)
- Form submission requires a backend; currently placeholder (no action attribute)
- For production, consider form services like Formspree or Netlify Forms

---

## Common Tasks

### Adding a new project
Add `<article>` block inside `#proyectos` section:
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

## From .github/copilot-instructions.md

This project has existing Copilot instructions that agents should follow. Key points:

- Max content width: 820px with centered layout
- Line height: 1.6-1.7 for readability
- Font sizes: h1=2rem, h2=1.6rem, p=1rem-1.05rem
- Sections spaced apart with flex gap (4rem)
- System UI font stack (no external fonts)
- Spanish language throughout

---

## Notes for Agents

- Do NOT add build tools (webpack, vite, etc.) without explicit user permission
- Do NOT add JavaScript frameworks or libraries
- Do NOT add CSS frameworks (Tailwind, Bootstrap, etc.)
- Keep changes minimal and focused on the specific task
- Test changes manually in browser before considering complete
