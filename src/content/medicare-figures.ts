/**
 * Official Medicare cost figures, one plan year at a time.
 * Refresh every fall when CMS publishes next year's fact sheet (runbook: docs, #56).
 *
 * Source: CMS fact sheet "2026 Medicare Parts A & B Premiums and Deductibles", Nov 14, 2025,
 * https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 * Look-back year: SSA, "Premiums: Rules for Higher-Income Beneficiaries"
 * (2026 premiums are generally based on 2024 tax returns).
 * Checked 2026-11-15: no official 2027 fact sheet had been published yet.
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
  planYear: 2026,
  /** Tax year whose income (MAGI) is used, usually two years before the plan year. */
  incomeYear: 2024,
  verifiedOn: '2026-11-15',
  sources: {
    cms: 'https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles',
    ssa: 'https://www.ssa.gov/benefits/medicare/medicare-premiums.html',
    lifeChangingEvent: 'https://www.ssa.gov/forms/ssa-44.pdf',
  },
  partB: { standardMonthly: 202.9, annualDeductible: 283 },
  /**
   * Income tiers, lowest first. Joint and individual returns share the six tiers;
   * married filing separately (lived with spouse) only uses tiers 1, 5 and 6.
   */
  irmaaTiers: [
    {
      bounds: { individual: { max: 109_000, inclusive: true }, joint: { max: 218_000, inclusive: true }, separate: { max: 109_000, inclusive: true } },
      partBMonthly: 202.9,
      partBAdjustment: 0,
      partDAdjustment: 0,
    },
    {
      bounds: { individual: { max: 137_000, inclusive: true }, joint: { max: 274_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 284.1,
      partBAdjustment: 81.2,
      partDAdjustment: 14.5,
    },
    {
      bounds: { individual: { max: 171_000, inclusive: true }, joint: { max: 342_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 405.8,
      partBAdjustment: 202.9,
      partDAdjustment: 37.5,
    },
    {
      bounds: { individual: { max: 205_000, inclusive: true }, joint: { max: 410_000, inclusive: true }, separate: 'n/a' },
      partBMonthly: 527.5,
      partBAdjustment: 324.6,
      partDAdjustment: 60.4,
    },
    {
      bounds: { individual: { max: 500_000, inclusive: false }, joint: { max: 750_000, inclusive: false }, separate: { max: 391_000, inclusive: false } },
      partBMonthly: 649.2,
      partBAdjustment: 446.3,
      partDAdjustment: 83.3,
    },
    {
      bounds: { individual: null, joint: null, separate: null },
      partBMonthly: 689.9,
      partBAdjustment: 487,
      partDAdjustment: 91,
    },
  ] satisfies IrmaaTier[],
} as const;
