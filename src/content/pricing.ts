/**
 * AI Plan Match tiers (Hybrid Website Plan §2). Prices stay "TBD" until the state fee
 * review (§6); set them here once confirmed in writing.
 */
export type Tier = {
  id: 'basic' | 'plus' | 'family';
  name: string;
  bestFor: string;
  /** null = price to be decided; 0 = free. */
  monthly: number | null;
  yearly: number | null;
  billing: ('monthly' | 'yearly')[];
  cta: { label: string; href?: string };
};

export const tiers: Tier[] = [
  { id: 'basic', name: 'Basic', bestFor: 'Anyone turning 65 or reviewing coverage', monthly: 0, yearly: 0, billing: ['monthly', 'yearly'], cta: { label: 'Stay on free Basic', href: '/plan-match' } },
  { id: 'plus', name: 'Plus', bestFor: 'Seniors who want year-round watching', monthly: null, yearly: null, billing: ['monthly', 'yearly'], cta: { label: 'Start Plus' } },
  { id: 'family', name: 'Family', bestFor: 'Adult children and caregivers managing a parent’s coverage', monthly: null, yearly: null, billing: ['yearly'], cta: { label: 'Start Family' } },
];

/** Feature rows: [feature, basic, plus, family]. */
export const features: [string, string, string, string][] = [
  ['AI plan match', 'Yes', 'Yes', 'Yes'],
  ['Plain-language “why it fits”', 'Yes', 'Yes', 'Yes'],
  ['Annual AI check before enrollment season', 'No', 'Yes', 'Yes'],
  ['Alerts when drug costs or doctor networks change', 'No', 'Yes', 'Yes'],
  ['Deadline reminders', 'No', 'Yes', 'Yes'],
  ['Caregiver dashboard', 'No', 'No', 'Yes'],
  ['Help with claims and billing questions', 'No', 'No', 'Yes'],
  ['Priority calls', 'No', 'No', 'Yes'],
  ['Licensed agent call and enrollment', 'Free, paid by carrier commission', 'Free, paid by carrier commission', 'Free, paid by carrier commission'],
  ['Insurance purchase required', 'No', 'No', 'No'],
];

export const notIncluded = [
  'Insurance of any kind: a subscription is a service, not a health or drug plan.',
  'Plan advice or enrollment help: those stay free for everyone.',
  'Discounts, gifts or perks for enrolling in a plan.',
  'A guarantee of any plan’s benefits, prices or networks.',
];

export const caregiverFaq: { q: string; a: string }[] = [
  { q: 'Can I manage my parent’s Medicare with the Family tier?', a: 'Yes, once your parent gives written permission. Insurance companies may also need their own authorization form before they talk with you.' },
  { q: 'Does my parent need a subscription to get help?', a: 'No. Plan advice, enrollment and the yearly review are free for every client. Family adds a dashboard, reminders and help with claims for the person helping them.' },
  { q: 'Does buying a plan through you require a subscription?', a: 'Never. Buying insurance through us never requires a subscription, and subscribing never requires buying insurance.' },
  { q: 'Can we cancel?', a: 'Yes, at any time. The terms will be on the Subscription Terms page before the tiers go on sale.' },
];
