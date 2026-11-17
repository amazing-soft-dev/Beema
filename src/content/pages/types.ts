/**
 * Content model for the plan's guide and product pages (Services › Medicare, Beyond
 * Medicare, footer notices). Copy lives in src/content/pages/*.ts; the renderer is
 * src/components/content/ContentSections.tsx. Plain words; acronyms spelled out first.
 */

export type PageLink = { label: string; href: string };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'cards'; items: { title: string; text: string; tag?: string; points?: string[] }[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'callout'; tone?: 'info' | 'warning'; title?: string; text: string }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'links'; items: PageLink[] };

export type ContentSection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  blocks: Block[];
};

export type ContentPage = {
  path: string;
  meta: { title: string; description: string };
  /** Breadcrumb after Home, ending with this page. */
  crumbs: PageLink[];
  intro: { eyebrow: string; title: string; lead: string };
  /** Show "on this page" links under the intro. */
  jump?: boolean;
  sections: ContentSection[];
  next: { title: string; text: string; primary?: PageLink; secondary?: PageLink };
  /** Related PDF in the guide library (slug in guides-library.ts). */
  pdf?: string;
  /** Non-Medicare product notice shown at the top and bottom (Beyond Medicare pages). */
  disclosure?: 'general' | 'life' | 'limited-benefit' | 'dental-vision';
};
