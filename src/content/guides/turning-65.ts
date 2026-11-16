/**
 * Turning 65 / New to Medicare guide copy. Rules checked against Medicare.gov and
 * Social Security pages on 2026-11-15. Plain words; acronyms spelled out on first use.
 */
export type Step = { title: string; text: string; tip?: string };

export const turning65 = {
  intro: {
    eyebrow: 'Turning 65 / New to Medicare',
    title: 'Your step-by-step guide to turning 65',
    lead: 'What to do, and when, depends mostly on one question: will you still have health coverage from a job when you turn 65?',
  },
  paths: {
    title: 'Pick the path that fits you',
    retiring: {
      id: 'retiring',
      label: 'Retiring at 65, or no job coverage',
      steps: [
        {
          title: 'Check whether you are signed up automatically',
          text: 'If you already get Social Security retirement benefits, you will be enrolled in Part A (hospital) and Part B (medical) and your Medicare card arrives about 3 months before the month you turn 65.',
        },
        {
          title: 'If not, sign up for Part A and Part B',
          text: 'Apply with Social Security online, by phone or at a local office during your 7-month Initial Enrollment Period (IEP). Sign up in the first 3 months so coverage starts the month you turn 65.',
          tip: 'Find your exact dates with our enrollment calculator.',
        },
        {
          title: 'Choose your path for the gaps',
          text: 'Decide between Original Medicare with a Medicare Supplement (Medigap) policy and a Part D drug plan, or a Medicare Advantage plan that bundles coverage.',
        },
        {
          title: 'Enroll in your plan',
          text: 'Join a Medicare Advantage or Part D plan during your Initial Enrollment Period. Buy a Medigap policy during your 6-month Medigap Open Enrollment, when insurers cannot turn you down for health reasons.',
        },
        {
          title: 'Review every fall',
          text: 'Plans change each year. Check your coverage during Annual Enrollment, October 15 to December 7.',
        },
      ] satisfies Step[],
    },
    working: {
      id: 'working',
      label: 'Still working past 65',
      steps: [
        {
          title: 'Ask your employer two questions',
          text: 'How many employees does the company have? And is the plan’s drug coverage “creditable”, meaning at least as good as Medicare Part D?',
        },
        {
          title: '20 or more employees: you can usually wait on Part B',
          text: 'Your job plan pays first, so you can delay Part B without a penalty. Many people still take premium-free Part A at 65.',
          tip: 'Contributing to a Health Savings Account (HSA)? Stop at least 6 months before you sign up for Medicare, because Part A can start up to 6 months back.',
        },
        {
          title: 'Fewer than 20 employees: sign up on time',
          text: 'Medicare usually pays first, so most people should enroll in Part A and Part B during their Initial Enrollment Period.',
        },
        {
          title: 'When the job or coverage ends, act within 8 months',
          text: 'You get an 8-month Special Enrollment Period to sign up for Part B, and 63 days to join a Part D plan without a penalty. Social Security will ask for proof of your job coverage.',
          tip: 'COBRA and retiree coverage do not count as job coverage for this.',
        },
        {
          title: 'Then buy Medigap or a plan',
          text: 'Your 6-month Medigap Open Enrollment starts when your Part B starts, so you can choose a Medigap policy without health questions then.',
        },
      ] satisfies Step[],
    },
  },
} as const;
