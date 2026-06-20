/** @type {import('next').NextConfig} */

// NOTE on architecture & security headers:
// This site is a standard Next.js app on Vercel: every marketing page is
// statically pre-rendered (SSG), and a single Node serverless route handler
// (app/api/contact) sends lead-form emails over SMTP. Because the pages are
// prerendered, the Content-Security-Policy is a static policy applied at the
// Vercel edge in vercel.json (a per-request nonce cannot match prerendered
// HTML). All security headers live in vercel.json. See README §Security.

const nextConfig = {
  // Serve images as-is (no on-demand optimizer dependency). We still get
  // lazy-loading and explicit sizing.
  images: {
    unoptimized: true,
  },

  // Emit clean, trailing-slash URLs for the marketing pages.
  trailingSlash: true,

  // Security: never ship readable source maps to production browsers.
  productionBrowserSourceMaps: false,

  // Security: do not advertise the framework.
  poweredByHeader: false,

  reactStrictMode: true,
};

module.exports = nextConfig;
