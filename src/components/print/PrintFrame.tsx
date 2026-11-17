'use client';

import { useSyncExternalStore } from 'react';
import { LogoMark } from '@/components/brand/Logo';
import { medicareFigures } from '@/content/medicare-figures';
import { notices, site } from '@/content/site';

const noSubscribe = () => () => {};
const today = () => new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());

/**
 * Print-only header and footer: logo, business name, phone, plan year, the date and the
 * required disclaimers. Invisible on screen; shown when a page is printed or saved as PDF.
 * The date is read in the browser so it is the day of printing, not the build day.
 */
export function PrintHeader() {
  return (
    <div className="hidden print:mb-6 print:flex print:items-center print:justify-between print:border-b-2 print:border-ink print:pb-3">
      <div className="flex items-center gap-3">
        <LogoMark size={36} tone="light" />
        <span className="text-[16pt] font-semibold">{site.name}</span>
      </div>
      <div className="text-right text-[12pt]">
        <div className="font-semibold">Call {site.phone.display}</div>
        <div>
          {site.tty.display} · {medicareFigures.planYear} plan year
        </div>
      </div>
    </div>
  );
}

export function PrintFooter() {
  const date = useSyncExternalStore(noSubscribe, today, () => '');
  return (
    <div className="hidden print:mt-8 print:block print:border-t-2 print:border-ink print:pt-3 print:text-[11pt]">
      <p>
        Printed {date} from {new URL(site.url).host}. Information is for the {medicareFigures.planYear} plan year; confirm details before you decide.
      </p>
      <p className="mt-2">{notices.cmsDisclaimer}</p>
      <p className="mt-2">{notices.govDisclaimer}</p>
    </div>
  );
}
