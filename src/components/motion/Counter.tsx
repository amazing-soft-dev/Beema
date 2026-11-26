'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

/** Numbers settle in ≈0.8s with a strong ease-out. */
const DURATION = 0.8;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Count-up number (By The Numbers): counts from 0 to `value` once the number is in
 * view, keeping the target's decimals, with an optional prefix and suffix ("$", "%", "x").
 * Screen readers and the server render read the final value; the animated digits are
 * hidden from them. Reduced motion shows the final value at once.
 */
export function Counter({
  value,
  decimals,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const places = decimals ?? (String(value).split('.')[1]?.length ?? 0);
  const format = (n: number) => `${prefix}${n.toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places })}${suffix}`;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    // Hydrated with motion allowed: show 0 until the number scrolls into view, as designed.
    if (!inView) {
      el.textContent = format(0);
      return;
    }
    const controls = animate(0, value, {
      duration: DURATION,
      ease: EASE,
      onUpdate: (n) => {
        el.textContent = format(n);
      },
    });
    return () => controls.stop();
    // format depends only on props already listed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  const final = format(value);
  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      {/* Starts at the final value so no-JS, print and reduced motion read correctly. */}
      <span ref={ref} aria-hidden="true" className="tabular-nums" data-counter="">
        {final}
      </span>
    </span>
  );
}
