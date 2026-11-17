import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { sitemapEntries } from '@/lib/sitemap-entries';

export const dynamic = 'force-static';

/** Generated at build time from the page files and the blog (src/lib/sitemap-entries.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((e) => ({
    url: new URL(e.path, site.url).toString(),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    ...(e.lastModified ? { lastModified: e.lastModified } : {}),
  }));
}
