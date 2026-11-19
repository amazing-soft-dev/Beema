/** Widths pre-built by `npm run images` for the static export (see scripts/images). */
export const IMAGE_WIDTHS = [480, 768, 1200, 1600, 2400] as const;

/** Smallest pre-built width that covers `width`, or the largest one. */
export function pickWidth(width: number): number {
  return IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]!;
}

/**
 * Photo quality for next/image (server build) and the pre-built WebP variants (static export,
 * WEBP_QUALITY in scripts/images/lib.mjs). 85 keeps faces and fine detail crisp; the default 75
 * left visible softness on large photos. next.config.ts allows this value in images.qualities.
 */
export const PHOTO_QUALITY = 85;
