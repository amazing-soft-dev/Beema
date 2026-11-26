import { formatUSD } from '../../lib/medicare/irmaa.ts';
import { medicareFigures } from '../medicare-figures.ts';
import { defaultAuthor } from './author.ts';
import type { Article } from './index.ts';

const { planYear, partB } = medicareFigures;

export const turning65Steps: Article = {
  slug: 'turning-65-what-to-do-and-when',
  title: 'Turning 65: what to do, and when',
  description: 'A month-by-month plan for your 65th birthday: when to sign up for Parts A and B, when to choose Medigap or Medicare Advantage, and how to avoid late penalties.',
  topic: 'turning-65',
  published: '2026-11-17',
  planYear,
  readMinutes: 5,
  author: defaultAuthor,
  pdf: 'turning-65-checklist',
  sections: [
    {
      heading: 'Three months before your birthday month',
      blocks: [
        { type: 'p', text: 'Your 7-month Initial Enrollment Period opens 3 months before the month you turn 65. If you already get Social Security, you are enrolled in Parts A and B automatically and your card arrives in the mail.' },
        { type: 'list', items: ['Decide whether you will keep working and keep job-based coverage.', 'Make a list of your doctors and prescriptions.', 'Sign up for Part A and Part B at ssa.gov if you are not enrolled automatically.'] },
      ],
    },
    {
      heading: 'Choose how you will fill the gaps',
      blocks: [
        { type: 'p', text: 'Original Medicare pays most costs but not all. You can add a Medigap policy and a Part D drug plan, or choose a Medicare Advantage plan that bundles your coverage.' },
        { type: 'p', text: `In ${planYear} the standard Part B premium is ${formatUSD(partB.standardMonthly)} a month and the Part B deductible is ${formatUSD(partB.annualDeductible)} a year, whichever path you choose.` },
      ],
    },
    {
      heading: 'The month Part B starts',
      blocks: [
        { type: 'p', text: 'Your 6-month Medigap Open Enrollment starts the first month you are 65 and have Part B. During it, any Medigap company must sell you any plan it offers, whatever your health.' },
        { type: 'callout', tone: 'warning', title: 'Avoid lifelong penalties', text: 'Signing up for Part B or Part D late, without job-based or other creditable coverage, can add a penalty to your premium for as long as you have Medicare.' },
      ],
    },
    {
      heading: 'Still working at 65?',
      blocks: [{ type: 'p', text: 'With coverage from a current job at a company with 20 or more employees, you can usually delay Part B. When that coverage ends you have 8 months to sign up without a penalty.' }],
    },
  ],
};
