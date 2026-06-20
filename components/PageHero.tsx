import { Reveal } from './Reveal';

type Props = { eyebrow?: string; title: string; subtitle?: string };

export function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-classly-dark text-white">
      <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-classly-green/20 blur-3xl" />
      <div className="container-content py-16 lg:py-20">
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow border-white/20 bg-white/10 text-classly-yellow">{eyebrow}</span>}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
