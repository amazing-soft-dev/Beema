import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { notices, site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Terms of use', description: `The terms for using the ${site.name} website.`, path: '/legal/terms' });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The rules for using this website. Please read them; by using the site you agree to them."
      updated="November 15, 2026"
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              This website is run by {site.legalName}, a licensed insurance agency. {notices.govDisclaimer}{' '}
              <Link href="/legal/cms-disclaimer">Read our CMS disclaimer</Link>.
            </p>
          ),
        },
        {
          heading: 'Information, not advice',
          body: (
            <p>
              Our guides, calculators and tools explain Medicare in general terms. They are not legal, tax or medical advice and do not replace official
              information from Medicare.gov or Social Security. Plan details, costs and dates change; confirm them before you decide.
            </p>
          ),
        },
        {
          heading: 'Tools and results',
          body: <p>Calculator results are estimates based on the information you enter and the rules and figures shown on each tool. We do not guarantee that a result applies to your situation.</p>,
        },
        {
          heading: 'Plans we offer',
          body: <p>{notices.cmsDisclaimer}</p>,
        },
        {
          heading: 'Links to other websites',
          body: <p>We link to sites such as Medicare.gov and Social Security for your convenience. We are not responsible for their content.</p>,
        },
        {
          heading: 'Using this site',
          body: <p>Please do not misuse the site, for example by sending automated form submissions or trying to access parts of it that are not public. The site’s text, design and logo belong to us or our licensors.</p>,
        },
        {
          heading: 'Limits of liability',
          body: <p>To the extent the law allows, we are not liable for losses that come from relying on the general information on this site.</p>,
        },
        {
          heading: 'Changes and contact',
          body: (
            <p>
              We may update these terms; the date at the top shows the latest version. Questions? Call <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> or
              email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
