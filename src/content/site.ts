/**
 * Single import surface for business facts, navigation and required notices.
 * Long-form guide copy lives in src/content/guides/* and is re-exported here as it lands.
 *
 * PLACEHOLDER DATA: every value marked TODO(#57) is a realistic sample, not real
 * business information. While `placeholder` is true the site is noindexed and shows a
 * "Sample content" ribbon (see src/components/PlaceholderRibbon.tsx).
 */

export type StateLicense = {
  code: string;
  name: string;
  /** State insurance license number. TODO(#57) */
  license: string;
};

export type Hours = { days: string; time: string };

export type NavItem = { label: string; href: string };

export const site = {
  /** Flip to false in #57 once every TODO below holds real data. */
  placeholder: true,

  name: 'Silver Path Medicare Advisors', // TODO(#57)
  shortName: 'Silver Path', // TODO(#57)
  legalName: 'Silver Path Medicare Advisors, LLC', // TODO(#57)
  tagline: 'Plain-English Medicare help for people turning 65.',
  description:
    'Free, licensed help for people turning 65 or new to Medicare: compare Original Medicare with Medigap and Medicare Advantage, check your enrollment dates, and talk to a local advisor.',

  /** Canonical origin. Overridden by NEXT_PUBLIC_SITE_URL in each environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.example.com', // TODO(#57)

  // 555-0100 to 555-0199 are reserved for fictional use.
  phone: { display: '(555) 010-0165', tel: '+15550100165' }, // TODO(#57)
  tty: { display: 'TTY 711', tel: '711' },
  email: 'hello@example.com', // TODO(#57)
  hours: [
    { days: 'Monday to Friday', time: '8:00 a.m. to 6:00 p.m. Central' },
    { days: 'Saturday', time: '9:00 a.m. to 1:00 p.m. Central' },
  ] satisfies Hours[], // TODO(#57)
  address: {
    street: '100 Example Street, Suite 200',
    city: 'Austin',
    region: 'TX',
    postalCode: '78701',
    country: 'US',
  }, // TODO(#57)

  foundedYear: 2016, // TODO(#57)
  /** National Producer Number. TODO(#57) */
  npn: '00000000',
  licensedStates: [
    { code: 'TX', name: 'Texas', license: '0000000' },
    { code: 'FL', name: 'Florida', license: 'W000000' },
    { code: 'AZ', name: 'Arizona', license: '0000000' },
  ] satisfies StateLicense[], // TODO(#57)

  /**
   * Numbers for the required CMS disclaimer: how many organizations the agency
   * represents and how many products they offer in the visitor's area. TODO(#57)
   */
  cms: { organizations: 8, products: 45 },

  existingClients: { label: 'Existing clients', href: '/contact#existing-clients' },
} as const;

/** Primary menu, in the order the content plan suggests. Book a Call is rendered as a button. */
export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Turning 65', href: '/turning-65' },
  { label: 'Medicare 101', href: '/medicare-101' },
  { label: 'Resources', href: '/resources' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const bookCall: NavItem = { label: 'Book a Call', href: '/book-a-call' };

/** Footer link groups. Every page of the main menu is repeated (no-JavaScript fallback). */
export const footerNav: { heading: string; links: NavItem[] }[] = [
  { heading: 'Explore', links: [...nav, { label: 'Meet the Team', href: '/about/team' }, bookCall] },
  {
    heading: 'Tools and guides',
    links: [
      { label: 'Enrollment date calculator', href: '/tools/enrollment-calculator' },
      { label: 'Plan comparison', href: '/tools/plan-comparison' },
      { label: 'IRMAA calculator', href: '/tools/irmaa-calculator' },
      { label: 'Glossary', href: '/resources/glossary' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/legal/privacy' },
      { label: 'Terms of use', href: '/legal/terms' },
      { label: 'CMS disclaimer', href: '/legal/cms-disclaimer' },
      { label: 'Licensing', href: '/legal/licensing' },
      { label: 'Accessibility statement', href: '/legal/accessibility' },
    ],
  },
];

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
  /** Scope of Appointment note for Book a Call. */
  scopeOfAppointment:
    'Before your appointment starts, we will confirm which types of coverage you want to discuss, such as Medicare Advantage, Medicare Supplement (Medigap) insurance or prescription drug plans. Medicare rules require us to record this Scope of Appointment, and we will only talk about the products you agree to.',
} as const;
