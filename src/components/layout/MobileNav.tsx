'use client';

import { CaretDown } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { MenuItem } from '@/content/menu';
import { isActive, isItemActive } from './nav-state';

/**
 * The five menu items for the mobile menu. Items with pages under them are a link to the
 * landing page plus a Show/Hide button (aria-expanded) for the group list; the current
 * section starts open. Group headings and notes match the desktop panel.
 */
export function MobileNav({ items }: { items: MenuItem[] }) {
  const pathname = usePathname() ?? '/';
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <MobileItem key={item.label} item={item} pathname={pathname} />
      ))}
    </ul>
  );
}

function MobileItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  const active = isItemActive(pathname, item);
  const [open, setOpen] = useState(active);
  const listId = useId();
  const groups = item.groups ?? [];
  const link = (
    <Link
      href={item.href}
      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
      className={`flex min-h-14 flex-1 items-center text-xl font-semibold ${active ? 'text-navy-700' : ''}`}
    >
      {item.label}
    </Link>
  );
  if (!groups.length) return <li className="border-b border-line">{link}</li>;
  return (
    <li className="border-b border-line">
      <div className="flex items-center gap-2">
        {link}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-pill border-2 border-current px-3 font-medium"
        >
          <span className="sr-only">{open ? `Hide ${item.label} pages` : `Show ${item.label} pages`}</span>
          <Icon
            icon={CaretDown}
            weight="bold"
            className={`transition-transform duration-400 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <div id={listId} hidden={!open} className="pb-4">
        {groups.map((group) => (
          <div key={group.heading} className="mt-3">
            {groups.length > 1 && <p className="t-caps text-navy-700">{group.heading}</p>}
            {group.note && <p className="text-base text-muted">{group.note}</p>}
            <ul className="mt-1 flex flex-col">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(pathname, l.href) ? 'page' : undefined}
                    className="flex min-h-12 items-center gap-2 rounded-card-sm px-2 text-lg aria-[current=page]:bg-surface aria-[current=page]:font-semibold"
                  >
                    {l.label}
                    {l.later && <span className="rounded-pill bg-sand px-2 text-sm font-medium">Coming later</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
}
