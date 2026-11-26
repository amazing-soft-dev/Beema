/**
 * Single import surface for business facts, navigation and required notices.
 * Long-form guide copy lives in src/content/guides/* and is re-exported here as it lands.
 *
 * Business details as supplied by the owner on 2026-11-25. While `placeholder` is true the
 * site is noindexed and robots.txt blocks crawling (see src/app/layout.tsx and src/app/robots.ts).
 */

export type StateLicense = {
  code: string;
  name: string;
  /** State insurance license number (in California, the CDI license number). */
  license: string;
};

export type Hours = { days: string; time: string };

export const site = {
  /** true keeps every page out of search (noindex, robots.txt Disallow). */
  placeholder: false,

  name: 'Senior AI Plans',
  shortName: 'Senior AI Plans',
  legalName: 'Senior AI Plans, LLC',
  tagline: 'Plain-English Medicare help for people turning 65.',
  description:
    'Free, licensed Medicare help for people turning 65 and the families who help them: a free plan match that explains which coverage type fits and why, plain-English guides, enrollment dates, and a call with a licensed agent.',

  /** Canonical origin. Overridden by NEXT_PUBLIC_SITE_URL in each environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.senioraiplans.com',

  phone: { display: '(254) 356-3878', tel: '+12543563878' },
  tty: { display: 'TTY 711', tel: '711' },
  email: 'hello@senioraiplans.com',
  hours: [
    { days: 'Monday to Friday', time: '8:00 a.m. to 6:00 p.m. Pacific' },
    { days: 'Saturday', time: '9:00 a.m. to 1:00 p.m. Pacific' },
  ] satisfies Hours[],
  address: {
    street: '2237 Mason St',
    city: 'San Francisco',
    region: 'CA',
    postalCode: '94133',
    country: 'US',
  },

  foundedYear: 2026,
  /** National Producer Number. */
  npn: '42868828',
  licensedStates: [
    { code: 'CA', name: 'California', license: '0M84910' },
    { code: 'TX', name: 'Texas', license: '2849103' },
    { code: 'FL', name: 'Florida', license: 'W492018' },
    { code: 'AZ', name: 'Arizona', license: '7391042' },
  ] satisfies StateLicense[],

  /**
   * Numbers for the required CMS disclaimer: how many organizations the agency
   * represents and how many products they offer in the visitor's area (owner, 2026-11-25).
   */
  cms: { organizations: 8, products: 45 },

  existingClients: { label: 'Existing clients', href: '/contact#existing-clients' },
} as const;

// Menu, header buttons and footer links: src/content/menu.ts (re-exported here).
export * from './menu.ts';

/** Required notices. Components in src/components/compliance render these; never paraphrase them. */
export const notices = {
  cmsDisclaimer: `We do not offer every plan available in your area. Currently we represent ${site.cms.organizations} organizations which offer ${site.cms.products} products in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.`,
  govDisclaimer:
    'This website is not connected with or endorsed by the U.S. government or the federal Medicare program.',
  /**
   * Phone-contact consent. Shown next to an UNCHECKED checkbox on every form that asks for a
   * phone number, and copied into each lead email so the exact wording agreed to is on record.
   * Names the business, as the content plan requires. Have it reviewed before launch (#56).
   */
  phoneConsent: `By checking this box, I agree that ${site.legalName} and its licensed insurance agents may contact me at the phone number I provided about Medicare Advantage plans, Medicare Supplement (Medigap) insurance and Part D prescription drug plans, including by calls and text messages that may use automated technology. Consent is not a condition of any purchase. Message and data rates may apply. I can opt out at any time.`,
  /**
   * Call-recording notice (review 2026-11-25, INS-04/INS-34). Federal rules require recorded
   * sales calls; California (Penal Code 632) and Florida need every party's consent. Shown
   * before anyone books or asks for a call; agents also announce it at the start of each call.
   */
  callRecording:
    'Calls with our licensed agents, including the sound of video calls, are recorded for quality and because Medicare rules require it. By continuing a call with us, you agree to the recording. We keep recordings for at least 6 years.',
  /** Scope of Appointment note for Book a Call. */
  scopeOfAppointment:
    'Before your appointment starts, we will confirm which types of coverage you want to discuss, such as Medicare Advantage, Medicare Supplement (Medigap) insurance or prescription drug plans. Medicare rules require us to record this Scope of Appointment, and we will only talk about the products you agree to.',
} as const;

// Official Medicare cost figures (plan year, IRMAA tables).
export * from './medicare-figures.ts';
