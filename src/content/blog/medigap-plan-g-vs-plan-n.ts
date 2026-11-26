import { medigapAdNotice } from '../disclosures.ts';
import { medicareFigures } from '../medicare-figures.ts';
import { defaultAuthor } from './author.ts';
import type { Article } from './index.ts';

const { planYear, partB } = medicareFigures;

export const planGvsN: Article = {
  slug: 'medigap-plan-g-vs-plan-n',
  title: 'Medigap Plan G or Plan N: which is right for you?',
  description: 'Plan G and Plan N are two Medigap plans people turning 65 often compare. Here is what each covers, what you pay, and who each one suits.',
  topic: 'medigap',
  published: '2026-11-16',
  updated: '2026-11-26',
  planYear,
  readMinutes: 4,
  author: defaultAuthor,
  pdf: 'medigap-vs-medicare-advantage',
  sections: [
    {
      heading: 'What they have in common',
      blocks: [{ type: 'callout', title: medigapAdNotice.notConnected, text: medigapAdNotice.outlineOfCoverage }, { type: 'p', text: 'Both plans pay your Part A deductible and coinsurance, hospital costs, skilled nursing coinsurance and most Part B coinsurance. Neither covers the Part B deductible or prescription drugs.' }],
    },
    {
      heading: 'Where they differ',
      blocks: [
        {
          type: 'table',
          caption: 'Medigap Plan G compared with Plan N',
          head: ['', 'Plan G', 'Plan N'],
          rows: [
            ['Part B deductible', `You pay it ($${partB.annualDeductible} in ${planYear})`, `You pay it ($${partB.annualDeductible} in ${planYear})`],
            ['Office visits', 'No copay', 'Up to $20 for some visits'],
            ['Emergency room', 'No copay', 'Up to $50 if you are not admitted'],
            ['Part B excess charges', 'Covered', 'Not covered'],
            ['Monthly premium', 'Higher', 'Lower'],
          ],
        },
      ],
    },
    {
      heading: 'Who each one suits',
      blocks: [
        { type: 'list', items: ['Plan G suits people who want the fewest bills and see doctors often.', 'Plan N suits people who rarely see a doctor and whose doctors accept Medicare’s rates in full.'] },
        { type: 'callout', text: 'Prices differ a lot between companies for the same plan letter. Compare during your Medigap Open Enrollment, when no health questions are asked.' },
      ],
    },
  ],
};
