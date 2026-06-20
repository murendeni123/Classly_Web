import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  muted?: boolean;
  id?: string;
};

export function Section({ children, className = '', dark, muted, id }: Props) {
  const tone = dark
    ? 'bg-classly-dark text-white'
    : muted
      ? 'bg-offwhite text-ink'
      : 'bg-white text-ink';
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${tone} ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  );
}

type HeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, intro, center, dark }: HeaderProps) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={dark ? 'eyebrow border-white/20 bg-white/10 text-classly-yellow' : 'eyebrow'}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          dark ? 'text-white' : 'text-classly-navy'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/80' : 'text-muted'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
