import { notMedigapNotice } from '../disclosures.ts';
import type { ContentPage } from './types.ts';

/** Services › Beyond Medicare › Hospital Indemnity (plan §4; limited-benefit notices). */
export const hospitalIndemnityPage: ContentPage = {
  path: '/beyond-medicare/hospital-indemnity',
  meta: {
    title: 'Hospital indemnity insurance: when it helps',
    description: 'Fixed cash benefits for hospital stays, mainly for Medicare Advantage copays: how they work, when they help, and when they usually do not (Medigap Plan G).',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Beyond Medicare', href: '/beyond-medicare' },
    { label: 'Hospital Indemnity', href: '/beyond-medicare/hospital-indemnity' },
  ],
  intro: {
    eyebrow: 'Limited benefit',
    title: 'Hospital indemnity: cash for a hospital stay',
    lead: 'A hospital indemnity policy pays you a fixed amount of cash when you are admitted to the hospital. Most people who consider it have a Medicare Advantage plan with daily hospital copays.',
  },
  disclosure: 'limited-benefit',
  sections: [
    {
      id: 'how-it-works',
      eyebrow: 'The basics',
      title: 'How fixed benefits work',
      blocks: [
        { type: 'callout', tone: 'warning', title: notMedigapNotice.title, text: notMedigapNotice.text },
        {
          type: 'cards',
          items: [
            { title: 'Per day or per stay', text: 'The policy pays a set amount for each day in the hospital, or once per stay, whatever the bill is.' },
            { title: 'Paid to you', text: 'The money goes to you, not the hospital, and you can use it for copays or anything else.' },
            { title: 'Separate premium', text: 'You pay a monthly premium on top of your Medicare coverage.' },
          ],
        },
      ],
    },
    {
      id: 'when-it-helps',
      eyebrow: 'Be honest',
      title: 'When it helps, and when it usually doesn’t',
      blocks: [
        {
          type: 'table',
          caption: 'When hospital indemnity may or may not help',
          head: ['Your coverage', 'What hospital stays can cost you', 'Hospital indemnity'],
          rows: [
            ['Medicare Advantage', 'Daily copays for the first days of a stay, up to the yearly limit', 'Can help cover those copays'],
            ['Original Medicare + Medigap Plan G', 'Little or nothing after the Part B deductible', 'Usually adds little'],
            ['Original Medicare alone', 'The Part A deductible per benefit period and more', 'Medigap is usually the better first step'],
          ],
        },
        {
          type: 'callout',
          title: 'On the Scope of Appointment',
          text: 'Hospital indemnity can be discussed in a Medicare appointment only if it is listed on the Scope of Appointment you agree to. Otherwise it needs its own Scope of Appointment.',
        },
      ],
    },
  ],
  next: {
    title: 'Book an extra-protection review',
    text: 'We look at your Medicare plan’s hospital costs first, then show whether a fixed benefit would really help.',
    primary: { label: 'Book an extra-protection review', href: '/book-a-call?topic=hospital-indemnity' },
  },
};
