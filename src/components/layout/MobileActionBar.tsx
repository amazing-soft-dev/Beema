import { CalendarCheck, Phone, Sparkle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { bookCall, planMatch, site } from '@/content/site';

/**
 * Phones (<810px): the plan match, call and booking buttons stay on screen (plan §9) in a
 * bar fixed to the bottom edge. globals.css adds matching space below the page and lifts
 * the chat button above it.
 */
export function MobileActionBar({ showMatch }: { showMatch: boolean }) {
  const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-center text-base leading-tight font-semibold';
  return (
    <nav aria-label="Quick actions" className="on-dark fixed inset-x-0 bottom-0 z-30 flex gap-1 bg-ink p-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] text-white md:hidden print:hidden">
      {showMatch && (
        <Link href={planMatch.href} className={`${item} rounded-card-sm bg-gold text-on-gold`}>
          <Icon icon={Sparkle} weight="fill" size={20} />
          Free plan match
        </Link>
      )}
      <a href={`tel:${site.phone.tel}`} className={item} aria-label={`Call ${site.phone.display}, ${site.tty.display}`}>
        <Icon icon={Phone} weight="fill" size={20} />
        Call
      </a>
      <Link href={bookCall.href} className={item}>
        <Icon icon={CalendarCheck} size={20} />
        {bookCall.label}
      </Link>
    </nav>
  );
}
