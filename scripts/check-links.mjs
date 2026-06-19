/* ============================================================
   majland.de — outbound link checker
   Fetches every course / reference URL and reports its status.
   The whole site's value is sending people to the best *working*
   free courses, so dead links are the worst kind of bug.

   Exit codes:
     0  all good (or only "verify manually" warnings)
     1  at least one clearly-dead link (404 / 410 / 5xx)

   Soft cases (403 / 429 / timeout / network) are reported but do
   NOT fail — many course hosts block bots or rate-limit, which is
   not the same as the link being broken. Re-check those by hand.
   ============================================================ */
import { SITE } from '../src/content.js';

const urls = new Set();
for (const r of SITE.REFERENCES) urls.add(r.url);
for (const p of SITE.PATHS) for (const s of p.steps) urls.add(s.url);

const UA = 'Mozilla/5.0 (compatible; majland-link-check/1.0; +https://majland.de)';
const TIMEOUT = 15000;

async function check(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
    });
    return { url, status: res.status, ok: res.ok };
  } catch (e) {
    return { url, status: 0, ok: false, err: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = (await Promise.all([...urls].map(check))).sort((a, b) =>
  a.url.localeCompare(b.url)
);

const dead = [];
const warn = [];
for (const r of results) {
  if (r.ok) {
    console.log(`  ${String(r.status).padEnd(3)}  ${r.url}`);
    continue;
  }
  const code = r.status;
  if (code === 404 || code === 410 || code >= 500) {
    dead.push(r);
    console.log(`  ${String(code || 'ERR').padEnd(3)}  ${r.url}  ← DEAD`);
  } else {
    warn.push(r);
    console.log(
      `  ${String(code || 'ERR').padEnd(3)}  ${r.url}  (${r.err || 'blocked / rate-limited'}) ← verify by hand`
    );
  }
}

console.log(
  `\nChecked ${results.length} links · ${dead.length} dead · ${warn.length} to verify by hand`
);
if (dead.length) process.exit(1);
