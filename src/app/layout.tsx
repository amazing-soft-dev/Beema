import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { PlaceholderRibbon } from '@/components/PlaceholderRibbon';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd, agencyJsonLd } from '@/components/seo/JsonLd';
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
        <a
          href="#main"
          className="sr-only z-50 rounded-pill bg-lime px-6 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <PlaceholderRibbon />
        <SiteHeader />
        {/* Pages render sections, not their own <main>. */}
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={agencyJsonLd()} />
      </body>
    </html>
  );
}
