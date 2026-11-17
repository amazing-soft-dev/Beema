import { Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';

const LINKS = [
  { label: 'Home page', href: '/' },
  { label: 'Turning 65 guide', href: '/turning-65' },
  { label: 'Medicare 101', href: '/medicare-101' },
  { label: 'Frequently asked questions', href: '/faq' },
  { label: 'Contact us', href: '/contact' },
];

/** Phone number and the main pages, for the not-found and error pages. */
export function HelpLinks() {
  return (
    <div className="flex flex-col gap-6">
      <ButtonLink href={`tel:${site.phone.tel}`} size="lg" className="self-start" icon={<Icon icon={Phone} weight="fill" />}>
        Call {site.phone.display}
      </ButtonLink>
      <nav aria-label="Helpful pages">
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-12 items-center text-lg font-semibold text-navy-700 underline underline-offset-4">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
