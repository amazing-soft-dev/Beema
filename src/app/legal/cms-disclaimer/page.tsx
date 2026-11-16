import { LegalPage } from '@/components/legal/LegalPage';
import { notices, site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'CMS disclaimer', description: 'Required Medicare disclaimers: the plans we represent and our relationship to the federal Medicare program.', path: '/legal/cms-disclaimer' });

export default function CmsDisclaimerPage() {
  return (
    <LegalPage
      title="CMS disclaimer"
      lead="Notices the Centers for Medicare & Medicaid Services (CMS) requires us to show, and what they mean."
      updated="November 15, 2026"
      sections={[
        {
          heading: 'The plans we represent',
          body: (
            <>
              <blockquote className="rounded-card-sm border-l-4 border-green-700 bg-surface p-5">{notices.cmsDisclaimer}</blockquote>
              <p>
                In plain words: we work with {site.cms.organizations} insurance companies, not every company that sells Medicare plans where you live. To see
                every option, use Medicare.gov or call Medicare.
              </p>
            </>
          ),
        },
        {
          heading: 'We are not the government',
          body: (
            <>
              <blockquote className="rounded-card-sm border-l-4 border-green-700 bg-surface p-5">{notices.govDisclaimer}</blockquote>
              <p>We are a licensed, independent insurance agency. We do not use the Medicare card image or government logos, and we will never ask for your Medicare number to “update” your card.</p>
            </>
          ),
        },
        {
          heading: 'Where to get official information',
          body: (
            <ul>
              <li>
                <a href="https://www.medicare.gov">Medicare.gov</a> and its <a href="https://www.medicare.gov/plan-compare/">Plan Finder</a>
              </li>
              <li>
                1-800-MEDICARE (1-800-633-4227), TTY <a href="tel:18774862048">1-877-486-2048</a>, 24 hours a day
              </li>
              <li>Your State Health Insurance Assistance Program (SHIP) for free, unbiased counseling</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
