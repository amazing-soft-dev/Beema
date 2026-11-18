'use client';

import { CalendarBlank, Printer, WarningCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { track } from '@/lib/analytics';
import {
  attains65On,
  firstDay,
  initialEnrollmentPeriod,
  lastDay,
  medigapOpenEnrollment,
  partAStart,
  turns65Month,
  addMonths,
} from '@/lib/medicare/dates';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmt = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
const fmtMonth = (iso: string) => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

type Working = 'no' | 'large' | 'small';
type Result = ReturnType<typeof compute>;

function compute(birth: string, working: Working) {
  const m65 = turns65Month(birth);
  const iep = initialEnrollmentPeriod(birth);
  const partBStart = firstDay(m65);
  return {
    birth,
    bornOnFirst: birth.endsWith('-01'),
    attains: attains65On(birth),
    iep,
    partA: partAStart(birth),
    signUpBy: lastDay(addMonths(m65, -1)),
    partBStart,
    medigap: medigapOpenEnrollment(partBStart),
    working,
  };
}

const field = 'min-h-14 w-full min-w-0 rounded-card-sm border-2 border-field bg-white px-4 text-lg';

/** Turning-65 enrollment date calculator: date of birth and work situation → dated timeline. */
export function EnrollmentCalculator() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [working, setWorking] = useState<Working>('no');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(year);
    const thisYear = new Date().getFullYear();
    const iso = `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    if (!month || !day || !year || y < thisYear - 100 || y > thisYear - 40) {
      setError(`Please enter your full date of birth, with a year between ${thisYear - 100} and ${thisYear - 40}.`);
      setResult(null);
      return;
    }
    try {
      const r = compute(iso, working);
      setError('');
      setResult(r);
      track('tool_result', { tool: 'enrollment-calculator' });
    } catch {
      setError('That date does not exist. Please check the day and month.');
      setResult(null);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
      <form onSubmit={submit} noValidate className="flex min-w-0 flex-col gap-6 rounded-card bg-surface p-6 md:p-8 print:hidden" aria-describedby={error ? 'calc-error' : undefined}>
        <fieldset className="flex flex-col gap-3">
          <legend className="t-label mb-2 font-semibold">Your date of birth</legend>
          {/* minmax(0, …) lets the columns shrink below the select and inputs’ natural width. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
            <label className="flex flex-col gap-1 text-base">
              Month
              <select value={month} onChange={(e) => setMonth(e.target.value)} className={field} autoComplete="bday-month">
                <option value="">Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={String(i + 1)}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-base">
              Day
              <input value={day} onChange={(e) => setDay(e.target.value.replace(/\D/g, '').slice(0, 2))} inputMode="numeric" autoComplete="bday-day" className={field} />
            </label>
            <label className="flex flex-col gap-1 text-base">
              Year
              <input value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))} inputMode="numeric" autoComplete="bday-year" className={field} />
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="t-label mb-2 font-semibold">At 65, will you still have health coverage from a job (yours or your spouse’s)?</legend>
          {(
            [
              ['no', 'No, I will be retired or not covered by a job'],
              ['large', 'Yes, and the employer has 20 or more employees'],
              ['small', 'Yes, but the employer has fewer than 20 employees'],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex min-h-12 cursor-pointer items-start gap-3 text-lg">
              <input type="radio" name="working" value={value} checked={working === value} onChange={() => setWorking(value)} className="mt-1 size-6 shrink-0 accent-navy-700" />
              {label}
            </label>
          ))}
        </fieldset>

        {error && (
          <p id="calc-error" role="alert" className="flex gap-2 font-medium text-error">
            <Icon icon={WarningCircle} weight="fill" className="mt-1 shrink-0" />
            {error}
          </p>
        )}
        <Button type="submit" size="lg" icon={<Icon icon={CalendarBlank} />}>
          Show my dates
        </Button>
      </form>

      <div aria-live="polite" className="min-w-0">
        {result ? <Timeline r={result} /> : <p className="t-lead">Enter your date of birth to see your personal Medicare dates.</p>}
      </div>
    </div>
  );
}

function Timeline({ r }: { r: Result }) {
  const rows: { when: string; what: string; detail?: string }[] = [
    {
      when: `${fmt(r.iep.start)} to ${fmt(r.iep.end)}`,
      what: 'Your Initial Enrollment Period',
      detail: 'Seven months: three before the month you turn 65, that month, and three after. This is your first chance to sign up for Medicare.',
    },
    {
      when: fmtMonth(r.partA),
      what: 'The month Medicare counts you as 65',
      detail: r.bornOnFirst
        ? `You were born on the 1st, so Medicare treats you as turning 65 on ${fmt(r.attains)}, a month early.`
        : 'Premium-free Part A (hospital insurance) can start on the 1st of this month.',
    },
  ];

  if (r.working === 'large') {
    rows.push(
      {
        when: 'While you keep that job coverage',
        what: 'You can usually delay Part B without a penalty',
        detail: 'Many people still sign up for premium-free Part A. Check with the employer’s benefits office before you decide.',
      },
      {
        when: 'When the job or the coverage ends',
        what: 'You get an 8-month Special Enrollment Period',
        detail: 'It starts the month after the job or the coverage ends, whichever comes first. COBRA and retiree coverage do not count as job coverage. Your 6-month Medigap Open Enrollment starts when your Part B starts.',
      },
    );
  } else {
    rows.push(
      {
        when: `By ${fmt(r.signUpBy)}`,
        what: 'Sign up for Part B so coverage starts on time',
        detail: `If you sign up by this date, Part B (medical insurance) starts ${fmt(r.partBStart)}. Signing up later in your Initial Enrollment Period starts it the month after you sign up.`,
      },
      {
        when: `${fmt(r.medigap.start)} to ${fmt(r.medigap.end)}`,
        what: 'Your 6-month Medigap Open Enrollment',
        detail: 'If Part B starts on time, this is when insurers must sell you a Medicare Supplement (Medigap) policy without checking your health.',
      },
    );
    if (r.working === 'small') {
      rows.push({
        when: 'Small-employer coverage',
        what: 'Medicare usually pays first',
        detail: 'With fewer than 20 employees, the job plan usually pays after Medicare, so most people should sign up for Part A and Part B on time.',
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="t-h3">Your Medicare dates</h2>
        <Button variant="outline" onClick={() => window.print()} icon={<Icon icon={Printer} />} className="print:hidden">
          Print my dates
        </Button>
      </div>
      <ol className="flex flex-col">
        {rows.map((row) => (
          <li key={row.what} className="grid gap-1 border-l-4 border-gold py-4 pl-6 md:grid-cols-[220px_1fr] md:gap-6">
            <p className="font-semibold text-navy-700">{row.when}</p>
            <div>
              <p className="t-h4">{row.what}</p>
              {row.detail && <p className="mt-1">{row.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
      <p className="rounded-card-sm bg-sand p-5 text-base">
        These dates follow Social Security and Medicare.gov rules for most people. Your situation may differ, so confirm with Social Security
        (1-800-772-1213) or talk with one of our licensed advisors.
      </p>
    </div>
  );
}
