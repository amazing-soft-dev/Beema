import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Subscription Terms & Fee Disclosure',
  description: `Terms for the optional ${site.name} Plus and Family subscriptions: what they include, billing, cancelling, refunds, and that no insurance purchase is ever required.`,
  path: '/legal/subscription-terms',
});

/** Footer page (plan §4, phase 4): written terms for Plus and Family, kept apart from any sale. */
export default function SubscriptionTermsPage() {
  return (
    <LegalPage
      title="Subscription Terms & Fee Disclosure"
      lead="The written terms for the optional Plus and Family subscriptions. They sell ongoing service only, never insurance."
      updated="November 17, 2026"
      sections={[
        {
          heading: 'Draft until the state fee review',
          body: (
            <p>
              Plus and Family are not on sale yet. Prices and these terms will be set only after written confirmation, from our field marketing organization or
              each state’s Department of Insurance, that the subscriptions are allowed where we offer them, with any fee agreement wording those states require.
            </p>
          ),
        },
        {
          heading: 'No insurance purchase required',
          body: (
            <p>
              <strong>You are not required to buy insurance to subscribe, and buying insurance through us never requires a subscription.</strong> Plan advice,
              enrollment help and the yearly <Link href="/annual-review">Annual Plan Review</Link> stay free for everyone, paid by insurance company commissions. No
              subscription is needed to get help with a Medicare Advantage or any other enrollment decision.
            </p>
          ),
        },
        {
          heading: 'What the subscriptions include',
          body: (
            <ul>
              <li>Plus: alerts when drug costs or doctor networks change and deadline reminders.</li>
              <li>Family: everything in Plus, a caregiver dashboard, help with claims and billing questions, and priority calls, with the parent’s written permission on file.</li>
              <li>Neither includes insurance, guarantees a plan’s benefits, or gives discounts or perks for enrolling in a plan.</li>
            </ul>
          ),
        },
        {
          heading: 'Price and billing',
          body: <p>Plus will be offered monthly or yearly and Family yearly, at prices shown before checkout. Checkout is separate from any insurance application, with its own written terms.</p>,
        },
        {
          heading: 'Cancelling and refunds',
          body: <p>You will be able to cancel at any time from your account or by calling {site.phone.display}. Refund terms will be shown before you pay.</p>,
        },
        {
          heading: 'State-specific fee disclosures',
          body: <p>Any disclosure a state requires will be listed here, by state, before the subscriptions go on sale.</p>,
        },
      ]}
    />
  );
}
