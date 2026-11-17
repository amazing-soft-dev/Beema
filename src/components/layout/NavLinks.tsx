'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuItem } from '@/content/menu';

/** True when `href` is the current page or one of its sections (except Home). */
export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** True when the current page is the item's landing page or one of its group links. */
export function isItemActive(pathname: string, item: MenuItem) {
  return isActive(pathname, item.href) || (item.groups ?? []).some((g) => g.links.some((l) => isActive(pathname, l.href)));
}

/**
 * The five top-level menu items. The current section is marked with aria-current and keeps
 * the Framer underline (motion.css `.u-line`), so it never relies on hover.
 */
export function NavLinks({ items, layout }: { items: MenuItem[]; layout: 'row' | 'column' }) {
  const pathname = usePathname() ?? '/';
  const row = layout === 'row';
  return (
    <ul className={row ? 'flex flex-wrap items-center gap-x-1' : 'flex flex-col'}>
      {items.map((item) => {
        const active = isItemActive(pathname, item);
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={
                row
                  ? 'u-line inline-flex min-h-12 items-center px-3 font-medium [--u-bottom:8px] [--u-inset:12px]'
                  : `flex min-h-14 items-center border-b border-line px-1 text-lg font-medium ${active ? 'text-navy-700 underline decoration-gold decoration-[3px] underline-offset-8' : ''}`
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
