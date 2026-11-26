import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** Allows crawling once site.placeholder is false; blocks everything while it is true (see site.ts). */
export default function robots(): MetadataRoute.Robots {
  if (site.placeholder) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/print/', '/api/'] },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  };
}
