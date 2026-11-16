import type { ComponentProps, ReactNode } from 'react';

export type CardTone = 'white' | 'surface' | 'sand';

const tones: Record<CardTone, string> = {
  white: 'bg-white border border-line',
  surface: 'bg-surface',
  sand: 'bg-sand',
};

/** Rounded content card (16px radius, no shadows, as in the Beema design). */
export function Card({ tone = 'white', className = '', children, ...rest }: { tone?: CardTone; children: ReactNode } & Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <div className={`rounded-card p-6 md:p-8 ${tones[tone]} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
