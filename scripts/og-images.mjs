/* ============================================================
   majland.de — brand image generator (build-time SSG)
   Renders one branded 1200×630 Open Graph PNG per page × language
   into dist/og/, so a shared link to (say) the German Full-Stack
   path previews as its own card — accent colour, icon, localized
   title. Also emits the site-wide OG fallback (dist/og-image.png)
   and the PWA app icons (dist/icon-192.png, dist/icon-512.png), all
   from one source so they can never drift out of sync.

   Pipeline: satori (HTML/CSS → SVG) → resvg (SVG → PNG). Fonts are
   bundled (Inter body + Fraunces display, latin subset) so text renders
   identically in CI.
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../src/content.js';
import { ICONS } from '../src/icons.js';
import { tr, LANGS, allRoutes } from '../src/render.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const OG_DIR = join(DIST, 'og');
const U = SITE.UI;

/* ---------- palette (matches the dark "field notebook" theme in styles.css) ---------- */
const BG = '#181a1e';
const TEXT = '#ece8dd';
const MUTED = '#908b7e';
const BRAND = '#5cb6c2'; // slate-teal — the one neutral brand signal
const ACCENTS = {
  indigo: '#8f97f2',
  cyan: '#5fc9dc',
  emerald: '#5fce96',
  amber: '#e3a95a',
};
// Home has no path, so its blaze == the brand signal (mirrors `--pa: var(--accent)`).
const DEFAULT_ACCENT = BRAND;

/* App-icon mark: a full-bleed dark tile + the slate-teal braces, with no border
   or rounding so it sits cleanly inside any maskable shape. (public/favicon.svg
   is the theme-aware SVG version of the same mark, for the browser tab.) */
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${BG}"/>
  <g fill="none" stroke="${BRAND}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26 16c-6 0-7 4-7 8s0 7-5 8c5 1 5 4 5 8s1 8 7 8"/>
    <path d="M38 16c6 0 7 4 7 8s0 7 5 8c-5 1-5 4-5 8s-1 8-7 8"/>
  </g>
</svg>`;

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* ---------- fonts ---------- */
const font = (f) => readFileSync(join(__dirname, 'fonts', f));
const FONTS = [
  { name: 'Inter', data: font('Inter-Regular.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('Inter-Bold.woff'), weight: 700, style: 'normal' },
  // Fraunces (display serif) — the site's headline voice, static SemiBold for satori.
  { name: 'Fraunces', data: font('Fraunces-SemiBold.ttf'), weight: 600, style: 'normal' },
];

/* ---------- tiny hyperscript for satori's VDOM ---------- */
function h(type, style, children) {
  return { type, props: { style, children } };
}
// <img> needs src/width/height as element props (not style).
function img(src, size) {
  return { type: 'img', props: { src, width: size, height: size, style: { display: 'flex' } } };
}

/* An inline icon SVG, recoloured to the accent and sized, as a data URI. */
function iconDataUri(name, color) {
  let svg = ICONS[name] || '';
  svg = svg
    .replace(/currentColor/g, color)
    .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" ');
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

/* ---------- one card ----------
   Mirrors the site: warm-charcoal ground, a left "blaze" edge in the path
   colour (like .pcard's border-left and the trail line), a Fraunces title,
   and colour used only as wayfinding. No gradient wash. */
function card({ accent, iconName, eyebrow, title, sub }) {
  const chip = h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 112,
      height: 112,
      borderRadius: 26,
      background: hexToRgba(accent, 0.14),
      border: `1px solid ${hexToRgba(accent, 0.32)}`,
      marginBottom: 40,
    },
    iconName
      ? [img(iconDataUri(iconName, accent), 60)]
      : [h('div', { display: 'flex', fontSize: 54, fontWeight: 700, color: accent }, '{ }')]
  );

  return h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '84px 90px',
      background: BG,
      color: TEXT,
      fontFamily: 'Inter',
    },
    [
      // left blaze edge — the trail colour, exactly where the path lives
      h(
        'div',
        {
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 12,
          height: 630,
          background: accent,
        },
        []
      ),
      // brand
      h('div', { display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }, [
        h(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 46,
            height: 46,
            borderRadius: 12,
            fontSize: 26,
            fontWeight: 700,
            color: BRAND,
            background: hexToRgba(BRAND, 0.14),
            border: `1px solid ${hexToRgba(BRAND, 0.32)}`,
          },
          '{ }'
        ),
        h(
          'div',
          { display: 'flex', fontFamily: 'Fraunces', fontWeight: 600, color: TEXT },
          'majland.de'
        ),
      ]),
      // middle block
      h('div', { display: 'flex', flexDirection: 'column' }, [
        chip,
        h(
          'div',
          {
            display: 'flex',
            fontSize: 23,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 20,
          },
          eyebrow
        ),
        h(
          'div',
          {
            display: 'flex',
            fontFamily: 'Fraunces',
            fontSize: 78,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: TEXT,
            maxWidth: 980,
          },
          title
        ),
        h(
          'div',
          { display: 'flex', fontSize: 33, color: MUTED, marginTop: 22, maxWidth: 900 },
          sub
        ),
      ]),
      // footer
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 25,
          color: MUTED,
        },
        [
          h('div', { display: 'flex', gap: 12, color: TEXT, fontWeight: 700 }, 'EN · DE · DA'),
          h(
            'div',
            { display: 'flex', color: BRAND, fontWeight: 700, letterSpacing: 1 },
            'free · curated · open'
          ),
        ]
      ),
    ]
  );
}

/* ---------- model for a route ---------- */
function model(route, lang) {
  if (route.type === 'path') {
    const p = SITE.PATHS.find((x) => x.id === route.id);
    return {
      accent: ACCENTS[p.accent] || DEFAULT_ACCENT,
      iconName: p.icon,
      eyebrow: tr(U.path_word, lang),
      title: tr(p.title, lang),
      sub: tr(p.tagline, lang),
    };
  }
  return {
    accent: DEFAULT_ACCENT,
    iconName: null,
    eyebrow: tr(U.og_home_eyebrow, lang),
    title: tr(U.hero_title, lang),
    sub: tr(U.tagline, lang),
  };
}

/* ---------- render all ---------- */
mkdirSync(OG_DIR, { recursive: true });
let count = 0;
for (const route of allRoutes()) {
  const slug = route.type === 'path' ? route.id : 'home';
  for (const lang of LANGS) {
    const svg = await satori(card(model(route, lang)), { width: 1200, height: 630, fonts: FONTS });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    writeFileSync(join(OG_DIR, `${slug}-${lang}.png`), png);
    // The English home card doubles as the site-wide fallback (index.html default).
    if (slug === 'home' && lang === 'en') writeFileSync(join(DIST, 'og-image.png'), png);
    count++;
  }
}

/* ---------- app icons (same mark, rasterized straight from SVG) ---------- */
for (const size of [192, 512]) {
  const icon = new Resvg(ICON_SVG, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(join(DIST, `icon-${size}.png`), icon);
}

console.log(`✓ generated ${count} OG images + fallback + 2 app icons → dist/`);
