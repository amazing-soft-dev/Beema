import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { PlaceholderRibbon } from '@/components/PlaceholderRibbon';
import { site } from '@/content/site';
import './globals.css';

// Body face. Self-hosted by next/font at build time (SIL Open Font License).
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0f3d2e',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Turning 65 Medicare Guide`, template: `%s | ${site.name}` },
  description: site.description,
  // Placeholder facts must never be indexed.
  robots: site.placeholder ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Headings use Switzer 600 (fetched at build time, see scripts/fetch-fonts.mjs).
  preload('/fonts/switzer-600.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <PlaceholderRibbon />
        {children}
      </body>
    </html>
  );
}
