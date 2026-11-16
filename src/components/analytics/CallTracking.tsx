'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Counts clicks on every tel: link (header, footer, buttons, inline text) with one listener,
 * recording only the page path, never the number dialled. Book a Call clicks are counted too.
 */
export function CallTracking() {
  const pathname = usePathname() ?? '/';
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) track('call_click', { location: pathname });
      else if (href.startsWith('/book-a-call')) track('book_call_click', { location: pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);
  return null;
}
