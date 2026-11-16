import { medicareFigures } from '../../content/medicare-figures.ts';
import type { Bound, FilingStatus, IrmaaTier } from '../../content/medicare-figures.ts';

export type IrmaaResult = {
  planYear: number;
  incomeYear: number;
  /** 1-based tier number in the CMS table. */
  tier: number;
  partBMonthly: number;
  partBAdjustment: number;
  partDAdjustment: number;
  /** Extra paid per month over the standard Part B premium and plan's Part D premium. */
  extraMonthly: number;
  extraYearly: number;
};

const within = (magi: number, bound: Bound) => bound === null || (bound.inclusive ? magi <= bound.max : magi < bound.max);

/**
 * Monthly Part B premium and Part D adjustment for a modified adjusted gross income (MAGI)
 * and filing status, using the current plan year's CMS table.
 */
export function calculateIrmaa(
  magi: number,
  status: FilingStatus,
  tiers: readonly IrmaaTier[] = medicareFigures.irmaaTiers,
): IrmaaResult {
  if (!Number.isFinite(magi) || magi < 0) throw new Error('Income must be a number of dollars, zero or more.');
  const index = tiers.findIndex((t) => t.bounds[status] !== 'n/a' && within(magi, t.bounds[status] as Bound));
  const t = tiers[index]!;
  const extraMonthly = Math.round((t.partBAdjustment + t.partDAdjustment) * 100) / 100;
  return {
    planYear: medicareFigures.planYear,
    incomeYear: medicareFigures.incomeYear,
    tier: index + 1,
    partBMonthly: t.partBMonthly,
    partBAdjustment: t.partBAdjustment,
    partDAdjustment: t.partDAdjustment,
    extraMonthly,
    extraYearly: Math.round(extraMonthly * 12 * 100) / 100,
  };
}

export const formatUSD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0 });
