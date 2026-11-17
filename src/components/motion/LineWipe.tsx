'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { wipeSpring } from '@/lib/motion';

type Line = { top: number; height: number };

/** Framer bars travel 886px of 897 (98.77%) and stop just short of the edge. */
const TRAVEL = '98.77%';

/**
 * Framer About Us line wipe (audit/motion/scroll-reveals.md#line-wipe). A bar in the
 * section's background color at 50% opacity sits over each line, so the text first looks
 * tinted; as a line's bar passes the middle of the viewport it slides right (spring k 500,
 * c 60) and the line wipes to full ink, line by line. Scrolling back up reverses it.
 * The text itself is always full contrast; the bars are decoration hidden from assistive
 * tech. Phones (<810px, as in Framer), reduced motion, print and no JavaScript show plain
 * text. Lines are measured from the rendered text and re-measured on resize.
 */
export function LineWipe({
  children,
  as: Tag = 'p',
  className = '',
  barClassName = 'bg-white',
}: {
  children: ReactNode;
  as?: 'p' | 'div' | 'h2' | 'h3';
  className?: string;
  /** Background utility matching the section behind the text. */
  barClassName?: string;
}) {
  const textRef = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el || reduce) return;
    const wide = window.matchMedia('(min-width: 810px)');
    const measure = () => {
      if (!wide.matches) return setLines([]);
      const box = el.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(el);
      const rows = new Map<number, Line>();
      for (const r of range.getClientRects()) {
        if (r.width < 1) continue;
        const top = Math.round(r.top - box.top);
        const row = rows.get(top);
        rows.set(top, { top, height: Math.max(row?.height ?? 0, r.height) });
      }
      // Merge fragments a few pixels apart (inline elements on one line).
      const merged: Line[] = [];
      for (const line of [...rows.values()].sort((a, b) => a.top - b.top)) {
        const last = merged.at(-1);
        if (last && line.top < last.top + last.height / 2) last.height = Math.max(last.height, line.top + line.height - last.top);
        else merged.push({ ...line });
      }
      setLines(merged);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    wide.addEventListener('change', measure);
    return () => {
      observer.disconnect();
      wide.removeEventListener('change', measure);
    };
  }, [reduce]);

  return (
    <div className="relative overflow-clip">
      <Tag ref={textRef as never} className={className}>
        {children}
      </Tag>
      {lines.length > 0 && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 print:hidden">
          {lines.map((line) => (
            <WipeBar key={line.top} line={line} className={barClassName} />
          ))}
        </div>
      )}
    </div>
  );
}

function WipeBar({ line, className }: { line: Line; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Wiped once the bar's top is above the middle of the viewport (Framer threshold .5).
    const update = () => setWiped(el.getBoundingClientRect().top < window.innerHeight / 2);
    const observer = new IntersectionObserver(update, { rootMargin: '0px 0px -50% 0px', threshold: [0, 1] });
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`absolute left-0 w-full opacity-50 ${className}`}
      style={{ top: line.top, height: line.height }}
      initial={false}
      animate={{ x: wiped ? TRAVEL : '0%' }}
      transition={wipeSpring}
    />
  );
}
