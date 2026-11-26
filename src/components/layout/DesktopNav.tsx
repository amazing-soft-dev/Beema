'use client';

import { CaretDown } from '@phosphor-icons/react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Icon } from '@/components/ui/Icon';
import type { MenuItem } from '@/content/menu';
import { isActive, isItemActive } from './nav-state';
import { uLine } from '@/lib/styles';

/**
 * Desktop menu (≥1200). Items with pages under them open a panel on click, tap or keyboard,
 * never on hover (plan §9). The look follows Framer's dropdown (audit/motion/dropdown.md):
 * a plain white panel that fades in within .15s and a caret that turns 180° over .4s.
 * Escape, a click outside, or moving to another page closes it; focus returns to the
 * button on Escape. The item label is also a link to its landing page.
 */
export function DesktopNav({ items }: { items: MenuItem[] }) {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Close on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <ul ref={navRef} className="flex items-center gap-x-1">
        {items.map((item) =>
          item.groups && item.groups.length > 0 ? (
            <DropdownItem
              key={item.label}
              item={item}
              active={isItemActive(pathname, item)}
              pathname={pathname}
              open={open === item.label}
              onToggle={(next) => setOpen(next ? item.label : null)}
            />
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={`${uLine} inline-flex min-h-12 items-center px-3 font-medium [--u-bottom:8px] [--u-inset:12px]`}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </MotionConfig>
  );
}

function DropdownItem({
  item,
  active,
  pathname,
  open,
  onToggle,
}: {
  item: MenuItem;
  active: boolean;
  pathname: string;
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const groups = item.groups ?? [];
  const wide = groups.length > 2;

  return (
    <li
      className="relative"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.stopPropagation();
          onToggle(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onToggle(!open)}
        className={`${uLine} inline-flex min-h-12 items-center gap-1 px-3 font-medium [--u-bottom:8px] [--u-inset:12px] ${active ? 'font-semibold' : ''}`}
      >
        {item.label}
        <Icon
          icon={CaretDown}
          size={16}
          weight="bold"
          className={`transition-transform duration-400 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        />
        {active && <span className="sr-only">(current section)</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`on-light absolute top-full mt-4 rounded-card-sm border border-line bg-white p-4 text-ink ${wide ? 'left-1/2 w-[min(960px,calc(100vw-80px))] -translate-x-1/2' : 'left-0 w-80'}`}
          >
            <div className={wide ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
              {groups.map((group) => (
                <div key={group.heading}>
                  <p className="t-caps text-navy-700">{group.heading}</p>
                  {group.note && <p className="mt-1 text-base text-muted">{group.note}</p>}
                  <ul className="mt-2 flex flex-col">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                          className="group flex min-h-12 flex-col justify-center rounded-card-sm px-2 py-1.5 hover:bg-surface aria-[current=page]:bg-surface"
                        >
                          <span className="inline-flex items-center gap-2 font-semibold">
                            {link.label}
                            {link.later && <span className="rounded-pill bg-sand px-2 text-sm font-medium">Coming later</span>}
                          </span>
                          {link.description && <span className="text-base text-muted">{link.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href={item.href}
              className="mt-3 inline-flex min-h-12 items-center gap-2 border-t border-line px-2 pt-3 font-semibold text-navy-700"
            >
              Go to the {item.label} page
              <ArrowSwap />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
