/* ============================================================
   majland.de — translation parity guard
   Walks the whole content tree and fails if any translatable
   string is missing or empty in en / de / da. Runs offline, so
   it's safe to gate the build on it — the trilingual promise
   can never silently break as content grows.
   ============================================================ */
import { SITE } from '../src/content.js';
import { LANGS } from '../src/render.js';

const problems = [];

// A "translatable leaf" is any object that carries an `en` string —
// that's the shape of every { en, de, da } in content.js.
function isTranslatable(o) {
  return o && typeof o === 'object' && !Array.isArray(o) && typeof o.en === 'string';
}

function walk(node, path) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`));
    return;
  }
  if (node && typeof node === 'object') {
    if (isTranslatable(node)) {
      for (const l of LANGS) {
        if (typeof node[l] !== 'string' || node[l].trim() === '') {
          problems.push(`${path}: missing/empty "${l}"`);
        }
      }
      return;
    }
    for (const k of Object.keys(node)) walk(node[k], path ? `${path}.${k}` : k);
  }
}

walk(SITE, '');

if (problems.length) {
  console.error(`✗ i18n parity FAILED (${problems.length} issue(s)):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`✓ i18n parity OK — every string present in ${LANGS.join(' / ')}`);
