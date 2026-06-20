import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { LeadForm } from '@/components/LeadForm';
import { settings } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a demo or request a quote for Classly. Reach the team by WhatsApp, phone or email — discipline management and school operations for South African schools.',
};

const channels = [
  {
    icon: 'chat' as const,
    label: 'WhatsApp',
    value: settings.whatsappDisplay,
    href: `https://wa.me/${settings.whatsappNumber}`,
    external: true,
  },
  {
    icon: 'bell' as const,
    label: 'Call us',
    value: settings.phoneDisplay,
    href: `tel:${settings.phoneDial}`,
    external: false,
  },
  {
    icon: 'clipboard' as const,
    label: 'Email',
    value: settings.email,
    href: `mailto:${settings.email}`,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your school"
        subtitle="Book a demo, request a quote, or just ask a question. We respond quickly — by email or WhatsApp, whichever suits you."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-classly-navy">Reach us directly</h2>
              <p className="mt-3 text-muted">Prefer to skip the form? Use any of these — they all reach the same team.</p>
              <ul className="mt-6 space-y-4">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-classly-green/15 text-classly-green-deep">
                        <Icon name={c.icon} className="h-6 w-6" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-muted">{c.label}</span>
                        <span className="block font-bold text-classly-navy">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">{settings.address}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
