import { medicareFigures } from '../medicare-figures.ts';

const f = medicareFigures;
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0 });

/** Medicare 101 copy. Dollar figures come from medicare-figures.ts (official, by plan year). */
export const medicare101 = {
  intro: {
    eyebrow: 'Medicare 101',
    title: 'Medicare explained in plain words',
    lead: 'Medicare has four parts, two ways to fill the gaps, and a few dates that matter. Here is how it all fits together.',
  },
  parts: {
    id: 'parts',
    title: 'The four parts of Medicare',
    lead: 'Parts A and B are “Original Medicare”, run by the federal government. Parts C and D come from private insurance companies approved by Medicare.',
    items: [
      {
        id: 'part-a',
        letter: 'A',
        name: 'Hospital insurance',
        covers: ['Inpatient hospital stays', 'Care in a skilled nursing facility after a hospital stay', 'Hospice care', 'Some home health care'],
        cost: `Most people pay no monthly premium, because they or their spouse paid Medicare taxes for at least 10 years. There is a deductible for each hospital stay period (${usd(f.partA.inpatientDeductible)} in ${f.planYear}).`,
      },
      {
        id: 'part-b',
        letter: 'B',
        name: 'Medical insurance',
        covers: ['Doctor visits and outpatient care', 'Preventive care and screenings', 'Lab tests and X-rays', 'Medical equipment like walkers and oxygen'],
        cost: `The standard premium is ${usd(f.partB.standardMonthly)} a month in ${f.planYear}, with a ${usd(f.partB.annualDeductible)} yearly deductible. After that you usually pay 20% of the cost, with no yearly limit unless you add other coverage.`,
      },
      {
        id: 'part-c',
        letter: 'C',
        name: 'Medicare Advantage',
        covers: ['Everything Parts A and B cover', 'Usually prescription drugs', 'Often dental, vision and hearing extras'],
        cost: 'Sold by private insurers. Many plans have a low or $0 premium on top of Part B, plus copays when you get care and a yearly out-of-pocket limit.',
      },
      {
        id: 'part-d',
        letter: 'D',
        name: 'Prescription drug coverage',
        covers: ['Prescription medicines on the plan’s list (formulary)', 'Available as a stand-alone plan or inside a Medicare Advantage plan'],
        cost: `Premiums and copays vary by plan. There is a yearly cap on what you pay out of pocket for covered drugs: ${usd(f.partD.outOfPocketCap)} in ${f.planYear}.`,
      },
    ],
  },
  medigap: {
    id: 'medigap',
    title: 'Medigap plans: G, N and high-deductible G',
    lead: 'A Medicare Supplement (Medigap) policy pays some or all of what Original Medicare leaves for you. Plans are named by letter, and each letter covers the same things whichever company sells it. Only the price and service differ.',
    plans: [
      {
        name: 'Plan G',
        tag: 'Fullest coverage for new enrollees',
        summary: 'Covers almost everything Original Medicare does not, except the Part B deductible.',
        youPay: ['The yearly Part B deductible', 'Nothing else for covered services, including Part B excess charges'],
        goodFor: 'People who want predictable costs and freedom to see any doctor who accepts Medicare.',
      },
      {
        name: 'Plan N',
        tag: 'Lower premium, small copays',
        summary: 'Like Plan G, but you share a little more of the cost at the doctor.',
        youPay: ['The yearly Part B deductible', 'Up to $20 for some office visits and up to $50 for emergency room visits that do not lead to admission', 'Part B excess charges, if your doctor charges them'],
        goodFor: 'Healthy people who see the doctor a few times a year and want to save on the premium.',
      },
      {
        name: 'High-deductible Plan G',
        tag: 'Low premium, more risk',
        summary: 'Same coverage as Plan G after you meet a yearly deductible set by Medicare.',
        youPay: ['All covered costs until you reach the plan deductible, then nothing more for covered services that year'],
        goodFor: 'People who can afford a larger bill in a bad year in exchange for a much lower monthly premium.',
      },
    ],
    notes: [
      'Medigap does not include prescription drugs, so most people add a Part D plan.',
      'Plan F and Plan C are only available to people who were eligible for Medicare before January 1, 2020.',
      'The best time to buy is your 6-month Medigap Open Enrollment, when no health questions are asked.',
    ],
  },
  compare: {
    id: 'compare',
    title: 'Medicare Advantage vs Medigap, side by side',
    lead: 'Both are good choices for different people. The biggest differences are which doctors you can see, how costs show up, and how easy it is to change your mind later.',
    columns: ['Original Medicare + Medigap', 'Medicare Advantage'],
    rows: [
      { topic: 'Doctors and hospitals', medigap: 'Any provider in the U.S. that accepts Medicare. No referrals.', advantage: 'Usually the plan’s network (HMO or PPO). Some plans need referrals.' },
      { topic: 'Monthly premium', medigap: 'Part B premium plus a Medigap premium and a Part D premium.', advantage: 'Part B premium plus the plan premium, which is $0 for many plans.' },
      { topic: 'Costs when you get care', medigap: 'Little or nothing after the Part B deductible (Plan G).', advantage: 'Copays and coinsurance as you use care.' },
      { topic: 'Yearly limit on costs', medigap: 'Costs stay low, so most people never need one.', advantage: 'Yes, a maximum out-of-pocket limit (MOOP) for covered care.' },
      { topic: 'Prescription drugs', medigap: 'Add a separate Part D plan.', advantage: 'Usually included.' },
      { topic: 'Dental, vision, hearing', medigap: 'Not included; buy separately if needed.', advantage: 'Often included, with limits.' },
      { topic: 'Coverage when traveling', medigap: 'Anywhere in the U.S., and most plans cover some emergency care abroad.', advantage: 'Mainly in your plan’s area; emergencies are covered anywhere in the U.S.' },
      { topic: 'Switching later', medigap: 'Changing Medigap plans later may require health questions in most states.', advantage: 'You can change plans every year during Annual Enrollment, but moving to Medigap later may require health questions.' },
    ],
  },
  partD: {
    id: 'part-d-basics',
    title: 'Part D drug coverage basics',
    points: [
      { title: 'Each plan has its own drug list', text: 'A formulary is the list of drugs a plan covers, sorted into price tiers. Check that your medicines are on the list, and at what tier, before you join.' },
      { title: 'Creditable coverage protects you', text: 'If your job or union drug coverage is “creditable” (at least as good as Part D), you can wait to join Part D without a penalty. Keep the yearly letter that says so.' },
      { title: 'The 63-day rule', text: 'If you go 63 days in a row or more without Part D or other creditable coverage, a late penalty is added for each month you went without, usually for as long as you have Part D.' },
      { title: 'There is a yearly cap', text: `What you pay out of pocket for covered drugs in a year is capped at ${usd(f.partD.outOfPocketCap)} in ${f.planYear}. After you reach it, you pay nothing more for covered drugs that year.` },
      { title: 'Check every fall', text: 'Plans change their drug lists, pharmacies and prices each year. Compare during Annual Enrollment.' },
    ],
  },
  periods: {
    id: 'enrollment-periods',
    title: 'Enrollment periods at a glance',
    rows: [
      { name: 'Initial Enrollment Period', when: 'The 7 months around the month you turn 65', what: 'Sign up for Parts A and B, and join a Medicare Advantage or Part D plan.' },
      { name: 'Annual Enrollment Period', when: 'October 15 to December 7 every year', what: 'Join, switch or drop a Medicare Advantage or Part D plan. Changes start January 1.' },
      { name: 'Medicare Advantage Open Enrollment', when: 'January 1 to March 31 every year', what: 'If you have a Medicare Advantage plan, switch to another one or go back to Original Medicare (and join Part D), once.' },
      { name: 'General Enrollment Period', when: 'January 1 to March 31 every year', what: 'Sign up for Part A or B if you missed your first chance. Coverage starts the month after you sign up; penalties may apply.' },
      { name: 'Special Enrollment Periods', when: 'After certain life events', what: 'Losing job coverage, moving, qualifying for Extra Help or Medicaid, and other events let you sign up or change plans outside the usual windows.' },
      { name: 'Medigap Open Enrollment', when: '6 months from the month you are 65+ and have Part B', what: 'Buy any Medigap policy sold in your state without health questions.' },
    ],
  },
  costs: {
    id: 'costs',
    title: 'Help with costs, and what Medicare does not cover',
    items: [
      { id: 'irmaa', title: 'IRMAA: higher premiums for higher incomes', text: 'If your income two years ago was above a set limit, you pay an Income-Related Monthly Adjustment Amount on top of your Part B and Part D premiums. You can ask Social Security to use newer income after a life-changing event such as retiring.', link: { label: 'Use the IRMAA calculator', href: '/tools/irmaa-calculator' } },
      { id: 'extra-help', title: 'Extra Help with drug costs', text: 'A federal program, also called the Low-Income Subsidy, that lowers Part D premiums, deductibles and copays for people with limited income and savings. Apply through Social Security, online or by phone.', link: { label: 'Extra Help on SSA.gov', href: 'https://www.ssa.gov/medicare/part-d-extra-help' } },
      { id: 'savings-programs', title: 'Medicare Savings Programs', text: 'State programs (QMB, SLMB and QI) that can pay your Part B premium, and for some people Part A and B deductibles and coinsurance. Apply through your state Medicaid office. Qualifying for one also qualifies you for Extra Help.', link: { label: 'Medicare Savings Programs on Medicare.gov', href: 'https://www.medicare.gov/basics/costs/help/medicare-savings-programs' } },
      { id: 'dental-vision-hearing', title: 'Dental, vision and hearing', text: 'Original Medicare does not cover most routine dental care, eye exams for glasses, or hearing aids. Many Medicare Advantage plans include some of this; with Medigap, you can buy separate dental, vision or hearing plans.', link: { label: 'Ask us about extra coverage', href: '/contact' } },
    ],
  },
} as const;
