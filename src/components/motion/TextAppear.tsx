'use client';

import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { heroTextDelay, revealSpring, textDelay, textOffset, textViewport } from '@/lib/motion';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

/**
 * Framer "text appear" (audit/motion/word-rise.md): lines rise 75px from opacity .001 with
 * the reveal spring, 0.2s after half the text is in view, once. Framer splits the text
 * into lines, but every line starts at the same moment, so moving the block looks the same
 * and keeps the text one node for screen readers, copy-paste and translation.
 * `onMount` is the hero version: it starts on load, 0.4s in.
 * Reduced motion: MotionConfig drops the movement and keeps a short fade.
 * No JavaScript: the `scripting: none` rule in globals.css keeps it visible.
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
  const trigger = onMount ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: textViewport };
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        id={id}
        data-reveal=""
        initial={{ opacity: 0.001, y: textOffset }}
        transition={{ ...revealSpring, delay: (onMount ? heroTextDelay : textDelay) + delay }}
        {...trigger}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
