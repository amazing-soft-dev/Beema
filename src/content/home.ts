/** Home page copy. Plain words; acronyms spelled out on first use. */
export const home = {
  hero: {
    eyebrow: 'Turning 65 or new to Medicare?',
    title: 'Plain-English Medicare help for people turning 65',
    lead: 'Retiring at 65 or still working, we help you understand your choices, avoid late penalties and pick coverage that fits. Talking with us is free.',
    zipLabel: 'Enter your ZIP code to compare plans in your area',
    zipHint: '5 digits, for example 78701',
    zipButton: 'Compare plans',
    callPrompt: 'Prefer to talk? Call a licensed advisor',
    checklist: { label: 'Download the turning-65 checklist', note: 'Free PDF, large print', href: '/guides/turning-65-checklist.pdf' },
    badge: 'Free help from licensed advisors',
  },
  paths: {
    eyebrow: 'Your two main choices',
    title: 'There are two ways to get your Medicare coverage',
    lead: 'Everyone starts with Part A (hospital) and Part B (medical). Then you choose how to fill the gaps.',
    options: [
      {
        label: 'Path 1',
        title: 'Original Medicare plus a Medigap policy',
        summary: 'Government Medicare pays first, a Medicare Supplement (Medigap) policy pays most of what is left, and a separate Part D plan covers prescriptions.',
        pros: ['See any doctor or hospital in the U.S. that accepts Medicare', 'Few surprise bills: costs are predictable', 'No referrals needed to see a specialist'],
        tradeoffs: ['Higher monthly premium', 'You buy a separate drug plan', 'Usually no dental, vision or hearing coverage'],
        href: '/medicare-101#medigap',
        cta: 'Learn about Medigap',
      },
      {
        label: 'Path 2',
        title: 'A Medicare Advantage plan',
        summary: 'A private plan approved by Medicare (also called Part C) replaces Original Medicare and usually includes drug coverage.',
        pros: ['Low or $0 monthly premium in many areas', 'Often includes drugs, dental, vision and hearing', 'A yearly limit on what you pay out of pocket'],
        tradeoffs: ['You usually use the plan’s network of doctors', 'Copays add up when you use care', 'Coverage away from home can be limited'],
        href: '/medicare-101#medicare-advantage',
        cta: 'Learn about Medicare Advantage',
      },
    ],
    compare: { label: 'Compare them side by side', href: '/medicare-101#compare' },
  },
  free: {
    eyebrow: 'No cost to you',
    title: 'Why talking with us is free',
    text: 'Insurance companies pay us when you enroll in a plan through us. Your premium is the same as if you went to the insurer or Medicare.gov yourself.',
    link: { label: 'More about how we work', href: '/about' },
  },
  window: {
    eyebrow: 'Don’t miss your window',
    title: 'You have 7 months to sign up when you turn 65',
    text: 'Your Initial Enrollment Period starts 3 months before the month you turn 65 and ends 3 months after. Signing up late can mean a penalty for as long as you have Medicare.',
    steps: ['3 months before', 'The month you turn 65', '3 months after'],
    link: { label: 'Find my dates', href: '/tools/enrollment-calculator' },
    secondary: { label: 'Read the turning-65 guide', href: '/turning-65' },
  },
  reviews: {
    eyebrow: 'From the people we help',
    title: 'Read what our clients say',
    text: 'Real reviews from Google, Facebook and Trustpilot, shared with permission.',
    link: { label: 'Read reviews', href: '/reviews' },
  },
  cta: {
    title: 'Talk it through with a licensed advisor',
    text: 'One call can answer most questions. No pressure, no cost.',
  },
} as const;
