import type { ContentPage } from './types.ts';

/** Services › Medicare › Annual Plan Review (plan §4: free yearly re-check for every client). */
export const annualReviewPage: ContentPage = {
  path: '/annual-review',
  meta: {
    title: 'Annual Plan Review: your free fall Medicare checkup',
    description: 'A free yearly check of your Medicare plan before Annual Enrollment (October 15 to December 7): what changes each year, what to bring, and how to book.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Annual Plan Review', href: '/annual-review' },
  ],
  intro: {
    eyebrow: 'Every fall',
    title: 'A free plan checkup, every year',
    lead: 'Plans change every January. Each fall we re-check your coverage against your doctors, drugs and budget, free for every client, whether or not you subscribe to anything.',
  },
  sections: [
    {
      id: 'what-changes',
      eyebrow: 'Why review',
      title: 'What can change each year',
      lead: 'Your plan sends an Annual Notice of Change by September 30. It is easy to miss something important in it.',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Premiums and costs', text: 'Monthly premiums, deductibles and copays can all go up or down.' },
            { title: 'Your drugs', text: 'A drug can move to a higher tier or leave the formulary, or need prior approval.' },
            { title: 'Doctors and hospitals', text: 'Networks change. Your doctor may leave the plan next year.' },
          ],
        },
      ],
    },
    {
      id: 'dates',
      eyebrow: 'Key dates',
      title: 'Annual Enrollment: October 15 to December 7',
      lead: 'During these weeks you can switch Medicare Advantage or Part D plans, or move between Original Medicare and Medicare Advantage. Changes start January 1.',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'By September 30', text: 'Your plan mails its Annual Notice of Change. Keep it for your review.' },
            { title: 'Early October', text: 'Next year’s plans and prices appear. Book your review.' },
            { title: 'October 15 to December 7', text: 'Make any change. We help you enroll if a different plan fits better.' },
            { title: 'January 1', text: 'Your new plan, or your same plan with next year’s terms, begins.' },
          ],
        },
        {
          type: 'callout',
          text: 'Medigap policies do not change in this window. If you have Medigap, we still review your Part D drug plan and your premium.',
        },
      ],
    },
    {
      id: 'bring',
      eyebrow: 'Be ready',
      title: 'What to bring to your review',
      blocks: [
        {
          type: 'list',
          items: [
            'Your red, white and blue Medicare card and your plan ID card',
            'Your Annual Notice of Change, if you have one',
            'A list of your prescriptions with doses',
            'Your doctors, specialists and preferred pharmacy',
            'Any big changes this year: a move, new diagnosis, or other coverage',
          ],
        },
      ],
    },
  ],
  pdf: 'annual-enrollment-checklist',
  next: {
    title: 'Book my annual review',
    text: 'Existing clients can book a time now; new clients are welcome too. The review is free and there is no obligation to change anything.',
    primary: { label: 'Book my annual review', href: '/book-a-call?topic=annual-review' },
  },
};
