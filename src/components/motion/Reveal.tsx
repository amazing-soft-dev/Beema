'use client';

import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { type FadeOffset, fadeOffset, revealSpring, revealViewport, staggerStep } from '@/lib/motion';

type Tag = 'div' | 'section' | 'li' | 'article' | 'figure' | 'p' | 'ul' | 'ol' | 'aside' | 'header';

/**
 * Framer "appear on scroll" (audit/motion/scroll-reveals.md#fade-up): fade in and rise into
 * place once, with the reveal spring.
 * - `y`: a Framer offset preset (sm 35, md 50, lg 75, xl 100, xxl 150) or pixels. Negative
 *   values drop in from above (Framer's inverted block uses −75).
 * - `stagger`: position in a group; Framer starts siblings 0.2s apart (.2, .4, .6 …).
 * - `delay`: extra seconds on top of the stagger.
 * - `onMount`: start on load instead of on scroll (hero content).
 * Reduced motion keeps a short fade (MotionConfig). No JavaScript: globals.css shows it.
 */
export function Reveal({
  children,
  as = 'div',
  y = 'md',
  stagger,
  delay = 0,
  onMount = false,
  className,
  id,
}: {
  children: ReactNode;
  as?: Tag;
  y?: FadeOffset | number;
  stagger?: number;
  delay?: number;
  onMount?: boolean;
  className?: string;
  id?: string;
}) {
  const Tag = motion[as];
  const offset = typeof y === 'number' ? y : fadeOffset[y];
  const start = (stagger === undefined ? 0 : (stagger + 1) * staggerStep) + delay;
  const trigger = onMount ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: revealViewport };
  return (
    <MotionConfig reducedMotion="user">
      <Tag className={className} id={id} data-reveal="" initial={{ opacity: 0, y: offset }} transition={{ ...revealSpring, delay: start }} {...trigger}>
        {children}
      </Tag>
    </MotionConfig>
  );
}
