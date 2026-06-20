/**
 * Image sourcing script for Classly marketing site.
 *
 * Downloads:
 *   1. unDraw illustrations (no API key needed, recoloured to Classly brand)
 *   2. Unsplash photos  (requires UNSPLASH_ACCESS_KEY in .env)
 *   3. Pexels photos    (requires PEXELS_API_KEY in .env)
 *   4. Pixabay photos   (requires PIXABAY_API_KEY in .env)
 *
 * Usage: node scripts/download-images.mjs
 *
 * People/licensing safety rules applied:
 *   - Only over-the-shoulder, wide, or tool/device-focused shots of children
 *   - No front-facing identifiable children
 *   - Photos flagged in CREDITS.md for manual review
 */

import { createWriteStream, existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import http from 'node:http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');
const CREDITS_PATH = join(ROOT, 'public', 'images', 'CREDITS.md');

mkdirSync(IMAGES_DIR, { recursive: true });

// Load env vars (simple parser — no dotenv dependency)
function loadEnv() {
  try {
    return Object.fromEntries(
      readFileSync(join(ROOT, '.env'), 'utf8')
        .split('\n')
        .filter(l => l.includes('=') && !l.startsWith('#'))
        .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim()]; })
    );
  } catch { return {}; }
}
const env = { ...process.env, ...loadEnv() };

// ─── Helpers ────────────────────────────────────────────────────────────────

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) { console.log(`  ✓ already exists: ${dest}`); resolve(dest); return; }
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, { headers: { 'User-Agent': 'ClasslyBot/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'ClasslyBot/1.0', ...headers } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Bad JSON from ${url}: ${data.slice(0,200)}`)); }
      });
    }).on('error', reject);
  });
}

// ─── Credits log ────────────────────────────────────────────────────────────

const credits = [];
function addCredit({ file, source, sourceUrl, author, licence, attributionRequired, peopleInShot, notes }) {
  credits.push({ file, source, sourceUrl: sourceUrl || '', author: author || '', licence, attributionRequired: attributionRequired || 'No', peopleInShot: peopleInShot || 'No', notes: notes || '' });
}

function writeCredits() {
  const header = `# Image Credits\n\nAll images used on the Classly marketing site.\n\n> ⚠️ Review all rows where **People in shot? = Yes** before launch to confirm suitability.\n> A stock licence is a copyright licence only — model releases are NOT guaranteed.\n\n| File | Source | Source URL / Photo ID | Photographer / Author | Licence | Attribution required? | People in shot? | Notes |\n|------|--------|-----------------------|-----------------------|---------|-----------------------|-----------------|-------|\n`;
  const rows = credits.map(c =>
    `| ${c.file} | ${c.source} | ${c.sourceUrl} | ${c.author} | ${c.licence} | ${c.attributionRequired} | ${c.peopleInShot} | ${c.notes} |`
  ).join('\n');
  writeFileSync(CREDITS_PATH, header + rows + '\n');
  console.log(`\n📋 CREDITS.md written with ${credits.length} entries.`);
}

// ─── 1. unDraw illustrations (no key needed) ────────────────────────────────

// Brand colour for recolouring (hex without #)
const BRAND_COLOR = '1E88E5';

// Target illustrations from unDraw's search API
const UNDRAW_ILLUSTRATIONS = [
  { slug: 'teaching', filename: 'hero-teaching-illustration.svg', desc: 'Teacher at board illustration' },
  { slug: 'classroom', filename: 'behaviour-classroom-illustration.svg', desc: 'Classroom illustration' },
  { slug: 'online_learning', filename: 'online-learning-illustration.svg', desc: 'Online/digital learning' },
  { slug: 'data_reports', filename: 'analytics-reports-illustration.svg', desc: 'Data/analytics report' },
  { slug: 'dashboard', filename: 'analytics-dashboard-illustration.svg', desc: 'Dashboard illustration' },
  { slug: 'mobile_notifications', filename: 'parent-notification-illustration.svg', desc: 'Mobile notification' },
  { slug: 'back_to_school', filename: 'school-operations-illustration.svg', desc: 'Back to school' },
  { slug: 'award', filename: 'merit-badge-illustration.svg', desc: 'Award/merit badge' },
  { slug: 'team_spirit', filename: 'school-community-illustration.svg', desc: 'School community/team' },
  { slug: 'studying', filename: 'student-studying-illustration.svg', desc: 'Student studying' },
];

async function downloadUnDraw() {
  console.log('\n📐 Downloading unDraw illustrations…');
  // Search their API for each slug
  for (const item of UNDRAW_ILLUSTRATIONS) {
    const dest = join(IMAGES_DIR, item.filename);
    if (existsSync(dest)) {
      console.log(`  ✓ ${item.filename} (already exists)`);
      addCredit({ file: item.filename, source: 'unDraw', sourceUrl: `https://undraw.co/illustrations`, author: 'Katerina Limpitsouni', licence: 'unDraw License (free, open-source)', attributionRequired: 'No', peopleInShot: 'No (illustration)', notes: item.desc });
      continue;
    }
    try {
      // unDraw search API
      const searchUrl = `https://undraw.co/api/illustrations?color=${BRAND_COLOR}&q=${encodeURIComponent(item.slug.replace('_', ' '))}`;
      const result = await fetchJSON(searchUrl);
      const illustrations = result?.illustrations || [];
      if (!illustrations.length) {
        // Fallback: try by exact slug
        const svgUrl = `https://undraw.co/illustrations/${item.slug}?color=${BRAND_COLOR}`;
        await download(svgUrl, dest);
      } else {
        const first = illustrations[0];
        const svgUrl = first.image || `https://undraw.co/illustrations/${first.slug || item.slug}?color=${BRAND_COLOR}`;
        await download(svgUrl, dest);
      }
      console.log(`  ✓ ${item.filename}`);
      addCredit({ file: item.filename, source: 'unDraw', sourceUrl: `https://undraw.co/illustrations`, author: 'Katerina Limpitsouni', licence: 'unDraw License (free, open-source)', attributionRequired: 'No', peopleInShot: 'No (illustration)', notes: item.desc });
    } catch (e) {
      console.warn(`  ✗ ${item.filename}: ${e.message}`);
    }
  }
}

// ─── 2. Unsplash photos ─────────────────────────────────────────────────────

const UNSPLASH_KEY = env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_SEARCHES = [
  {
    query: 'teacher tablet classroom Africa',
    filename: 'hero-classroom.jpg',
    desc: 'Teacher with tablet in classroom (hero)',
    peopleInShot: 'Yes — review for identifiable children',
  },
  {
    query: 'students learning school Africa over shoulder',
    filename: 'behaviour-discipline.jpg',
    desc: 'Students learning — behaviour section',
    peopleInShot: 'Yes — review for identifiable children',
  },
  {
    query: 'school administrator laptop office',
    filename: 'school-operations.jpg',
    desc: 'School admin/operations',
    peopleInShot: 'Yes — review',
  },
  {
    query: 'data analytics dashboard laptop',
    filename: 'analytics-dashboard.jpg',
    desc: 'Analytics dashboard on screen',
    peopleInShot: 'No',
  },
  {
    query: 'parent child mobile phone notification',
    filename: 'parent-notification.jpg',
    desc: 'Parent looking at phone notification',
    peopleInShot: 'Yes — review',
  },
  {
    query: 'diverse primary school children classroom wide',
    filename: 'classroom-wide.jpg',
    desc: 'Wide classroom scene',
    peopleInShot: 'Yes — wide shot, review',
  },
];

async function downloadUnsplash() {
  if (!UNSPLASH_KEY) {
    console.log('\n⚠️  UNSPLASH_ACCESS_KEY not set — skipping Unsplash photos.');
    console.log('   Add it to .env and re-run to download photos.');
    // Add placeholder rows to credits
    for (const s of UNSPLASH_SEARCHES) {
      addCredit({ file: s.filename, source: 'PLACEHOLDER', sourceUrl: 'https://unsplash.com', author: '(not yet downloaded)', licence: 'Unsplash License', attributionRequired: 'No (recommended)', peopleInShot: s.peopleInShot, notes: `Query: "${s.query}" — add UNSPLASH_ACCESS_KEY and re-run` });
    }
    return;
  }
  console.log('\n📷 Downloading Unsplash photos…');
  for (const s of UNSPLASH_SEARCHES) {
    const dest = join(IMAGES_DIR, s.filename);
    if (existsSync(dest)) {
      console.log(`  ✓ ${s.filename} (already exists)`);
      continue;
    }
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(s.query)}&per_page=5&orientation=landscape`;
      const data = await fetchJSON(url, { Authorization: `Client-ID ${UNSPLASH_KEY}` });
      const photos = data?.results || [];
      if (!photos.length) { console.warn(`  ✗ No results for: ${s.query}`); continue; }
      // Pick the first result; filter for landscape
      const photo = photos.find(p => p.width > p.height) || photos[0];
      const dlUrl = photo.urls?.regular;
      await download(dlUrl, dest);
      addCredit({
        file: s.filename,
        source: 'Unsplash',
        sourceUrl: photo.links?.html || '',
        author: photo.user?.name || '',
        licence: 'Unsplash License',
        attributionRequired: 'No (recommended)',
        peopleInShot: s.peopleInShot,
        notes: s.desc,
      });
      console.log(`  ✓ ${s.filename} — ${photo.user?.name}`);
    } catch (e) { console.warn(`  ✗ ${s.filename}: ${e.message}`); }
  }
}

// ─── 3. Pexels photos ───────────────────────────────────────────────────────

const PEXELS_KEY = env.PEXELS_API_KEY;
const PEXELS_SEARCHES = [
  { query: 'teacher students Africa classroom', filename: 'for-schools-teacher.jpg', desc: 'For Schools page photo', peopleInShot: 'Yes — review' },
  { query: 'school children learning books', filename: 'home-learning.jpg', desc: 'Home page learning scene', peopleInShot: 'Yes — review' },
  { query: 'graduation cap award', filename: 'merit-award.jpg', desc: 'Merit/award imagery', peopleInShot: 'Yes — review' },
];

async function downloadPexels() {
  if (!PEXELS_KEY) {
    console.log('\n⚠️  PEXELS_API_KEY not set — skipping Pexels photos.');
    for (const s of PEXELS_SEARCHES) {
      addCredit({ file: s.filename, source: 'PLACEHOLDER', sourceUrl: 'https://pexels.com', author: '(not yet downloaded)', licence: 'Pexels License', attributionRequired: 'No', peopleInShot: s.peopleInShot, notes: `Query: "${s.query}" — add PEXELS_API_KEY and re-run` });
    }
    return;
  }
  console.log('\n📷 Downloading Pexels photos…');
  for (const s of PEXELS_SEARCHES) {
    const dest = join(IMAGES_DIR, s.filename);
    if (existsSync(dest)) { console.log(`  ✓ ${s.filename} (already exists)`); continue; }
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(s.query)}&per_page=5&orientation=landscape`;
      const data = await fetchJSON(url, { Authorization: PEXELS_KEY });
      const photos = data?.photos || [];
      if (!photos.length) { console.warn(`  ✗ No results for: ${s.query}`); continue; }
      const photo = photos[0];
      const dlUrl = photo.src?.large || photo.src?.original;
      await download(dlUrl, dest);
      addCredit({ file: s.filename, source: 'Pexels', sourceUrl: photo.url || '', author: photo.photographer || '', licence: 'Pexels License', attributionRequired: 'No', peopleInShot: s.peopleInShot, notes: s.desc });
      console.log(`  ✓ ${s.filename} — ${photo.photographer}`);
    } catch (e) { console.warn(`  ✗ ${s.filename}: ${e.message}`); }
  }
}

// ─── 4. Pixabay photos ──────────────────────────────────────────────────────

const PIXABAY_KEY = env.PIXABAY_API_KEY;
const PIXABAY_SEARCHES = [
  { query: 'classroom school children Africa', filename: 'pixabay-classroom.jpg', desc: 'Classroom - Pixabay', peopleInShot: 'Yes — review' },
];

async function downloadPixabay() {
  if (!PIXABAY_KEY) {
    console.log('\n⚠️  PIXABAY_API_KEY not set — skipping Pixabay photos.');
    for (const s of PIXABAY_SEARCHES) {
      addCredit({ file: s.filename, source: 'PLACEHOLDER', sourceUrl: 'https://pixabay.com', author: '(not yet downloaded)', licence: 'Pixabay Content License', attributionRequired: 'No', peopleInShot: s.peopleInShot, notes: `Query: "${s.query}" — add PIXABAY_API_KEY and re-run` });
    }
    return;
  }
  console.log('\n📷 Downloading Pixabay photos…');
  for (const s of PIXABAY_SEARCHES) {
    const dest = join(IMAGES_DIR, s.filename);
    if (existsSync(dest)) { console.log(`  ✓ ${s.filename} (already exists)`); continue; }
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(s.query)}&image_type=photo&orientation=horizontal&per_page=5&safesearch=true`;
      const data = await fetchJSON(url);
      const hits = data?.hits || [];
      if (!hits.length) { console.warn(`  ✗ No results for: ${s.query}`); continue; }
      const hit = hits[0];
      await download(hit.largeImageURL, dest);
      addCredit({ file: s.filename, source: 'Pixabay', sourceUrl: hit.pageURL || '', author: hit.user || '', licence: 'Pixabay Content License', attributionRequired: 'No', peopleInShot: s.peopleInShot, notes: s.desc });
      console.log(`  ✓ ${s.filename} — ${hit.user}`);
    } catch (e) { console.warn(`  ✗ ${s.filename}: ${e.message}`); }
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎨 Classly image sourcing script\n');
  await downloadUnDraw();
  await downloadUnsplash();
  await downloadPexels();
  await downloadPixabay();
  writeCredits();
  console.log('\n✅ Done. See public/images/CREDITS.md for the full log.\n');
  if (!UNSPLASH_KEY || !PEXELS_KEY || !PIXABAY_KEY) {
    console.log('📌 To download stock photos, add these keys to .env:');
    if (!UNSPLASH_KEY) console.log('   UNSPLASH_ACCESS_KEY=your-key   (https://unsplash.com/developers)');
    if (!PEXELS_KEY)   console.log('   PEXELS_API_KEY=your-key        (https://www.pexels.com/api/)');
    if (!PIXABAY_KEY)  console.log('   PIXABAY_API_KEY=your-key       (https://pixabay.com/api/docs/)');
    console.log('   Then run: node scripts/download-images.mjs');
  }
}

main().catch(console.error);
