import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { privacy } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'Privacy & POPIA',
  description:
    'How Classly (Pty) Ltd collects, uses and protects personal information, in line with POPIA — including our role as operator, children’s data, security safeguards and the POPIA Operator Agreement for schools.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy & POPIA" title="Privacy notice" subtitle={privacy.intro} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">Last updated: {privacy.updated}</p>
          {privacy.sections.map((s) => (
            <Reveal key={s.heading} as="section">
              <div className="mt-10">
                <h2 className="text-xl font-bold text-classly-navy">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-ink">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
