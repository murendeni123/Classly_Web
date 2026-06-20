import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section, SectionHeader } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { steps, portals } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Classly works in three simple steps — Log, Notify, Improve — across four role-based portals for School Admin, Teacher, Grade Head and Parent.',
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From a single log to real improvement"
        subtitle="Classly turns everyday classroom moments into action. Three steps, four portals, four languages — all working together."
      />

      <Section>
        <SectionHeader center eyebrow="The flow" title="Log → Notify → Improve" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.12}>
              <div className="relative h-full rounded-3xl border border-line bg-white p-8 shadow-soft">
                <span className="text-5xl font-extrabold text-classly-green/80">{s.number}</span>
                <h3 className="mt-4 text-xl font-bold text-classly-navy">{s.title}</h3>
                <p className="mt-2 text-muted">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeader center eyebrow="Four portals" title="A tailored experience for every role" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portals.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-classly-blue/10 text-classly-blue">
                  <Icon name={p.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-classly-navy">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">See it with your own school’s workflow</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Book a short demo and we’ll walk through how Classly fits the way your school already works.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Book a Demo
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
