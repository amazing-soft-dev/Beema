import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { PlaceholderRibbon } from '@/components/PlaceholderRibbon';
import { Analytics } from '@/components/analytics/Analytics';
import { CallTracking } from '@/components/analytics/CallTracking';
import { ChatButton } from '@/components/chat/ChatButton';
import { CallbackPanel } from '@/components/layout/CallbackPanel';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PrintFooter, PrintHeader } from '@/components/print/PrintFrame';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { JsonLd, agencyJsonLd } from '@/components/seo/JsonLd';
import { site } from '@/content/site';
import { themeScript } from '@/lib/theme';
import './globals.css';

// Body face. Self-hosted by next/font at build time (SIL Open Font License).
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0b2545',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Turning 65 Medicare Guide`, template: `%s | ${site.name}` },
  description: site.description,
  // Placeholder facts must never be indexed.
  robots: site.placeholder ? { index: false, follow: false } : undefined,
  // Uploaded favicon sets (public/brand): the navy and gold mark for light browser chrome,
  // the white and teal mark when the system is dark. /favicon.ico is src/app/favicon.ico.
  icons: {
    icon: [
      { url: '/brand/senior_ai_plans_light/favicon-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/brand/senior_ai_plans_light/favicon-16x16.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/brand/senior_ai_plans_dark/favicon-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/brand/senior_ai_plans_dark/favicon-16x16.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/brand/senior_ai_plans_light/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Headings use Switzer 600 (fetched at build time, see scripts/fetch-fonts.mjs).
  preload('/fonts/switzer-600.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    // suppressHydrationWarning: the head script may set data-theme before React hydrates.
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Applies a saved Light/Dark choice before first paint (src/lib/theme.ts). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-pill bg-gold px-6 py-3 font-semibold text-on-gold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <PlaceholderRibbon />
        <SiteHeader />
        {/* Pages render sections, not their own <main>. */}
        <PrintHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
          <CallbackPanel />
        </main>
        <PrintFooter />
        <SiteFooter />
        <JsonLd data={agencyJsonLd()} />
        <Analytics />
        <CallTracking />
        <ChatButton />
      </body>
    </html>
  );
}
