import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section, SectionHeader } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/Button';
import { modules, pillars } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'A full breakdown of Classly’s discipline management and school operations modules — behaviour logging, merit, detentions, interventions, attendance and analytics.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Every module, one connected platform"
        subtitle="Classly brings behaviour, discipline and the operations around them into a single, secure place — built for South African schools and the people who run them."
      />

      <Section>
        <SectionHeader center eyebrow="Modules" title="What’s inside Classly" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.08} className="h-full">
              <FeatureCard title={m.title} description={m.description} icon={m.icon} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHeader center dark eyebrow="Two pillars" title="Behaviour & discipline, plus operations" />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-2xl font-extrabold text-white">{p.title}</h3>
                <p className="mt-3 text-white/75">{p.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {p.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contact" variant="primary">
            Book a Demo
          </Button>
        </div>
      </Section>
    </>
  );
}
