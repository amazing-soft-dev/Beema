'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/content/site';

/** True when `href` is the current page or one of its sections (except Home). */
export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Primary menu links. The current page is marked with aria-current and a lime underline
 * (Beema's underline, made permanent so it doesn't rely on hover).
 */
export function NavLinks({ layout }: { layout: 'row' | 'column' }) {
  const pathname = usePathname() ?? '/';
  const row = layout === 'row';
  return (
    <ul className={row ? 'flex flex-wrap items-center gap-x-1' : 'flex flex-col'}>
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={
                row
                  ? `relative inline-flex min-h-12 items-center rounded-card-sm px-3 font-medium hover:bg-surface ${active ? 'after:absolute after:inset-x-3 after:bottom-1.5 after:h-[3px] after:rounded-pill after:bg-lime' : ''}`
                  : `flex min-h-14 items-center border-b border-line px-1 text-lg font-medium ${active ? 'text-green-700 underline decoration-lime decoration-[3px] underline-offset-8' : ''}`
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
