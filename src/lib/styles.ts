/**
 * Shared Tailwind class strings for effects used by several components.
 *
 * uLine: a link underline that unfolds. A 2px line seen edge-on (rotateY 90deg) turns flat
 * over .4s ease-in-out on hover, on keyboard focus, for the current page and for an open
 * menu, so nothing depends on hover. Set --u-inset and --u-bottom to place it.
 */
export const uLine =
  'relative after:absolute after:inset-x-[var(--u-inset,0)] after:bottom-[var(--u-bottom,0.35em)] after:h-0.5 after:rounded-[2px] after:bg-current after:[transform:perspective(200px)_rotateY(90deg)] after:transition-transform after:duration-400 after:ease-[cubic-bezier(.65,0,.35,1)] hover:after:[transform:none] focus-visible:after:[transform:none] aria-[current=page]:after:[transform:none] aria-expanded:after:[transform:none] motion-reduce:after:transition-none';
