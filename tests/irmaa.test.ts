import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { medicareFigures } from '../src/content/medicare-figures.ts';
import { calculateIrmaa, formatUSD } from '../src/lib/medicare/irmaa.ts';

const partB = (magi: number, status: 'individual' | 'joint' | 'separate') => calculateIrmaa(magi, status).partBMonthly;

describe('IRMAA 2027 (CMS fact sheet, Nov 17 2026)', () => {
  it('uses the current plan year and its income year', () => {
    const r = calculateIrmaa(50_000, 'individual');
    assert.equal(r.planYear, medicareFigures.planYear);
    assert.equal(r.incomeYear, medicareFigures.planYear - 2);
  });

  it('individual bands are inclusive at the top (≤), except the $500,000 edge (<)', () => {
    assert.equal(partB(112_000, 'individual'), 209.4);
    assert.equal(partB(112_001, 'individual'), 293.1);
    assert.equal(partB(141_000, 'individual'), 293.1);
    assert.equal(partB(141_001, 'individual'), 418.8);
    assert.equal(partB(177_000, 'individual'), 418.8);
    assert.equal(partB(212_000, 'individual'), 544.4);
    assert.equal(partB(499_999, 'individual'), 670);
    assert.equal(partB(500_000, 'individual'), 711.8);
  });

  it('joint bands double the individual ones, top edge at $750,000', () => {
    assert.equal(partB(224_000, 'joint'), 209.4);
    assert.equal(partB(224_001, 'joint'), 293.1);
    assert.equal(partB(424_000, 'joint'), 544.4);
    assert.equal(partB(749_999, 'joint'), 670);
    assert.equal(partB(750_000, 'joint'), 711.8);
  });

  it('married filing separately jumps from the base tier to tier 5, and tier 6 at $388,000', () => {
    assert.equal(calculateIrmaa(112_000, 'separate').tier, 1);
    assert.equal(calculateIrmaa(112_001, 'separate').tier, 5);
    assert.equal(calculateIrmaa(387_999, 'separate').tier, 5);
    assert.equal(calculateIrmaa(388_000, 'separate').tier, 6);
  });

  it('adds the Part D adjustment to the Part B adjustment for the yearly extra', () => {
    const r = calculateIrmaa(150_000, 'individual');
    assert.equal(r.partBAdjustment, 209.4);
    assert.equal(r.partDAdjustment, 39.7);
    assert.equal(r.extraMonthly, 249.1);
    assert.equal(r.extraYearly, 2989.2);
  });

  it('pins every 2027 Part B total and Part D adjustment at the top of each individual band', () => {
    const edges: [number, number, number][] = [
      [112_000, 209.4, 0],
      [141_000, 293.1, 15.4],
      [177_000, 418.8, 39.7],
      [212_000, 544.4, 64],
      [499_999, 670, 88.3],
      [500_000, 711.8, 96.4],
    ];
    for (const [magi, b, d] of edges) {
      const r = calculateIrmaa(magi, 'individual');
      assert.equal(r.partBMonthly, b, `Part B at ${magi}`);
      assert.equal(r.partDAdjustment, d, `Part D at ${magi}`);
    }
  });

  it('pins the 2027 joint band edges at twice the individual ones', () => {
    assert.equal(partB(282_000, 'joint'), 293.1);
    assert.equal(partB(282_001, 'joint'), 418.8);
    assert.equal(partB(354_000, 'joint'), 418.8);
    assert.equal(partB(354_001, 'joint'), 544.4);
    assert.equal(partB(424_001, 'joint'), 670);
  });

  it('charges married filing separately $670.00 / $88.30 between $112,000 and $388,000', () => {
    const r = calculateIrmaa(200_000, 'separate');
    assert.equal(r.partBMonthly, 670);
    assert.equal(r.partDAdjustment, 88.3);
    assert.equal(calculateIrmaa(388_000, 'separate').partBMonthly, 711.8);
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
