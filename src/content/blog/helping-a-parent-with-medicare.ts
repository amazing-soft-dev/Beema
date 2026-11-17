import { medicareFigures } from '../medicare-figures.ts';
import { defaultAuthor } from './author.ts';
import type { Article } from './index.ts';

export const caregiverGuide: Article = {
  slug: 'helping-a-parent-with-medicare',
  title: 'Helping a parent with Medicare: a caregiver’s guide',
  description: 'What adult children need to help a parent with Medicare: the permission forms, the documents to gather, the key dates each year, and where to get free help.',
  topic: 'caregivers',
  published: '2026-11-15',
  planYear: medicareFigures.planYear,
  readMinutes: 6,
  author: defaultAuthor,
  pdf: 'caregiver-checklist',
  sections: [
    {
      heading: 'Start with permission',
      blocks: [
        { type: 'p', text: 'Medicare and insurance companies will not discuss your parent’s coverage with you until your parent says so. Ask them to fill in the right forms early, while it is easy.' },
        {
          type: 'list',
          items: [
            'Medicare’s authorization form (CMS-10106) lets Medicare talk with you about your parent’s information.',
            'Each insurance company has its own authorization form for its plan.',
            'A durable power of attorney for health care covers decisions if your parent cannot make them.',
          ],
        },
      ],
    },
    {
      heading: 'Gather the documents',
      blocks: [
        {
          type: 'list',
          items: [
            'Medicare card and every plan ID card',
            'A current list of prescriptions, doses and pharmacies',
            'Doctors and specialists, with phone numbers',
            'The Annual Notice of Change each September',
          ],
        },
      ],
    },
    {
      heading: 'Mark the yearly dates',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'By September 30', text: 'Plans mail their Annual Notice of Change.' },
            { title: 'October 15 to December 7', text: 'Annual Enrollment: compare and change plans.' },
            { title: 'January 1 to March 31', text: 'Medicare Advantage members can make one change.' },
          ],
        },
      ],
    },
    {
      heading: 'Where to get help',
      blocks: [
        { type: 'p', text: 'Your parent’s yearly plan review with us is free. Your local State Health Insurance Assistance Program (SHIP) also gives free, unbiased counseling.' },
        { type: 'callout', text: 'We are planning an optional Family tier with a caregiver dashboard. You never need it to get help: plan advice and enrollment are free.' },
      ],
    },
  ],
};
