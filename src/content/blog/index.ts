import type { Block } from '../pages/types.ts';
import { caregiverGuide } from './helping-a-parent-with-medicare.ts';
import { planGvsN } from './medigap-plan-g-vs-plan-n.ts';
import { turning65Steps } from './turning-65-what-to-do-and-when.ts';

/**
 * Resources › Blog (plan §4): articles by topic with the plan year on every cost figure,
 * the author's license line and the TPMO disclaimer. Add an article: a file here exporting
 * an Article, then list it in `articles`.
 */
export const topics = {
  'turning-65': 'Turning 65',
  medigap: 'Medigap',
  'medicare-advantage': 'Medicare Advantage',
  'part-d': 'Part D',
  'beyond-medicare': 'Beyond Medicare',
  caregivers: 'Helping a parent with Medicare',
} as const;
export type Topic = keyof typeof topics;

export type Article = {
  slug: string;
  title: string;
  description: string;
  topic: Topic;
  /** YYYY-MM-DD */
  published: string;
  updated?: string;
  /** Plan year of every cost figure in the article. */
  planYear: number;
  readMinutes: number;
  /** Author with license line (TODO(#57): real agent and NPN). */
  author: { name: string; license: string };
  sections: { heading: string; blocks: Block[] }[];
  /** Related library PDF slug. */
  pdf?: string;
};

export const articles: Article[] = [turning65Steps, planGvsN, caregiverGuide].sort((a, b) => b.published.localeCompare(a.published));

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleHref = (slug: string) => `/blog/${slug}`;
