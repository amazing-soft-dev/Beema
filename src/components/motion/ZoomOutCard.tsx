'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';
import { zoomSpring } from '@/lib/motion';

/**
 * About Us card zoom-out.
 * The card starts enlarged and lowered, then settles to its place with a spring when half
 * of it is in view, once:
 *   desktop (≥1200)  scale 1.8, y 260
 *   tablet  (≥810)   scale 1.2, y 45
 *   phone            no effect
 * Opacity stays 1. The start pose comes from CSS (media-gated utilities on the card), so it is right
 * before JavaScript loads; the outer box is observed because it is never transformed.
 * Reduced motion, print and no JavaScript show the card in place, and so does a page that
 * opens or jumps below the card before it was ever half in view.
 */
export function ZoomOutCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const inView = useInView(outer, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // Already scrolled past it (a reload mid-page, the back button, a link to a lower section,
  // a fast jump): the "half in view" moment never comes, so the card would stay enlarged over
  // the next section. Once its top is above the viewport while it still waits, show it in place.
  useEffect(() => {
    const el = inner.current;
    const box = outer.current;
    if (!el || !box) return;
    const settleIfPassed = () => {
      if (el.dataset.zoom !== 'pending') return window.removeEventListener('scroll', settleIfPassed);
      if (box.getBoundingClientRect().top < 0) {
        el.dataset.zoom = 'done';
        window.removeEventListener('scroll', settleIfPassed);
      }
    };
    settleIfPassed();
    window.addEventListener('scroll', settleIfPassed, { passive: true });
    return () => window.removeEventListener('scroll', settleIfPassed);
  }, []);

  useEffect(() => {
    const el = inner.current;
    if (!el || !inView || reduce || el.dataset.zoom !== 'pending') return;
    const start = new DOMMatrix(getComputedStyle(el).transform === 'none' ? undefined : getComputedStyle(el).transform);
    // Hand the pose from CSS to inline values, then spring both to rest.
    el.dataset.zoom = 'running';
    const controls = animate(el, { scale: [start.a, 1], y: [start.f, 0] }, zoomSpring);
    controls.then(() => {
      el.dataset.zoom = 'done';
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <div ref={outer} className={className}>
      <div
        ref={inner}
        className="h-full origin-center [@media_screen_and_(min-width:810px)_and_(prefers-reduced-motion:no-preference)_and_(scripting:enabled)]:data-[zoom=pending]:[transform:translateY(45px)_scale(1.2)] [@media_screen_and_(min-width:1200px)_and_(prefers-reduced-motion:no-preference)_and_(scripting:enabled)]:data-[zoom=pending]:[transform:translateY(260px)_scale(1.8)]"
        data-zoom="pending"
      >
        {children}
      </div>
    </div>
  );
}
