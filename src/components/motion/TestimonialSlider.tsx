'use client';

import { CaretLeft, CaretRight, ChatCircleText, Pause, Play } from '@phosphor-icons/react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { ClientQuote } from '@/content/reviews';
import { uiSpring } from '@/lib/motion';

/** Framer "Results & Reflections" slider changes about every 8.6s (loops-and-sliders.md). */
const AUTOPLAY_MS = 8600;

/**
 * Testimonial slider from the Framer home page: one quote at a time sliding sideways inside a
 * clipped box, dot buttons, and autoplay. Because it moves on its own there is a visible
 * Pause button (WCAG 2.2.2); it also pauses while hovered or focused, and never autoplays for
 * reduced motion. Paid endorsements are labelled (CMS testimonial rules).
 */
export function TestimonialSlider({ quotes, label = 'Client stories' }: { quotes: ClientQuote[]; label?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const reduce = useReducedMotion();
  const count = quotes.length;
  const running = count > 1 && !paused && !hold && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [running, index, count]);

  if (!count) return null;
  const go = (i: number) => setIndex((i + count) % count);

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-roledescription="carousel"
        aria-label={label}
        className="flex flex-col gap-6"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <div className="overflow-hidden rounded-card">
          <motion.ul className="flex" animate={{ x: `${-index * 100}%` }} transition={uiSpring}>
            {quotes.map((q, i) => (
              <li
                key={q.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
                className="flex w-full shrink-0 flex-col gap-4 bg-white p-6 md:p-10"
              >
                <Icon icon={ChatCircleText} weight="fill" size={36} className="text-navy-700" />
                <blockquote className="t-lead">“{q.quote}”</blockquote>
                {q.story && <p>{q.story}</p>}
                <p className="font-semibold">
                  {q.name}, <span className="font-normal">{q.detail}</span>
                </p>
                {q.paid && <p className="t-caps self-start rounded-pill border-2 border-ink px-3 py-1">Paid endorsement</p>}
              </li>
            ))}
          </motion.ul>
        </div>
        {count > 1 && (
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => go(index - 1)} className="transition-[background-color,color,border-color] duration-180 ease-out inline-flex size-12 items-center justify-center rounded-pill border-2 border-current hover:bg-ink hover:text-white">
              <Icon icon={CaretLeft} weight="bold" label="Previous story" />
            </button>
            <ul className="flex gap-1" aria-label="Choose a story">
              {quotes.map((q, i) => (
                <li key={q.name}>
                  <button type="button" onClick={() => go(i)} aria-current={i === index ? 'true' : undefined} className="inline-flex size-12 items-center justify-center">
                    <span className={`block size-3 rounded-pill border-2 border-current ${i === index ? 'bg-current' : ''}`} />
                    <span className="sr-only">Story {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => go(index + 1)} className="transition-[background-color,color,border-color] duration-180 ease-out inline-flex size-12 items-center justify-center rounded-pill border-2 border-current hover:bg-ink hover:text-white">
              <Icon icon={CaretRight} weight="bold" label="Next story" />
            </button>
            {!reduce && (
              <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="ml-auto inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-current px-4 font-semibold">
                <Icon icon={paused ? Play : Pause} weight="fill" />
                {paused ? 'Play' : 'Pause'}
              </button>
            )}
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
