/** Home page copy. Plain words; acronyms spelled out on first use. */
export const home = {
  hero: {
    eyebrow: 'Turning 65 or new to Medicare?',
    title: 'Medicare made simple, for you and your family',
    lead: 'Whether you are turning 65 or helping a parent, our free AI Plan Match explains which coverage fits and why, and a licensed agent helps you enroll at no cost.',
    secondaryCta: 'Book a free call',
    callPrompt: 'Prefer to talk? Call a licensed agent at',
  },
  ticker: {
    label: 'What we help with',
    items: ['Turning 65', 'Medigap Plan G and N', 'Medicare Advantage', 'Part D drug plans', 'Annual plan reviews', 'Dental, vision and hearing', 'Final expense', 'Helping a parent'],
  },
  whoFor: {
    eyebrow: 'Who we help',
    lead: 'People turning 65 who want plain answers, and the sons and daughters helping a parent. Our help is free, our match never pushes a plan, and a licensed person is always there to talk.',
    audiences: [
      { title: 'Turning 65 or new to Medicare', text: 'Your dates, your choices and the trade-offs, in plain words.', link: { label: 'Start with the Turning 65 guide', href: '/turning-65' } },
      { title: 'Helping a parent', text: 'Permission forms, key dates and how to help without taking over.', link: { label: 'Read the caregiver’s guide', href: '/blog/helping-a-parent-with-medicare' } },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Help for every step, and nothing you don’t need',
    lead: 'Our own free plan match, plain-English Medicare help, and honest advice about the coverage Medicare leaves out.',
    tiles: [
      { group: 'AI Plan Match', title: 'Free plan match', text: 'Which coverage type fits you, with three reasons and the trade-offs.', href: '/plan-match', icon: 'sparkle' },
      { group: 'Medicare', title: 'Turning 65', text: 'Your enrollment dates and choices, step by step.', href: '/turning-65', icon: 'calendar' },
      { group: 'Medicare', title: 'Medigap', text: 'Plan G, Plan N and the 6-month window to buy.', href: '/medigap', icon: 'shield' },
      { group: 'Medicare', title: 'Medicare Advantage', text: 'Networks, extras and the yearly limit, honestly.', href: '/medicare-advantage', icon: 'stethoscope' },
      { group: 'Medicare', title: 'Part D drug plans', text: 'Check your drugs and avoid the late penalty.', href: '/part-d', icon: 'pill' },
      { group: 'Beyond Medicare', title: 'What Medicare doesn’t cover', text: 'Dental, vision, hearing and final costs. Not Medicare plans.', href: '/beyond-medicare', icon: 'lifebuoy' },
    ],
  },
  numbers: {
    eyebrow: 'By the numbers',
    title: 'The Medicare dates that matter most',
    stats: [
      { value: 7, suffix: ' months', label: 'Initial Enrollment Period', text: 'Around your 65th birthday month to sign up.' },
      { value: 6, suffix: ' months', label: 'Medigap Open Enrollment', text: 'To buy any Medigap plan with no health questions.' },
      { value: 63, suffix: ' days', label: 'Without drug coverage', text: 'Go longer and a Part D penalty may apply.' },
      { value: 8, suffix: ' months', label: 'After job coverage ends', text: 'To sign up for Part B without a penalty.' },
    ],
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
        href: '/medigap',
        cta: 'Learn about Medigap',
      },
      {
        label: 'Path 2',
        title: 'A Medicare Advantage plan',
        summary: 'A private plan approved by Medicare (also called Part C) replaces Original Medicare and usually includes drug coverage.',
        pros: ['Low or $0 monthly premium in many areas', 'Often includes drugs, dental, vision and hearing', 'A yearly limit on what you pay out of pocket'],
        tradeoffs: ['You usually use the plan’s network of doctors', 'Copays add up when you use care', 'Coverage away from home can be limited'],
        href: '/medicare-advantage',
        cta: 'Learn about Medicare Advantage',
      },
    ],
    compare: { label: 'Compare them side by side', href: '/medigap#compare' },
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
  matchBox: {
    eyebrow: 'Free AI Plan Match',
    title: 'A plan match that explains itself',
    text: 'Answer a few plain questions and see which coverage type fits you, with three reasons and the trade-offs. Free, with nothing to buy.',
    cards: [
      'Suggests a coverage type, never a company, and never favors what pays us more.',
      'Three plain reasons it fits you, plus the trade-offs to know.',
      'Lists free help too: Medicare.gov Plan Finder, 1-800-MEDICARE and your SHIP.',
      'A licensed agent reviews every match with you before any enrollment.',
    ],
  },
  checklist: { title: 'Turning 65? Get the free checklist' },
  articles: { title: 'Plain answers from our blog' },
  cta: {
    title: 'Talk it through with a licensed agent',
    button: 'Book a free call',
    points: ['Free, paid by insurance companies', 'No pressure, your choice', 'A yearly review, every fall'],
  },
} as const;
