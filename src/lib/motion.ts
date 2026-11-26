/**
 * Motion values for the site, tuned for older readers.
 * Springs run in JS with motion/react, using these constants.
 */

/** Appear effects (text, fade up, column slide): over-damped, ≈0.75s to 90%, long tail. */
export const revealSpring = { type: 'spring', stiffness: 300, damping: 100, mass: 1 } as const;
/** About card zoom-out: a little less damping than the reveals. */
export const zoomSpring = { type: 'spring', stiffness: 300, damping: 90, mass: 1 } as const;
/** Line wipe bars: fast and firm. */
export const wipeSpring = { type: 'spring', stiffness: 500, damping: 60, mass: 1 } as const;
/** Variant changes such as toggles and sliders. */
export const uiSpring = { type: 'spring', stiffness: 200, damping: 40, mass: 1 } as const;
/** Services carousel step (≈350ms perceived). */
export const carouselSpring = { type: 'spring', stiffness: 260, damping: 32, mass: 1 } as const;
/** Header drop-in on load: soft, starts after ≈0.7s. */
export const headerSpring = { type: 'spring', stiffness: 60, damping: 14, mass: 1, delay: 0.7 } as const;

/** Text effects wait 0.2s after entering view; hero text starts 0.4s after mount. */
export const textDelay = 0.2;
export const heroTextDelay = 0.4;
/** Text rises from 75px below at opacity .001. */
export const textOffset = 75;

/** Fade-up offsets used across the pages, in px. */
export const fadeOffset = { sm: 35, md: 50, lg: 75, xl: 100, xxl: 150 } as const;
export type FadeOffset = keyof typeof fadeOffset;
/** Staggered blocks start 0.2s apart (.2, .4, .6 … 1.2s). */
export const staggerStep = 0.2;

/** Columns slide in from 200px to the side. */
export const slideOffset = 200;

/**
 * Text and the About card start when half of the element is in view, once
 * (threshold .5).
 */
export const textViewport = { once: true, amount: 0.5 } as const;

/**
 * Blocks start when their top passes 88% of the viewport height, once. A block taller than
 * two screens (common on phones) can never be half in view, so an edge margin is used.
 */
export const revealViewport = { once: true, margin: '0px 0px -12% 0px' } as const;
