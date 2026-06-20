/** @type {import('next').NextConfig} */

// NOTE on architecture & security headers:
// This site is a standard Next.js app on Vercel: every marketing page is still
// statically pre-rendered (SSG), but a single Node serverless route handler
// (app/api/contact) sends lead-form emails over SMTP. Because there is now a
// server layer, the Content-Security-Policy is set per-request with a nonce in
// middleware.ts (the modern, strict approach). All OTHER security headers live
// in vercel.json, applied at the Vercel edge. See README §Security.

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
