'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { MotionConfig, motion } from 'motion/react';
import { type ReactNode, useSyncExternalStore, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { carouselSpring } from '@/lib/motion';

type Layout = 'fan' | 'flat';
const query = '(min-width: 810px)';
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
const getLayout = (): Layout => (window.matchMedia(query).matches ? 'fan' : 'flat');

/**
 * Framer Services fan carousel (audit/components/services-carousel.md). From 810px the active
 * card sits flat in the middle and its neighbours tilt away (±7°, skew ±4°), narrow to 83% and
 * dim to 50%; arrows step one card and every card moves on one spring (k 260, c 32). Phones get
 * a flat slideshow. No autoplay. Clicking a side card brings it to the middle. Only the active
 * card is in the tab order; the position is announced. Reduced motion: the spring becomes
 * instant (MotionConfig).
 */
export function FanCarousel({ items, label, start = 0 }: { items: { key: string; node: ReactNode }[]; label: string; start?: number }) {
  const [index, setIndex] = useState(start);
  const layout = useSyncExternalStore(subscribe, getLayout, () => 'fan' as Layout);
  const count = items.length;
  const fan = layout === 'fan';
  const pitch = fan ? 520 : 352;
  const go = (i: number) => setIndex(Math.max(0, Math.min(count - 1, i)));

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="flex flex-col gap-8"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1);
          if (e.key === 'ArrowLeft') go(index - 1);
        }}
      >
        <div className={`relative w-full ${fan ? 'h-[650px]' : 'h-[440px]'}`}>
          {items.map((item, i) => {
            const d = i - index;
            const away = Math.sign(d);
            const far = Math.abs(d);
            return (
              <motion.div
                key={item.key}
                aria-hidden={d !== 0}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                className="absolute top-0 left-1/2 h-full"
                style={{ width: fan ? 555 : 342, marginLeft: fan ? -277.5 : -171, zIndex: count - far }}
                initial={false}
                animate={
                  fan
                    ? {
                        x: d * pitch,
                        y: d === 0 ? 0 : far === 2 ? -75 : far > 2 ? 75 : -16,
                        rotate: d === 0 ? 0 : -7 * away,
                        skewX: d === 0 ? 0 : -4 * away,
                        scaleX: d === 0 ? 1 : 0.83,
                        opacity: d === 0 ? 1 : far > 2 ? 0 : 0.5,
                      }
                    : { x: d * pitch, opacity: d === 0 ? 1 : 0.5, rotate: 0, skewX: 0, scaleX: 1, y: 0 }
                }
                transition={carouselSpring}
              >
                {/* Side cards keep their links out of reach: inert, so nothing inside can be focused or followed. */}
                <div inert={d !== 0} className="h-full">
                  {item.node}
                </div>
                {/*
                  Clicking or tapping a visible side card brings it to the middle. Pointer only:
                  keyboard and screen reader users already have the arrows and arrow keys, so the
                  overlay stays out of the tab order inside the hidden slide.
                */}
                {d !== 0 && far <= 2 && (
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => go(i)}
                    className="absolute inset-0 cursor-pointer rounded-card hover:ring-2 hover:ring-white/60"
                  >
                    <span className="sr-only">Show card {i + 1} of {count}</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="transition-[background-color,color,border-color] duration-180 ease-out inline-flex size-12 items-center justify-center rounded-pill border-2 border-current hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon icon={CaretLeft} weight="bold" label="Previous" />
          </button>
          <p aria-live="polite" className="min-w-24 text-center font-semibold">
            {index + 1} of {count}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            className="transition-[background-color,color,border-color] duration-180 ease-out inline-flex size-12 items-center justify-center rounded-pill border-2 border-current hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon icon={CaretRight} weight="bold" label="Next" />
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
