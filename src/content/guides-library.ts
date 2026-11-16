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
};

export const guidesLibrary: LibraryGuide[] = [
  { slug: 'turning-65-checklist', title: 'Turning-65 Checklist', description: 'Every step from 6 months before your birthday to your first year on Medicare, with boxes to tick.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'medicare-101-guide', title: 'Medicare 101 Guide', description: 'Parts A to D, Medigap and Medicare Advantage, and the key dates, in plain words.', planYear: 2026, updated: '2026-11-15', pages: 4 },
  { slug: 'medigap-vs-medicare-advantage', title: 'Medigap vs Medicare Advantage', description: 'A side-by-side comparison to help you choose your path.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'annual-enrollment-checklist', title: 'Annual Enrollment Checklist', description: 'What to review between October 15 and December 7 so next year’s plan still fits.', planYear: 2026, updated: '2026-11-15', pages: 1 },
  { slug: 'part-b-signup-guide', title: 'Part B Signup Guide', description: 'How and when to sign up for Part B, including if you are still working.', planYear: 2026, updated: '2026-11-15', pages: 2 },
  { slug: 'medicare-glossary', title: 'Medicare Glossary', description: 'The Medicare terms and abbreviations you will hear, explained in plain English.', planYear: 2026, updated: '2026-11-15', pages: 3 },
];

export const guideHref = (slug: string) => `/guides/${slug}.pdf`;
export const findGuide = (slug: string) => guidesLibrary.find((g) => g.slug === slug);
