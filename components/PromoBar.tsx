import Link from 'next/link';
import { promo } from '@/content/site-content';

const tones = {
  green: 'bg-classly-green-deep text-white',
  navy: 'bg-classly-navy text-white',
  blue: 'bg-classly-blue text-white',
};

export function PromoBar() {
  if (!promo.enabled) return null;
  return (
    <div className={`${tones[promo.tone]} text-center text-sm`}>
      <div className="container-content flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2">
        <span className="font-medium">{promo.text}</span>
        {promo.href && promo.linkLabel && (
          <Link href={promo.href} className="font-semibold underline underline-offset-4 hover:opacity-90">
            {promo.linkLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}
