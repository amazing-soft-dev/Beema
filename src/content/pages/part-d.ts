import type { ContentPage } from './types.ts';

/** Services › Medicare › Part D (plan §4: drug coverage basics and penalty avoidance). */
export const partDPage: ContentPage = {
  path: '/part-d',
  meta: {
    title: 'Part D drug plans and the late penalty',
    description: 'Part D prescription drug plans in plain words: formularies, creditable coverage, the 63-day rule, the late enrollment penalty and Extra Help with costs.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Part D Drug Plans', href: '/part-d' },
  ],
  intro: {
    eyebrow: 'Prescription drugs',
    title: 'Part D: drug coverage without the penalty',
    lead: 'Part D plans are private drug plans approved by Medicare. If you have Original Medicare, a separate Part D plan covers your prescriptions; most Medicare Advantage plans include it.',
  },
  jump: true,
  sections: [
    {
      id: 'formulary',
      eyebrow: 'What is covered',
      title: 'Formularies and drug tiers',
      lead: 'Each plan has a list of covered drugs, called a formulary, sorted into price tiers. The same drug can cost very different amounts in different plans.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'List your drugs', text: 'Write down every prescription, the dose and how often you take it.' },
            { title: 'Check each plan', text: 'Look for your drugs on the formulary and their tier, and any limits such as prior approval.' },
            { title: 'Compare yearly cost', text: 'Add the premium, the deductible and your copays for the whole year, not just the premium.' },
            { title: 'Pick your pharmacy', text: 'Preferred pharmacies and mail order are often cheaper.' },
          ],
        },
      ],
    },
    {
      id: 'penalty',
      eyebrow: 'Avoid a lifelong cost',
      title: 'Creditable coverage and the 63-day rule',
      lead: 'If you go 63 days or more in a row without Part D or other creditable drug coverage after you first become eligible, you may pay a late penalty for as long as you have Part D.',
      blocks: [
        {
          type: 'list',
          items: [
            'Creditable coverage is drug coverage expected to pay at least as much as standard Part D, such as many employer and union plans.',
            'Your employer or plan sends a notice each year saying whether its drug coverage is creditable. Keep it.',
            'The penalty is 1% of the national base premium for each full month you went without coverage, added to your premium every month.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Example',
          text: 'Someone who went 20 months without creditable coverage pays an extra 20% of the national base premium every month, for as long as they have Part D.',
        },
      ],
    },
    {
      id: 'extra-help',
      eyebrow: 'Lower costs',
      title: 'Extra Help with drug costs',
      lead: 'Extra Help is a Medicare program that lowers Part D premiums and copays for people with limited income and savings. It also removes the late penalty.',
      blocks: [
        { type: 'p', text: 'You can apply through Social Security at any time. People with Medicaid or a Medicare Savings Program get Extra Help automatically.' },
        {
          type: 'links',
          items: [
            { label: 'Read about costs and Extra Help in Medicare 101', href: '/medicare-101' },
            { label: 'Medicare.gov Plan Finder (compare every drug plan)', href: 'https://www.medicare.gov/plan-compare/' },
          ],
        },
      ],
    },
  ],
  next: {
    title: 'Check my drugs on a call',
    text: 'Tell us your prescriptions and pharmacy, and a licensed agent compares the drug plans we offer by your total yearly cost.',
    primary: { label: 'Check my drugs on a call', href: '/book-a-call?topic=part-d' },
  },
};
