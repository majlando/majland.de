/* ============================================================
   majland.de — pure rendering & routing helpers
   No DOM, no browser globals — safe to run in Node at build
   time (pre-rendering) AND in the browser (client navigation).
   ============================================================ */
import { SITE } from './content.js';
import { ICONS as I } from './icons.js';

var U = SITE.UI;
export var LANGS = ['en', 'de', 'da'];
export var LOCALE = { en: 'en_US', de: 'de_DE', da: 'da_DK' };

/* ---------- i18n + escaping ---------- */
export function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
export function tr(o, lang) {
  return (o && (o[lang] || o.en)) || '';
}

/* ---------- URLs (real paths; English at the root) ---------- */
export function pfx(lang) {
  return lang === 'en' ? '' : lang + '/';
}
export function homeURL(base, lang) {
  return base + pfx(lang);
}
export function pathURL(base, lang, id) {
  return base + pfx(lang) + 'path/' + id + '/';
}
export function pathById(id) {
  for (var i = 0; i < SITE.PATHS.length; i++) if (SITE.PATHS[i].id === id) return SITE.PATHS[i];
  return null;
}

/* Parse a pathname (which still includes the deploy base) → route. */
export function parseRoute(pathname, base) {
  var p = pathname || '/';
  if (base && p.indexOf(base) === 0) p = p.slice(base.length);
  p = p.replace(/^\/+/, '').replace(/\/+$/, '');
  var parts = p ? p.split('/') : [];
  var lang = 'en';
  if (parts[0] === 'de' || parts[0] === 'da') lang = parts.shift();
  if (parts[0] === 'path' && parts[1]) return { type: 'path', id: parts[1], lang: lang };
  return { type: 'home', lang: lang };
}
export function routeURL(base, route, lang) {
  return route.type === 'path' ? pathURL(base, lang, route.id) : homeURL(base, lang);
}

/* Paths in recommended order: start at the head of the `next` chain
   (the path no other path points to) and follow it. The home trail and
   its numbering reflect this real, suggested route. */
export function orderedPaths() {
  var byId = {},
    isTarget = {};
  SITE.PATHS.forEach(function (p) {
    byId[p.id] = p;
    if (p.next) isTarget[p.next] = true;
  });
  var head = null;
  SITE.PATHS.forEach(function (p) {
    if (!head && !isTarget[p.id]) head = p;
  });
  var out = [],
    seen = {},
    cur = head || SITE.PATHS[0];
  while (cur && !seen[cur.id]) {
    out.push(cur);
    seen[cur.id] = true;
    cur = cur.next ? byId[cur.next] : null;
  }
  SITE.PATHS.forEach(function (p) {
    if (!seen[p.id]) out.push(p);
  });
  return out;
}

/* The full list of routes we render (home + each path). */
export function allRoutes() {
  var routes = [{ type: 'home' }];
  SITE.PATHS.forEach(function (p) {
    routes.push({ type: 'path', id: p.id });
  });
  return routes;
}

export function countDone(p, progress) {
  var n = 0;
  for (var i = 0; i < p.steps.length; i++) if (progress && progress.has(p.id + ':' + i)) n++;
  return n;
}

/* ---------- render: home ---------- */
export function renderHome(ctx) {
  var lang = ctx.lang,
    base = ctx.base,
    progress = ctx.progress;

  var cards = orderedPaths()
    .map(function (p, i) {
      var done = countDone(p, progress),
        total = p.steps.length,
        pct = Math.round((done / total) * 100);
      return (
        '<li class="stop" data-accent="' +
        p.accent +
        '"><span class="stop__marker" aria-hidden="true">' +
        (i + 1) +
        '</span>' +
        '<a class="pcard" href="' +
        pathURL(base, lang, p.id) +
        '">' +
        '<span class="pcard__icon">' +
        I[p.icon] +
        '</span>' +
        '<h3 class="pcard__title">' +
        esc(tr(p.title, lang)) +
        '</h3>' +
        '<p class="pcard__tag">' +
        esc(tr(p.tagline, lang)) +
        '</p>' +
        '<div class="pcard__meta"><span class="lvl">' +
        esc(tr(p.level, lang)) +
        '</span><span>' +
        total +
        ' ' +
        esc(tr(total === 1 ? U.resource_word : U.resources_word, lang)) +
        '</span></div>' +
        '<div class="pcard__bar"><span style="width:' +
        pct +
        '%"></span></div>' +
        '<div class="pcard__foot"><span class="pcard__count">' +
        done +
        '/' +
        total +
        ' ' +
        esc(tr(U.done_count, lang)) +
        '</span>' +
        '<span class="pcard__go">' +
        esc(tr(U.view_path, lang)) +
        I.arrow +
        '</span></div>' +
        '</a></li>'
      );
    })
    .join('');

  var refs = SITE.REFERENCES.map(function (r) {
    return (
      '<a class="ref" href="' +
      esc(r.url) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<strong>' +
      esc(r.name) +
      I.ext +
      '</strong><span>' +
      esc(tr(r.d, lang)) +
      '</span><span class="ref__host">' +
      esc(r.host) +
      '</span></a>'
    );
  }).join('');

  var tips = SITE.TIPS.map(function (t) {
    return '<li><strong>' + esc(tr(t.t, lang)) + '</strong>' + esc(tr(t.d, lang)) + '</li>';
  }).join('');

  return (
    '<section class="hero"><div class="hero__glow" aria-hidden="true"></div><div class="wrap hero__inner">' +
    '<p class="eyebrow">' +
    esc(tr(U.hero_eyebrow, lang)) +
    '</p><h1>' +
    esc(tr(U.hero_title, lang)) +
    '</h1><p class="hero__lead">' +
    esc(tr(U.hero_lead, lang)) +
    '</p><div class="hero__actions"><a class="btn btn--primary" href="#choose">' +
    esc(tr(U.hero_cta, lang)) +
    I.arrow +
    '</a></div></div></section>' +
    '<section id="choose" class="section"><div class="wrap">' +
    '<header class="section__head"><h2>' +
    esc(tr(U.choose_title, lang)) +
    '</h2><p class="lead">' +
    esc(tr(U.choose_lead, lang)) +
    '</p></header>' +
    '<div class="newhere">' +
    I.compass +
    '<p><strong>' +
    esc(tr(U.new_here, lang)) +
    '</strong> ' +
    esc(tr(U.new_here_text, lang)) +
    '</p></div><ol class="trail">' +
    cards +
    '</ol></div></section>' +
    '<section id="reference" class="section section--alt"><div class="wrap">' +
    '<header class="section__head"><p class="eyebrow">' +
    esc(tr(U.nav_reference, lang)) +
    '</p><h2>' +
    esc(tr(U.reference_title, lang)) +
    '</h2><p class="lead">' +
    esc(tr(U.reference_lead, lang)) +
    '</p></header><div class="refs">' +
    refs +
    '</div></div></section>' +
    '<section id="method" class="section"><div class="wrap">' +
    '<header class="section__head"><p class="eyebrow">' +
    esc(tr(U.nav_method, lang)) +
    '</p><h2>' +
    esc(tr(U.method_title, lang)) +
    '</h2><p class="lead">' +
    esc(tr(U.method_lead, lang)) +
    '</p></header><ul class="tips">' +
    tips +
    '</ul></div></section>'
  );
}

/* ---------- render: a single path ---------- */
export function renderPath(ctx, id) {
  var lang = ctx.lang,
    base = ctx.base,
    progress = ctx.progress;
  var p = pathById(id);
  if (!p) return renderHome(ctx);
  var done = countDone(p, progress),
    total = p.steps.length,
    pct = Math.round((done / total) * 100);

  var steps = p.steps
    .map(function (s, i) {
      var sid = p.id + ':' + i,
        isDone = progress && progress.has(sid);
      var tagText = s.type === 'reference' ? 'REF' : esc(tr(U.step_word, lang)) + ' ' + (i + 1);
      return (
        '<li class="step' +
        (isDone ? ' done' : '') +
        '"><span class="step__badge">' +
        (i + 1) +
        '<span class="chk">' +
        I.check +
        '</span></span><div class="step__card">' +
        '<div class="step__top"><span class="tag tag--' +
        s.type +
        '">' +
        tagText +
        '</span><span class="step__provider">' +
        esc(s.provider) +
        '</span></div>' +
        '<p class="step__name"><a href="' +
        esc(s.url) +
        '" target="_blank" rel="noopener noreferrer">' +
        esc(s.name) +
        I.ext +
        '</a></p><p class="step__blurb">' +
        esc(tr(s.blurb, lang)) +
        '</p>' +
        '<label class="mark"><input type="checkbox" data-step="' +
        sid +
        '"' +
        (isDone ? ' checked' : '') +
        ' /> <span>' +
        esc(tr(U.mark_done, lang)) +
        '</span></label></div></li>'
      );
    })
    .join('');

  var next = p.next ? pathById(p.next) : null;
  var nextHtml = next
    ? '<a class="nextup" href="' +
      pathURL(base, lang, next.id) +
      '"><span><span class="nextup__l">' +
      esc(tr(U.next_up, lang)) +
      '</span><span class="nextup__t">' +
      esc(tr(next.title, lang)) +
      '</span></span><span class="nextup__arrow">' +
      I.arrow +
      '</span></a>'
    : '';

  return (
    '<div class="pathview" data-accent="' +
    p.accent +
    '"><div class="wrap wrap--narrow">' +
    '<a class="backlink" href="' +
    homeURL(base, lang) +
    '">' +
    I.arrowL +
    esc(tr(U.back_to_paths, lang)) +
    '</a>' +
    '<div class="phead"><span class="phead__icon">' +
    I[p.icon] +
    '</span><div><p class="phead__eyebrow">' +
    esc(tr(U.path_word, lang)) +
    '</p><h1>' +
    esc(tr(p.title, lang)) +
    '</h1><p class="phead__tag">' +
    esc(tr(p.tagline, lang)) +
    '</p></div></div>' +
    '<div class="pmeta"><span><b>' +
    esc(tr(U.level_label, lang)) +
    ':</b> ' +
    esc(tr(p.level, lang)) +
    '</span><span><b>' +
    esc(tr(U.who_for, lang)) +
    ':</b> ' +
    esc(tr(p.who, lang)) +
    '</span></div>' +
    '<p class="pintro">' +
    esc(tr(p.intro, lang)) +
    '</p>' +
    '<div class="pprogress"><div class="pprogress__bar"><span style="width:' +
    pct +
    '%"></span></div><span class="pprogress__txt"><b>' +
    done +
    '</b>/' +
    total +
    ' ' +
    esc(tr(U.done_count, lang)) +
    '</span>' +
    '<button type="button" class="pprogress__reset" data-reset hidden>' +
    esc(tr(U.reset_progress, lang)) +
    '</button></div>' +
    '<h2 class="psteps-title">' +
    esc(tr(U.in_this_path, lang)) +
    '</h2><ol class="steps">' +
    steps +
    '</ol>' +
    '<div class="outcome">' +
    I.check +
    '<p><b>' +
    esc(tr(U.outcome_label, lang)) +
    ':</b> ' +
    esc(tr(p.outcome, lang)) +
    '</p></div>' +
    nextHtml +
    '</div></div>'
  );
}

export function renderApp(ctx, route) {
  return route.type === 'path' && pathById(route.id) ? renderPath(ctx, route.id) : renderHome(ctx);
}

/* ---------- per-page metadata (titles, descriptions) ---------- */
export function pageTitle(route, lang) {
  if (route.type === 'path') {
    var p = pathById(route.id);
    if (p) return tr(p.title, lang) + ' · majland.de';
  }
  return 'majland.de — ' + tr(U.hero_title, lang);
}
export function pageDescription(route, lang) {
  if (route.type === 'path') {
    var p = pathById(route.id);
    if (p) return tr(p.tagline, lang) + ' ' + tr(p.intro, lang);
  }
  return tr(U.hero_lead, lang);
}
