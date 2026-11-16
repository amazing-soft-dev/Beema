// Shared helpers for the image scripts.
import { readFileSync } from 'node:fs';

export const MANIFEST = 'scripts/images/manifest.json';
export const PHOTOS_DIR = 'public/photos';
export const VARIANTS_DIR = 'public/images';
/** Keep in sync with src/lib/image-widths.ts (asserted by tests/images-manifest.test.ts). */
export const WIDTHS = [480, 768, 1200, 1600, 2400];
export const LICENSES = {
  unsplash: { name: 'Unsplash License', url: 'https://unsplash.com/license' },
  pexels: { name: 'Pexels License', url: 'https://www.pexels.com/license/' },
};

/**
 * @typedef {object} Photo
 * @property {string} id            kebab-case, also the file name: public/photos/<id>.jpg
 * @property {'unsplash'|'pexels'} source
 * @property {string} sourceUrl     the photo's page on Unsplash or Pexels
 * @property {string} downloadUrl   direct image URL used by images:fetch
 * @property {string} photographer
 * @property {string} photographerUrl
 * @property {string} alt           plain-language description for screen readers
 * @property {string} [focal]       CSS object-position, e.g. "50% 30%"
 */

/** @returns {Photo[]} */
export function readManifest() {
  return JSON.parse(readFileSync(MANIFEST, 'utf8')).photos;
}

export const photoFile = (id) => `${PHOTOS_DIR}/${id}.jpg`;
