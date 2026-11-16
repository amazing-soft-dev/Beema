import manifest from '../../scripts/images/manifest.json' with { type: 'json' };

export type PhotoSource = 'unsplash' | 'pexels';

export type PhotoEntry = {
  id: string;
  source: PhotoSource;
  sourceUrl: string;
  downloadUrl: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  focal?: string;
};

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position for cropped images. */
  position: string;
  credit: { photographer: string; photographerUrl: string; sourceUrl: string; source: PhotoSource };
};

const entries = (manifest as { photos: PhotoEntry[] }).photos;
const byId = new Map(entries.map((p) => [p.id, p]));

/**
 * Look up a photo by manifest id. Each id must be referenced exactly once in src/
 * (enforced by `npm run check:images`), so the same picture never repeats across pages.
 */
export function photo(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown photo "${id}". Add it to scripts/images/manifest.json.`);
  return {
    src: `/photos/${p.id}.jpg`,
    alt: p.alt,
    position: p.focal ?? '50% 50%',
    credit: { photographer: p.photographer, photographerUrl: p.photographerUrl, sourceUrl: p.sourceUrl, source: p.source },
  };
}

/** Every photo with its credit, for the photo credits page. */
export function allPhotoCredits(): PhotoEntry[] {
  return entries;
}
