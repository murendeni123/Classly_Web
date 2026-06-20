import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section, SectionHeader } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { pricing, pricingPlans, faqs } from '@/content/site-content';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Classly is R200 per class per month with everything included. Standard plan with a once-off R5,000 onboarding fee, or the Foundation Schools Programme for up to four grades with the first 3 months free.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.intro} />

      {/* Plans */}
      <Section>
        <SectionHeader center eyebrow="Plans" title="Choose how you start" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div
                className={`flex h-full flex-col rounded-3xl border bg-white p-8 shadow-soft ${
                  plan.highlight ? 'border-2 border-classly-green' : 'border-line'
                }`}
              >
                {plan.highlight && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-classly-green px-3 py-1 text-xs font-semibold text-white">
                    Supported start
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-classly-navy">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
                <div className="mt-5">
                  <span className="text-4xl font-extrabold text-classly-navy">{plan.price}</span>
                  {plan.cadence && <span className="ml-1 text-sm text-muted">{plan.cadence}</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <Icon name="badge" className="mt-0.5 h-5 w-5 shrink-0 text-classly-green" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.footnote && <p className="mt-5 text-xs text-muted">{plan.footnote}</p>}
                <div className="mt-6">
                  <Button href={plan.cta.href} variant={plan.highlight ? 'primary' : 'secondary'} className="w-full">
                    {plan.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader center eyebrow="Questions" title="Pricing & platform FAQs" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line">
          {faqs.map((faq) => (
            <Reveal key={faq.question} as="div">
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-classly-navy">
                  {faq.question}
                  <span className="text-classly-green transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
