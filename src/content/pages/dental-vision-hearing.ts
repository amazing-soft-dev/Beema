import type { ContentPage } from './types.ts';

/** Services › Beyond Medicare › Dental, Vision & Hearing (plan §4). */
export const dentalVisionHearingPage: ContentPage = {
  path: '/beyond-medicare/dental-vision-hearing',
  meta: {
    title: 'Dental, vision and hearing coverage with Medicare',
    description: 'Original Medicare generally does not cover routine dental, glasses or hearing aids. Compare Medicare Advantage extras with stand-alone plans, and what to ask.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Beyond Medicare', href: '/beyond-medicare' },
    { label: 'Dental, Vision & Hearing', href: '/beyond-medicare/dental-vision-hearing' },
  ],
  intro: {
    eyebrow: 'Everyday care',
    title: 'Dental, vision and hearing',
    lead: 'Original Medicare generally does not cover routine dental care, eyeglasses or hearing aids. If you have Original Medicare and Medigap, a stand-alone plan can fill that gap.',
  },
  disclosure: 'dental-vision',
  sections: [
    {
      id: 'choices',
      eyebrow: 'Two ways to get it',
      title: 'Medicare Advantage extras or a stand-alone plan',
      blocks: [
        {
          type: 'table',
          caption: 'Medicare Advantage extras compared with stand-alone plans',
          head: ['', 'Medicare Advantage extras', 'Stand-alone plan'],
          rows: [
            ['Who it suits', 'People choosing Medicare Advantage', 'People with Original Medicare and Medigap'],
            ['Cost', 'Included in the plan premium', 'Its own monthly premium'],
            ['Coverage', 'Often basic: cleanings, an allowance for glasses or hearing aids', 'Choice of richer plans'],
            ['Network', 'The plan’s dental and vision network', 'The dental or vision company’s network'],
          ],
        },
      ],
    },
    {
      id: 'fine-print',
      eyebrow: 'Read the details',
      title: 'Waiting periods and annual maximums',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Waiting periods', text: 'Many dental plans wait 6 to 12 months before covering fillings, crowns or dentures.' },
            { title: 'Annual maximum', text: 'Dental plans stop paying after a yearly dollar limit, often a few thousand dollars or less.' },
            { title: 'Allowances', text: 'Vision and hearing benefits are often a set allowance toward glasses or hearing aids.' },
          ],
        },
      ],
    },
    {
      id: 'questions',
      eyebrow: 'Checklist',
      title: 'Questions to ask before you buy',
      blocks: [
        {
          type: 'list',
          items: [
            'Is my dentist or eye doctor in the network?',
            'What is the waiting period for major work like crowns and dentures?',
            'What is the annual maximum, and what do I pay after it?',
            'How much is the allowance for glasses, contacts or hearing aids?',
            'Does my Medicare Advantage plan already include any of this?',
          ],
        },
      ],
    },
  ],
  pdf: 'dental-vision-checklist',
  next: {
    title: 'Book an extra-protection review',
    text: 'We check what your Medicare coverage already includes before suggesting any separate plan.',
    primary: { label: 'Book an extra-protection review', href: '/book-a-call?topic=dental-vision' },
  },
};
