import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import imageLoader from '../src/lib/image-loader.ts';
import { IMAGE_WIDTHS, pickWidth } from '../src/lib/image-widths.ts';

describe('pickWidth', () => {
  it('returns the smallest pre-built width that covers the request', () => {
    assert.equal(pickWidth(1), 480);
    assert.equal(pickWidth(480), 480);
    assert.equal(pickWidth(481), 768);
    assert.equal(pickWidth(1599), 1600);
  });

  it('caps at the largest pre-built width', () => {
    assert.equal(pickWidth(10_000), IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]);
  });
});

describe('imageLoader (static export)', () => {
  it('maps a photo to its pre-built WebP variant', () => {
    assert.equal(imageLoader({ src: '/photos/advisor-call.jpg', width: 700 }), '/images/advisor-call-768.webp');
    assert.equal(imageLoader({ src: '/photos/couple_walk.PNG', width: 2000 }), '/images/couple_walk-2400.webp');
  });

  it('leaves non-photo sources unchanged', () => {
    assert.equal(imageLoader({ src: '/logo.svg', width: 200 }), '/logo.svg');
    assert.equal(imageLoader({ src: '/photos/nested/x.jpg', width: 200 }), '/photos/nested/x.jpg');
    assert.equal(imageLoader({ src: 'https://example.com/a.jpg', width: 200 }), 'https://example.com/a.jpg');
  });
});
