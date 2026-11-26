import { medigapAdNotice } from '../disclosures.ts';
import { medicareFigures } from '../medicare-figures.ts';
import type { ContentPage } from './types.ts';

const { planYear, partB } = medicareFigures;

/** Services › Medicare › Medigap (plan §4: core niche page for turning-65 clients). */
export const medigapPage: ContentPage = {
  path: '/medigap',
  meta: {
    title: 'Medigap (Medicare Supplement) plans explained',
    description: `Plan G, Plan N and high-deductible Plan G in plain words, your 6-month Medigap Open Enrollment, how prices are set, and Medigap vs Medicare Advantage.`,
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Medigap', href: '/medigap' },
  ],
  intro: {
    eyebrow: 'Medicare Supplement',
    title: 'Medigap: fill the gaps in Original Medicare',
    lead: 'A Medicare Supplement (Medigap) policy pays most of what Original Medicare leaves for you to pay, so your costs are predictable and you can see any doctor in the U.S. who accepts Medicare.',
  },
  jump: true,
  sections: [
    {
      id: 'plans',
      eyebrow: 'The plans most people compare',
      title: 'Plan G, Plan N and high-deductible Plan G',
      lead: 'Medigap plans are standardized: a Plan G covers the same things with every insurance company. Only the price and service differ.',
      blocks: [
        { type: 'callout', title: medigapAdNotice.notConnected, text: medigapAdNotice.outlineOfCoverage },
        {
          type: 'cards',
          items: [
            {
              tag: 'Fullest coverage for new enrollees',
              title: 'Plan G',
              text: `Pays everything Original Medicare leaves except the yearly Part B deductible ($${partB.annualDeductible} in ${planYear}).`,
              points: ['No copays for doctor visits', 'Covers Part B excess charges', 'Foreign travel emergency care (up to plan limits)'],
            },
            {
              tag: 'Lower premium',
              title: 'Plan N',
              text: 'A lower monthly premium in exchange for small costs when you use care.',
              points: ['Up to $20 copay for some office visits', 'Up to $50 for an emergency room visit that does not lead to a hospital stay', 'Does not cover Part B excess charges'],
            },
            {
              tag: 'Low premium, high deductible',
              title: 'High-deductible Plan G',
              text: 'Same coverage as Plan G after you pay a yearly deductible set by Medicare. Suits people who want protection from big bills and rarely see a doctor.',
              points: ['Much lower monthly premium', 'You pay costs up to the deductible first', 'The deductible changes every year'],
            },
          ],
        },
        {
          type: 'callout',
          title: 'Plans C and F',
          text: 'Plans C and F cover the Part B deductible too, but by law they can only be sold to people who were eligible for Medicare before January 1, 2020. If you turn 65 now, Plan G is the closest choice.',
        },
        {
          type: 'callout',
          text: 'Medigap does not include prescription drug coverage. Most people with a Medigap plan also join a separate Part D drug plan.',
        },
      ],
    },
    {
      id: 'when-to-buy',
      eyebrow: 'Timing matters',
      title: 'Your 6-month Medigap Open Enrollment',
      lead: 'The best time to buy Medigap is the 6 months that start the first month you are 65 or older and have Part B.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Your window opens', text: 'It starts the first day of the month your Part B begins, if you are 65 or older.' },
            { title: 'Any plan, no health questions', text: 'During these 6 months an insurance company cannot turn you down or charge more because of your health.' },
            { title: 'After it ends', text: 'In most states, companies can ask health questions and may say no or charge more. Some states give extra chances to switch, such as California’s birthday rule below.' },
            { title: 'Working past 65?', text: 'If you delay Part B because you have job-based coverage, your Medigap window waits until your Part B starts.' },
          ],
        },
      ],
    },
    {
      id: 'california',
      eyebrow: 'California',
      title: 'Extra Medigap rights in California',
      lead: 'California gives people with Medigap more chances to change plans without health questions (California Insurance Code section 10192.11). Rules can change, so we confirm yours before you switch.',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'The birthday rule',
              text: 'Every year, for at least 60 days starting on your birthday, you can switch to any Medigap plan with the same or fewer benefits, from any company, with no health questions and no higher price because of your health. For example, Plan G can move to another company’s Plan G or Plan N, but not up to Plan F. Your insurer must remind you 30 to 60 days before.',
            },
            { title: 'Losing job or retiree coverage', text: 'You have 6 months to buy Medigap with no health questions after employer, retiree, COBRA or Cal-COBRA coverage, or military base coverage, ends.' },
            { title: 'Moving or losing a plan', text: 'Moving out of your plan’s area, or your Medicare Advantage plan ending, gives you guaranteed-issue rights; when a Medicare Advantage plan ends, California adds 60 days to the federal window.' },
            { title: 'Leaving Medi-Cal', text: 'If you lose Medi-Cal, or have share-of-cost Medi-Cal you have not met, you can buy Medigap without health questions.' },
            { title: 'Under 65 with Medicare', text: 'If you have Medicare because of a disability, you get 6 months from your Part B start to buy Medigap. Companies must offer Plans A, B, D and G, plus K or L and M or N. People with end-stage renal disease are not covered by this rule.' },
          ],
        },
      ],
    },
    {
      id: 'pricing',
      eyebrow: 'Premiums',
      title: 'How Medigap premiums are priced',
      lead: 'Two people with the same plan can pay different amounts. Ask how a company sets its price before you choose.',
      blocks: [
        {
          type: 'table',
          caption: 'Three ways Medigap premiums are set',
          head: ['Pricing method', 'How it works', 'What it means for you'],
          rows: [
            ['Community-rated', 'Everyone pays the same premium, whatever their age.', 'Prices rise with inflation, not with your age.'],
            ['Issue-age-rated', 'The premium is based on your age when you buy.', 'Buying younger locks in a lower age-based price.'],
            ['Attained-age-rated', 'The premium is based on your current age.', 'Starts lower, then rises as you get older.'],
          ],
        },
        { type: 'p', text: 'Premiums also vary by ZIP code, tobacco use, gender in some states, and household discounts. We compare several companies for you at no cost.' },
      ],
    },
    {
      id: 'compare',
      eyebrow: 'Side by side',
      title: 'Medigap or Medicare Advantage?',
      lead: 'Both are good choices for different people. The biggest differences are networks, how you pay, and switching later.',
      blocks: [
        {
          type: 'table',
          caption: 'Medigap compared with Medicare Advantage',
          head: ['', 'Original Medicare + Medigap', 'Medicare Advantage'],
          rows: [
            ['Doctors and hospitals', 'Any in the U.S. that accept Medicare', 'Usually the plan’s network; referrals may be needed'],
            ['Monthly premium', 'Higher', 'Often low or $0 (you still pay Part B)'],
            ['Costs when you use care', 'Few or none (depends on the plan)', 'Copays add up, to a yearly limit'],
            ['Drug coverage', 'Separate Part D plan', 'Usually included'],
            ['Dental, vision, hearing', 'Not included', 'Often some extras'],
            ['Travel', 'Works anywhere in the U.S.', 'Limited outside the service area'],
            ['Switching later', 'May need health questions after your window', 'Can change every fall (Oct 15 – Dec 7)'],
          ],
        },
        {
          type: 'links',
          items: [
            { label: 'Read about Medicare Advantage', href: '/medicare-advantage' },
            { label: 'Read about Part D drug plans', href: '/part-d' },
          ],
        },
      ],
    },
  ],
  pdf: 'medigap-vs-medicare-advantage',
  next: {
    title: 'Book a Medigap review',
    text: 'A licensed agent compares Plan G and Plan N prices from several companies in your ZIP code. Free, with no obligation.',
    primary: { label: 'Book a Medigap review', href: '/book-a-call?topic=medigap' },
  },
};
