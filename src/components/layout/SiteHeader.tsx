import { CalendarCheck, Phone } from '@phosphor-icons/react/dist/ssr';
import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeSwitch';
import { Icon } from '@/components/ui/Icon';
import { bookCall, site } from '@/content/site';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { ScrollState } from './ScrollState';

/**
 * Site header, on every page.
 * - Desktop (≥1200): row 1 logo, phone (click-to-call, top right) and Book a Call;
 *   row 2 the eight menu items. Two rows keep 18px labels without crowding.
 * - Below 1200: logo, phone and a Menu button that opens the full-screen MobileMenu dialog.
 *   Without JavaScript, the footer repeats every menu link.
 */
export function SiteHeader() {
  const phoneLabel = `Call us at ${site.phone.display}`;
  return (
    <header
      id="site-header"
      className="sticky top-0 z-40 border-b border-transparent bg-white transition-colors duration-200 data-[scrolled]:border-line"
    >
      <ScrollState targetId="site-header" />
      <div className="container-x flex min-h-20 items-center justify-between gap-4 py-2">
        <Logo />

        <div className="flex items-center gap-3">
          <ThemeToggle className="max-md:hidden" />
          {/* Phone: always visible. Full number from 810px, icon button with label below. */}
          <a
            href={`tel:${site.phone.tel}`}
            aria-label={phoneLabel}
            className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-pill border-2 border-ink px-3 font-semibold md:px-5"
          >
            <Icon icon={Phone} weight="fill" />
            <span className="hidden md:inline">{site.phone.display}</span>
          </a>
          <ButtonLink href={bookCall.href} className="max-lg:hidden" icon={<Icon icon={CalendarCheck} />}>
            {bookCall.label}
          </ButtonLink>

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>

      <nav aria-label="Main" className="hidden border-t border-line lg:block">
        <div className="container-x py-1">
          <NavLinks layout="row" />
        </div>
      </nav>
    </header>
  );
}
