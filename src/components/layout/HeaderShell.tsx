'use client';

import { CalendarCheck, Phone, Sparkle } from '@phosphor-icons/react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import type { MenuItem } from '@/content/menu';
import { bookCall, planMatch, site } from '@/content/site';
import { headerSpring } from '@/lib/motion';
import { MobileMenu } from './MobileMenu';
import { DesktopNav } from './DesktopNav';

/**
 * Framer floating header (audit/components/header.md, motion/header-scroll.md).
 * - A sticky pill 24px below the top edge (16px on phones), over the page. The phone number
 *   and TTY sit in the TopBar above it (Framer "Top Bar"), which scrolls away.
 * - Over a dark hero (a section with data-hero="dark" at the top of the page) it starts
 *   translucent (white 6% + 10px blur) with white text and the dark logo; once the page
 *   scrolls it turns solid with ink text and the light logo: background .65s ease-out, text
 *   .4s ease-in-out, both after ≈130ms. Pages without a dark hero start solid.
 * - It drops in from 10px above after ≈0.7s on load (spring k 60, c 14), once per load.
 * Layout space: header.css pads <main> by --header-space; heroes slide under the header.
 */
export function HeaderShell({ items, showMatch }: { items: MenuItem[]; showMatch: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  // Navigation must never be hidden for people who asked for less motion: no drop-in.
  const reduce = useReducedMotion();

  // Re-check on every route: each page decides whether its top is a dark hero.
  useEffect(() => {
    const hero = () => setOverHero(Boolean(document.querySelector('main [data-hero="dark"]')));
    const scroll = () => setScrolled(window.scrollY > 10);
    hero();
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, [pathname]);

  const clear = overHero && !scrolled;
  const phoneLabel = `Call us at ${site.phone.display}`;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="header-shell pointer-events-auto"
        data-clear={clear ? '' : undefined}
        initial={reduce ? false : { opacity: 0.001, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={headerSpring}
      >
        {/* Framer: 1440 max, 40px sides → a 1360px pill. */}
        <div className="mx-auto max-w-[1440px] px-4 pt-4 md:px-6 lg:px-10 lg:pt-6">
          <div className="header-pill flex min-h-14 items-center justify-between gap-4 rounded-pill py-1.5 ps-5 pe-1.5 lg:min-h-[66px] lg:ps-8 lg:pe-3">
            {/* 1200–1439px: the mark alone, so the menu and both buttons fit in one row. */}
            <Logo tone={clear ? 'dark' : 'auto'} nameClassName="lg:max-[1439px]:sr-only" />

            <nav aria-label="Main" className="max-lg:hidden">
              <DesktopNav items={items} />
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.phone.tel}`}
                aria-label={phoneLabel}
                className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-pill px-3 font-semibold lg:max-[1439px]:hidden"
              >
                <Icon icon={Phone} weight="fill" />
                <span className="hidden 2xl:inline">{site.phone.display}</span>
              </a>
              <ButtonLink href={bookCall.href} variant={clear ? 'light' : 'secondary'} className="max-lg:hidden" icon={<Icon icon={CalendarCheck} />}>
                {bookCall.label}
              </ButtonLink>
              {showMatch && (
                <ButtonLink href={planMatch.href} className="max-lg:hidden" icon={<Icon icon={Sparkle} weight="fill" />}>
                  <span className="min-[1440px]:hidden">Free plan match</span>
                  <span className="max-[1439px]:hidden">{planMatch.label}</span>
                </ButtonLink>
              )}
              <div className="lg:hidden">
                <MobileMenu items={items} showMatch={showMatch} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
