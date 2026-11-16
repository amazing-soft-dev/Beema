'use client';

import { Calculator, WarningCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import type { FilingStatus } from '@/content/medicare-figures';
import { medicareFigures } from '@/content/medicare-figures';
import { track } from '@/lib/analytics';
import { calculateIrmaa, formatUSD } from '@/lib/medicare/irmaa';

const STATUSES: [FilingStatus, string][] = [
  ['individual', 'Single, head of household or qualifying surviving spouse'],
  ['joint', 'Married, filing jointly'],
  ['separate', 'Married, filing separately (and lived with your spouse)'],
];

/** IRMAA calculator: filing status + income from two years ago → monthly Part B and Part D amounts. */
export function IrmaaCalculator() {
  const f = medicareFigures;
  const [status, setStatus] = useState<FilingStatus>('individual');
  const [income, setIncome] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateIrmaa> | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const magi = Number(income.replace(/[$,\s]/g, ''));
    if (!income.trim() || !Number.isFinite(magi) || magi < 0) {
      setError('Please enter your income as a number of dollars, for example 125,000.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateIrmaa(magi, status));
    track('tool_result', { tool: 'irmaa-calculator' });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
      <form onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-card bg-surface p-6 md:p-8">
        <fieldset className="flex flex-col gap-2">
          <legend className="t-label mb-2 font-semibold">How did you file your {f.incomeYear} taxes?</legend>
          {STATUSES.map(([value, label]) => (
            <label key={value} className="flex min-h-12 cursor-pointer items-start gap-3 text-lg">
              <input type="radio" name="status" value={value} checked={status === value} onChange={() => setStatus(value)} className="mt-1 size-6 shrink-0 accent-green-700" />
              {label}
            </label>
          ))}
        </fieldset>
        <div className="flex flex-col gap-2">
          <label htmlFor="irmaa-income" className="t-label font-semibold">
            Your modified adjusted gross income for {f.incomeYear}
          </label>
          <p id="irmaa-income-hint" className="text-base">
            This is your adjusted gross income plus any tax-exempt interest, from your {f.incomeYear} tax return. For a joint return, use the combined amount.
          </p>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg" aria-hidden="true">
              $
            </span>
            <input
              id="irmaa-income"
              inputMode="numeric"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              aria-describedby={`irmaa-income-hint${error ? ' irmaa-error' : ''}`}
              aria-invalid={error ? true : undefined}
              className="min-h-14 w-full rounded-card-sm border-2 border-field bg-white pr-4 pl-9 text-xl"
            />
          </div>
        </div>
        {error && (
          <p id="irmaa-error" role="alert" className="flex gap-2 font-medium text-error">
            <Icon icon={WarningCircle} weight="fill" className="mt-1 shrink-0" />
            {error}
          </p>
        )}
        <Button type="submit" size="lg" icon={<Icon icon={Calculator} />}>
          Calculate
        </Button>
      </form>

      <div aria-live="polite" className="flex flex-col gap-6">
        {result ? (
          <>
            <h2 className="t-h3">Your {result.planYear} amounts</h2>
            {result.tier === 1 ? (
              <p className="t-lead">You pay no extra charge. Your Part B premium is the standard {formatUSD(result.partBMonthly)} a month.</p>
            ) : (
              <p className="t-lead">
                Your income is above the limit, so Medicare adds {formatUSD(result.extraMonthly)} a month ({formatUSD(result.extraYearly)} a year).
              </p>
            )}
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-card bg-sand p-6">
                <dt className="font-medium">Part B premium per month</dt>
                <dd className="t-h2 mt-1">{formatUSD(result.partBMonthly)}</dd>
                <dd className="text-base">Includes {formatUSD(result.partBAdjustment)} income-related amount</dd>
              </div>
              <div className="rounded-card bg-sand p-6">
                <dt className="font-medium">Added to your Part D premium</dt>
                <dd className="t-h2 mt-1">{formatUSD(result.partDAdjustment)}</dd>
                <dd className="text-base">Per month, on top of your drug plan’s premium</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="t-lead">
            Enter your filing status and income to see your {f.planYear} Part B premium and any extra charge for Part D.
          </p>
        )}
      </div>
    </div>
  );
}
