/**
 * Site menu from the Hybrid Website Plan (§3): five items, Home, Services, Resources, About
 * and Contact. Services shows three labelled groups (AI Plan Match, Medicare, Beyond
 * Medicare) so the subscription and the add-on products never look like Medicare plans.
 * Every item also has its own landing page.
 *
 * Pages land one at a time, so the header, menu and footer show only links whose page
 * exists (`availableMenu`, filtered at build time with listStaticRoutes). A test checks
 * every link here is either a page or planned in `plannedRoutes`.
 */

export type NavItem = { label: string; href: string };
export type MenuLink = NavItem & {
  /** One plain sentence shown under the label in the Services menu. */
  description?: string;
  /** Plan phase 5 ("later"): shown with a "Coming later" tag. */
  later?: boolean;
};
export type MenuGroup = { heading: string; note?: string; links: MenuLink[] };
export type MenuItem = NavItem & { groups?: MenuGroup[] };

export const menu: MenuItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    groups: [
      {
        heading: 'AI Plan Match',
        note: 'Our own free tool. Not an insurance plan.',
        links: [
          { label: 'Free plan match', href: '/plan-match', description: 'Which coverage type fits you, and why' },
          { label: 'Plans & Pricing', href: '/plans-pricing', description: 'Basic is free; Plus and Family add year-round help' },
          { label: 'Family Dashboard', href: '/family-dashboard', description: 'For adult children helping a parent', later: true },
        ],
      },
      {
        heading: 'Medicare',
        links: [
          { label: 'Turning 65 / New to Medicare', href: '/turning-65', description: 'Your step-by-step timeline' },
          { label: 'Medicare 101', href: '/medicare-101', description: 'Parts A, B, C and D in plain words' },
          { label: 'Medigap (Medicare Supplement)', href: '/medigap', description: 'Plan G, Plan N and when to buy' },
          { label: 'Medicare Advantage', href: '/medicare-advantage', description: 'Networks, extras and trade-offs' },
          { label: 'Part D Drug Plans', href: '/part-d', description: 'Drug coverage and avoiding the penalty' },
          { label: 'Annual Plan Review', href: '/annual-review', description: 'A free check every fall' },
        ],
      },
      {
        heading: 'Beyond Medicare',
        note: 'Not Medicare and not government plans.',
        links: [
          { label: 'What Medicare doesn’t cover', href: '/beyond-medicare', description: 'The gaps, and who may not need more' },
          { label: 'Final Expense', href: '/beyond-medicare/final-expense', description: 'Small life policies for final bills' },
          { label: 'Hospital Indemnity', href: '/beyond-medicare/hospital-indemnity', description: 'Cash toward hospital stay costs' },
          { label: 'Dental, Vision & Hearing', href: '/beyond-medicare/dental-vision-hearing', description: 'Coverage Original Medicare leaves out' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    groups: [
      {
        heading: 'Resources',
        links: [
          { label: 'Resources Hub', href: '/resources', description: 'Free PDF guides and tools' },
          { label: 'Blog', href: '/blog', description: 'Articles for you and your family' },
          { label: 'FAQ', href: '/faq', description: 'Short answers to common questions' },
          { label: 'Glossary', href: '/resources/glossary', description: 'Medicare words, A to Z' },
        ],
      },
      {
        heading: 'Tools',
        links: [
          { label: 'Enrollment date calculator', href: '/tools/enrollment-calculator' },
          { label: 'IRMAA calculator', href: '/tools/irmaa-calculator' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    groups: [
      {
        heading: 'About',
        links: [
          { label: 'About Us', href: '/about', description: 'Who we are and how we are paid' },
          { label: 'Reviews', href: '/reviews', description: 'What our clients say' },
          { label: 'Meet the Team', href: '/about/team', description: 'Our licensed agents', later: true },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    groups: [
      {
        heading: 'Contact',
        links: [
          { label: 'Contact', href: '/contact', description: 'Phone, email and a callback form' },
          { label: 'Book a Call', href: '/book-a-call', description: 'Phone, video or in person' },
        ],
      },
    ],
  },
];

/** Header buttons outside the five items (plan §3). */
export const planMatch: NavItem = { label: 'Get my free plan match', href: '/plan-match' };
export const bookCall: NavItem = { label: 'Book a Call', href: '/book-a-call' };

/** The eight footer pages (plan §4, Footer). */
export const legalLinks: NavItem[] = [
  { label: 'Disclaimer (CMS/TPMO)', href: '/legal/cms-disclaimer' },
  { label: 'Licensing', href: '/legal/licensing' },
  { label: 'AI Tool & Health Data Notice', href: '/legal/ai-health-data' },
  { label: 'Subscription Terms', href: '/legal/subscription-terms' },
  { label: 'Product Disclosures', href: '/legal/product-disclosures' },
  { label: 'Privacy & Consent', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Accessibility', href: '/legal/accessibility' },
];

/** Pages the plan adds in later issues; the menu test accepts these before they exist. */
export const plannedRoutes = [
  '/services',
  '/plan-match',
  '/plans-pricing',
  '/family-dashboard',
  '/medigap',
  '/medicare-advantage',
  '/part-d',
  '/annual-review',
  '/beyond-medicare',
  '/beyond-medicare/final-expense',
  '/beyond-medicare/hospital-indemnity',
  '/beyond-medicare/dental-vision-hearing',
  '/blog',
  '/legal/ai-health-data',
  '/legal/subscription-terms',
  '/legal/product-disclosures',
];

const path = (href: string) => href.split('#')[0] || '/';

/**
 * The menu with only the links whose page exists (all links when routes is null). An item whose landing page is not built
 * yet links to its first available page; an item with nothing available is dropped.
 */
export function availableMenu(routes: Set<string> | null): MenuItem[] {
  const live = (href: string) => !routes || routes.has(path(href));
  return menu.flatMap((item) => {
    const groups = item.groups?.map((g) => ({ ...g, links: g.links.filter((l) => live(l.href)) })).filter((g) => g.links.length > 0);
    const first = groups?.[0]?.links[0];
    if (live(item.href)) return [{ ...item, groups }];
    if (first) return [{ ...item, href: first.href, groups }];
    return [];
  });
}

/** Footer link groups: one per menu item with a dropdown, then the legal pages. */
export function footerGroups(items: MenuItem[], routes: Set<string> | null): { heading: string; links: NavItem[] }[] {
  const groups = items
    .filter((item) => item.groups)
    .map((item) => ({
      heading: item.label,
      links: item.groups!.flatMap((g) => g.links).map(({ label, href }) => ({ label, href })),
    }));
  return [...groups, { heading: 'Legal', links: legalLinks.filter((l) => !routes || routes.has(path(l.href))) }];
}
