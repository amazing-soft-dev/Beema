/**
 * Medicare enrollment date rules for people turning 65. Pure functions, no time zones:
 * every date is a calendar date ("YYYY-MM-DD") handled in UTC.
 *
 * Sources (checked 2026-11-15):
 * - SSA POMS GN 00302.400: "An individual attains a particular age on the first moment of
 *   the day preceding the anniversary of his/her birth." So someone born on the 1st turns
 *   65 in the previous month, and every window keyed to that month moves a month earlier.
 * - Medicare.gov, "When does Medicare coverage start?": the Initial Enrollment Period lasts
 *   7 months (3 before, the month you turn 65, 3 after). Part B: sign up before the month
 *   you turn 65 → starts that month; sign up that month or the 3 after → starts the next
 *   month. General Enrollment (Jan 1 – Mar 31) → starts the month after you sign up.
 *   Employer Special Enrollment Period ends 8 months after employment or group coverage
 *   ends, whichever happens first.
 * - Medigap Open Enrollment: 6 months starting the first month you are 65+ and have Part B.
 *
 * February 29 birthdays: the 65th anniversary never falls in a leap year (a leap birth year
 * plus 65 is not divisible by 4). Whether that anniversary counts as Feb 28 or Mar 1, the
 * day before it is in February, so the person turns 65 in February.
 */

export type ISODate = string; // YYYY-MM-DD

export type Month = { year: number; month: number }; // month 1–12

export type Window = { start: ISODate; end: ISODate };

const pad = (n: number) => String(n).padStart(2, '0');

export function parseDate(iso: ISODate): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) throw new Error(`Invalid date "${iso}" (expected YYYY-MM-DD)`);
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) {
    throw new Error(`Invalid date "${iso}"`);
  }
  return date;
}

export const toISO = (d: Date): ISODate => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

/** Month offset, normalizing across years. */
export function addMonths({ year, month }: Month, n: number): Month {
  const index = year * 12 + (month - 1) + n;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

export const firstDay = ({ year, month }: Month): ISODate => `${year}-${pad(month)}-01`;
export const lastDay = ({ year, month }: Month): ISODate => toISO(new Date(Date.UTC(year, month, 0)));
const monthOf = (iso: ISODate): Month => {
  const d = parseDate(iso);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 };
};
const compareMonths = (a: Month, b: Month) => a.year * 12 + a.month - (b.year * 12 + b.month);

/** The legal date someone attains 65: the day before the 65th anniversary of birth. */
export function attains65On(birthDate: ISODate): ISODate {
  const b = parseDate(birthDate);
  const [y, m, d] = [b.getUTCFullYear() + 65, b.getUTCMonth(), b.getUTCDate()];
  // Feb 29 has no anniversary in the (never leap) 65th year; use Mar 1 so the day before is Feb 28.
  const anniversary = m === 1 && d === 29 ? new Date(Date.UTC(y, 2, 1)) : new Date(Date.UTC(y, m, d));
  anniversary.setUTCDate(anniversary.getUTCDate() - 1);
  return toISO(anniversary);
}

/** The month Medicare treats as "the month you turn 65". */
export const turns65Month = (birthDate: ISODate): Month => monthOf(attains65On(birthDate));

/** 7-month Initial Enrollment Period. */
export function initialEnrollmentPeriod(birthDate: ISODate): Window & { months: Month[] } {
  const m65 = turns65Month(birthDate);
  const months = Array.from({ length: 7 }, (_, i) => addMonths(m65, i - 3));
  return { start: firstDay(months[0]!), end: lastDay(months[6]!), months };
}

/** Premium-free Part A starts the first day of the month you turn 65. */
export const partAStart = (birthDate: ISODate): ISODate => firstDay(turns65Month(birthDate));

export type PartBStart =
  | { kind: 'initial'; start: ISODate }
  | { kind: 'outside-initial'; reason: 'too-early' | 'after-iep' };

/** Part B start date when signing up on `signupDate` during the Initial Enrollment Period. */
export function partBStartDuringIEP(birthDate: ISODate, signupDate: ISODate): PartBStart {
  const m65 = turns65Month(birthDate);
  const signup = monthOf(signupDate);
  const diff = compareMonths(signup, m65);
  if (diff < -3) return { kind: 'outside-initial', reason: 'too-early' };
  if (diff > 3) return { kind: 'outside-initial', reason: 'after-iep' };
  // Before the month you turn 65 → that month; that month or the 3 after → the next month.
  return { kind: 'initial', start: firstDay(diff < 0 ? m65 : addMonths(signup, 1)) };
}

/** General Enrollment Period of a year and the Part B start for signing up on `signupDate`. */
export function generalEnrollment(signupDate: ISODate): { window: Window; inWindow: boolean; start: ISODate | null } {
  const signup = monthOf(signupDate);
  const window = { start: `${signup.year}-01-01`, end: `${signup.year}-03-31` };
  const inWindow = signup.month <= 3;
  return { window, inWindow, start: inWindow ? firstDay(addMonths(signup, 1)) : null };
}

/**
 * 8-month Special Enrollment Period after employer coverage. `coverageEnds` is the date the
 * job or the group health coverage ended, whichever came first. The window runs through the
 * end of the 8th month after that month. (COBRA is not employer coverage.)
 */
export function employerSpecialEnrollment(coverageEnds: ISODate): Window {
  const ended = monthOf(coverageEnds);
  return { start: firstDay(addMonths(ended, 1)), end: lastDay(addMonths(ended, 8)) };
}

/** 6-month Medigap Open Enrollment, starting the month Part B starts (when 65 or older). */
export function medigapOpenEnrollment(partBStart: ISODate): Window {
  const start = monthOf(partBStart);
  return { start: firstDay(start), end: lastDay(addMonths(start, 5)) };
}
