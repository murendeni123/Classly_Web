'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { Stat } from '@/content/site-content';

function useCountUp(target: number, active: boolean, reduce: boolean) {
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!active || reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduce]);

  return value;
}

export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion() ?? false;
  const value = useCountUp(stat.value, inView, reduce);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-white/70">{stat.label}</div>
    </div>
  );
}
