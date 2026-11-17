import { Envelope, MapPin, Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { GovDisclaimer } from '@/components/compliance/GovDisclaimer';
import { Icon } from '@/components/ui/Icon';
import { footerNav, site } from '@/content/site';

/**
 * Footer on every page: contact details, licensing, the required CMS and government
 * disclaimers, and every menu page (also the no-JavaScript fallback for the mobile menu).
 * Dark section: white text on ink, gold focus ring, underlined links.
 */
export function SiteFooter() {
  const { address } = site;
  const states = site.licensedStates.map((s) => s.name).join(', ');
  return (
    <footer className="on-dark bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site information
      </h2>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        <div className="flex flex-col gap-6">
          <Link href="/" className="inline-flex min-h-12 items-center gap-3 self-start">
            <LogoMark />
            <span className="font-display text-xl font-semibold text-white">{site.name}</span>
            <span className="sr-only">, home page</span>
          </Link>
          <p className="max-w-[40ch]">{site.tagline} Our help is free to you.</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-12 items-center gap-3 text-xl font-semibold underline-offset-4 hover:underline">
                <Icon icon={Phone} weight="fill" />
                {site.phone.display}
              </a>
              <p className="ml-9">
                {site.tty.display}. {site.hours.map((h) => `${h.days}, ${h.time}`).join('; ')}.
              </p>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center gap-3 underline underline-offset-4">
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

        <nav aria-label="Footer" className="grid gap-10 md:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="t-caps text-gold">{group.heading}</h3>
              <ul className="mt-4 flex flex-col">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/20">
        <div className="container-x flex flex-col gap-4 py-10 text-base">
          <p>
            {site.legalName} is a licensed insurance agency in {states}. National Producer Number (NPN) {site.npn}.{' '}
            <Link href="/legal/licensing" className="underline underline-offset-4">
              Licensing details
            </Link>
          </p>
          <CmsDisclaimer variant="plain" />
          <GovDisclaimer />
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
