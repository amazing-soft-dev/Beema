import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { IMAGE_WIDTHS } from '../src/lib/image-widths.ts';
import { photo } from '../src/lib/photos.ts';
import { WIDTHS } from '../scripts/images/lib.mjs';

describe('image pipeline', () => {
  it('builds exactly the widths the static-export loader requests', () => {
    assert.deepEqual(WIDTHS, [...IMAGE_WIDTHS]);
  });

  it('throws a clear error for an unknown photo id', () => {
    assert.throws(() => photo('does-not-exist'), /Unknown photo "does-not-exist"/);
  });
});
