import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { reviews } from '../src/content/reviews.ts';
import { site } from '../src/content/site.ts';

describe('reviews content', () => {
  it('never ships invented ratings while the site uses placeholder data', () => {
    if (!site.placeholder) return;
    for (const p of reviews.platforms) {
      assert.equal(p.rating, null, `${p.name} rating must come from the real profile`);
      assert.equal(p.count, null, `${p.name} count must come from the real profile`);
    }
    assert.equal(reviews.quotes.length, 0, 'client quotes need real clients and written permission');
  });

  it('only lists quotes with recorded consent from plan members', () => {
    for (const q of reviews.quotes) {
      assert.equal(q.consent, true);
      assert.equal(q.planMember, true);
      assert.equal(typeof q.paid, 'boolean');
    }
  });

  it('keeps ratings between 1 and 5', () => {
    for (const p of reviews.platforms) if (p.rating !== null) assert.ok(p.rating >= 1 && p.rating <= 5);
  });
});
