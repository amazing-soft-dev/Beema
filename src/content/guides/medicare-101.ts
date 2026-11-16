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
        cost: 'Most people pay no monthly premium, because they or their spouse paid Medicare taxes for at least 10 years. There is a deductible for each hospital stay period.',
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
        cost: 'Premiums and copays vary by plan. Since 2025 there is a yearly cap on what you pay out of pocket for covered drugs.',
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
        tag: 'Most popular for new enrollees',
        summary: 'Covers almost everything Original Medicare does not, except the Part B deductible.',
        youPay: ['The yearly Part B deductible', 'Nothing else for covered services, including Part B excess charges'],
        goodFor: 'People who want predictable costs and freedom to see any doctor who accepts Medicare.',
      },
      {
        name: 'Plan N',
        tag: 'Lower premium, small copays',
        summary: 'Like Plan G, but you share a little more of the cost at the doctor.',
        youPay: ['The yearly Part B deductible', 'Up to 0 for some office visits and up to 0 for emergency room visits that do not lead to admission', 'Part B excess charges, if your doctor charges them'],
        goodFor: 'Healthy people who see the doctor a few times a year and want to save on the premium.',
      },
      {
        name: 'High-deductible Plan G',
        tag: 'Lowest premium, more risk',
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
} as const;
