/**
 * AI Plan Match tiers (Hybrid Website Plan §2). Prices set by the owner on 2026-11-25: Plus $9 a
 * month, Family $19 a month, and a yearly option at about two months free ($90 and $190).
 * Paid tiers are offered only in the states listed in subscriptionStates (never California;
 * review 2026-11-25, INS-30).
 */
export type Tier = {
  id: 'basic' | 'plus' | 'family';
  name: string;
  bestFor: string;
  /** Whole US dollars; null = price to be decided; 0 = free. */
  monthly: number | null;
  yearly: number | null;
  billing: ('monthly' | 'yearly')[];
  cta: { label: string; href?: string };
};

export const tiers: Tier[] = [
  { id: 'basic', name: 'Basic', bestFor: 'Anyone turning 65 or reviewing coverage', monthly: 0, yearly: 0, billing: ['monthly', 'yearly'], cta: { label: 'Stay on free Basic', href: '/plan-match' } },
  { id: 'plus', name: 'Plus', bestFor: 'Seniors who want year-round watching', monthly: 9, yearly: 90, billing: ['monthly', 'yearly'], cta: { label: 'Start Plus' } },
  { id: 'family', name: 'Family', bestFor: 'Adult children and caregivers managing a parent’s coverage', monthly: 19, yearly: 190, billing: ['monthly', 'yearly'], cta: { label: 'Start Family' } },
];

/**
 * Feature rows: [feature, basic, plus, family]. Paid tiers add ongoing extras only (alerts,
 * reminders and the caregiver dashboard). Plan recommendations, the yearly review and
 * enrollment stay free for everyone, so nobody pays for advice or service tied to a plan sale
 * (owner, 2026-11-25; review INS-30 and INS-31).
 */
export const features: [string, string, string, string][] = [
  ['AI plan match', 'Yes', 'Yes', 'Yes'],
  ['Plain-language “why it fits”', 'Yes', 'Yes', 'Yes'],
  ['Yearly plan review with a licensed agent', 'Yes', 'Yes', 'Yes'],
  ['Alerts when drug costs or doctor networks change', 'No', 'Yes', 'Yes'],
  ['Deadline reminders', 'No', 'Yes', 'Yes'],
  ['Caregiver dashboard', 'No', 'No', 'Yes'],
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
  { q: 'Does my parent need a subscription to get help?', a: 'No. Plan advice, enrollment, the yearly review and our calls are free for every client. Family adds a dashboard and reminders for the person helping them.' },
  { q: 'Does buying a plan through you require a subscription?', a: 'Never. Buying insurance through us never requires a subscription, and subscribing never requires buying insurance.' },
  { q: 'Can we cancel?', a: 'Yes, at any time, from the link in your receipt email or by calling us. See the Subscription Terms for refunds.' },
];
