import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { listStaticRoutes } from '@/lib/routes';

export const dynamic = 'force-static';

/** Generated from the page files at build time. Guides get a higher priority. */
export default function sitemap(): MetadataRoute.Sitemap {
  const important = new Set(['/', '/turning-65', '/medicare-101', '/book-a-call']);
  return listStaticRoutes().map((route) => ({
    url: new URL(route, site.url).toString(),
    changeFrequency: route.startsWith('/legal') ? 'yearly' : 'monthly',
    priority: route === '/' ? 1 : important.has(route) ? 0.9 : route.startsWith('/legal') ? 0.3 : 0.7,
  }));
}
