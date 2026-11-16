// What `npm run pdf` renders and which sources each set of PDFs depends on.
// pdf:check hashes those sources so CI fails when content changes but the PDFs were not
// regenerated ("pages and PDFs never drift apart").

/** Guide pages saved as PDFs: the page itself through the print stylesheet. */
export const PAGE_PDFS = [
  { slug: 'turning-65', path: '/turning-65', title: 'Turning 65: your step-by-step Medicare guide' },
  { slug: 'medicare-101', path: '/medicare-101', title: 'Medicare 101' },
  { slug: 'faq', path: '/faq', title: 'Medicare questions and answers' },
];

export const PAGE_PDF_DIR = 'public/pdf';

/** Source files and folders whose content ends up in the PDFs. */
export const PDF_SOURCES = [
  // Only the content the three guide pages use, so library-only edits do not force a rebuild.
  'src/content/guides',
  'src/content/medicare-figures.ts',
  'src/content/site.ts',
  'src/components/guides',
  'src/components/print',
  'src/app/turning-65/page.tsx',
  'src/app/medicare-101/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/globals.css',
  'src/components/ui/Photo.tsx',
];

/** Ready-made library PDFs, rendered only by `npm run pdf:library` (they may be replaced by uploads). */
export { guidesLibrary as LIBRARY } from '../../src/content/guides-library.ts';
export const LIBRARY_DIR = 'public/guides';
