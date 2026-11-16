import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react';

/**
 * Decorative icon wrapper. Icons are hidden from screen readers by default because
 * every icon on this site sits next to a text label; pass `label` when one stands alone.
 */
export function Icon({
  icon: Glyph,
  size = 24,
  weight = 'regular',
  label,
  className = '',
}: {
  icon: PhosphorIcon;
  size?: number;
  weight?: IconWeight;
  label?: string;
  className?: string;
}) {
  return label ? (
    <Glyph size={size} weight={weight} className={className} role="img" aria-label={label} />
  ) : (
    <Glyph size={size} weight={weight} className={className} aria-hidden="true" focusable="false" />
  );
}
