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
} as const;
