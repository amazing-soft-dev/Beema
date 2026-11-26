import type { ContentPage } from './types.ts';

/** Services › Beyond Medicare overview (plan §4: what Medicare doesn't cover, framed honestly). */
export const beyondMedicarePage: ContentPage = {
  path: '/beyond-medicare',
  meta: {
    title: 'What Medicare doesn’t cover, and who needs more',
    description: 'The gaps Medicare leaves: most dental, routine vision and hearing aids, final costs and out-of-pocket hospital bills. Who may need extra coverage, and who may not.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Beyond Medicare', href: '/beyond-medicare' },
  ],
  intro: {
    eyebrow: 'Beyond Medicare',
    title: 'What Medicare doesn’t cover',
    lead: 'Medicare is strong coverage, but it leaves some costs to you. Here is what is usually not covered, which separate policies can help, and when you probably do not need one.',
  },
  disclosure: 'general',
  sections: [
    {
      id: 'gaps',
      eyebrow: 'The gaps',
      title: 'Costs Medicare usually leaves to you',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Dental care', text: 'Original Medicare does not cover most cleanings, fillings, extractions or dentures.' },
            { title: 'Routine vision', text: 'Eye exams for glasses and the glasses or contacts themselves are generally not covered.' },
            { title: 'Hearing aids', text: 'Hearing aids and exams to fit them are generally not covered by Original Medicare.' },
            { title: 'Final costs', text: 'Medicare pays nothing toward funeral or burial costs or the bills a family faces after a death.' },
            { title: 'Hospital out-of-pocket costs', text: 'With Medicare Advantage, daily hospital copays can add up until you reach the yearly limit.' },
            { title: 'Long-term care', text: 'Custodial care in a nursing home or at home is not covered beyond limited skilled care.' },
          ],
        },
      ],
    },
    {
      id: 'options',
      eyebrow: 'Separate policies',
      title: 'Policies that can help',
      lead: 'Each of these is a separate policy with its own price, rules and company. None of them is Medicare.',
      blocks: [
        {
          type: 'links',
          items: [
            { label: 'Final Expense: small life policies for final bills', href: '/beyond-medicare/final-expense' },
            { label: 'Hospital Indemnity: cash toward hospital stay costs', href: '/beyond-medicare/hospital-indemnity' },
            { label: 'Dental, Vision & Hearing plans', href: '/beyond-medicare/dental-vision-hearing' },
          ],
        },
      ],
    },
    {
      id: 'who-may-not-need',
      eyebrow: 'Honest advice',
      title: 'Who may not need extra coverage',
      blocks: [
        {
          type: 'list',
          items: [
            'Many people with Medigap Plan G already have few hospital costs, so hospital indemnity rarely adds much.',
            'If your Medicare Advantage plan already includes dental and vision, a separate plan may duplicate it.',
            'If you have savings set aside for final costs or a life policy already, final expense may not be needed.',
          ],
        },
        {
          type: 'callout',
          text: 'Start with the free gap worksheet: list what you have and what is not covered, then decide. We will tell you if you do not need anything more.',
        },
      ],
    },
  ],
  pdf: 'gap-worksheet',
  next: {
    title: 'Book an extra-protection review',
    text: 'A licensed agent looks at your Medicare coverage first, then at whether a separate policy would really help. Dental, vision and hearing plans and hospital indemnity can share your Medicare appointment only if you list them on your Scope of Appointment; otherwise we book them on their own. Final expense life insurance is always a separate appointment.',
    primary: { label: 'Book an extra-protection review', href: '/book-a-call?topic=extra-protection' },
  },
};
