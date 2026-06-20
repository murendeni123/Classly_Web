import Image from 'next/image';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { hero } from '@/content/site-content';

// Render **emphasised** spans inside the headline with a brand colour.
function Headline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <span key={i} className="text-classly-green">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-classly-dark text-white">
      {/* Accent flourishes */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-classly-green/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-40 w-40 rounded-full bg-classly-yellow/20 blur-2xl" />

      <div className="container-content grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <span className="eyebrow border-white/20 bg-white/10 text-classly-yellow">{hero.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <Headline text={hero.headline} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{hero.subheading}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl bg-classly-green/30" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-lift">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={720}
              height={560}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-2xl bg-classly-yellow/80" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
