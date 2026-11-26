import { Envelope, MapPin, Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { GovDisclaimer } from '@/components/compliance/GovDisclaimer';
import { Reveal } from '@/components/motion/Reveal';
import { ThemeChoices } from '@/components/theme/ThemeSwitch';
import { Icon } from '@/components/ui/Icon';
import { availableMenu, footerGroups, site } from '@/content/site';
import { existingRoutes } from '@/lib/routes';
import { uLine } from '@/lib/styles';

/**
 * Footer on every page, laid out as a compact footer:
 * the brand blurb and contact details beside the link columns, the
 * required notices, the copyright line, and a large faded wordmark that rises 150px into
 * place when it scrolls into view. Link underlines unfold on hover and focus (u-line).
 * Dark section: white text on ink, gold focus ring, dark logo. Also the no-JavaScript
 * fallback for the menu: every menu and legal page is listed here.
 */
type FooterGroup = ReturnType<typeof footerGroups>[number];

/** A group with more links than this gets two list columns. */
const WIDE = 6;

/** Packs the footer groups into grid columns: short neighbours (three links or fewer) stack together. */
function footerColumns(groups: FooterGroup[]): FooterGroup[][] {
  const columns: FooterGroup[][] = [];
  for (const group of groups) {
    const last = columns.at(-1);
    const shortStack = last?.every((g) => g.links.length <= 3) && last.reduce((n, g) => n + g.links.length, 0) + group.links.length <= WIDE;
    if (group.links.length <= 3 && last && shortStack) last.push(group);
    else columns.push([group]);
  }
  return columns;
}

export function SiteFooter() {
  const { address } = site;
  const states = site.licensedStates.map((s) => s.name).join(', ');
  // California requires the CDI license number on ads and quotes (Ins. Code 1725.5).
  const caLicense = site.licensedStates.find((s) => s.code === 'CA')?.license;
  const routes = existingRoutes();
  const groups = footerGroups(availableMenu(routes), routes);
  return (
    <footer className="on-dark overflow-x-clip bg-ink pt-12 text-white lg:pt-16" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site information
      </h2>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 pb-8">
          {/* Brand and contact details side by side from 810px: logo and blurb, phone and hours, email and address. */}
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr_1fr] md:gap-8">
            <div className="flex flex-col gap-3">
              <Link href="/" className="inline-flex min-h-12 items-center gap-3 self-start">
                <LogoMark size={44} />
                <span className="font-display text-xl font-semibold text-white">{site.name}</span>
                <span className="sr-only">, home page</span>
              </Link>
              <p className="max-w-[36ch]">{site.tagline} Our help is free to you.</p>
            </div>
            <div>
              <a href={`tel:${site.phone.tel}`} className={`${uLine} inline-flex min-h-12 items-center gap-3 text-xl font-semibold`}>
                <Icon icon={Phone} weight="fill" />
                {site.phone.display}
              </a>
              <p className="ml-9 text-base">
                {site.tty.display}. {site.hours.map((h) => `${h.days}, ${h.time}`).join('; ')}.
              </p>
            </div>
            <div>
              <a href={`mailto:${site.email}`} className={`${uLine} inline-flex min-h-12 items-center gap-3`}>
                <Icon icon={Envelope} />
                {site.email}
              </a>
              <div className="flex gap-3 text-base">
                <Icon icon={MapPin} className="mt-1 shrink-0" />
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </address>
              </div>
            </div>
          </div>

          {/*
            Every link keeps its 48px target, so height comes from the longest list. Long groups
            (Services, Legal) split into two list columns over two grid columns, and short
            neighbours (About, Contact) share one column: at most seven rows at desktop. The nav
            runs the full width so its six columns stay wide enough for one-line labels.
          */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-8 md:grid-cols-4 md:gap-x-8 lg:grid-cols-6">
            {footerColumns(groups).map((column) => {
              const wide = column.length === 1 && column[0]!.links.length > WIDE;
              return (
                <div key={column[0]!.heading} className={`flex flex-col gap-8 ${wide ? 'col-span-2' : ''}`}>
                  {column.map((group) => (
                    <div key={group.heading}>
                      <h3 className="t-caps text-gold">{group.heading}</h3>
                      <ul className={`mt-3 ${wide ? 'columns-2 gap-x-6' : ''}`}>
                        {group.links.map((link) => (
                          <li key={link.href} className="break-inside-avoid">
                            <Link href={link.href} className={`${uLine} inline-flex min-h-12 items-center py-1 leading-snug [--u-bottom:6px]`}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Required notices, word for word, in two columns from 1200px. */}
        <div className="grid gap-4 border-t border-white/20 py-6 text-base lg:grid-cols-2 lg:gap-x-12">
          <div className="flex flex-col gap-4">
            <p>
              {site.legalName} is a licensed insurance agency in {states}. National Producer Number (NPN) {site.npn}. California insurance license{' '}
              {caLicense}.{' '}
              <Link href="/legal/licensing" className="underline underline-offset-4">
                Licensing details
              </Link>
            </p>
            <CmsDisclaimer variant="plain" />
          </div>
          <div className="flex flex-col gap-4">
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
          </div>
        </div>

        {/* Bottom bar: copyright on the left, the color theme choices on the right. */}
        <div className="flex flex-col-reverse gap-4 border-t border-white/20 py-4 text-base md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ThemeChoices inline />
        </div>
      </div>

      {/* A faded wordmark, cropped to the top of its letters; it rises 150px into view. */}
      <div aria-hidden="true" className="mx-auto h-[8vw] max-h-28 max-w-[1440px] overflow-clip px-6 select-none lg:px-10 print:hidden">
        <Reveal y="xxl">
          {/* SVG text: decoration at 20% opacity that scales with the width. */}
          <svg viewBox="0 0 1000 150" className="block w-full" focusable="false">
            <text x="500" y="128" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs" fill="currentColor" opacity="0.2" fontSize="150" fontWeight="600" style={{ fontFamily: 'var(--font-display)' }}>
              {site.name}
            </text>
          </svg>
        </Reveal>
      </div>
    </footer>
  );
}
