import type { ComponentProps, ReactNode } from 'react';

/** Centered content column with the theme gutters (24px, 40px from 1200px). */
export function Container({ className = '', children, ...rest }: ComponentProps<'div'>) {
  return (
    <div className={`container-x ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export type SectionTone = 'light' | 'surface' | 'sand' | 'dark';

const tones: Record<SectionTone, string> = {
  light: 'bg-white text-ink',
  surface: 'bg-surface text-ink',
  sand: 'bg-sand text-ink',
  // `on-dark` switches the focus ring to gold (globals.css).
  dark: 'on-dark bg-ink text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white',
};

/** Page section with vertical rhythm (64 / 96 / 128px) and a background tone. */
export function Section({
  tone = 'light',
  className = '',
  children,
  ...rest
}: { tone?: SectionTone; children: ReactNode } & Omit<ComponentProps<'section'>, 'children'>) {
  return (
    <section className={`section-y ${tones[tone]} ${className}`.trim()} {...rest}>
      {children}
    </section>
  );
}
