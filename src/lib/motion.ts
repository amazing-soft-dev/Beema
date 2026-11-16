/**
 * Motion constants read from the Beema site's own Framer bundle (audit/motion/scroll-reveals.md).
 * Most appear effects use one over-damped spring; text waits 0.2s after entering view.
 */
export const revealSpring = { type: 'spring', stiffness: 300, damping: 100, mass: 1 } as const;
export const textDelay = 0.2;

/**
 * Start when the element's top passes 88% of the viewport height, once.
 * The source used "50% of the element visible", which a block taller than two
 * screens (common on phones) can never reach, so an edge margin is used instead.
 */
export const revealViewport = { once: true, margin: '0px 0px -12% 0px' } as const;
