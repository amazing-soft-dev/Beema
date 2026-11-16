import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import {
  addMonths,
  attains65On,
  employerSpecialEnrollment,
  generalEnrollment,
  initialEnrollmentPeriod,
  medigapOpenEnrollment,
  parseDate,
  partAStart,
  partBStartDuringIEP,
  turns65Month,
} from '../src/lib/medicare/dates.ts';

describe('attaining age 65 (SSA: the day before the birthday)', () => {
  it('matches the POMS GN 00302.400 example', () => {
    assert.equal(attains65On('1962-01-01'), '2026-12-31');
  });

  it('a mid-month birthday turns 65 in the birthday month', () => {
    assert.deepEqual(turns65Month('1961-06-15'), { year: 2026, month: 6 });
  });

  it('a 1st-of-month birthday turns 65 in the previous month', () => {
    assert.deepEqual(turns65Month('1961-07-01'), { year: 2026, month: 6 });
    assert.deepEqual(turns65Month('1962-01-01'), { year: 2026, month: 12 });
  });

  it('a 2nd-of-month birthday is not shifted', () => {
    assert.deepEqual(turns65Month('1961-07-02'), { year: 2026, month: 7 });
  });

  it('a February 29 birthday turns 65 in February', () => {
    assert.equal(attains65On('1960-02-29'), '2025-02-28');
    assert.deepEqual(turns65Month('1964-02-29'), { year: 2029, month: 2 });
  });
});

describe('Initial Enrollment Period', () => {
  it('runs 3 months before to 3 months after the month you turn 65', () => {
    const iep = initialEnrollmentPeriod('1961-06-15');
    assert.equal(iep.start, '2026-03-01');
    assert.equal(iep.end, '2026-09-30');
    assert.equal(iep.months.length, 7);
  });

  it('moves a month earlier for a 1st-of-month birthday', () => {
    const iep = initialEnrollmentPeriod('1961-07-01');
    assert.equal(iep.start, '2026-03-01');
    assert.equal(iep.end, '2026-09-30');
  });

  it('spans two years around a December or January birthday', () => {
    assert.deepEqual(initialEnrollmentPeriod('1961-12-31'), {
      start: '2026-09-01',
      end: '2027-03-31',
      months: [9, 10, 11, 12, 1, 2, 3].map((month, i) => ({ year: i < 4 ? 2026 : 2027, month })),
    });
    const jan = initialEnrollmentPeriod('1962-01-20');
    assert.equal(jan.start, '2026-10-01');
    assert.equal(jan.end, '2027-04-30');
  });

  it('ends on the last day of a short February', () => {
    assert.equal(initialEnrollmentPeriod('1961-11-10').end, '2027-02-28');
  });
});

describe('Part A and Part B start dates', () => {
  it('premium-free Part A starts the month you turn 65 (a month early if born on the 1st)', () => {
    assert.equal(partAStart('1961-06-15'), '2026-06-01');
    assert.equal(partAStart('1961-07-01'), '2026-06-01');
  });

  it('signing up in the 3 months before starts Part B the month you turn 65', () => {
    for (const signup of ['2026-03-01', '2026-04-15', '2026-05-31']) {
      assert.deepEqual(partBStartDuringIEP('1961-06-15', signup), { kind: 'initial', start: '2026-06-01' });
    }
  });

  it('signing up in the month you turn 65 or the 3 after starts it the next month', () => {
    assert.deepEqual(partBStartDuringIEP('1961-06-15', '2026-06-20'), { kind: 'initial', start: '2026-07-01' });
    assert.deepEqual(partBStartDuringIEP('1961-06-15', '2026-09-30'), { kind: 'initial', start: '2026-10-01' });
  });

  it('reports sign-ups outside the Initial Enrollment Period', () => {
    assert.deepEqual(partBStartDuringIEP('1961-06-15', '2026-02-28'), { kind: 'outside-initial', reason: 'too-early' });
    assert.deepEqual(partBStartDuringIEP('1961-06-15', '2026-10-01'), { kind: 'outside-initial', reason: 'after-iep' });
  });

  it('applies the 1st-of-month shift to Part B', () => {
    // Born July 1 → turns 65 in June; signing up in May starts Part B June 1.
    assert.deepEqual(partBStartDuringIEP('1961-07-01', '2026-05-10'), { kind: 'initial', start: '2026-06-01' });
  });
});

describe('other windows', () => {
  it('General Enrollment runs Jan 1 – Mar 31 and starts coverage the next month', () => {
    assert.deepEqual(generalEnrollment('2027-02-10'), { window: { start: '2027-01-01', end: '2027-03-31' }, inWindow: true, start: '2027-03-01' });
    assert.equal(generalEnrollment('2027-03-31').start, '2027-04-01');
    assert.equal(generalEnrollment('2027-05-01').inWindow, false);
  });

  it('employer Special Enrollment Period lasts 8 months after coverage ends', () => {
    assert.deepEqual(employerSpecialEnrollment('2027-05-15'), { start: '2027-06-01', end: '2028-01-31' });
  });

  it('Medigap Open Enrollment lasts 6 months from the Part B start', () => {
    assert.deepEqual(medigapOpenEnrollment('2026-10-01'), { start: '2026-10-01', end: '2027-03-31' });
  });
});

describe('helpers', () => {
  it('rejects impossible dates', () => {
    assert.throws(() => parseDate('2026-02-30'), /Invalid date/);
    assert.throws(() => parseDate('06/15/1961'), /Invalid date/);
  });

  it('adds months across years in both directions', () => {
    assert.deepEqual(addMonths({ year: 2026, month: 11 }, 3), { year: 2027, month: 2 });
    assert.deepEqual(addMonths({ year: 2026, month: 2 }, -3), { year: 2025, month: 11 });
  });
});
