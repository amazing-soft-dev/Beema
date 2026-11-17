/**
 * Ready-made PDF guides on the Resources page. The files live in public/guides/<slug>.pdf;
 * replace a file by uploading a newly designed one with the same name and updating
 * `updated` (and `planYear` each fall). File sizes are read at build time.
 */
export type LibraryGuide = {
  slug: string;
  title: string;
  description: string;
  planYear: number;
  /** Last updated, YYYY-MM-DD. */
  updated: string;
  pages: number;
  /** Beyond Medicare guides also carry the non-Medicare product disclosure (plan §5). */
  addOn?: 'general' | 'life' | 'dental-vision';
};

export const guidesLibrary: LibraryGuide[] = [
  { slug: 'turning-65-checklist', title: 'Turning-65 Checklist', description: 'Every step from 6 months before your birthday to your first year on Medicare, with boxes to tick.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'medicare-101-guide', title: 'Medicare 101 Guide', description: 'Parts A to D, Medigap and Medicare Advantage, and the key dates, in plain words.', planYear: 2026, updated: '2026-11-15', pages: 4 },
  { slug: 'medigap-vs-medicare-advantage', title: 'Medigap vs Medicare Advantage', description: 'A side-by-side comparison to help you choose your path.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'annual-enrollment-checklist', title: 'Annual Enrollment Checklist', description: 'What to review between October 15 and December 7 so next year’s plan still fits.', planYear: 2026, updated: '2026-11-15', pages: 1 },
  { slug: 'part-b-signup-guide', title: 'Part B Signup Guide', description: 'How and when to sign up for Part B, including if you are still working.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'gap-worksheet', title: 'What Medicare Doesn’t Cover: Gap Worksheet', description: 'Fill in who pays for dental, vision, hearing, hospital costs, final costs and long-term care, to see your real gaps.', planYear: 2026, updated: '2026-11-17', pages: 1, addOn: 'general' },
  { slug: 'final-expense-worksheet', title: 'Final Expense Planning Worksheet', description: 'Funeral wishes, expected final bills, existing life policies and beneficiaries. A planning tool, not a quote.', planYear: 2026, updated: '2026-11-17', pages: 2, addOn: 'life' },
  { slug: 'dental-vision-checklist', title: 'Dental & Vision Questions Checklist', description: 'Waiting periods, annual maximums, networks and what Medicare Advantage extras already include.', planYear: 2026, updated: '2026-11-17', pages: 1, addOn: 'dental-vision' },
  { slug: 'caregiver-checklist', title: 'Caregiver’s Medicare Checklist', description: 'For adult children: documents to gather, permission forms and the key dates each year.', planYear: 2026, updated: '2026-11-17', pages: 2 },
  { slug: 'medicare-glossary', title: 'Medicare Glossary', description: 'The Medicare terms and abbreviations you will hear, explained in plain English.', planYear: 2026, updated: '2026-11-15', pages: 3 },
];

export const guideHref = (slug: string) => `/guides/${slug}.pdf`;
export const findGuide = (slug: string) => guidesLibrary.find((g) => g.slug === slug);
