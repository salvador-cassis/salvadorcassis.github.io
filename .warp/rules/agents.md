# Project Context

> **Fuente de verdad:** `codigo/CLAUDE.md`. Claude Code es la herramienta principal — ese archivo siempre estará más actualizado que este. Ante contradicciones, CLAUDE.md tiene precedencia.



Static HTML/CSS portfolio website for Salvador Cassis (artista-educador). No build tools, frameworks, or dependencies.

## Key Files
- `index.html` — Single-page portfolio
- `style.css` — Vanilla CSS with design tokens (`var(--token)`)

## Commands
```bash
python3 -m http.server 8000   # Run dev server (from salvadorcassis.com/)
npx html-validate index.html   # HTML validation
npx stylelint style.css        # CSS linting
```

## Design Tokens
Always use `var(--token)` — never hardcode hex values.

Key tokens:
- `--color-bg`: #EDE6DA (crema cálido)
- `--color-text`: #1E1208
- `--color-accent`: #A04E40 (terracota — CTA, links)
- `--color-accent-ui`: #3A6642 (verde — tags, UI)
- `--font-display`: 'Space Grotesk' | `--font-body`: 'DM Sans' | `--font-mono`: 'IBM Plex Mono'
- `--max-width`: 820px

## Quick Guidelines
- Spanish language content throughout
- Semantic HTML with focus states required
- Use `var(--token)` for all colors — no hardcoded hex
- Mobile-first responsive design (768px, 820px breakpoints)
- Classes/IDs: lowercase with hyphens (kebab-case)

## Notes
- Do NOT add build tools or frameworks
- Keep changes minimal and focused
