import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from './Icon';

/**
 * Arrow that swaps on hover or focus of its link or button (Framer "Read more ↗"): the
 * arrow slides out along its direction and a copy slides in behind it. CSS in motion.css.
 */
export function ArrowSwap({ dir = 'right', size = 24, className = '' }: { dir?: 'right' | 'up-right'; size?: number; className?: string }) {
  const glyph = dir === 'up-right' ? ArrowUpRight : ArrowRight;
  return (
    <span className={`arrow-swap ${className}`} data-dir={dir} aria-hidden="true">
      <Icon icon={glyph} size={size} weight="bold" />
      <Icon icon={glyph} size={size} weight="bold" />
    </span>
  );
}
