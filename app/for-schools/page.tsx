import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section, SectionHeader } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { LeadForm } from '@/components/LeadForm';
import { whyChoose, trustBadges } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'For Schools',
  description:
    'Why South African principals and school leaders choose Classly for discipline management and school operations — POPIA-aware, multilingual and budget-friendly.',
};

const leaderBenefits = [
  { icon: 'chart', title: 'Make decisions with evidence', body: 'See behaviour trends across classes and grades, so leadership acts on data, not anecdotes.' },
  { icon: 'shield', title: 'Consistency and fairness', body: 'One clear record for every incident and intervention — defensible, auditable and fair to learners.' },
  { icon: 'bell', title: 'Stronger parent partnerships', body: 'Real-time, multilingual notifications keep families involved and reduce friction.' },
  { icon: 'flag', title: 'Built for South African schools', body: 'Multilingual, POPIA-aware and designed around the realities of running a school here — not adapted from somewhere else.' },
] as const;

export default function ForSchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="For schools"
        title="Built for the people who run the school"
        subtitle="Classly gives principals, deputies and grade heads a clearer view of behaviour and operations — and gives teachers back their time."
      />

      <Section>
        <SectionHeader center eyebrow="For leadership" title="What changes when you run on Classly" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {leaderBenefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.1} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-7 shadow-soft">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-classly-green/15 text-classly-green-deep">
                  <Icon name={b.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-classly-navy">{b.title}</h3>
                  <p className="mt-1.5 text-muted">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeader center eyebrow="Peace of mind" title="Made for South African schools" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...trustBadges, ...whyChoose.slice(0, 2)].map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-classly-blue/10 text-classly-blue">
                  <Icon name={b.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-classly-navy">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted">{b.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="Talk to us"
            title="Bring Classly to your school"
            intro="Send us a few details and we’ll prepare a walkthrough tailored to your school. We’ll reply by email, or continue on WhatsApp straight away."
          />
          <Reveal delay={0.1}>
            <LeadForm defaultType="Book a Demo" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
