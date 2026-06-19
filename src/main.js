/* ============================================================
   majland.de — Learning hub (client)
   Enhances the pre-rendered static pages: history routing,
   instant navigation, local progress, theme, language.
   Bundled with Vite. Pure rendering lives in render.js.
   ============================================================ */
import './styles.css';
import { SITE } from './content.js';
import { renderApp, parseRoute, routeURL, homeURL, pathById, pageTitle } from './render.js';

(function () {
  'use strict';

  var BASE = import.meta.env.BASE_URL || '/';
  var app = document.getElementById('app');
  var lang = document.documentElement.dataset.lang || 'en';
  var currentRoute = parseRoute(location.pathname, BASE);

  /* ---------- storage ---------- */
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
  function doneFor(p) {
    var n = 0;
    for (var i = 0; i < p.steps.length; i++) if (progress.has(p.id + ':' + i)) n++;
    return n;
  }

  function ctx() {
    return { base: BASE, lang: lang, progress: progress };
  }

  /* ---------- header links + i18n ---------- */
  function navHref(nav, l) {
    return nav === 'home' ? homeURL(BASE, l) : homeURL(BASE, l) + '#' + nav;
  }
  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (SITE.UI[k]) el.textContent = SITE.UI[k][lang] || SITE.UI[k].en;
    });
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.setAttribute('href', navHref(a.getAttribute('data-nav'), lang));
    });
    document.querySelectorAll('[data-langlink]').forEach(function (a) {
      var l = a.getAttribute('data-langlink');
      a.setAttribute('href', routeURL(BASE, currentRoute, l));
      if (l === lang) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    document.title = pageTitle(currentRoute, lang);
  }

  /* ---------- render the current route ---------- */
  function syncReset() {
    if (currentRoute.type !== 'path') return;
    var p = pathById(currentRoute.id);
    var btn = app.querySelector('[data-reset]');
    if (p && btn) btn.hidden = doneFor(p) === 0;
  }
  function render() {
    app.innerHTML = '<div class="view">' + renderApp(ctx(), currentRoute) + '</div>';
    applyStatic();
    syncReset();
  }

  /* ---------- navigation ---------- */
  function scrollToHash(hash) {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    var el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
  }

  function go(url, push) {
    var u = new URL(url, location.origin);
    var route = parseRoute(u.pathname, BASE);
    var sameView =
      route.type === currentRoute.type &&
      route.id === currentRoute.id &&
      route.lang === currentRoute.lang;

    if (push) history.pushState({}, '', u.pathname + u.hash);
    if (!sameView) {
      currentRoute = route;
      lang = route.lang;
      render();
    }
    if (u.hash) scrollToHash(u.hash);
    else if (!sameView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      app.focus({ preventScroll: true });
    }
  }

  /* Intercept internal link clicks for instant navigation. */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
    if (/^([a-z]+:)?\/\//i.test(href) || href.indexOf('mailto:') === 0) return; // external
    if (href.charAt(0) === '#') {
      e.preventDefault();
      scrollToHash(href);
      return;
    }
    // internal route
    var langlink = a.getAttribute('data-langlink');
    if (langlink) {
      lang = langlink;
      write('mjl-lang', lang);
    }
    e.preventDefault();
    go(href, true);
  });

  window.addEventListener('popstate', function () {
    go(location.pathname + location.hash, false);
  });

  /* ---------- progress (event delegation) ---------- */
  app.addEventListener('change', function (e) {
    var cb = e.target;
    if (!cb || cb.getAttribute('data-step') == null) return;
    if (cb.checked) progress.add(cb.getAttribute('data-step'));
    else progress.delete(cb.getAttribute('data-step'));
    saveProgress();
    var li = cb.closest('.step');
    if (li) li.classList.toggle('done', cb.checked);
    if (currentRoute.type === 'path') {
      var p = pathById(currentRoute.id);
      if (p) {
        var done = doneFor(p),
          pct = Math.round((done / p.steps.length) * 100);
        var bar = app.querySelector('.pprogress__bar span');
        if (bar) bar.style.width = pct + '%';
        var txt = app.querySelector('.pprogress__txt b');
        if (txt) txt.textContent = done;
      }
    }
    syncReset();
  });

  /* ---------- reset progress for the current path ---------- */
  app.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-reset]');
    if (!btn || currentRoute.type !== 'path') return;
    var p = pathById(currentRoute.id);
    if (!p) return;
    var msg = SITE.UI.reset_confirm[lang] || SITE.UI.reset_confirm.en;
    if (!window.confirm(msg)) return;
    for (var i = 0; i < p.steps.length; i++) progress.delete(p.id + ':' + i);
    saveProgress();
    render();
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

  /* ---------- boot ----------
     The page is already pre-rendered for this route; re-render so
     the visitor's saved progress is reflected, then enhance with
     instant client-side navigation. */
  render();
})();
