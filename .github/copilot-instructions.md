# Copilot Instructions for mi-web

## Project Overview
This is a minimalist portfolio website for Salvador Cassis, a musical artist and educator. It's a static HTML/CSS site with no build tools, frameworks, or dependencies—designed for simplicity, accessibility, and performance.

**Key Files:**
- `index.html` — Single-page portfolio with semantic sections (inicio, práctica, proyectos, contacto)
- `style.css` — Design system using CSS custom properties and a 820px max-width layout

## Design System & Conventions

### Color Palette
Uses CSS custom properties defined in `:root`:
- `--color-acento`: #1f3a5f (deep blue, primary accent)
- `--color-fondo`: #f7f7f4 (off-white background)
- `--color-texto`: #222 (dark text)
- `--color-suave`: #999 (muted secondary text)

Apply accent color to headings, links, and interactive elements. Use `--color-suave` for metadata/descriptions.

### Typography & Spacing
- **Font family**: System UI stack (no external fonts)
- **Max content width**: 820px with centered layout
- **Line height**: 1.7 (generous for readability)
- **Font sizes**: h1=3.2rem, h2=1.4rem, p/body=1.05rem
- **Vertical rhythm**: Sections spaced 4.5rem apart; section dividers (60px horizontal line) separate major sections

## HTML Structure

The site follows a semantic structure with clear section anchors:
```html
<header> — Navigation with internal links (#inicio, #practica, #proyectos, #contacto)
<main>
  <section id="..."> — Each major content area is a separate section with h2 heading
    <article> — Individual projects or topics within sections
</main>
<footer> — Copyright notice
```

**Pattern**: Use semantic sections with id anchors for navigation. Keep articles nested within sections for content hierarchy.

## Styling Patterns

1. **Link states**: Default has transparent bottom border; hover shows `border-bottom: 1px solid var(--color-acento)`
2. **Section dividers**: Use `section:not(:last-child)::after` pseudo-element (avoid adding dividers in HTML)
3. **Selection styling**: Custom background color (#1f3a5f) with white text for highlighting
4. **Responsive padding**: Body uses `padding: 60px 24px` (horizontal padding prevents edge-to-edge feel on mobile)

## Development Notes

- **No build process**: Serve files directly; no minification or bundling needed
- **Language**: Spanish (es) throughout the site
- **Content-first**: Design is intentionally minimal to prioritize written content
- **Accessibility**: Semantic HTML + system fonts = good default accessibility
- **Meta tags**: Remember to update `<title>` and `<meta name="description">` if renaming/repurposing

## Common Tasks

**Adding a new project**: Add `<article>` block inside `#proyectos` section with `<h3>` and `<p>` tags.

**Updating colors**: Modify `:root` custom properties in `style.css`; all color references use variables.

**Changing layout width**: Update `max-width: 820px` on `body` and adjust `max-width` on `p` tags proportionally if needed.

**Adding new sections**: Create `<section id="unique-id">`, link in header nav, and follow existing article/heading pattern.
