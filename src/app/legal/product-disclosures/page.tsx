import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { disclosures } from '@/content/disclosures';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Non-Medicare Product Disclosures',
  description: `Notices for the life and supplemental health products ${site.name} offers: final expense, hospital indemnity and dental, vision and hearing plans.`,
  path: '/legal/product-disclosures',
});

const pages = { general: '/beyond-medicare', life: '/beyond-medicare/final-expense', 'limited-benefit': '/beyond-medicare/hospital-indemnity', 'dental-vision': '/beyond-medicare/dental-vision-hearing' } as const;

/** Footer page (plan §4, phase 3): every non-Medicare product notice in one place. */
export default function ProductDisclosuresPage() {
  return (
    <LegalPage
      title="Non-Medicare Product Disclosures"
      lead="The products in Beyond Medicare are separate from Medicare. These are the notices that come with each of them."
      updated="November 17, 2026"
      sections={(Object.keys(disclosures) as (keyof typeof disclosures)[]).map((k) => ({
        heading: disclosures[k].title,
        body: (
          <>
            <p>{disclosures[k].text}</p>
            <p>
              <Link href={pages[k]}>Read the page</Link>
            </p>
          </>
        ),
      }))}
    />
  );
}
