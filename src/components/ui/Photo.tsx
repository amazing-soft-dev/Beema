import Image from 'next/image';
import { PHOTO_QUALITY } from '@/lib/image-widths';
import { photo } from '@/lib/photos';

/**
 * Manifest photo in a rounded, cropped frame (Beema image cards: 16px radius, no shadow).
 * The parent decides the size; the image fills it with the photo's focal point.
 * `id` must be a string literal so `npm run check:images` can count each use.
 */
export function Photo({
  id,
  sizes,
  priority = false,
  className = '',
  rounded = true,
}: {
  id: string;
  /** Rendered width hints for the responsive srcset, e.g. "(min-width: 1200px) 560px, 100vw". */
  sizes: string;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
}) {
  const p = photo(id);
  return (
    // Decorative photos are left out of print and PDFs to save paper.
    <div className={`relative overflow-hidden print:hidden ${rounded ? 'rounded-card' : ''} ${className}`.trim()}>
      <Image src={p.src} alt={p.alt} fill quality={PHOTO_QUALITY} sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: p.position }} />
    </div>
  );
}
