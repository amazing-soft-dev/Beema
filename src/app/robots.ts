import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** Blocks all crawling while the site holds placeholder business details (see site.ts). */
export default function robots(): MetadataRoute.Robots {
  if (site.placeholder) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/print/', '/api/'] },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  };
}
