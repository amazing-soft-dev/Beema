import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { type Answers, freeAlternatives, isBirthMonth, isZip, match, matchTitle, windowFor } from '../src/lib/match/engine.ts';
import { home } from '../src/content/home.ts';

const today = '2026-11-17';
const base: Answers = { zip: '78701', birthMonth: '1961-12', work: 'none', doctors: 'skip', drugs: 'skip', budget: 'unsure', travel: 'sometimes' };
const run = (a: Partial<Answers>) => match({ ...base, ...a }, today);

describe('AI Plan Match rules', () => {
  it('keeps large-employer coverage and explains the 8-month window', () => {
    const m = run({ work: 'employer-large' });
    assert.equal(m.type, 'keep-employer');
    assert.match(m.reasons.join(' '), /8-month Special Enrollment Period/);
  });

  it('suggests Medigap for frequent travellers who want predictable costs and their doctors', () => {
    const m = run({ travel: 'often', budget: 'predictable', doctors: 'keep-specific' });
    assert.equal(m.type, 'medigap');
    assert.equal(m.topic, 'medigap');
  });

  it('suggests Medicare Advantage for a low premium close to home with flexible doctors', () => {
    const m = run({ travel: 'rarely', budget: 'low-premium', doctors: 'flexible', drugs: 'several' });
    assert.equal(m.type, 'medicare-advantage');
  });

  it('asks to compare both when answers are balanced', () => {
    assert.equal(run({ travel: 'sometimes', budget: 'unsure' }).type, 'compare-both');
  });

  it('works without the optional health answers', () => {
    const m = run({ travel: 'often', budget: 'predictable', doctors: 'skip', drugs: 'skip' });
    assert.equal(m.type, 'medigap');
  });

  it('always gives three reasons and at least one trade-off', () => {
    for (const work of ['none', 'employer-large', 'employer-small', 'retiree', 'cobra'] as const) {
      for (const budget of ['low-premium', 'predictable', 'unsure'] as const) {
        const m = run({ work, budget });
        assert.equal(m.reasons.length, 3);
        assert.ok(m.reasons.every(Boolean));
        assert.ok(m.tradeoffs.length >= 1);
      }
    }
  });

  it('warns that COBRA does not delay Part B', () => {
    assert.match(run({ work: 'cobra' }).tradeoffs[0]!, /COBRA/);
  });

  it('never names a company or a specific plan product', () => {
    const text = JSON.stringify(run({ travel: 'often', budget: 'predictable' }));
    assert.doesNotMatch(text, /Humana|UnitedHealthcare|Aetna|Cigna|Mutual of Omaha|Blue Cross|Wellcare/i);
  });

  it('lists the three free alternatives', () => {
    assert.deepEqual(
      freeAlternatives.map((a) => a.label.split(' ')[0]),
      ['Medicare.gov', '1-800-MEDICARE', 'Your'],
    );
  });

  it('gives the enrollment window while it is still ahead', () => {
    assert.deepEqual(windowFor('1961-12', today), { start: '2026-09-01', end: '2027-03-31' });
    assert.equal(windowFor('1950-01', today), undefined);
  });

  it('validates ZIP codes, birth months and result keys', () => {
    assert.ok(isZip('78701'));
    assert.ok(!isZip('7870'));
    assert.ok(isBirthMonth('1961-12'));
    assert.ok(!isBirthMonth('1961-13'));
    assert.equal(matchTitle('medigap'), 'Original Medicare with a Medigap plan');
    assert.equal(matchTitle('nonsense'), undefined);
  });
});

describe('home plan match example', () => {
  it('is a real engine result: one coverage type, three reasons, no company, no dates', () => {
    const e = home.matchBox.example;
    const m = match(e.answers, e.today);
    assert.equal(m.type, 'medigap');
    assert.equal(new Set(m.reasons).size, 3);
    assert.ok(m.tradeoffs.length >= 2);
    assert.equal(m.window, undefined);
    assert.doesNotMatch(JSON.stringify(m), /Humana|UnitedHealthcare|Aetna|Cigna|Mutual of Omaha|Blue Cross|Wellcare/i);
    assert.match(e.label, /example/i);
  });
});
