import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { tiers } from '../src/content/pricing.ts';

const tier = (id: string) => tiers.find((t) => t.id === id)!;

describe('AI Plan Match tiers', () => {
  it('keeps Basic free', () => {
    assert.equal(tier('basic').monthly, 0);
    assert.equal(tier('basic').yearly, 0);
  });

  it('prices Plus at $9 a month and Family at $19, with a yearly option at about two months free', () => {
    assert.deepEqual([tier('plus').monthly, tier('plus').yearly], [9, 90]);
    assert.deepEqual([tier('family').monthly, tier('family').yearly], [19, 190]);
    for (const id of ['plus', 'family']) {
      const t = tier(id);
      assert.deepEqual(t.billing, ['monthly', 'yearly']);
      assert.equal(t.monthly! * 12 - t.yearly!, t.monthly! * 2 - (t.monthly! * 12 - t.yearly! - t.monthly! * 2), 'yearly saves about two months');
    }
  });
});
