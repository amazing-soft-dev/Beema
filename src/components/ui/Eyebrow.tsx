import type { ReactNode } from 'react';

/**
 * Section labels from the design, enlarged to 16px.
 * line  caps text after a 16px rule ("— TURNING 65")
 * pill  bordered pill ("About us"); `ping` adds a pinging dot (keyframes in motion.css). It keeps its
 *       own width (self-start), so a column of text never stretches it to the full width.
 */
export function Eyebrow({
  children,
  variant = 'line',
  tone = 'light',
  ping = false,
  className = '',
}: {
  children: ReactNode;
  variant?: 'line' | 'pill';
  tone?: 'light' | 'dark';
  ping?: boolean;
  className?: string;
}) {
  if (variant === 'pill') {
    const look = tone === 'dark' ? 'border-white/40 text-white' : 'border-ink/25 text-ink';
    return (
      <p className={`inline-flex min-h-9 items-center gap-2.5 self-start rounded-pill border px-4 font-medium ${look} ${className}`.trim()}>
        {ping && <span
            className={`relative inline-flex size-2 shrink-0 rounded-pill bg-current before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-75 before:animate-[ping-ring_1.5s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:before:animate-none motion-reduce:before:opacity-0 print:before:animate-none print:before:opacity-0 ${tone === 'dark' ? 'text-gold' : 'text-navy-700'}`}
            aria-hidden="true"
          />}
        {children}
      </p>
    );
  }
  const color = tone === 'dark' ? 'text-gold' : 'text-navy-700';
  return (
    <p className={`t-caps inline-flex items-center gap-2.5 ${color} ${className}`.trim()}>
      <span className="h-0.5 w-4 rounded-pill bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
