import { pickWidth } from './image-widths.ts';

/**
 * Custom next/image loader for the static export only (`NEXT_OUTPUT=export`).
 * Photos live at `/photos/<id>.<ext>`; `npm run images` writes `/images/<id>-<w>.webp`.
 * Anything else (SVG, icons) is returned unchanged.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const match = /^\/photos\/([\w-]+)\.(?:jpe?g|png|webp)$/i.exec(src);
  if (!match) return src;
  return `/images/${match[1]}-${pickWidth(width)}.webp`;
}
