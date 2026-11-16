'use client';

import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealSpring, revealViewport, textDelay } from '@/lib/motion';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

/**
 * Headline appear from the Beema design: text rises into place 0.2s after entering view.
 * The source animated each line, but all lines start together, so moving the block is
 * visually the same and keeps the text as one node for screen readers and copy-paste.
 * `onMount` runs immediately (hero headings) instead of waiting for scroll.
 * Reduced motion and no-JavaScript behave as in Reveal.
 */
export function TextAppear({
  children,
  as = 'h2',
  className,
  id,
  onMount = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
  onMount?: boolean;
  delay?: number;
}) {
  const Tag = motion[as];
  const trigger = onMount ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: revealViewport };
  return (
    <MotionConfig reducedMotion="user">
      <Tag className={className} id={id} data-reveal="" initial={{ opacity: 0.001, y: 32 }} transition={{ ...revealSpring, delay: textDelay + delay }} {...trigger}>
        {children}
      </Tag>
    </MotionConfig>
  );
}
