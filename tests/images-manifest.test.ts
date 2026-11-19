import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { IMAGE_WIDTHS, PHOTO_QUALITY } from '../src/lib/image-widths.ts';
import { photo } from '../src/lib/photos.ts';
import { WEBP_QUALITY, WIDTHS } from '../scripts/images/lib.mjs';

describe('image pipeline', () => {
  it('builds exactly the widths the static-export loader requests', () => {
    assert.deepEqual(WIDTHS, [...IMAGE_WIDTHS]);
  });

  it('uses one photo quality for next/image, its allow-list and the WebP variants', () => {
    assert.equal(WEBP_QUALITY, PHOTO_QUALITY);
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    assert.match(config, new RegExp(`qualities: \[${PHOTO_QUALITY}\]`));
  });

  it('throws a clear error for an unknown photo id', () => {
    assert.throws(() => photo('does-not-exist'), /Unknown photo "does-not-exist"/);
  });
});
