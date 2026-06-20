import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { settings } from '@/content/site-content';

// Self-hosted at build time by next/font — no external font CDN, CSP-clean.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://classlyempowering.co.za';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Classly — Discipline management & school operations',
    template: '%s — Classly',
  },
  description: settings.tagline,
  applicationName: 'Classly',
  openGraph: {
    type: 'website',
    siteName: 'Classly',
    title: 'Classly — Discipline management & school operations',
    description: settings.tagline,
    url: siteUrl,
    images: [{ url: '/images/og-default.svg', width: 1200, height: 630, alt: 'Classly' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classly — Discipline management & school operations',
    description: settings.tagline,
    images: ['/images/og-default.svg'],
  },
  icons: { icon: '/brand/happy-icon.png', apple: '/brand/happy-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-classly-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
