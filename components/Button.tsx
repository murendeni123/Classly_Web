import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white';
type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-classly-green text-white shadow-soft hover:bg-classly-green-deep hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0',
  secondary:
    'border border-classly-blue text-classly-blue hover:bg-classly-blue hover:text-white hover:-translate-y-0.5',
  ghost:
    'border border-white/40 text-white hover:bg-white/10 hover:-translate-y-0.5',
  white:
    'bg-white text-classly-navy shadow-soft hover:-translate-y-0.5 hover:shadow-lift',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled,
  external,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
