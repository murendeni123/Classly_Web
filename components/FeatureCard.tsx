import type { IconName } from '@/content/site-content';
import { Icon } from './Icon';

type Props = {
  title: string;
  description: string;
  icon?: IconName;
  className?: string;
};

export function FeatureCard({ title, description, icon, className = '' }: Props) {
  return (
    <div
      className={`group h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-classly-blue/10 text-classly-blue transition-colors group-hover:bg-classly-green/15 group-hover:text-classly-green-deep">
          <Icon name={icon} className="h-6 w-6" />
        </div>
      )}
      <h3 className="text-lg font-bold text-classly-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
