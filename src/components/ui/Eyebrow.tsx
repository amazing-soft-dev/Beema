import type { ReactNode } from 'react';

/**
 * Section labels from the Beema design, enlarged to 16px.
 * line  caps text after a 16px rule ("— TURNING 65")
 * pill  bordered pill ("About us")
 */
export function Eyebrow({
  children,
  variant = 'line',
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  variant?: 'line' | 'pill';
  tone?: 'light' | 'dark';
  className?: string;
}) {
  if (variant === 'pill') {
    const look = tone === 'dark' ? 'border-white/40 text-white' : 'border-ink/25 text-ink';
    return <p className={`inline-flex min-h-9 items-center rounded-pill border px-4 font-medium ${look} ${className}`.trim()}>{children}</p>;
  }
  const color = tone === 'dark' ? 'text-lime' : 'text-green-700';
  return (
    <p className={`t-caps inline-flex items-center gap-2.5 ${color} ${className}`.trim()}>
      <span className="h-0.5 w-4 rounded-pill bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
