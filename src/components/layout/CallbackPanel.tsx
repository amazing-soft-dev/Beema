'use client';

import { Phone } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { LeadForm } from '@/components/forms/LeadForm';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';

/** Pages that already show their own call-back form. */
const HIDE_ON = ['/contact', '/book-a-call', '/tools/plan-comparison'];

/** "Prefer we call you?" panel above the footer on every other page. */
export function CallbackPanel() {
  // The static export uses trailing slashes (/contact/), so compare without one.
  const pathname = (usePathname() ?? '/').replace(/(.)\/$/, '$1');
  if (HIDE_ON.includes(pathname)) return null;
  return (
    <section className="bg-sand" aria-labelledby="callback-heading">
      <div className="container-x grid gap-8 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <h2 id="callback-heading" className="t-h2">
            Prefer we call you?
          </h2>
          <p className="t-lead">Leave your number and a licensed advisor will call at a time that suits you. It is free and there is no obligation.</p>
          <p className="flex items-center gap-2">
            <Icon icon={Phone} weight="fill" className="text-navy-700" />
            Or call now:{' '}
            <a href={`tel:${site.phone.tel}`} className="font-semibold underline underline-offset-4">
              {site.phone.display}
            </a>
            ({site.tty.display})
          </p>
        </div>
        <LeadForm endpoint="/api/callback" form="callback" idPrefix="callback" />
      </div>
    </section>
  );
}
