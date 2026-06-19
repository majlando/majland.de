# majland.de — a free learning hub

A small, fast, **trilingual** learning hub. It turns the best free courses on the
internet into **five focused paths** — and lets anyone follow them step by step,
in **English, German, or Danish**.

> Curated paths to learn software · Kuratierte Lernwege, um Software zu bauen · Kuraterede forløb til at bygge software

🔗 **Live:** https://majland.de

## The five paths

| Path                 | Covers                    | Core resources                          |
| -------------------- | ------------------------- | --------------------------------------- |
| **Foundations**      | How computers & code work | CS50x · CS61A · MIT 6.006               |
| **The Web**          | HTML, CSS, JavaScript     | web.dev · javascript.info · MDN         |
| **Full-Stack**       | Build & ship real apps    | Full Stack Open · TypeScript · CS50 Web |
| **Tools & Workflow** | Terminal, Git, workflow   | MIT Missing Semester · GitHub Skills    |
| **Build with AI**    | LLMs in your apps         | Anthropic Academy                       |

## Tech

A **vanilla** app (no framework) bundled with **Vite**, then **pre-rendered to
static HTML** at build time. Best of both worlds: real, crawlable pages for search
engines and link previews, plus instant client-side navigation when JS runs.

```
src/
  content.js   Single source of truth — every string as { en, de, da }
  render.js    Pure HTML rendering + URL/routing helpers (runs in Node AND the browser)
  main.js      Client: history routing, progress, theme, language switch
  icons.js     Inline SVG icons
  styles.css   Design system: themes, per-track accent colours, responsive
index.html     Shell (header, footer); main#app is filled per page
scripts/
  prerender.mjs  Post-build SSG: writes one static page per language × route
public/        Copied as-is: favicon, icons, OG image, robots.txt, manifest
```

### URLs

English lives at the root; German and Danish are prefixed:

```
/                 /de/                 /da/                 ← home
/path/web/        /de/path/web/        /da/path/web/        ← a path
```

Each page is real static HTML with its own `<title>`, description, `canonical`,
**hreflang** alternates (incl. `x-default` → English), per-language Open Graph,
and **JSON-LD** structured data. A full `sitemap.xml` is generated too.

### Notable choices

- **SEO-first, English-first.** `renderApp()` in `render.js` is pure (no DOM), so the
  same code renders pages in Node at build time and in the browser at runtime.
- **Works without JavaScript.** Every page and link is real, so the site is fully
  usable with JS disabled; the client just adds instant transitions + progress/theme/lang.
- **Absolute base (`/`).** Targets the domain root (your one.com deploy). Hash-free
  URLs need no server rewrites because every route is pre-rendered to its own file.
- **One data file, three languages.** Switching language navigates to the localized
  URL — so links like `/de/path/web/` are shareable and indexable.

## Develop

```bash
npm install      # once
npm run dev      # dev server (http://localhost:5173) with history routing
npm run build    # vite build + pre-render → dist/  (18 pages + sitemap + 404)
npm run preview  # serve the built dist/ locally
npm run format   # Prettier
```

> Note: because it now uses ES modules + absolute URLs, open it via a server
> (`npm run dev` / `npm run preview`), not by double-clicking `index.html`.

## Deploy

### one.com (primary — SSH/SFTP upload)

```bash
npm run build
# upload the *contents* of dist/ into your web root on one.com, e.g.:
scp -r dist/* USER@ssh.example.com:/path/to/www/
```

Upload `dist/*` (not the folder). The pre-rendered subfolders (`/de/`, `/path/web/`,
…) become real URLs; no `.htaccess` needed. Re-run `npm run build` and re-upload to publish.

### GitHub Pages (optional preview)

`.github/workflows/deploy.yml` builds with `--base=/majland.de/` and deploys on every
push to `main` (also a CI build-check). Enable via **Settings → Pages → Source → "GitHub
Actions."** Canonical URLs always point to `majland.de`, so the preview won't compete in search.

## Editing the content

Almost everything is in **`src/content.js`** (`{ en, de, da }` — keep all three in sync).
To add a path, copy a `PATHS` object (unique `id`, an `accent`, an `icon` from
`src/icons.js`); it's picked up by the hub, the pre-renderer and the sitemap automatically.

---

Course and reference links belong to their respective owners; listing them here
implies no affiliation or endorsement.
