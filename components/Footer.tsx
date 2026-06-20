import Link from 'next/link';
import Image from 'next/image';
import { settings } from '@/content/site-content';

const product = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'For Schools', href: '/for-schools' },
];

const company = [
  { label: 'Contact', href: '/contact' },
  { label: 'Book a Demo', href: '/contact' },
  { label: 'Privacy & POPIA', href: '/privacy' },
];

const socialEntries = (s: typeof settings.socials) =>
  Object.entries(s).filter(([, url]) => url) as [string, string][];

export function Footer() {
  const socials = socialEntries(settings.socials);
  return (
    <footer className="bg-classly-navy text-white/80">
      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image
            src={settings.logo}
            alt="Classly — Empowering Education Excellence"
            width={256}
            height={256}
            className="h-28 w-28 rounded-2xl bg-white object-contain p-2 shadow-soft"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{settings.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Product</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {product.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp: {settings.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${settings.phoneDial}`} className="hover:text-white">
                Call: {settings.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
            <li className="text-white/60">{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy & POPIA
            </Link>
            <span aria-hidden>·</span>
            <Link href="/privacy" className="hover:text-white">
              Terms
            </Link>
            {socials.length > 0 && <span aria-hidden>·</span>}
            {socials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
