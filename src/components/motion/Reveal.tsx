'use client';

import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealSpring, revealViewport } from '@/lib/motion';

type Tag = 'div' | 'section' | 'li' | 'article' | 'figure' | 'p' | 'ul' | 'ol';

/**
 * Fade and rise into view once (Beema "appear on scroll"), gently: 24px by default.
 * - Reduced motion: MotionConfig drops the movement and keeps a short fade. The server
 *   cannot know the visitor's setting, so the same markup renders either way.
 * - No JavaScript: the `scripting: none` rule in globals.css keeps it visible.
 */
export function Reveal({
  children,
  as = 'div',
  y = 24,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  as?: Tag;
  y?: number;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const Tag = motion[as];
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        id={id}
        data-reveal=""
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ ...revealSpring, delay }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
