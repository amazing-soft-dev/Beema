import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Icon } from './Icon';

/**
 * Arrow that swaps on hover or focus of its link or button (Read more ↗): the
 * arrow slides out along its direction and a copy slides in behind it, .6s with a soft
 * ease-out. --ax/--ay set the axis (up-right also moves up).
 */
export function ArrowSwap({ dir = 'right', size = 24, className = '' }: { dir?: 'right' | 'up-right'; size?: number; className?: string }) {
  const glyph = dir === 'up-right' ? ArrowUpRight : ArrowRight;
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden [--ax:100%] [--ay:0%] data-[dir=up-right]:[--ay:-100%] *:transition-transform *:duration-600 *:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:*:transition-none [&>:last-child]:absolute [&>:last-child]:inset-0 [&>:last-child]:[transform:translate(calc(var(--ax)*-1),calc(var(--ay)*-1))] [:is(a,button):is(:hover,:focus-visible)_&>:first-child]:[transform:translate(var(--ax),var(--ay))] [:is(a,button):is(:hover,:focus-visible)_&>:last-child]:[transform:none] ${className}`}
      data-dir={dir}
      aria-hidden="true"
    >
      <Icon icon={glyph} size={size} weight="bold" />
      <Icon icon={glyph} size={size} weight="bold" />
    </span>
  );
}
