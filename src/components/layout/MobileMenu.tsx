'use client';

import { CalendarCheck, List, Phone, X } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { ThemeChoices } from '@/components/theme/ThemeSwitch';
import { Icon } from '@/components/ui/Icon';
import type { MenuItem } from '@/content/menu';
import { bookCall, site } from '@/content/site';
import { NavLinks } from './NavLinks';

/**
 * Full-screen menu below 1200px, built on the native <dialog> element:
 * showModal() traps focus, makes the page behind inert and closes on Escape.
 * We add: focus back on the Menu button, page scroll lock, and closing on navigation.
 */
export function MobileMenu({ items }: { items: MenuItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when a link navigates to another page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape is handled here rather than via the native "cancel"/"close" events, whose
  // timing varies (Chrome defers "close" while a page isn't rendering). The native
  // "close" listener stays as a backstop for any other way the dialog closes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    const onNativeClose = () => setOpen(false);
    dialog.addEventListener('keydown', onKeyDown);
    dialog.addEventListener('close', onNativeClose);
    return () => {
      dialog.removeEventListener('keydown', onKeyDown);
      dialog.removeEventListener('close', onNativeClose);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) {
      dialog.close();
      buttonRef.current?.focus(); // return focus to the Menu button
    }
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-12 items-center gap-2 rounded-pill bg-ink px-4 font-semibold text-white"
      >
        <Icon icon={List} weight="bold" />
        <span>Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="container-x flex min-h-20 items-center justify-between border-b border-line">
          <span className="font-display text-xl font-semibold">{site.shortName}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-ink px-4 font-semibold"
          >
            <Icon icon={X} weight="bold" />
            <span>Close</span>
          </button>
        </div>
        <nav aria-label="Main" className="container-x py-4">
          <NavLinks items={items} layout="column" />
        </nav>
        <div className="container-x flex flex-col gap-4 pb-10">
          <ButtonLink href={bookCall.href} size="lg" icon={<Icon icon={CalendarCheck} />}>
            {bookCall.label}
          </ButtonLink>
          <ButtonLink href={`tel:${site.phone.tel}`} variant="outline" size="lg" icon={<Icon icon={Phone} weight="fill" />}>
            Call {site.phone.display}
          </ButtonLink>
          <p className="text-center text-base">
            {site.tty.display} · {site.hours[0]?.days}, {site.hours[0]?.time}
          </p>
          <ThemeChoices className="mt-4" />
        </div>
      </dialog>
    </>
  );
}
