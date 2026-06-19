# majland.de — a free learning hub

A small, fast, **trilingual** learning hub. It turns the best free courses on the
internet into **four focused paths** — and lets anyone follow them step by step,
in **English, German, or Danish**.

> Curated paths to learn software · Kuratierte Lernwege, um Software zu bauen · Kuraterede forløb til at bygge software

🔗 **Live:** https://majland.de

## The four paths

In suggested order — but start anywhere:

| Path                 | Covers                    | Core resources             |
| -------------------- | ------------------------- | -------------------------- |
| **Tools & Workflow** | Terminal, Git, workflow   | Missing Semester · Pro Git |
| **Foundations**      | How computers & code work | CS50x                      |
| **The Web**          | HTML, CSS, JavaScript     | web.dev · javascript.info  |
| **Full-Stack**       | Build & ship real apps    | Full Stack Open            |

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
  og-images.mjs  Generates all brand rasters — app icons, per-page OG cards + fallback (satori → resvg)
  check-i18n.mjs Fails the build if any string is missing en/de/da
  check-links.mjs Pings every course/reference URL; flags dead links
  fonts/         Inter (latin subset, OFL) — bundled so OG text renders in CI
public/        Copied as-is: favicon (theme-aware SVG), robots.txt, manifest
```

### URLs

English lives at the root; German and Danish are prefixed:

```
/                 /de/                 /da/                 ← home
/path/web/        /de/path/web/        /da/path/web/        ← a path
```

Each page is real static HTML with its own `<title>`, description, `canonical`,
**hreflang** alternates (incl. `x-default` → English), per-language Open Graph
(incl. a **generated, per-path social image**), and **JSON-LD** structured data
(`WebSite` / `ItemList` + `BreadcrumbList`). A full `sitemap.xml` (with `lastmod`)
is generated too.

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
npm install        # once
npm run dev        # dev server (http://localhost:5173) with history routing
npm run build      # check:i18n + vite build + pre-render → dist/ (15 pages + sitemap + 404)
npm run preview    # serve the built dist/ locally
npm run check:i18n # fail if any string is missing en/de/da (also runs in build + CI)
npm run check:links # ping every course/reference URL; flags dead links
npm run format     # Prettier
```

`check:i18n` guards the trilingual promise (it gates the build, so a missing
translation can never ship). `check:links` is offline-tolerant — it fails only on
clearly-dead links (404/410/5xx) and merely warns on bot-blocks/rate-limits.

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
