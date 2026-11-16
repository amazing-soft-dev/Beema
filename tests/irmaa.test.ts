import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { medicareFigures } from '../src/content/medicare-figures.ts';
import { calculateIrmaa, formatUSD } from '../src/lib/medicare/irmaa.ts';

const partB = (magi: number, status: 'individual' | 'joint' | 'separate') => calculateIrmaa(magi, status).partBMonthly;

describe('IRMAA 2026 (CMS fact sheet, Nov 14 2025)', () => {
  it('uses the current plan year and its income year', () => {
    const r = calculateIrmaa(50_000, 'individual');
    assert.equal(r.planYear, medicareFigures.planYear);
    assert.equal(r.incomeYear, medicareFigures.planYear - 2);
  });

  it('individual bands are inclusive at the top (≤), except the $500,000 edge (<)', () => {
    assert.equal(partB(109_000, 'individual'), 202.9);
    assert.equal(partB(109_001, 'individual'), 284.1);
    assert.equal(partB(137_000, 'individual'), 284.1);
    assert.equal(partB(137_001, 'individual'), 405.8);
    assert.equal(partB(171_000, 'individual'), 405.8);
    assert.equal(partB(205_000, 'individual'), 527.5);
    assert.equal(partB(499_999, 'individual'), 649.2);
    assert.equal(partB(500_000, 'individual'), 689.9);
  });

  it('joint bands double the individual ones, top edge at $750,000', () => {
    assert.equal(partB(218_000, 'joint'), 202.9);
    assert.equal(partB(218_001, 'joint'), 284.1);
    assert.equal(partB(410_000, 'joint'), 527.5);
    assert.equal(partB(749_999, 'joint'), 649.2);
    assert.equal(partB(750_000, 'joint'), 689.9);
  });

  it('married filing separately jumps from the base tier to tier 5, and tier 6 at $391,000', () => {
    assert.equal(calculateIrmaa(109_000, 'separate').tier, 1);
    assert.equal(calculateIrmaa(109_001, 'separate').tier, 5);
    assert.equal(calculateIrmaa(390_999, 'separate').tier, 5);
    assert.equal(calculateIrmaa(391_000, 'separate').tier, 6);
  });

  it('adds the Part D adjustment to the Part B adjustment for the yearly extra', () => {
    const r = calculateIrmaa(150_000, 'individual');
    assert.equal(r.partBAdjustment, 202.9);
    assert.equal(r.partDAdjustment, 37.5);
    assert.equal(r.extraMonthly, 240.4);
    assert.equal(r.extraYearly, 2884.8);
  });

  it('rejects negative or non-numeric income', () => {
    assert.throws(() => calculateIrmaa(-1, 'joint'), /zero or more/);
    assert.throws(() => calculateIrmaa(Number.NaN, 'joint'), /zero or more/);
  });

  it('formats dollars for display', () => {
    assert.equal(formatUSD(202.9), '$202.90');
    assert.equal(formatUSD(109000), '$109,000');
  });
});
