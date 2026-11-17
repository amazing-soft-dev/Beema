import { availableMenu } from '@/content/site';
import { existingRoutes } from '@/lib/routes';
import { HeaderShell } from './HeaderShell';
import { TopBar } from './TopBar';

/**
 * Site header, on every page: the Framer floating pill (HeaderShell).
 * - Desktop (≥1200): logo, the five menu items and Book a Call in one pill, with a slim
 *   row above it for the phone number, TTY and the theme switch.
 * - Below 1200: logo and a Menu button that opens the full-screen MobileMenu dialog.
 *   Without JavaScript, the footer repeats every menu link.
 * The sticky wrapper has no height, so the page starts under the header; header.css adds
 * the matching top space to <main>, and dark heroes slide up beneath it.
 */
export function SiteHeader() {
  // Built at build time: only links whose page exists.
  const items = availableMenu(existingRoutes());
  return (
    <>
      <TopBar />
      <header id="site-header" className="pointer-events-none sticky top-0 z-40 h-0">
        <HeaderShell items={items} />
      </header>
    </>
  );
}
