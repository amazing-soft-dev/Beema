import { articleHref, articles } from '../content/blog/index.ts';
import { listStaticRoutes } from './routes.ts';

/** Pages marked noindex; kept out of the sitemap and llms.txt. None today: the Family Dashboard page is live. */
export const noindexRoutes = new Set<string>();

/** Pages people are most likely to need: the guides, the free match and booking. */
const important = new Set(['/turning-65', '/medicare-101', '/medigap', '/medicare-advantage', '/part-d', '/plan-match', '/services', '/book-a-call']);

export type SitemapEntry = { path: string; changeFrequency: 'yearly' | 'monthly' | 'weekly'; priority: number; lastModified?: string };

/** Every indexable page: static routes from the file system plus each blog article. */
export function sitemapEntries(routes = listStaticRoutes()): SitemapEntry[] {
  const pages: SitemapEntry[] = routes
    .filter((r) => !noindexRoutes.has(r))
    .map((r) => ({
      path: r,
      changeFrequency: r.startsWith('/legal') ? 'yearly' : r === '/blog' ? 'weekly' : 'monthly',
      priority: r === '/' ? 1 : important.has(r) ? 0.9 : r.startsWith('/legal') ? 0.3 : 0.7,
    }));
  const posts: SitemapEntry[] = articles.map((a) => ({ path: articleHref(a.slug), changeFrequency: 'monthly', priority: 0.6, lastModified: a.updated ?? a.published }));
  return [...pages, ...posts];
}
