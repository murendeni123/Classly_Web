// Generates tasteful branded SVG placeholders so the site looks complete on
// first load. Replace these with real edtech photography before launch
// (see README → Imagery).
import { writeFileSync } from 'node:fs';

const NAVY = '#16245C';
const BLUE = '#1565C0';
const CYAN = '#2BB0F0';
const GREEN = '#6FBF3B';
const YELLOW = '#FFC83D';

function svg({ w, h, title, caption }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="0.55" stop-color="${BLUE}"/>
      <stop offset="1" stop-color="${CYAN}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.82}" cy="${h * 0.22}" r="${h * 0.18}" fill="${GREEN}" opacity="0.35"/>
  <circle cx="${w * 0.15}" cy="${h * 0.8}" r="${h * 0.12}" fill="${YELLOW}" opacity="0.4"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2">
    <rect x="${w * 0.3}" y="${h * 0.34}" width="${w * 0.4}" height="${h * 0.32}" rx="14"/>
    <line x1="${w * 0.3}" y1="${h * 0.46}" x2="${w * 0.7}" y2="${h * 0.46}"/>
  </g>
  <text x="50%" y="${h * 0.84}" text-anchor="middle" fill="#ffffff" font-family="Inter, system-ui, sans-serif" font-size="${Math.round(h * 0.05)}" font-weight="700">${title}</text>
  <text x="50%" y="${h * 0.9}" text-anchor="middle" fill="#ffffff" fill-opacity="0.7" font-family="Inter, system-ui, sans-serif" font-size="${Math.round(h * 0.032)}">${caption}</text>
</svg>`;
}

const files = [
  { path: 'public/images/hero-classroom.svg', w: 720, h: 560, title: 'Classly', caption: 'Replace with: teacher tablet classroom' },
  { path: 'public/images/behaviour-discipline.svg', w: 720, h: 420, title: 'Behaviour & Discipline', caption: 'Replace with: students learning Africa' },
  { path: 'public/images/school-operations.svg', w: 720, h: 420, title: 'School Operations', caption: 'Replace with: school admin laptop' },
  { path: 'public/images/analytics-dashboard.svg', w: 720, h: 520, title: 'Analytics Dashboard', caption: 'Replace with: dashboard on laptop' },
  { path: 'public/images/og-default.svg', w: 1200, h: 630, title: 'Classly', caption: 'Discipline management & school operations' },
];

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="80" viewBox="0 0 280 80" role="img" aria-label="Classly logo">
  <defs>
    <linearGradient id="wm" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CYAN}"/>
      <stop offset="1" stop-color="${BLUE}"/>
    </linearGradient>
  </defs>
  <circle cx="34" cy="40" r="22" fill="url(#wm)"/>
  <circle cx="50" cy="24" r="7" fill="${GREEN}"/>
  <text x="70" y="52" font-family="Plus Jakarta Sans, Inter, system-ui, sans-serif" font-size="38" font-weight="800" fill="url(#wm)">Classly</text>
</svg>`;

for (const f of files) {
  writeFileSync(f.path, svg(f));
  console.log('wrote', f.path);
}
writeFileSync('public/brand/classly-logo.svg', logo);
console.log('wrote public/brand/classly-logo.svg');
