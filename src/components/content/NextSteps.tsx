import { CalendarCheck, Phone, Sparkle } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { bookCall, planMatch, site } from '@/content/site';
import { existingRoutes } from '@/lib/routes';

export type Action = { label: string; href: string };

/**
 * Closing call to action for content pages (CTA section): a navy panel whose heading
 * rises into view and whose buttons fade up in turn, with the CMS disclaimer beneath.
 * Defaults to the plan match and Book a Call; pages pass their own CTAs from the plan.
 */
export function NextSteps({
  title = 'Talk it through with a licensed agent',
  text = 'One call can answer most questions. No pressure and no cost to you.',
  primary,
  secondary,
  children,
  disclaimer = true,
}: {
  title?: string;
  text?: ReactNode;
  primary?: Action;
  secondary?: Action;
  children?: ReactNode;
  /** The CMS (TPMO) disclaimer; off for pages about non-Medicare products only. */
  disclaimer?: boolean;
}) {
  const routes = existingRoutes();
  const match = !routes || routes.has(planMatch.href) ? planMatch : undefined;
  const first = primary ?? match ?? bookCall;
  const second = secondary ?? (first.href === bookCall.href ? undefined : bookCall);
  return (
    <section className="section-y" aria-labelledby="next-steps">
      <div className="container-x flex flex-col gap-6">
        <div className="on-dark flex flex-col gap-6 rounded-card bg-ink p-6 text-white md:p-12 lg:p-16">
          <TextAppear id="next-steps" className="t-h2 max-w-[24ch] text-white">
            {title}
          </TextAppear>
          <Reveal stagger={0} className="t-lead max-w-[52ch]">
            {text}
          </Reveal>
          <Reveal stagger={1} className="flex flex-wrap gap-4">
            <ButtonLink href={first.href} size="lg" icon={<Icon icon={first.href === planMatch.href ? Sparkle : CalendarCheck} weight="fill" />}>
              {first.label}
            </ButtonLink>
            {second && (
              <ButtonLink href={second.href} size="lg" variant="light" icon={<Icon icon={CalendarCheck} />}>
                {second.label}
              </ButtonLink>
            )}
            <ButtonLink href={`tel:${site.phone.tel}`} size="lg" variant="light" icon={<Icon icon={Phone} weight="fill" />}>
              {site.phone.display}
            </ButtonLink>
          </Reveal>
          <p className="text-base">{site.tty.display}</p>
          {children}
        </div>
        {disclaimer && <CmsDisclaimer />}
      </div>
    </section>
  );
}
