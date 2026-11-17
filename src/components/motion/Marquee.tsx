'use client';

import { Pause, Play } from '@phosphor-icons/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/** Framer ticker speed (audit/motion/loops-and-sliders.md#marquee). */
const PX_PER_SECOND = 30;

/**
 * Framer "Trusted by" ticker: the items scroll right to left at ≈30px/s in a seamless loop.
 * Because it moves on its own, a visible Pause / Play button stops it (WCAG 2.2.2), and it
 * also stops while anything inside has keyboard focus. Reduced motion: it does not move.
 * Screen readers get the list once; the repeated copy is hidden from them.
 */
export function Marquee({
  items,
  label,
  className = '',
  itemClassName = '',
}: {
  items: ReactNode[];
  /** What the list is, for screen readers and the pause button ("Things we help with"). */
  label: string;
  className?: string;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duration = one copy's width at 30px/s, so the speed holds at every screen size.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const set = () => track.style.setProperty('--marquee-duration', `${track.scrollWidth / 2 / PX_PER_SECOND}s`);
    set();
    const observer = new ResizeObserver(set);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const list = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined} aria-label={copy === 0 ? label : undefined}>
      {items.map((item, i) => (
        <li key={i} className={`shrink-0 px-8 md:px-14 ${itemClassName}`}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="marquee min-w-0 flex-1" data-paused={paused ? '' : undefined}>
        <div ref={trackRef} className="marquee-track">
          {list(0)}
          {list(1)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill border-2 border-current motion-reduce:hidden"
      >
        <Icon icon={paused ? Play : Pause} weight="fill" />
        <span className="sr-only">{paused ? `Play the moving list: ${label}` : `Pause the moving list: ${label}`}</span>
      </button>
    </div>
  );
}
