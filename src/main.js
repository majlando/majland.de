/* ============================================================
   majland.de — Learning hub
   Vanilla SPA. Renders SITE (content.js) in the active
   language; hash routing; local progress + theme.
   Bundled with Vite — no framework, just modules.
   ============================================================ */
import './styles.css';
import { SITE } from './content.js';
import { ICONS } from './icons.js';

(function () {
  'use strict';

  var U = SITE.UI;
  var app = document.getElementById('app');
  var lang = document.documentElement.dataset.lang || 'en';
  var langBtns = Array.prototype.slice.call(document.querySelectorAll('#langSwitch button'));
  var rendered = { view: null, lang: null };

  /* ---------- storage helpers ---------- */
  function read(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function write(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }
  function reduce() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- i18n + escaping ---------- */
  function tr(o) {
    return (o && (o[lang] || o.en)) || '';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- progress ---------- */
  var progress = (function () {
    try {
      return new Set(JSON.parse(read('mjl-progress') || '[]'));
    } catch (e) {
      return new Set();
    }
  })();
  function saveProgress() {
    write('mjl-progress', JSON.stringify(Array.from(progress)));
  }
  function countDone(p) {
    var n = 0;
    for (var i = 0; i < p.steps.length; i++) if (progress.has(p.id + ':' + i)) n++;
    return n;
  }
  function pathById(id) {
    for (var i = 0; i < SITE.PATHS.length; i++) if (SITE.PATHS[i].id === id) return SITE.PATHS[i];
    return null;
  }

  /* ---------- icons ---------- */
  var I = ICONS;

  /* ---------- render: home ---------- */
  function renderHome() {
    var cards = SITE.PATHS.map(function (p) {
      var done = countDone(p),
        total = p.steps.length,
        pct = Math.round((done / total) * 100);
      return (
        '<a class="pcard" data-accent="' +
        p.accent +
        '" href="#/path/' +
        p.id +
        '">' +
        '<span class="pcard__icon">' +
        I[p.icon] +
        '</span>' +
        '<h3 class="pcard__title">' +
        esc(tr(p.title)) +
        '</h3>' +
        '<p class="pcard__tag">' +
        esc(tr(p.tagline)) +
        '</p>' +
        '<div class="pcard__meta"><span class="lvl">' +
        esc(tr(p.level)) +
        '</span><span>' +
        total +
        ' ' +
        esc(tr(U.resources_word)) +
        '</span></div>' +
        '<div class="pcard__bar"><span style="width:' +
        pct +
        '%"></span></div>' +
        '<div class="pcard__foot"><span class="pcard__count">' +
        done +
        '/' +
        total +
        ' ' +
        esc(tr(U.done_count)) +
        '</span>' +
        '<span class="pcard__go">' +
        esc(tr(U.view_path)) +
        I.arrow +
        '</span></div>' +
        '</a>'
      );
    }).join('');

    var refs = SITE.REFERENCES.map(function (r) {
      return (
        '<a class="ref" href="' +
        esc(r.url) +
        '" target="_blank" rel="noopener noreferrer">' +
        '<strong>' +
        esc(r.name) +
        I.ext +
        '</strong>' +
        '<span>' +
        esc(tr(r.d)) +
        '</span>' +
        '<span class="ref__host">' +
        esc(r.host) +
        '</span></a>'
      );
    }).join('');

    var tips = SITE.TIPS.map(function (t) {
      return '<li><strong>' + esc(tr(t.t)) + '</strong>' + esc(tr(t.d)) + '</li>';
    }).join('');

    return (
      '' +
      '<section class="hero"><div class="hero__glow" aria-hidden="true"></div><div class="wrap hero__inner">' +
      '<p class="eyebrow">' +
      esc(tr(U.hero_eyebrow)) +
      '</p>' +
      '<h1>' +
      esc(tr(U.hero_title)) +
      '</h1>' +
      '<p class="hero__lead">' +
      esc(tr(U.hero_lead)) +
      '</p>' +
      '<div class="hero__actions"><a class="btn btn--primary" href="#choose">' +
      esc(tr(U.hero_cta)) +
      I.arrow +
      '</a></div>' +
      '</div></section>' +
      '<section id="choose" class="section"><div class="wrap">' +
      '<header class="section__head"><h2>' +
      esc(tr(U.choose_title)) +
      '</h2><p class="lead">' +
      esc(tr(U.choose_lead)) +
      '</p></header>' +
      '<div class="newhere">' +
      I.compass +
      '<p><strong>' +
      esc(tr(U.new_here)) +
      '</strong> ' +
      esc(tr(U.new_here_text)) +
      '</p></div>' +
      '<div class="paths-grid">' +
      cards +
      '</div>' +
      '</div></section>' +
      '<section id="reference" class="section section--alt"><div class="wrap">' +
      '<header class="section__head"><p class="eyebrow">' +
      esc(tr(U.nav_reference)) +
      '</p><h2>' +
      esc(tr(U.reference_title)) +
      '</h2><p class="lead">' +
      esc(tr(U.reference_lead)) +
      '</p></header>' +
      '<div class="refs">' +
      refs +
      '</div>' +
      '</div></section>' +
      '<section id="method" class="section"><div class="wrap">' +
      '<header class="section__head"><p class="eyebrow">' +
      esc(tr(U.nav_method)) +
      '</p><h2>' +
      esc(tr(U.method_title)) +
      '</h2><p class="lead">' +
      esc(tr(U.method_lead)) +
      '</p></header>' +
      '<ul class="tips">' +
      tips +
      '</ul>' +
      '</div></section>'
    );
  }

  /* ---------- render: a single path ---------- */
  function renderPath(id) {
    var p = pathById(id);
    if (!p) return renderHome();
    var done = countDone(p),
      total = p.steps.length,
      pct = Math.round((done / total) * 100);

    var steps = p.steps
      .map(function (s, i) {
        var sid = p.id + ':' + i,
          isDone = progress.has(sid);
        var tagText = s.type === 'reference' ? 'REF' : esc(tr(U.step_word)) + ' ' + (i + 1);
        return (
          '<li class="step' +
          (isDone ? ' done' : '') +
          '">' +
          '<span class="step__badge">' +
          (i + 1) +
          '<span class="chk">' +
          I.check +
          '</span></span>' +
          '<div class="step__card">' +
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
          '</a></p>' +
          '<p class="step__blurb">' +
          esc(tr(s.blurb)) +
          '</p>' +
          '<label class="mark"><input type="checkbox" data-step="' +
          sid +
          '"' +
          (isDone ? ' checked' : '') +
          ' /> <span>' +
          esc(tr(U.mark_done)) +
          '</span></label>' +
          '</div></li>'
        );
      })
      .join('');

    var next = p.next ? pathById(p.next) : null;
    var nextHtml = next
      ? '<a class="nextup" href="#/path/' +
        next.id +
        '"><span><span class="nextup__l">' +
        esc(tr(U.next_up)) +
        '</span><span class="nextup__t">' +
        esc(tr(next.title)) +
        '</span></span><span class="nextup__arrow">' +
        I.arrow +
        '</span></a>'
      : '';

    return (
      '<div class="pathview" data-accent="' +
      p.accent +
      '"><div class="wrap wrap--narrow">' +
      '<a class="backlink" href="#/">' +
      I.arrowL +
      esc(tr(U.back_to_paths)) +
      '</a>' +
      '<div class="phead"><span class="phead__icon">' +
      I[p.icon] +
      '</span><div>' +
      '<p class="phead__eyebrow">' +
      esc(tr(U.path_word)) +
      '</p>' +
      '<h1>' +
      esc(tr(p.title)) +
      '</h1><p class="phead__tag">' +
      esc(tr(p.tagline)) +
      '</p></div></div>' +
      '<div class="pmeta"><span><b>' +
      esc(tr(U.level_label)) +
      ':</b> ' +
      esc(tr(p.level)) +
      '</span>' +
      '<span><b>' +
      esc(tr(U.who_for)) +
      ':</b> ' +
      esc(tr(p.who)) +
      '</span></div>' +
      '<p class="pintro">' +
      esc(tr(p.intro)) +
      '</p>' +
      '<div class="pprogress"><div class="pprogress__bar"><span style="width:' +
      pct +
      '%"></span></div>' +
      '<span class="pprogress__txt"><b>' +
      done +
      '</b>/' +
      total +
      ' ' +
      esc(tr(U.done_count)) +
      '</span></div>' +
      '<h2 class="psteps-title">' +
      esc(tr(U.in_this_path)) +
      '</h2>' +
      '<ol class="steps">' +
      steps +
      '</ol>' +
      '<div class="outcome">' +
      I.check +
      '<p><b>' +
      esc(tr(U.outcome_label)) +
      ':</b> ' +
      esc(tr(p.outcome)) +
      '</p></div>' +
      nextHtml +
      '</div></div>'
    );
  }

  /* ---------- static header/footer i18n ---------- */
  function applyStatic() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute('data-i18n');
      if (U[k]) nodes[i].textContent = tr(U[k]);
    }
    langBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    document.documentElement.lang = lang;
  }

  /* ---------- render dispatch ---------- */
  function renderView(view, html) {
    if (rendered.view === view && rendered.lang === lang) return false;
    app.innerHTML = '<div class="view">' + html + '</div>';
    rendered.view = view;
    rendered.lang = lang;
    return true;
  }

  function setTitle() {
    if (rendered.view && rendered.view.indexOf('path:') === 0) {
      var p = pathById(rendered.view.slice(5));
      document.title = (p ? tr(p.title) + ' · ' : '') + 'majland.de';
    } else {
      document.title = 'majland.de — ' + tr(U.hero_title);
    }
  }

  /* ---------- router ---------- */
  function route() {
    var h = location.hash || '';
    if (h.indexOf('#/path/') === 0) {
      var id = h.slice(7);
      var changed = renderView('path:' + id, renderPath(id));
      setTitle();
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (changed) app.focus({ preventScroll: true });
      return;
    }
    // home (and its in-page anchors)
    renderView('home', renderHome());
    setTitle();
    var frag = h.charAt(0) === '#' ? h.slice(1) : h;
    if (frag && frag.charAt(0) !== '/') {
      var el = document.getElementById(frag);
      if (el) {
        el.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ---------- live language switch (keeps view + scroll) ---------- */
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    write('mjl-lang', l);
    document.documentElement.dataset.lang = l;
    applyStatic();
    var y = window.scrollY;
    if (rendered.view && rendered.view.indexOf('path:') === 0) {
      app.innerHTML = '<div class="view">' + renderPath(rendered.view.slice(5)) + '</div>';
    } else {
      app.innerHTML = '<div class="view">' + renderHome() + '</div>';
    }
    rendered.lang = lang;
    setTitle();
    window.scrollTo(0, y);
  }

  /* ---------- progress interaction (event delegation) ---------- */
  app.addEventListener('change', function (e) {
    var cb = e.target;
    if (!cb || cb.getAttribute('data-step') == null) return;
    var id = cb.getAttribute('data-step');
    if (cb.checked) progress.add(id);
    else progress.delete(id);
    saveProgress();
    var li = cb.closest('.step');
    if (li) li.classList.toggle('done', cb.checked);
    if (rendered.view && rendered.view.indexOf('path:') === 0) {
      var p = pathById(rendered.view.slice(5));
      if (p) {
        var done = countDone(p),
          pct = Math.round((done / p.steps.length) * 100);
        var bar = app.querySelector('.pprogress__bar span');
        if (bar) bar.style.width = pct + '%';
        var txt = app.querySelector('.pprogress__txt b');
        if (txt) txt.textContent = done;
      }
    }
  });

  /* ---------- theme toggle ---------- */
  (function theme() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var root = document.documentElement;
    function sync() {
      var light = root.dataset.theme === 'light';
      btn.setAttribute('aria-pressed', String(light));
      btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    }
    sync();
    btn.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      write('mjl-theme', root.dataset.theme);
      sync();
    });
  })();

  /* ---------- language buttons ---------- */
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.dataset.lang);
    });
  });

  /* ---------- scroll progress + year ---------- */
  (function scrollBar() {
    var bar = document.getElementById('scrollBar');
    if (!bar) return;
    var ticking = false;
    function upd() {
      var d = document.documentElement;
      var s = d.scrollHeight - d.clientHeight;
      bar.style.width = (s > 0 ? (d.scrollTop / s) * 100 : 0) + '%';
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(upd);
          ticking = true;
        }
      },
      { passive: true }
    );
    upd();
  })();
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

  /* ---------- boot ---------- */
  applyStatic();
  route();
  window.addEventListener('hashchange', route);
})();
