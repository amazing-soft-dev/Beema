import { availableMenu, planMatch } from '@/content/site';
import { existingRoutes } from '@/lib/routes';
import { HeaderShell } from './HeaderShell';
import { MobileActionBar } from './MobileActionBar';
import { TopBar } from './TopBar';

/**
 * Site header, on every page: the Framer floating pill (HeaderShell).
 * - Desktop (≥1200): logo, the five menu items, Book a Call and Get my free plan match in
 *   one pill, with a slim
 *   row above it for the phone number, TTY and the theme switch.
 * - Below 1200: logo and a Menu button that opens the full-screen MobileMenu dialog; on
 *   phones a bottom bar keeps the match, call and booking buttons on screen.
 *   Without JavaScript, the footer repeats every menu link.
 * The sticky wrapper has no height, so the page starts under the header; globals.css adds
 * the matching top space to <main>, and dark heroes slide up beneath it.
 */
export function SiteHeader() {
  // Built at build time: only links whose page exists.
  const routes = existingRoutes();
  const items = availableMenu(routes);
  // The plan match button appears once its page exists.
  const showMatch = !routes || routes.has(planMatch.href);
  return (
    <>
      <TopBar />
      <header id="site-header" className="pointer-events-none sticky top-0 z-40 h-0">
        <HeaderShell items={items} showMatch={showMatch} />
      </header>
      <MobileActionBar showMatch={showMatch} />
    </>
  );
}
