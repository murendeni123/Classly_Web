/**
 * Generates polished branded SVG illustrations for Classly.
 * No external dependencies needed — run with: node scripts/make-illustrations.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');
mkdirSync(IMAGES_DIR, { recursive: true });

// Brand colours
const C = {
  navy:   '#16245C',
  blue:   '#1E88E5',
  cyan:   '#2BB0F0',
  green:  '#6FBF3B',
  green2: '#54A025',
  yellow: '#FFC83D',
  orange: '#F5A623',
  white:  '#FFFFFF',
  gray:   '#E2E8F0',
  muted:  '#64748B',
};

function svgWrap(w, h, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${content}
</svg>`;
}

function grad(id, x1, y1, x2, y2, stops) {
  const s = stops.map(([off, col, op=1]) =>
    `    <stop offset="${off}" stop-color="${col}" stop-opacity="${op}"/>`
  ).join('\n');
  return `  <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse">
${s}
  </linearGradient>`;
}

// ─── 1. Hero: Teacher with Tablet ───────────────────────────────────────────
const heroSVG = svgWrap(720, 560, `
  <defs>
    ${grad('bg','0','0','720','560',[[0,C.navy],[0.6,C.blue]])}
    ${grad('screen','0','0','0','1',[[0,'#FFFFFF',0.15],[1,'#FFFFFF',0.05]])}
  </defs>
  <rect width="720" height="560" fill="url(#bg)" rx="24"/>
  <!-- Decorative circles -->
  <circle cx="620" cy="80" r="90" fill="${C.green}" opacity="0.18"/>
  <circle cx="80" cy="480" r="60" fill="${C.yellow}" opacity="0.22"/>
  <circle cx="660" cy="420" r="40" fill="${C.cyan}" opacity="0.25"/>
  <!-- Desk surface -->
  <rect x="100" y="370" width="520" height="12" rx="6" fill="${C.white}" opacity="0.12"/>
  <!-- Laptop/tablet screen -->
  <rect x="180" y="190" width="360" height="220" rx="16" fill="${C.white}" opacity="0.13"/>
  <rect x="196" y="206" width="328" height="188" rx="10" fill="${C.navy}" opacity="0.6"/>
  <!-- Screen content: bar chart -->
  <rect x="220" y="340" width="28" height="40" rx="4" fill="${C.green}" opacity="0.85"/>
  <rect x="258" y="310" width="28" height="70" rx="4" fill="${C.cyan}" opacity="0.85"/>
  <rect x="296" y="280" width="28" height="100" rx="4" fill="${C.green}" opacity="0.85"/>
  <rect x="334" y="300" width="28" height="80" rx="4" fill="${C.yellow}" opacity="0.85"/>
  <rect x="372" y="265" width="28" height="115" rx="4" fill="${C.cyan}" opacity="0.85"/>
  <rect x="410" y="290" width="28" height="90" rx="4" fill="${C.green}" opacity="0.85"/>
  <!-- Header line on screen -->
  <rect x="220" y="218" width="140" height="10" rx="5" fill="${C.white}" opacity="0.5"/>
  <rect x="220" y="236" width="80" height="8" rx="4" fill="${C.white}" opacity="0.25"/>
  <!-- Laptop base -->
  <rect x="160" y="382" width="400" height="18" rx="9" fill="${C.white}" opacity="0.1"/>
  <!-- Person silhouette (teacher) -->
  <circle cx="530" cy="270" r="36" fill="${C.white}" opacity="0.15"/>
  <rect x="502" y="308" width="56" height="70" rx="20" fill="${C.white}" opacity="0.12"/>
  <!-- Tag badge -->
  <rect x="60" y="180" width="130" height="44" rx="12" fill="${C.green}" opacity="0.92"/>
  <text x="125" y="197" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="${C.white}">DISCIPLINE</text>
  <text x="125" y="213" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="${C.white}">MANAGEMENT</text>
  <!-- Floating notification -->
  <rect x="500" y="150" width="160" height="50" rx="12" fill="${C.white}" opacity="0.15"/>
  <circle cx="523" cy="175" r="12" fill="${C.green}" opacity="0.9"/>
  <text x="523" y="180" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="${C.white}">✓</text>
  <rect x="543" y="163" width="100" height="8" rx="4" fill="${C.white}" opacity="0.5"/>
  <rect x="543" y="177" width="70" height="6" rx="3" fill="${C.white}" opacity="0.3"/>
</svg>`);

// ─── 2. Behaviour & Discipline ───────────────────────────────────────────────
const behaviourSVG = svgWrap(720, 420, `
  <defs>
    ${grad('bg2','0','0','720','420',[[0,C.navy,1],[1,C.blue,1]])}
  </defs>
  <rect width="720" height="420" fill="url(#bg2)" rx="20"/>
  <circle cx="60" cy="60" r="50" fill="${C.cyan}" opacity="0.15"/>
  <circle cx="680" cy="380" r="70" fill="${C.green}" opacity="0.15"/>
  <!-- Clipboard / incident log -->
  <rect x="80" y="80" width="200" height="260" rx="14" fill="${C.white}" opacity="0.12"/>
  <rect x="95" y="96" width="170" height="228" rx="8" fill="${C.white}" opacity="0.08"/>
  <rect x="150" y="72" width="60" height="20" rx="10" fill="${C.white}" opacity="0.2"/>
  <!-- Log lines -->
  <rect x="112" y="126" width="136" height="8" rx="4" fill="${C.green}" opacity="0.8"/>
  <rect x="112" y="146" width="110" height="6" rx="3" fill="${C.white}" opacity="0.4"/>
  <rect x="112" y="162" width="120" height="6" rx="3" fill="${C.white}" opacity="0.3"/>
  <rect x="112" y="186" width="136" height="8" rx="4" fill="${C.yellow}" opacity="0.8"/>
  <rect x="112" y="206" width="90" height="6" rx="3" fill="${C.white}" opacity="0.4"/>
  <rect x="112" y="222" width="120" height="6" rx="3" fill="${C.white}" opacity="0.3"/>
  <rect x="112" y="246" width="136" height="8" rx="4" fill="${C.cyan}" opacity="0.8"/>
  <rect x="112" y="266" width="100" height="6" rx="3" fill="${C.white}" opacity="0.4"/>
  <!-- Badge / Merit star -->
  <circle cx="460" cy="200" r="100" fill="${C.white}" opacity="0.07"/>
  <circle cx="460" cy="200" r="75" fill="${C.white}" opacity="0.08"/>
  <circle cx="460" cy="200" r="52" fill="${C.green}" opacity="0.9"/>
  <text x="460" y="185" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="32" fill="${C.white}">★</text>
  <text x="460" y="215" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="${C.white}">GOLDIE</text>
  <text x="460" y="228" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="${C.white}">BADGE</text>
  <!-- Connecting line -->
  <line x1="280" y1="200" x2="405" y2="200" stroke="${C.white}" stroke-width="2" stroke-dasharray="6,4" opacity="0.3"/>
  <!-- Phone notification -->
  <rect x="560" y="90" width="100" height="160" rx="16" fill="${C.white}" opacity="0.12"/>
  <rect x="572" y="104" width="76" height="128" rx="8" fill="${C.navy}" opacity="0.5"/>
  <rect x="585" y="116" width="50" height="6" rx="3" fill="${C.green}" opacity="0.8"/>
  <rect x="585" y="128" width="38" height="5" rx="2.5" fill="${C.white}" opacity="0.4"/>
  <rect x="585" y="140" width="50" height="5" rx="2.5" fill="${C.white}" opacity="0.3"/>
  <circle cx="612" cy="180" r="18" fill="${C.yellow}" opacity="0.9"/>
  <text x="612" y="186" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="18" fill="${C.navy}">!</text>
`);

// ─── 3. School Operations ────────────────────────────────────────────────────
const operationsSVG = svgWrap(720, 420, `
  <defs>
    ${grad('bg3','0','0','720','420',[[0,'#1565C0'],[1,C.navy]])}
  </defs>
  <rect width="720" height="420" fill="url(#bg3)" rx="20"/>
  <circle cx="680" cy="50" r="80" fill="${C.cyan}" opacity="0.12"/>
  <circle cx="50" cy="380" r="60" fill="${C.yellow}" opacity="0.12"/>
  <!-- Calendar -->
  <rect x="60" y="90" width="220" height="240" rx="14" fill="${C.white}" opacity="0.1"/>
  <rect x="60" y="90" width="220" height="44" rx="14" fill="${C.cyan}" opacity="0.6"/>
  <rect x="60" y="120" width="220" height="14" rx="0" fill="${C.cyan}" opacity="0.6"/>
  <text x="170" y="118" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="700" fill="${C.white}">JUNE 2025</text>
  <!-- Calendar grid -->
  ${[0,1,2,3,4,5].map(col =>
    [0,1,2,3,4].map(row => {
      const x = 80 + col*34;
      const y = 150 + row*38;
      const filled = (row*6+col) === 7 || (row*6+col) === 13;
      return `<rect x="${x}" y="${y}" width="26" height="26" rx="6" fill="${filled ? C.green : C.white}" opacity="${filled ? 0.9 : 0.1}"/>`;
    }).join('')
  ).join('')}
  <!-- Attendance bars -->
  <rect x="330" y="100" width="300" height="230" rx="14" fill="${C.white}" opacity="0.07"/>
  <text x="480" y="125" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="600" fill="${C.white}" opacity="0.7">ATTENDANCE</text>
  ${['Mon','Tue','Wed','Thu','Fri'].map((day, i) => {
    const x = 355 + i*56;
    const heights = [180, 155, 165, 145, 175];
    const h = heights[i];
    return `<rect x="${x}" y="${110+230-h}" width="36" height="${h-10}" rx="6" fill="${i===3 ? C.yellow : C.green}" opacity="0.85"/>
    <text x="${x+18}" y="${330}" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.white}" opacity="0.7">${day}</text>`;
  }).join('')}
  <!-- Notification pill -->
  <rect x="420" y="360" width="200" height="36" rx="18" fill="${C.green}" opacity="0.9"/>
  <text x="520" y="383" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="700" fill="${C.white}">✓ Parent notified</text>
`);

// ─── 4. Analytics Dashboard ──────────────────────────────────────────────────
const analyticsSVG = svgWrap(720, 520, `
  <defs>
    ${grad('bg4','0','0','0','520',[[0,'#F5F9FC'],[1,'#EFF4FB']])}
    ${grad('card1','0','0','0','1',[[0,C.blue],[1,C.navy]])}
  </defs>
  <rect width="720" height="520" fill="url(#bg4)" rx="20"/>
  <!-- Dashboard frame -->
  <rect x="30" y="30" width="660" height="460" rx="18" fill="${C.white}" filter="drop-shadow(0 8px 24px rgba(22,36,92,0.12))"/>
  <!-- Header bar -->
  <rect x="30" y="30" width="660" height="52" rx="18" fill="${C.navy}"/>
  <rect x="30" y="64" width="660" height="18" fill="${C.navy}"/>
  <circle cx="62" cy="56" r="8" fill="#FF5F57" opacity="0.8"/>
  <circle cx="86" cy="56" r="8" fill="#FFBD2E" opacity="0.8"/>
  <circle cx="110" cy="56" r="8" fill="#28CA41" opacity="0.8"/>
  <rect x="200" y="48" width="200" height="16" rx="8" fill="${C.white}" opacity="0.1"/>
  <!-- Stat cards row -->
  <rect x="50" y="100" width="140" height="80" rx="12" fill="${C.blue}" opacity="0.12"/>
  <text x="120" y="138" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="26" font-weight="800" fill="${C.blue}">247</text>
  <text x="120" y="156" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Incidents logged</text>
  <rect x="205" y="100" width="140" height="80" rx="12" fill="${C.green}" opacity="0.12"/>
  <text x="275" y="138" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="26" font-weight="800" fill="${C.green2}">89%</text>
  <text x="275" y="156" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Attendance</text>
  <rect x="360" y="100" width="140" height="80" rx="12" fill="${C.yellow}" opacity="0.12"/>
  <text x="430" y="138" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="26" font-weight="800" fill="#D97706">142</text>
  <text x="430" y="156" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Merits awarded</text>
  <rect x="515" y="100" width="140" height="80" rx="12" fill="${C.navy}" opacity="0.08"/>
  <text x="585" y="138" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="26" font-weight="800" fill="${C.navy}">34</text>
  <text x="585" y="156" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Interventions</text>
  <!-- Area chart -->
  <rect x="50" y="196" width="400" height="200" rx="12" fill="${C.navy}" opacity="0.04"/>
  <text x="70" y="218" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="600" fill="${C.navy}" opacity="0.7">Behaviour trends — Term 2</text>
  <!-- Chart lines -->
  <polyline points="70,370 120,340 170,350 220,310 270,295 320,280 370,260 420,255" fill="none" stroke="${C.blue}" stroke-width="2.5" stroke-linejoin="round"/>
  <polyline points="70,380 120,375 170,365 220,360 270,345 320,330 370,318 420,310" fill="none" stroke="${C.green}" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="6,3"/>
  <!-- Area fill for main line -->
  <polygon points="70,370 120,340 170,350 220,310 270,295 320,280 370,260 420,255 420,390 70,390" fill="${C.blue}" opacity="0.08"/>
  <!-- Axis labels -->
  ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'].map((m,i) =>
    `<text x="${70+i*50}" y="408" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9" fill="${C.muted}">${m}</text>`
  ).join('')}
  <!-- Legend -->
  <line x1="70" y1="420" x2="92" y2="420" stroke="${C.blue}" stroke-width="2.5"/>
  <text x="98" y="424" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Incidents</text>
  <line x1="160" y1="420" x2="182" y2="420" stroke="${C.green}" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="188" y="424" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Positive</text>
  <!-- Right panel: donut chart -->
  <rect x="465" y="196" width="190" height="200" rx="12" fill="${C.navy}" opacity="0.04"/>
  <text x="560" y="218" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="600" fill="${C.navy}" opacity="0.7">By Grade</text>
  <!-- Simple donut -->
  <circle cx="560" cy="320" r="60" fill="none" stroke="${C.gray}" stroke-width="22"/>
  <circle cx="560" cy="320" r="60" fill="none" stroke="${C.blue}" stroke-width="22" stroke-dasharray="150 228" stroke-dashoffset="57" stroke-linecap="round"/>
  <circle cx="560" cy="320" r="60" fill="none" stroke="${C.green}" stroke-width="22" stroke-dasharray="80 228" stroke-dashoffset="-93" stroke-linecap="round"/>
  <circle cx="560" cy="320" r="60" fill="none" stroke="${C.yellow}" stroke-width="22" stroke-dasharray="50 228" stroke-dashoffset="-173" stroke-linecap="round"/>
  <text x="560" y="316" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="18" font-weight="800" fill="${C.navy}">247</text>
  <text x="560" y="330" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9" fill="${C.muted}">total</text>
  <!-- Bottom row -->
  <rect x="50" y="410" width="400" height="56" rx="10" fill="${C.green}" opacity="0.08"/>
  <rect x="60" y="422" width="10" height="32" rx="3" fill="${C.green}" opacity="0.8"/>
  <text x="82" y="437" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="600" fill="${C.navy}">Top Intervention: Parent conference</text>
  <text x="82" y="453" font-family="Inter,system-ui,sans-serif" font-size="10" fill="${C.muted}">Used in 42 cases this term — 87% resolved</text>
`);

// ─── Write files ─────────────────────────────────────────────────────────────
const files = [
  ['hero-classroom.svg', heroSVG, 'Hero: teacher with tablet illustration'],
  ['behaviour-discipline.svg', behaviourSVG, 'Behaviour & discipline illustration'],
  ['school-operations.svg', operationsSVG, 'School operations illustration'],
  ['analytics-dashboard.svg', analyticsSVG, 'Analytics dashboard illustration'],
];

for (const [name, content, desc] of files) {
  const path = join(IMAGES_DIR, name);
  writeFileSync(path, content, 'utf8');
  console.log(`✓ ${name} — ${desc}`);
}

console.log('\n✅ Illustrations written to public/images/');
