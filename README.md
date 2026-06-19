# majland.de — a free learning hub

A small, fast, **trilingual** learning hub. It turns the best free courses on the
internet into **five focused paths** — and lets anyone follow them step by step,
in **English, German, or Danish**.

> Curated paths to learn software · Kuratierte Lernwege für Software · Kuraterede forløb til at lære software

🔗 **Live:** https://majland.de

## The five paths

| Path                 | Covers                    | Core resources                          |
| -------------------- | ------------------------- | --------------------------------------- |
| **Foundations**      | How computers & code work | CS50x · CS61A · MIT 6.006               |
| **The Web**          | HTML, CSS, JavaScript     | web.dev · javascript.info · MDN         |
| **Full-Stack**       | Build & ship real apps    | Full Stack Open · TypeScript · CS50 Web |
| **Tools & Workflow** | Terminal, Git, workflow   | MIT Missing Semester · GitHub Skills    |
| **Build with AI**    | LLMs in your apps         | Anthropic Academy                       |

A "new here?" hint suggests an order; otherwise every path stands on its own.

## Tech

A **vanilla** single-page app (hash routing, i18n, local progress, dark/light
theme) — no framework — bundled with **Vite**.

```
src/
  main.js      App: rendering, hash routing, progress, theme, language
  content.js   Single source of truth — every string as { en, de, da }
  icons.js     Inline SVG icons
  styles.css   Design system: themes, per-track accent colours, responsive
index.html     Shell: header, language switcher, <noscript> fallback
public/        Copied as-is: favicon, icons, OG image, robots.txt, sitemap.xml, manifest
```

### Notable choices

- **One data file, three languages.** Every UI string and all path content lives
  in `src/content.js` as `{ en, de, da }`. Language switches live and is remembered;
  it defaults to the visitor's browser language.
- **Relative base (`base: './'`).** The build works dropped into _any_ web root —
  the one.com root, a GitHub Pages project path, or opened from disk — with no
  per-host configuration.
- **Hash routing.** Routes like `#/path/web` need **no** server rewrite rules, so it
  just works on one.com (and anywhere else) as plain static files.
- **Accessible & resilient.** Semantic landmarks, skip link, keyboard-friendly,
  `prefers-reduced-motion` respected, and a `<noscript>` list of every resource.

## Develop

```bash
npm install      # once
npm run dev      # dev server with hot reload (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
npm run format   # format everything with Prettier
```

## Deploy

### one.com (primary — SSH/SFTP upload)

```bash
npm run build
# upload the *contents* of dist/ into your web root on one.com, e.g.:
scp -r dist/* USER@ssh.majland.de:/customers/.../www/
#   …or use SFTP / the one.com File Manager. Upload dist/* — not the dist folder itself.
```

Because the build uses a relative base and hash routing, no `.htaccess` or rewrite
rules are needed. Re-run `npm run build` and re-upload `dist/` to publish changes.

### GitHub Pages (optional, automatic)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. To enable:
**repo Settings → Pages → Source → "GitHub Actions."** It also acts as a CI check
that the site still builds. Don't want it? Delete the workflow file.

## Editing the content

Almost everything is in **`src/content.js`**:

- **Change a resource or blurb:** edit the relevant `steps` entry in a path. Keep the
  three language keys (`en`, `de`, `da`) in sync.
- **Add a path:** copy a path object in `PATHS` — give it a unique `id`, an `accent`
  (`indigo` / `cyan` / `emerald` / `amber` / `pink`) and an `icon` key from
  `src/icons.js`. It appears on the home grid automatically.
- **Add a language:** add the key to every string and a matching button in the
  header's `#langSwitch` in `index.html`.

---

Course and reference links belong to their respective owners; listing them here
implies no affiliation or endorsement.
