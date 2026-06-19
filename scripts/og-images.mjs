/* ============================================================
   majland.de — Open Graph image generator (build-time SSG)
   Renders one branded 1200×630 PNG per page × language into
   dist/og/, so a shared link to (say) the German Full-Stack path
   previews as its own card — accent colour, icon, localized title.

   Pipeline: satori (HTML/CSS → SVG) → resvg (SVG → PNG). Fonts are
   bundled (Inter, latin subset) so text renders identically in CI.
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

/* ---------- palette (matches the dark theme in styles.css) ---------- */
const BG = '#0c0e14';
const TEXT = '#e8ebf3';
const MUTED = '#9aa3b5';
const ACCENTS = {
  indigo: '#8b93ff',
  cyan: '#56d2e6',
  emerald: '#54d699',
  amber: '#ecae5a',
  pink: '#f08fc4',
};
const DEFAULT_ACCENT = '#8b93ff';

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/* ---------- fonts ---------- */
const font = (f) => readFileSync(join(__dirname, 'fonts', f));
const FONTS = [
  { name: 'Inter', data: font('Inter-Regular.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('Inter-Bold.woff'), weight: 700, style: 'normal' },
  { name: 'Inter', data: font('Inter-ExtraBold.woff'), weight: 800, style: 'normal' },
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

/* ---------- one card ---------- */
function card({ accent, iconName, eyebrow, title, sub }) {
  const chip = h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 116,
      height: 116,
      borderRadius: 28,
      background: hexToRgba(accent, 0.15),
      border: `2px solid ${hexToRgba(accent, 0.4)}`,
      marginBottom: 40,
    },
    iconName
      ? [img(iconDataUri(iconName, accent), 64)]
      : [h('div', { display: 'flex', fontSize: 56, fontWeight: 800, color: accent }, '{ }')]
  );

  return h(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: 90,
      background: BG,
      backgroundImage: `radial-gradient(900px 460px at 88% -12%, ${hexToRgba(accent, 0.22)}, transparent)`,
      color: TEXT,
      fontFamily: 'Inter',
    },
    [
      // top accent rule
      h(
        'div',
        {
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 12,
          background: accent,
        },
        []
      ),
      // brand
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 30,
          fontWeight: 700,
          color: TEXT,
        },
        [
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
              fontWeight: 800,
              color: accent,
              background: hexToRgba(accent, 0.14),
              border: `1px solid ${hexToRgba(accent, 0.3)}`,
            },
            '{ }'
          ),
          h('div', { display: 'flex' }, 'majland.de'),
        ]
      ),
      // middle block
      h('div', { display: 'flex', flexDirection: 'column' }, [
        chip,
        h(
          'div',
          {
            display: 'flex',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 18,
          },
          eyebrow
        ),
        h(
          'div',
          {
            display: 'flex',
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 940,
          },
          title
        ),
        h(
          'div',
          { display: 'flex', fontSize: 34, color: MUTED, marginTop: 20, maxWidth: 940 },
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
          fontSize: 26,
          color: MUTED,
        },
        [
          h('div', { display: 'flex', gap: 12, color: TEXT, fontWeight: 700 }, 'EN · DE · DA'),
          h('div', { display: 'flex' }, 'free · curated · open'),
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
  const HOME_EYEBROW = {
    en: 'Free learning hub',
    de: 'Kostenloser Lern-Hub',
    da: 'Gratis læringshub',
  };
  return {
    accent: DEFAULT_ACCENT,
    iconName: null,
    eyebrow: HOME_EYEBROW[lang] || HOME_EYEBROW.en,
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
    count++;
  }
}
console.log(`✓ generated ${count} Open Graph images → dist/og/`);
