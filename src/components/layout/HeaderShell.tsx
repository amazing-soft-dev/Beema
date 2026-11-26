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
 * Layout space: globals.css pads <main> by --header-space; heroes slide under the header.
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
        // Ink text that turns white over a dark hero (.4s, after .13s); the pill frosts to match.
        className={`group pointer-events-auto text-ink transition-colors delay-[130ms] duration-400 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none data-clear:text-[#fff] [&[data-clear]_:focus-visible]:outline-focus-on-dark [&[data-clear]_.on-light_:focus-visible]:outline-focus ${clear ? 'on-dark' : ''}`}
        data-clear={clear ? '' : undefined}
        initial={reduce ? false : { opacity: 0.001, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={headerSpring}
      >
        {/* Framer: 1440 max, 40px sides → a 1360px pill. */}
        <div className="mx-auto max-w-[1440px] px-4 pt-4 md:px-6 lg:px-10 lg:pt-6">
          <div className="flex min-h-14 items-center justify-between gap-4 rounded-pill border border-line bg-white py-1.5 ps-5 pe-1.5 backdrop-blur-[10px] transition-[background-color,border-color] delay-[130ms] duration-650 ease-[cubic-bezier(.22,1,.36,1)] group-data-clear:border-[rgb(255_255_255/0.12)] group-data-clear:bg-[rgb(255_255_255/0.06)] motion-reduce:transition-none lg:min-h-[66px] lg:ps-8 lg:pe-3">
            {/* 1200–1439px: the mark alone, so the menu and both buttons fit in one row. */}
            <Logo tone={clear ? 'dark' : 'auto'} nameClassName="lg:max-[1439px]:sr-only" />

            <nav aria-label="Main" className="max-lg:hidden">
              <DesktopNav items={items} />
            </nav>

            {/*
              The pill holds 1316px of content at most. With the logo name, the menu and both
              buttons on one line there is no room for the number as well, so the call link is
              an icon here (its name says the number) and the number itself is in the top bar.
              The cluster never shrinks and the labels never wrap.
            */}
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${site.phone.tel}`}
                aria-label={phoneLabel}
                className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-pill px-3 font-semibold lg:max-[1439px]:hidden"
              >
                <Icon icon={Phone} weight="fill" />
              </a>
              <ButtonLink href={bookCall.href} variant={clear ? 'light' : 'secondary'} className="whitespace-nowrap max-lg:hidden" icon={<Icon icon={CalendarCheck} />}>
                {bookCall.label}
              </ButtonLink>
              {showMatch && (
                <ButtonLink href={planMatch.href} className="whitespace-nowrap max-lg:hidden" icon={<Icon icon={Sparkle} weight="fill" />}>
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
