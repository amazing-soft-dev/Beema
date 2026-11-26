/**
 * Official Medicare cost figures, one plan year at a time.
 * Refresh every fall when CMS publishes next year's fact sheet (runbook: docs, #56).
 *
 * Source: CMS fact sheet "2027 Medicare Parts A & B Premiums and Deductibles", Nov 17, 2026,
 * https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 * Look-back year: SSA, "Premiums: Rules for Higher-Income Beneficiaries"
 * (2027 premiums are generally based on 2025 tax returns).
 * Checked against cms.gov on 2026-11-26.
 */

export type FilingStatus = 'individual' | 'joint' | 'separate';

/** Upper bound of an income band. `inclusive` = "less than or equal to"; otherwise "less than". */
export type Bound = { max: number; inclusive: boolean } | null;

export type IrmaaTier = {
  /** Upper income bound per filing status; null = no upper limit. */
  bounds: Record<FilingStatus, Bound | 'n/a'>;
  partBMonthly: number;
  partBAdjustment: number;
  partDAdjustment: number;
};

export const medicareFigures = {
  planYear: 2027,
  /** Tax year whose income (MAGI) is used, usually two years before the plan year. */
  incomeYear: 2025,
  verifiedOn: '2026-11-26',
  sources: {
    cms: 'https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles',
    ssa: 'https://www.ssa.gov/benefits/medicare/medicare-premiums.html',
    lifeChangingEvent: 'https://www.ssa.gov/forms/ssa-44.pdf',
  },
  partB: { standardMonthly: 209.4, annualDeductible: 292 },
  /** Part A inpatient hospital deductible per benefit period (CMS 2027 fact sheet). */
  partA: { inpatientDeductible: 1776 },
  /**
   * Part D yearly out-of-pocket threshold (cap) for covered drugs. Source: CMS, "Announcement of
   * Calendar Year 2027 Medicare Advantage Capitation Rates and Part C and Part D Payment Policies",
   * https://www.cms.gov/files/document/2027-announcement.pdf ($2,100 in 2026).
   */
  partD: { outOfPocketCap: 2400 },
  /**
   * Income tiers, lowest first. Joint and individual returns share the six tiers;
   * married filing separately (lived with spouse) only uses tiers 1, 5 and 6.
   */
  irmaaTiers: [
    {
      bounds: { individual: { max: 112_000, inclusive: true }, joint: { max: 224_000, inclusive: true }, separate: { max: 112_000, inclusive: true } },
      partBMonthly: 209.4,
      partBAdjustment: 0,
      partDAdjustment: 0,
    },
    {
      bounds: { individual: { max: 141_000, inclusive: true }, joint: { max: 282_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 293.1,
      partBAdjustment: 83.7,
      partDAdjustment: 15.4,
    },
    {
      bounds: { individual: { max: 177_000, inclusive: true }, joint: { max: 354_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 418.8,
      partBAdjustment: 209.4,
      partDAdjustment: 39.7,
    },
    {
      bounds: { individual: { max: 212_000, inclusive: true }, joint: { max: 424_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 544.4,
      partBAdjustment: 335,
      partDAdjustment: 64,
    },
    {
      bounds: { individual: { max: 500_000, inclusive: false }, joint: { max: 750_000, inclusive: false }, separate: { max: 388_000, inclusive: false } },
      partBMonthly: 670,
      partBAdjustment: 460.6,
      partDAdjustment: 88.3,
    },
    {
      bounds: { individual: null, joint: null, separate: null },
      partBMonthly: 711.8,
      partBAdjustment: 502.4,
      partDAdjustment: 96.4,
    },
  ] satisfies IrmaaTier[],
} as const;
