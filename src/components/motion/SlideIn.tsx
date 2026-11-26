'use client';

import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { revealSpring, revealViewport, slideOffset, staggerStep } from '@/lib/motion';

type Tag = 'div' | 'article' | 'section' | 'li' | 'figure' | 'aside';

/**
 * Column slide: a column fades in while sliding 200px
 * in from its side with the reveal spring, once. Use the left and right columns of one row
 * together; they move toward the centre at the same time.
 * Wrap the row in <SlideRow> (or give an ancestor `overflow-x: clip`) so the off-screen
 * start position never adds a horizontal scrollbar.
 * Reduced motion keeps a short fade (MotionConfig). No JavaScript: globals.css shows it.
 */
export function SlideIn({
  children,
  from,
  as = 'div',
  distance = slideOffset,
  stagger,
  className,
  id,
}: {
  children: ReactNode;
  from: 'left' | 'right';
  as?: Tag;
  /** 200px for columns and 80px for one smaller block. */
  distance?: number;
  stagger?: number;
  className?: string;
  id?: string;
}) {
  const Tag = motion[as];
  const x = from === 'left' ? -distance : distance;
  const delay = stagger === undefined ? 0 : (stagger + 1) * staggerStep;
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        id={id}
        data-reveal=""
        initial={{ opacity: 0, x }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={revealViewport}
        transition={{ ...revealSpring, delay }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}

/** A row whose columns slide in: clips sideways overflow like the section does. */
export function SlideRow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-x-clip ${className}`}>{children}</div>;
}
