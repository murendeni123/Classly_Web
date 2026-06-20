import { NextResponse, type NextRequest } from 'next/server';

/**
 * Strict, per-request Content-Security-Policy with a fresh nonce.
 *
 * Because the site now has a server layer (the SMTP route handler), we no longer
 * hash inline scripts at build time. Instead we mint a nonce per request and let
 * Next.js stamp it onto its own framework/hydration scripts automatically — this
 * is the modern, recommended approach and removes the need for 'unsafe-inline'
 * on scripts. `'strict-dynamic'` lets those nonce'd scripts load the rest of the
 * app's bundled chunks.
 *
 * All non-CSP security headers (HSTS, X-Frame-Options, etc.) stay in vercel.json.
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // framer-motion writes inline style attributes; styles cannot execute code.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');

  // Pass the CSP (with nonce) on the REQUEST so Next can read the nonce and apply
  // it to its scripts, and on the RESPONSE so the browser enforces it.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  // Apply to page routes only; skip static assets and the API (JSON, no scripts).
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|brand|images|robots.txt|sitemap.xml).*)',
    },
  ],
};
