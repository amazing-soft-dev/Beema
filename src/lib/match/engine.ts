/**
 * AI Plan Match: the free recommendation rules (Hybrid Website Plan §2 and §6).
 *
 * It suggests a COVERAGE TYPE, never a named plan or company, with plain-language reasons
 * and trade-offs, and always lists the free, unbiased alternatives. Rules look only at the
 * visitor's situation; nothing here knows or cares what any plan pays us ("No steering").
 * A licensed person reviews every match before any enrollment. Pure functions, so the
 * same answers always give the same result and the inputs and reasons can be logged.
 */
import { type ISODate, initialEnrollmentPeriod } from '../medicare/dates.ts';

export type WorkCoverage =
  | 'none'
  | 'employer-large'
  | 'employer-small'
  | 'retiree'
  | 'cobra'
  | 'marketplace'
  /** Special situations a licensed agent must look at first (review 2026-11-25, INS-25). */
  | 'medicaid'
  | 'va'
  | 'tricare'
  | 'disability-esrd';
export type Doctors = 'keep-specific' | 'flexible' | 'skip';
export type Drugs = 'none' | 'few' | 'several' | 'skip';
export type Budget = 'low-premium' | 'predictable' | 'unsure';
export type Travel = 'often' | 'sometimes' | 'rarely';

export type Answers = {
  zip: string;
  /** YYYY-MM */
  birthMonth: string;
  work: WorkCoverage;
  /** Health questions are optional and need their own consent; 'skip' when declined. */
  doctors: Doctors;
  drugs: Drugs;
  budget: Budget;
  travel: Travel;
};

export type MatchType = 'medigap' | 'medicare-advantage' | 'keep-employer' | 'compare-both' | 'talk-to-agent';

export type Alternative = { label: string; href: string; detail: string };

export type Match = {
  type: MatchType;
  /** Plain-language headline: the coverage type that fits. */
  title: string;
  summary: string;
  /** Exactly three reasons it fits, most important first. */
  reasons: [string, string, string];
  tradeoffs: string[];
  /** Initial Enrollment Period for the birth month given, when it is still useful. */
  window?: { start: ISODate; end: ISODate };
  /** Book a Call topic to carry into the appointment. */
  topic: 'medigap' | 'medicare-advantage' | 'turning-65';
  /** Guide page for the recommendation. */
  learnMore: { label: string; href: string };
};

/** Free, unbiased help shown next to every result (plan §6, "Free alternatives"). */
export const freeAlternatives: Alternative[] = [
  { label: 'Medicare.gov Plan Finder', href: 'https://www.medicare.gov/plan-compare/', detail: 'Compare every plan in your area yourself.' },
  { label: '1-800-MEDICARE (1-800-633-4227)', href: 'tel:+18006334227', detail: 'Medicare’s own helpline, 24 hours a day. TTY 1-877-486-2048.' },
  { label: 'Your State Health Insurance Assistance Program (SHIP)', href: 'https://www.shiphelp.org/', detail: 'Free, unbiased local counseling.' },
];

export const isZip = (zip: string) => /^\d{5}$/.test(zip.trim());
export const isBirthMonth = (m: string) => /^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(m);

/** Initial Enrollment Period for a birth month; mid-month so the 1st-of-month rule doesn't apply. */
export function windowFor(birthMonth: string, today: ISODate): Match['window'] {
  if (!isBirthMonth(birthMonth)) return undefined;
  const iep = initialEnrollmentPeriod(`${birthMonth}-15`);
  // Only useful while the window is ahead or open.
  return iep.end >= today ? { start: iep.start, end: iep.end } : undefined;
}

type Score = { medigap: number; ma: number; why: { medigap: string[]; ma: string[] } };

function score(a: Answers): Score {
  const s: Score = { medigap: 0, ma: 0, why: { medigap: [], ma: [] } };
  const add = (side: 'medigap' | 'ma', n: number, reason: string) => {
    s[side] += n;
    s.why[side].push(reason);
  };
  if (a.travel === 'often') add('medigap', 2, 'You travel often, and Original Medicare with Medigap works with any doctor in the U.S. who accepts Medicare.');
  if (a.travel === 'sometimes') add('medigap', 1, 'You travel some of the year, and Original Medicare works across the country, not just in one plan’s area.');
  if (a.travel === 'rarely') add('ma', 1, 'You mostly stay close to home, so a local plan network is less of a limit.');
  if (a.doctors === 'keep-specific') add('medigap', 2, 'You want to keep specific doctors, and Medigap has no network: any doctor who accepts Medicare will do.');
  if (a.doctors === 'flexible') add('ma', 1, 'You are open to new doctors, so using a plan’s network should be easy.');
  if (a.budget === 'predictable') add('medigap', 2, 'You prefer predictable costs, and Medigap leaves few or no bills when you use care.');
  if (a.budget === 'low-premium') add('ma', 2, 'You want a low monthly premium, and many Medicare Advantage plans charge little or nothing beyond Part B.');
  if (a.drugs === 'several') add('ma', 1, 'You take several prescriptions, and most Medicare Advantage plans include drug coverage in one plan.');
  return s;
}

const generic = {
  medigap: ['Medigap plans are standardized, so you can compare prices for the same coverage.', 'Your Medigap Open Enrollment gives you 6 months to buy with no health questions.'],
  ma: ['Every Medicare Advantage plan has a yearly limit on what you pay for covered care.', 'You can review and change Medicare Advantage plans every fall.'],
};

const pick3 = (list: string[]): [string, string, string] => [list[0]!, list[1]!, list[2]!];

/** Coverage that does not let you delay Part B without a penalty. */
const partBWarning: Partial<Record<WorkCoverage, string>> = {
  cobra: 'COBRA does not count as current job coverage: sign up for Part B during your enrollment window to avoid a lifelong penalty.',
  retiree: 'Retiree coverage does not let you delay Part B without a penalty, and it usually pays after Medicare.',
  'employer-small': 'With an employer under 20 employees, Medicare usually pays first, so you normally need Part B at 65.',
};

/** The recommendation for a set of answers. `today` is passed in so results are testable. */
export function match(a: Answers, today: ISODate): Match {
  const result = recommend(a, today);
  const warning = partBWarning[a.work];
  return warning ? { ...result, tradeoffs: [warning, ...result.tradeoffs] } : result;
}

type SpecialCoverage = 'marketplace' | 'medicaid' | 'va' | 'tricare' | 'disability-esrd';

/**
 * Coverage that changes the usual Medigap-or-Advantage choice. These answers never get a
 * Medigap or Medicare Advantage result; a licensed agent looks at them first (review
 * 2026-11-25, INS-25, with the California Medi-Cal right from Ins. Code 10192.11(i)).
 */
const special: Record<SpecialCoverage, { summary: string; reasons: [string, string, string]; tradeoffs: string[] }> = {
  medicaid: {
    summary: 'With Medicaid (Medi-Cal in California) or state help with Medicare costs, the usual choices work differently. A licensed agent should look at your situation before you choose anything.',
    reasons: [
      'Medicaid may already pay your Medicare premiums and most of your costs, so a Medigap policy is usually not useful, and companies may not sell you one while Medicaid pays.',
      'You may qualify for a Dual Eligible Special Needs Plan (D-SNP) and for Extra Help with drug costs.',
      'In California, if you later lose Medi-Cal, you have a guaranteed right to buy Medigap with no health questions.',
    ],
    tradeoffs: ['Your state Medicaid office or your SHIP can also help you, free of charge.'],
  },
  va: {
    summary: 'VA health care is not Medicare, and you can have both. A licensed agent can help you decide how they should work together.',
    reasons: [
      'VA care covers you only at VA facilities (or care the VA approves); Medicare covers care outside the VA.',
      'If you delay Part B and later want it, you may pay a late penalty for as long as you have Part B.',
      'VA drug coverage counts as creditable, so you can usually wait to join Part D without a penalty.',
    ],
    tradeoffs: ['Ask the VA how your benefits work with Medicare before you drop any coverage.'],
  },
  tricare: {
    summary: 'TRICARE For Life works with Original Medicare and pays after it. A licensed agent can check what, if anything, you need on top.',
    reasons: [
      'To keep TRICARE For Life, you must have both Medicare Part A and Part B.',
      'TRICARE For Life usually covers most of what Original Medicare leaves, so a Medigap policy may duplicate it.',
      'TRICARE pharmacy coverage counts as creditable drug coverage, so you usually do not need a Part D plan.',
    ],
    tradeoffs: ['Do not drop Part B: without it, TRICARE For Life coverage ends.'],
  },
  'disability-esrd': {
    summary: 'Medicare under 65, through a disability or kidney failure (ESRD), has its own rules for Medigap and Medicare Advantage. A licensed agent should look at your state’s rules with you.',
    reasons: [
      'Whether companies must sell you a Medigap policy before 65 depends on your state; in California you get 6 months from your Part B start.',
      'People with ESRD have different Medigap rights, and some plans have special rules for them.',
      'At 65 you get a new Medigap Open Enrollment, with no health questions.',
    ],
    tradeoffs: ['Prices for Medigap before 65 can be much higher than at 65.'],
  },
  marketplace: {
    summary: 'A Marketplace plan usually should end when your Medicare starts. A licensed agent can help you time the change so there is no gap.',
    reasons: [
      'Once you have Part A, you can no longer get premium tax credits for a Marketplace plan.',
      'Marketplace coverage does not let you delay Part B without a late penalty.',
      'Ending the Marketplace plan too early or too late can leave a gap or a double premium.',
    ],
    tradeoffs: ['Cancel the Marketplace plan yourself; it does not end on its own when Medicare starts.'],
  },
};

const isSpecial = (work: WorkCoverage): work is SpecialCoverage => work in special;

function recommend(a: Answers, today: ISODate): Match {
  const window = windowFor(a.birthMonth, today);

  if (isSpecial(a.work)) {
    const s = special[a.work];
    return {
      type: 'talk-to-agent',
      title: 'Talk with a licensed agent first',
      summary: s.summary,
      reasons: s.reasons,
      tradeoffs: s.tradeoffs,
      window,
      topic: 'turning-65',
      learnMore: { label: 'Read the Turning 65 guide', href: '/turning-65' },
    };
  }

  if (a.work === 'employer-large') {
    return {
      type: 'keep-employer',
      title: 'Keep your job-based coverage for now',
      summary:
        'With health coverage from your or your spouse’s current job at a company with 20 or more employees, you can usually delay Part B without a penalty and choose Medigap or Medicare Advantage when that coverage ends.',
      reasons: [
        'At companies with 20 or more employees, job-based coverage usually pays first, so Part B adds little while you work.',
        'When the job or the coverage ends, you get an 8-month Special Enrollment Period to sign up for Part B with no late penalty.',
        'Your 6-month Medigap Open Enrollment waits until your Part B starts, so you do not lose it by waiting.',
      ],
      tradeoffs: [
        'Many people still take premium-free Part A at 65; check first if you contribute to a Health Savings Account (HSA).',
        'Keep the notice that says your drug coverage is creditable, to avoid a Part D penalty later.',
        'Small employers (under 20 employees) are different: Medicare may need to pay first.',
      ],
      window,
      topic: 'turning-65',
      learnMore: { label: 'Working past 65: read the Turning 65 guide', href: '/turning-65' },
    };
  }

  const s = score(a);
  const gap = s.medigap - s.ma;
  if (Math.abs(gap) <= 1) {
    return {
      type: 'compare-both',
      title: 'Either path could fit: compare both',
      summary: 'Your answers point both ways. A short call to compare Original Medicare with Medigap and Medicare Advantage side by side, with your doctors and drugs, is the best next step.',
      reasons: pick3([...s.why.medigap.slice(0, 1), ...s.why.ma.slice(0, 1), 'Both paths cover the same Medicare benefits; the differences are networks, how you pay, and switching later.', ...generic.medigap]),
      tradeoffs: [
        'Medigap: higher monthly premium and a separate drug plan, but few bills and any doctor.',
        'Medicare Advantage: low premium and extras, but copays and a network.',
      ],
      window,
      topic: 'turning-65',
      learnMore: { label: 'Compare the two paths', href: '/medigap#compare' },
    };
  }

  if (gap > 1) {
    return {
      type: 'medigap',
      title: 'Original Medicare with a Medigap plan',
      summary: 'Original Medicare plus a Medicare Supplement (Medigap) policy, usually Plan G or Plan N, and a separate Part D drug plan.',
      reasons: pick3([...s.why.medigap, ...generic.medigap]),
      tradeoffs: [
        'A higher monthly premium than many Medicare Advantage plans.',
        'Drug coverage is a separate Part D plan with its own premium.',
        'Routine dental, vision and hearing are not included.',
        'Buy during your 6-month Medigap Open Enrollment; later, most states allow health questions.',
      ],
      window,
      topic: 'medigap',
      learnMore: { label: 'Read about Medigap', href: '/medigap' },
    };
  }

  return {
    type: 'medicare-advantage',
    title: 'A Medicare Advantage plan',
    summary: 'A Medicare Advantage (Part C) plan that replaces Original Medicare for your care and usually includes drug coverage, from a private company approved by Medicare.',
    reasons: pick3([...s.why.ma, ...generic.ma]),
    tradeoffs: [
      'You usually need to use the plan’s network of doctors and hospitals.',
      'Copays add up when you use care, up to the yearly limit.',
      'Some services need the plan’s approval first.',
      'Switching to Medigap later may mean health questions.',
    ],
    window,
    topic: 'medicare-advantage',
    learnMore: { label: 'Read about Medicare Advantage', href: '/medicare-advantage' },
  };
}

/** Result keys allowed in a Book a Call link (no personal data travels in the URL). */
export const matchTypes: MatchType[] = ['medigap', 'medicare-advantage', 'keep-employer', 'compare-both', 'talk-to-agent'];
export const matchTitle = (type: string) =>
  ({ medigap: 'Original Medicare with a Medigap plan', 'medicare-advantage': 'A Medicare Advantage plan', 'keep-employer': 'Keep your job-based coverage for now', 'compare-both': 'Compare both paths', 'talk-to-agent': 'Talk with a licensed agent first' })[
    type as MatchType
  ];
