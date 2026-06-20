# Classly — Marketing Website

A static, front-end-only marketing site for **Classly** — discipline management and
school operations software for South African schools. Built with Next.js (App Router,
static export), TypeScript, Tailwind CSS and Framer Motion. No backend, no database.

Lead capture is delivered by **email (Web3Forms)** + **WhatsApp click-to-chat**.

---

## Quick start

```bash
npm install          # install pinned dependencies
cp .env.example .env # then fill in the values (see below)
npm run dev          # http://localhost:3000  (live dev server)
```

Production build (static export to `./out`):

```bash
npm run build        # builds + regenerates the CSP hashes in vercel.json
npm start            # serves ./out locally at http://localhost:3000
```

> For a deploy-accurate build, run a **clean** build first: `rm -rf .next && npm run build`.
> Vercel always builds cold, and a clean local build produces the exact same inline
> scripts (and therefore the exact same CSP hashes) — see *Security → CSP* below.

---

## Environment variables

Copy `.env.example` to `.env` (local) and set the same vars in the Vercel dashboard.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes (for the form) | Public Web3Forms access key. Delivers lead submissions to `info@classlyempowering.co.za`. **Public by design** — lock it to your domain (see *Launch checklist*). |
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | Optional | hCaptcha site key. If blank, the captcha widget is hidden (honeypot + throttle still apply). |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for `sitemap.xml` and Open Graph URLs. |

Without `NEXT_PUBLIC_WEB3FORMS_KEY` the form shows a friendly message pointing visitors
to WhatsApp/email — it never silently fails.

---

## Editing site content

**All copy lives in one file: [`content/site-content.ts`](content/site-content.ts).**
No CMS, no database — edit and redeploy.

Common edits:

- **Promo banner** — edit the `promo` object. Set `promo.enabled = false` to hide it.
- **Hero image** — replace `public/images/hero-classroom.svg`, or point `hero.image.src`
  at another file in `public/images`.
- **Hero headline emphasis** — wrap a phrase in `**double asterisks**` to colour it green.
- **Pricing figures** — edit the `pricing` object (`perClassParent`, `schoolKeeps`,
  `remitToClassly`, `foundationOnboarding`, `foundationFreeMonths`). The numbers flow
  through the whole pricing page and FAQ.
- **Contact details / socials** — edit the `settings` object at the bottom.
- **Testimonials & trust logos** — empty by design. Add **real, approved** entries only;
  never fabricate. Empty arrays hide their sections automatically.

After editing content, run `npm run build` and commit `vercel.json` (the CSP hashes
change when the rendered HTML changes — see below).

---

## Brand & logo

Brand tokens live in [`tailwind.config.ts`](tailwind.config.ts) and `app/globals.css`.

The logo is a **placeholder** at `public/brand/classly-logo.svg`. To use your real logo:

- Drop your file in `public/brand/` and update `settings.logo` in `content/site-content.ts`
  (e.g. `'/brand/classly-logo.png'`), **or**
- Overwrite `public/brand/classly-logo.svg` with your own SVG.

---

## Imagery — replace the placeholders before launch

The images in `public/images/*.svg` are tasteful **branded placeholders** so the site
looks complete on first load. Replace them with **royalty-free edtech photography**
(Unsplash / Pexels), preferring diverse South African / African classroom settings.

Suggested searches (already noted on each placeholder):

| File | Search term |
| --- | --- |
| `hero-classroom` | teacher tablet classroom |
| `behaviour-discipline` | students learning Africa |
| `school-operations` | school admin laptop |
| `analytics-dashboard` | dashboard on laptop |
| `og-default` (1200×630) | brand/social share image |

After downloading, keep descriptive filenames, update the matching `src` in
`content/site-content.ts` (and the `alt` text), and **record licence/attribution** here:

| Image | Source URL | Photographer | Licence | Attribution required? |
| --- | --- | --- | --- | --- |
| _example.jpg_ | _unsplash.com/…_ | _Name_ | _Unsplash / Pexels_ | _No_ |

> CSP note: external image hosts are allowlisted in `vercel.json` (`img-src`). The default
> allows `images.unsplash.com` and `images.pexels.com`. If you host images elsewhere,
> add that host to `img-src`, or (recommended) download them into `public/images` so
> they are served first-party.

---

## Security

Treated as a real production deployment, targeting OWASP ASVS L2 where applicable to a
static site. The attack surface is intentionally tiny: a static front-end with **one**
public form key and **zero** third-party scripts (the optional hCaptcha aside).

### HTTP security headers

Set in [`vercel.json`](vercel.json) and applied at the Vercel edge to every route
(`output: 'export'` means Next.js does not apply `headers()` to the static files, so
`vercel.json` is the single source of truth):

- **Content-Security-Policy** — strict allowlist (details below)
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options** — `nosniff`
- **X-Frame-Options** — `DENY` (with `frame-ancestors 'none'`)
- **Referrer-Policy** — `strict-origin-when-cross-origin`
- **Permissions-Policy** — camera/mic/geolocation/FLoC/topics all disabled
- **X-DNS-Prefetch-Control** — `off`
- **Cross-Origin-Opener-Policy** / **Cross-Origin-Resource-Policy** — `same-origin`

`next.config.js` also sets `poweredByHeader: false` (no `X-Powered-By`) and
`productionBrowserSourceMaps: false` (no readable source maps in production).

### CSP — how the script hashes work (important)

Next.js App Router emits a few **inline** `<script>` tags (React hydration data). A strict
`script-src 'self'` would block them, and we deliberately avoid `'unsafe-inline'` for
scripts. Instead, the postbuild step [`scripts/generate-csp.mjs`](scripts/generate-csp.mjs)
hashes every inline script across the exported HTML and injects those `'sha256-…'`
sources into the CSP in `vercel.json`. This runs automatically via `npm run build`
(the `postbuild` hook).

- `next.config.js` pins a deterministic `generateBuildId`, and a **clean cold build is
  byte-for-byte reproducible** — so the hashes generated locally match what Vercel
  produces on deploy.
- **After any content/markup change you must rebuild and commit `vercel.json`.** If the
  committed hashes drift from the deployed HTML, the browser will block the inline scripts
  and the page won't hydrate. The fix is always: `rm -rf .next && npm run build`, then
  commit `vercel.json`.

`style-src` uses `'self' 'unsafe-inline'`: Framer Motion and `next/image` set inline
`style="…"` attributes. This permits inline *style attributes* only — it does **not**
allow inline scripts, so it carries no script-XSS risk.

### Form & bot hardening (`components/LeadForm.tsx`, `lib/leadForm.ts`)

- **Honeypot** hidden field — submissions that fill it are silently dropped.
- **hCaptcha** (optional) — enabled by setting `NEXT_PUBLIC_HCAPTCHA_SITEKEY`.
- **Validation + sanitisation** — every field is length-capped and stripped of control
  characters (CR/LF/TAB) before building the email or WhatsApp text, preventing header/
  text injection. Email and phone are format-checked.
- **Throttle** — the submit button is disabled during send with an 8s cooldown.
- **No personal data in URLs** — the only place visitor data appears in a URL is the
  WhatsApp `text` param, which carries only what the visitor typed for their own enquiry.

### Dependencies

Versions are pinned. `npm audit` is clean except for advisories inside `next` (and its
bundled `postcss`) that **only affect the Next.js server runtime** — the image optimizer,
middleware, rewrites, and Server Component request handling. **This site is a static
export with no server**, so none of them apply to the deployed artifact. They are only
"fixable" by upgrading to `next@16` (a breaking major). Revisit that upgrade on its own
branch; do not `npm audit fix --force` casually. Consider enabling **Dependabot** or
**Renovate** for ongoing patch PRs.

---

## Deploy to Vercel

1. Push to a Git repo and import the project in Vercel (framework preset: **Next.js**).
2. Set the env vars from the table above in **Project → Settings → Environment Variables**.
3. Vercel runs `npm run build` and serves `./out` as a static site. `vercel.json` applies
   the security headers. HTTPS and HTTP→HTTPS redirect are automatic.
4. Make sure the **committed `vercel.json`** came from a clean build of the current code.

---

## Launch checklist

- [ ] Set `NEXT_PUBLIC_WEB3FORMS_KEY` and verify a test submission reaches
      `info@classlyempowering.co.za`.
- [ ] **Lock the Web3Forms key to your domain** in the Web3Forms dashboard (allowed
      domains / require hCaptcha). The key is public in the bundle by design.
- [ ] (Recommended) Set `NEXT_PUBLIC_HCAPTCHA_SITEKEY` and confirm the captcha appears.
- [ ] Replace all placeholder images in `public/images` and the logo in `public/brand`;
      fill in the licence/attribution table above.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (sitemap + OG).
- [ ] Have legal finalise `/privacy` (edit the `privacy` object in `content/site-content.ts`).
- [ ] Run a clean build and commit `vercel.json`: `rm -rf .next && npm run build`.
- [ ] Verify security headers (below).

## Verifying security headers

After deploying, test the live URL against:

- **https://securityheaders.com** — target grade **A / A+**. Expect every header listed
  above to be detected, with a strict CSP (no `'unsafe-inline'` in `script-src`).
- **https://observatory.mozilla.org** — target **A+ / 100+**. The strict CSP, HSTS,
  `nosniff`, frame protection and COOP/CORP all contribute to the score.

A passing result shows: CSP present and strict, HSTS with a long max-age + preload,
`X-Content-Type-Options: nosniff`, framing denied, and no `X-Powered-By`.

---

## Project structure

```
app/                 # App Router pages (Home + 6 routes) + robots.ts + sitemap.ts
components/          # Nav, PromoBar, Footer, Hero, StatCounter, FeatureCard,
                     # Section, Button, LeadForm, WhatsAppButton, Icon, Reveal, PageHero
content/site-content.ts   # SINGLE editable content file (all copy + settings)
lib/leadForm.ts      # validation, sanitisation, WhatsApp link, Web3Forms submit
public/images        # edtech imagery (placeholders — replace)
public/brand         # logo (placeholder — replace)
scripts/             # make-placeholders.mjs, generate-csp.mjs (postbuild)
next.config.js       # static export, no source maps, no X-Powered-By, deterministic build id
vercel.json          # security headers + CSP (script hashes auto-generated)
```
