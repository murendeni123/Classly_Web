/* Postbuild: harden the Content-Security-Policy for the static export.
 *
 * Next.js App Router emits a handful of inline <script> tags (RSC hydration
 * data). A strict `script-src 'self'` would block them, and we deliberately
 * avoid `'unsafe-inline'`. Instead we hash every distinct inline script across
 * the exported HTML and inject those `'sha256-...'` sources into the CSP in
 * vercel.json — the file Vercel applies at the edge.
 *
 * Run automatically via `npm run build` (postbuild). After a content change you
 * MUST rebuild and commit vercel.json so the hashes stay in sync. If they drift,
 * the browser will block the inline scripts and the site will fail to hydrate.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = 'out';
const VERCEL_JSON = 'vercel.json';

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (full.endsWith('.html')) files.push(full);
  }
  return files;
}

function inlineScripts(html) {
  const out = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    // Skip JSON/data blocks that browsers do not execute and do not hash.
    const tag = m[0].slice(0, m[0].indexOf('>'));
    if (/type=("|')(application\/json|application\/ld\+json)\1/.test(tag)) continue;
    if (m[1].length > 0) out.push(m[1]);
  }
  return out;
}

const htmlFiles = walk(OUT_DIR);
const hashes = new Set();
for (const file of htmlFiles) {
  for (const script of inlineScripts(readFileSync(file, 'utf8'))) {
    const digest = createHash('sha256').update(script, 'utf8').digest('base64');
    hashes.add(`'sha256-${digest}'`);
  }
}

// External script hosts that must always be allowed (hCaptcha widget, when
// NEXT_PUBLIC_HCAPTCHA_SITEKEY is set). Harmless when the captcha is disabled.
const EXTERNAL_SCRIPT_HOSTS = ['https://js.hcaptcha.com', 'https://*.hcaptcha.com'];

const sorted = [...hashes].sort();
const scriptSrc = ["'self'", ...EXTERNAL_SCRIPT_HOSTS, ...sorted].join(' ');

const config = JSON.parse(readFileSync(VERCEL_JSON, 'utf8'));
const headerBlock = config.headers.find((h) => h.source === '/(.*)');
const cspHeader = headerBlock.headers.find((h) => h.key === 'Content-Security-Policy');

cspHeader.value = cspHeader.value.replace(
  /script-src [^;]*;/,
  `script-src ${scriptSrc};`,
);

writeFileSync(VERCEL_JSON, JSON.stringify(config, null, 2) + '\n');
console.log(`CSP updated: ${sorted.length} inline-script hash(es) across ${htmlFiles.length} HTML files.`);
console.log('Remember to commit vercel.json so the deployed CSP matches this build.');
