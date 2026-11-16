import { site } from './site.ts';

/**
 * About Us copy. The founder story is placeholder text, marked TODO(#57) like every
 * other business fact, and must be replaced with the agency's own story before launch.
 */
export const about = {
  intro: {
    eyebrow: 'About us',
    title: 'Local, licensed Medicare help since ' + site.foundedYear,
    lead: `${site.name} helps people turning 65 make sense of Medicare, compare their options and enroll with confidence.`,
  },
  story: {
    title: 'Our story',
    // TODO(#57): replace with the agency's real story.
    paragraphs: [
      `We started ${site.shortName} in ${site.foundedYear} after watching our own parents struggle with Medicare letters, deadlines and sales calls. They needed someone patient who would explain their choices in plain words and then let them decide.`,
      'Today our licensed advisors help families every week, by phone, by video or in person. Most of the people we work with are turning 65 or are still working past 65 and are not sure when to sign up.',
    ],
  },
  mission: {
    title: 'Our mission',
    text: 'Help every person we talk with understand Medicare well enough to make their own decision, without pressure.',
    values: [
      { title: 'Plain words', text: 'No jargon. When we must use a term like IRMAA, we explain it.' },
      { title: 'Your choice', text: 'We lay out the options and the trade-offs. You decide.' },
      { title: 'Here every year', text: 'We review your coverage with you each fall during Annual Enrollment.' },
    ],
  },
  free: {
    title: 'Why our help is free to you',
    points: [
      'Insurance companies pay us a commission when you enroll in a plan through us.',
      'You pay the same premium whether you enroll with us, through the insurer directly or on Medicare.gov. Plan prices are set by the insurer and approved by regulators.',
      'We are paid the same way whichever plan you choose, so we can focus on the one that fits you.',
    ],
  },
  states: {
    title: 'Where we are licensed',
    text: 'We can help residents of these states. Licensing details, including our National Producer Number (NPN), are on our licensing page.',
  },
  /** Press logos for an "As Seen In" strip. Leave empty until there is real coverage. */
  press: [] as { name: string; href: string }[],
} as const;
