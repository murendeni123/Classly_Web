import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { Section, SectionHeader } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/Button';
import { FeatureCard } from '@/components/FeatureCard';
import { StatCounter } from '@/components/StatCounter';
import { Icon } from '@/components/Icon';
import { LeadForm } from '@/components/LeadForm';
import {
  stats,
  intro,
  focusAreas,
  pillars,
  modules,
  steps,
  spotlight,
  trustBadges,
  whyChoose,
  pricing,
  trustLogos,
} from '@/content/site-content';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 2 — Stat counters */}
      <section className="bg-classly-navy">
        <div className="container-content grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* 3 — What is Classly */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader eyebrow={intro.eyebrow} title={intro.title} intro={intro.body} />
          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((f) => (
                <li key={f.title} className="rounded-2xl border border-line bg-offwhite p-5">
                  <h3 className="font-bold text-classly-navy">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{f.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 4 — Two pillars */}
      <Section muted>
        <SectionHeader
          center
          eyebrow="Two sides, one platform"
          title="Behaviour & discipline — and the operations around it"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-52 w-full">
                  <Image src={p.image} alt={p.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-extrabold text-classly-navy">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-ink">
                        <Icon name="badge" className="mt-0.5 h-5 w-5 shrink-0 text-classly-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Inside Classly */}
      <Section>
        <SectionHeader center eyebrow="Inside Classly" title="Everything a school needs to run discipline well" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.08} className="h-full">
              <FeatureCard title={m.title} description={m.description} icon={m.icon} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — How it works */}
      <Section dark>
        <SectionHeader center dark eyebrow="How it works" title="Log → Notify → Improve" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.12}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <span className="text-5xl font-extrabold text-classly-green">{s.number}</span>
                <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-white/75">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — Feature spotlight */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image src={spotlight.image} alt={spotlight.imageAlt} width={720} height={520} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeader eyebrow={spotlight.eyebrow} title={spotlight.title} intro={spotlight.body} />
            <Reveal delay={0.1}>
              <ul className="mt-6 space-y-3">
                {spotlight.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-ink">
                    <Icon name="chart" className="mt-0.5 h-5 w-5 shrink-0 text-classly-blue" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 8 — Built for South African schools */}
      <Section>
        <SectionHeader center eyebrow="Built for South African schools" title="Honest about what matters here" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 0.08} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-offwhite p-6 text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-classly-green/15 text-classly-green-deep">
                  <Icon name={b.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-classly-navy">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {trustLogos.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-80">
            {trustLogos.map((logo) => (
              <Image key={logo.name} src={logo.src} alt={logo.name} width={120} height={48} className="h-10 w-auto object-contain" />
            ))}
          </div>
        )}
      </Section>

      {/* 9 — Pricing teaser */}
      <Section muted>
        <Reveal className="overflow-hidden rounded-3xl bg-classly-dark px-8 py-12 text-center text-white sm:px-12">
          <span className="eyebrow border-white/20 bg-white/10 text-classly-yellow">{pricing.eyebrow}</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold sm:text-4xl">{pricing.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{pricing.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/pricing" variant="primary">
              See pricing
            </Button>
            <Button href="/contact" variant="ghost">
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </Section>


      {/* 11 — Why choose Classly */}
      <Section muted>
        <SectionHeader center eyebrow="Why choose Classly" title="Made for the realities of South African schools" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-classly-blue/10 text-classly-blue">
                  <Icon name={w.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-classly-navy">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted">{w.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 12 — Lead capture */}
      <Section id="demo">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="Get started"
            title="Book a demo or request a quote"
            intro="Tell us about your school and we’ll show you how Classly fits. We’ll reply by email — or pick up the conversation on WhatsApp right away."
          />
          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
