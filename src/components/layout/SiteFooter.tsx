import { CalendarCheck, Envelope, MapPin, Phone, Sparkle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { GovDisclaimer } from '@/components/compliance/GovDisclaimer';
import { ThemeChoices } from '@/components/theme/ThemeSwitch';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { availableMenu, bookCall, footerGroups, planMatch, site } from '@/content/site';
import { existingRoutes } from '@/lib/routes';

/**
 * Footer on every page, laid out like the Framer footer (audit/components/footer.md):
 * a call-to-action panel, the brand blurb and contact details beside the link columns, the
 * required notices, the copyright line, and a large faded wordmark that rises 150px into
 * place when it scrolls into view. Link underlines unfold on hover and focus (u-line).
 * Dark section: white text on ink, gold focus ring, dark logo. Also the no-JavaScript
 * fallback for the menu: every menu and legal page is listed here.
 */
export function SiteFooter() {
  const { address } = site;
  const states = site.licensedStates.map((s) => s.name).join(', ');
  const routes = existingRoutes();
  const groups = footerGroups(availableMenu(routes), routes);
  const showMatch = !routes || routes.has(planMatch.href);
  return (
    <footer className="on-dark overflow-x-clip bg-ink pt-16 text-white md:pt-24 lg:pt-40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site information
      </h2>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Framer "Stay Informed" panel, used for the two next steps. */}
        <div className="flex flex-col gap-8 rounded-card-sm border border-white/12 bg-navy-850/40 p-6 md:flex-row md:items-center md:justify-between md:p-12 lg:p-20">
          <div className="flex max-w-[44ch] flex-col gap-3">
            <p className="t-h3 text-white">Questions about Medicare?</p>
            <p>Talk with a licensed agent, or let our free plan match suggest the coverage type that fits. No cost and no obligation.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {showMatch && (
              <ButtonLink href={planMatch.href} size="lg" icon={<Icon icon={Sparkle} weight="fill" />}>
                {planMatch.label}
              </ButtonLink>
            )}
            <ButtonLink href={bookCall.href} size="lg" variant="light" icon={<Icon icon={CalendarCheck} />}>
              {bookCall.label}
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-flex min-h-12 items-center gap-3 self-start">
              <LogoMark size={58} />
              <span className="font-display text-2xl font-semibold text-white">{site.name}</span>
              <span className="sr-only">, home page</span>
            </Link>
            <p>{site.tagline} Our help is free to you.</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${site.phone.tel}`} className="u-line inline-flex min-h-12 items-center gap-3 text-xl font-semibold">
                  <Icon icon={Phone} weight="fill" />
                  {site.phone.display}
                </a>
                <p className="ml-9">
                  {site.tty.display}. {site.hours.map((h) => `${h.days}, ${h.time}`).join('; ')}.
                </p>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="u-line inline-flex min-h-12 items-center gap-3">
                  <Icon icon={Envelope} />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon icon={MapPin} className="mt-1 shrink-0" />
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </address>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 xl:grid-cols-5">
            {groups.map((group) => (
              <div key={group.heading}>
                <h3 className="t-caps text-gold">{group.heading}</h3>
                <ul className="mt-4 flex flex-col">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="u-line inline-flex min-h-12 items-center py-1 leading-snug [--u-bottom:6px]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/20 py-10 text-base">
          <p>
            {site.legalName} is a licensed insurance agency in {states}. National Producer Number (NPN) {site.npn}.{' '}
            <Link href="/legal/licensing" className="underline underline-offset-4">
              Licensing details
            </Link>
          </p>
          <CmsDisclaimer variant="plain" />
          <GovDisclaimer />
          <p>
            For free, unbiased help you can also use{' '}
            <a href="https://www.medicare.gov/plan-compare/" className="underline underline-offset-4">
              Medicare.gov Plan Finder
            </a>
            , call 1-800-MEDICARE (1-800-633-4227, TTY 1-877-486-2048), or contact your local{' '}
            <a href="https://www.shiphelp.org/" className="underline underline-offset-4">
              State Health Insurance Assistance Program (SHIP)
            </a>
            .
          </p>
          <ThemeChoices className="mt-4" />
          <p className="pt-4">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
