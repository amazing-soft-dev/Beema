import { Phone } from '@phosphor-icons/react/dist/ssr';
import { ThemeToggle } from '@/components/theme/ThemeSwitch';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';

/**
 * Slim bar above the floating header (Framer "Top Bar"): the click-to-call number and TTY on
 * every page (plan §3), and the theme switch. It is in the page flow, so it scrolls away and
 * the sticky header pill takes over.
 */
export function TopBar() {
  return (
    <div className="on-dark bg-ink text-white print:hidden">
      <div className="container-x flex min-h-12 flex-wrap items-center justify-end gap-x-5 text-base">
        <p className="mr-auto hidden md:block">Free, licensed Medicare help. No cost to you.</p>
        <a href={`tel:${site.phone.tel}`} aria-label={`Call us at ${site.phone.display}`} className="u-line inline-flex min-h-12 items-center gap-2 font-semibold">
          <Icon icon={Phone} weight="fill" size={20} />
          {site.phone.display}
        </a>
        <a href={`tel:${site.tty.tel}`} aria-label={`${site.tty.display} for people who are deaf or hard of hearing`} className="u-line inline-flex min-h-12 items-center">
          {site.tty.display}
        </a>
        <ThemeToggle className="min-h-12 min-w-12 border-0" />
      </div>
    </div>
  );
}
