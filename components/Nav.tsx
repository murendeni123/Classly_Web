'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { nav, settings } from '@/content/site-content';

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <nav className="container-content flex h-20 items-center justify-between lg:h-24">
        {/* Logo — square asset; sized large so the wordmark + slogan stay legible */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Classly home"
        >
          <Image
            src={settings.logo}
            alt="Classly — Empowering Education Excellence"
            width={256}
            height={256}
            priority
            className="h-16 w-16 object-contain lg:h-20 lg:w-20"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden shrink-0 items-center gap-0.5 lg:flex">
          {nav.links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-classly-navy transition-colors hover:text-classly-blue ${
                    active
                      ? 'underline decoration-classly-green decoration-2 underline-offset-8'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href={nav.cta.href}
            className="inline-flex items-center whitespace-nowrap rounded-full bg-classly-green px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-classly-green-deep hover:shadow-lift"
          >
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-classly-navy"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="container-content flex flex-col py-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-classly-navy hover:bg-offwhite"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3">
              <Link
                href={nav.cta.href}
                className="block rounded-full bg-classly-green px-5 py-3 text-center text-sm font-semibold text-white"
              >
                {nav.cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
