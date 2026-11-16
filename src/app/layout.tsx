import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PlaceholderRibbon } from '@/components/PlaceholderRibbon';
import { site } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Turning 65 Medicare Guide`, template: `%s | ${site.name}` },
  description: site.description,
  // Placeholder facts must never be indexed.
  robots: site.placeholder ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PlaceholderRibbon />
        {children}
      </body>
    </html>
  );
}
