# Project Context

Static HTML/CSS portfolio website for Salvador Cassis (musical artist and educator). No build tools, frameworks, or dependencies.

## Key Files
- `index.html` — Single-page portfolio
- `style.css` — Vanilla CSS with hardcoded hex values

## Commands
```bash
python3 -m http.server 8000   # Run dev server
npx html-validate index.html   # HTML validation
npx stylelint style.css        # CSS linting
```

## Quick Guidelines
- Spanish language content throughout
- Semantic HTML with focus states required
- No CSS variables - use hardcoded hex colors (#111, #555, #fafafa, etc.)
- Mobile-first responsive design (768px, 820px breakpoints)
- Classes/IDs: lowercase with hyphens (kebab-case)

## Notes
- Do NOT add build tools or frameworks
- Keep changes minimal and focused
