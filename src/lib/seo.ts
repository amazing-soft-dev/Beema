import type { Metadata } from 'next';
import { site } from '@/content/site';

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter fields.
 * `path` is the route ("/turning-65"); the origin comes from metadataBase (site.url).
 */
export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url: path,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
