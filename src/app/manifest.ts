import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#0b2545',
    // Uploaded Android icons (public/brand/senior_ai_plans_light).
    icons: [
      { src: '/brand/senior_ai_plans_light/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/senior_ai_plans_light/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
