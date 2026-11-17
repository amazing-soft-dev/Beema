import type { ContentPage } from './types.ts';

/** Services › Medicare › Medicare Advantage (plan §4: explain MA plans honestly). */
export const medicareAdvantagePage: ContentPage = {
  path: '/medicare-advantage',
  meta: {
    title: 'Medicare Advantage (Part C) explained honestly',
    description: 'How Medicare Advantage plans work: networks and referrals, the yearly out-of-pocket limit, built-in extras, travel coverage and switching to Medigap later.',
  },
  crumbs: [
    { label: 'Services', href: '/services' },
    { label: 'Medicare Advantage', href: '/medicare-advantage' },
  ],
  intro: {
    eyebrow: 'Part C',
    title: 'Medicare Advantage, with the trade-offs',
    lead: 'A Medicare Advantage plan is a private plan approved by Medicare that replaces Original Medicare for your hospital and medical care. Many have low premiums and extras; the trade-off is usually a network.',
  },
  jump: true,
  sections: [
    {
      id: 'how-it-works',
      eyebrow: 'The basics',
      title: 'How a Medicare Advantage plan works',
      lead: 'You still have Medicare and still pay your Part B premium. The plan, not Original Medicare, pays your claims.',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Networks and referrals', text: 'HMO plans usually need you to use their doctors and get referrals for specialists. PPO plans let you go out of network for a higher cost.' },
            { title: 'A yearly limit on costs', text: 'Every plan has an out-of-pocket maximum. Once you reach it, the plan pays 100% of covered care for the rest of the year.' },
            { title: 'Built-in extras', text: 'Many plans include drug coverage and some dental, vision, hearing or fitness benefits. Check what is really covered before you count on it.' },
          ],
        },
      ],
    },
    {
      id: 'trade-offs',
      eyebrow: 'Be honest with yourself',
      title: 'Good to know, and keep in mind',
      blocks: [
        {
          type: 'table',
          caption: 'Medicare Advantage strengths and trade-offs',
          head: ['Topic', 'Often good', 'Keep in mind'],
          rows: [
            ['Premium', 'Low or $0 in many areas', 'Copays and coinsurance add up when you use care'],
            ['Doctors', 'Care can be coordinated in one network', 'Your doctor may not be in the network next year'],
            ['Prior approval', 'Plans manage costs', 'Some services need the plan’s approval first'],
            ['Travel', 'Emergencies are covered anywhere in the U.S.', 'Routine care away from home is often limited'],
            ['Changes', 'You can change plans every fall', 'Benefits and networks can change every year'],
          ],
        },
      ],
    },
    {
      id: 'switching',
      eyebrow: 'Later on',
      title: 'Switching back to Medigap later',
      lead: 'You can leave Medicare Advantage for Original Medicare each fall, but getting a Medigap policy then may not be guaranteed.',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          title: 'Health questions may apply',
          text: 'Outside your first Medigap Open Enrollment, most states let Medigap companies ask health questions and say no. If you try Medicare Advantage first, some people have a one-time “trial right” to switch back within 12 months. Ask us before you decide.',
        },
        {
          type: 'list',
          items: [
            'Annual Enrollment: October 15 to December 7, changes start January 1.',
            'Medicare Advantage Open Enrollment: January 1 to March 31, one change to another plan or back to Original Medicare.',
            'Special Enrollment Periods: for moves, losing other coverage and some other life events.',
          ],
        },
      ],
    },
    {
      id: 'compare',
      eyebrow: 'Compare for yourself',
      title: 'Free, unbiased ways to compare',
      lead: 'We do not offer every plan in your area. You can always compare every plan yourself.',
      blocks: [
        {
          type: 'links',
          items: [
            { label: 'Medicare.gov Plan Finder', href: 'https://www.medicare.gov/plan-compare/' },
            { label: 'Medigap or Medicare Advantage? Read the Medigap page', href: '/medigap' },
          ],
        },
      ],
    },
  ],
  pdf: 'medigap-vs-medicare-advantage',
  next: {
    title: 'Compare Medicare Advantage plans on a call',
    text: 'A licensed agent checks your doctors, drugs and hospitals against the plans we offer in your ZIP code.',
    primary: { label: 'Compare MA plans on a call', href: '/book-a-call?topic=medicare-advantage' },
  },
};
