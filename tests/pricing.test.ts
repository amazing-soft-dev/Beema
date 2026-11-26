import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { features, subscriptionStates, tiers } from '../src/content/pricing.ts';
import { site } from '../src/content/site.ts';

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
      assert.equal(t.monthly! * 12 - t.yearly!, t.monthly! * 2, `${id}: yearly saves two months`);
    }
  });

  it('charges only for ongoing extras: alerts, reminders and the caregiver dashboard', () => {
    const paidOnly = features.filter(([, basic, plus, family]) => basic === 'No' && (plus === 'Yes' || family === 'Yes')).map(([f]) => f);
    assert.deepEqual(paidOnly, ['Alerts when drug costs or doctor networks change', 'Deadline reminders', 'Caregiver dashboard']);
  });

  it('keeps the match, the yearly review and enrollment free for everyone', () => {
    for (const name of ['AI plan match', 'Yearly plan review with a licensed agent']) {
      assert.deepEqual(features.find(([f]) => f === name)!.slice(1), ['Yes', 'Yes', 'Yes'], name);
    }
    assert.ok(!features.some(([f]) => /priority|claims|annual ai check/i.test(f)));
  });
});


describe('where Plus and Family are offered', () => {
  it('is every licensed state except California', () => {
    assert.ok(!subscriptionStates.some((s) => s.code === 'CA'));
    assert.deepEqual(
      subscriptionStates.map((s) => s.code),
      site.licensedStates.filter((s) => s.code !== 'CA').map((s) => s.code),
    );
  });
});
