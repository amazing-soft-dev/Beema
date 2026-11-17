'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { type ReactNode, useRef } from 'react';

/**
 * Framer CTA banner background parallax (audit/components/home-sections.md §6): the layer is
 * taller than its section and drifts against the scroll at about −0.1× while the section
 * crosses the viewport. Decorative; still for reduced motion.
 */
export function Parallax({ children, className = '', distance = 80 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute -inset-y-16 inset-x-0" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
