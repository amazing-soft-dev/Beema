import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { feeDisclosure, subscriptionStates, tiers } from '@/content/pricing';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Subscription Terms & Fee Disclosure',
  description: `Terms for the optional ${site.name} Plus and Family subscriptions: prices, what they include, where they are offered, cancelling and refunds.`,
  path: '/legal/subscription-terms',
});

const usd = (n: number | null) => (n === null ? 'to be set' : `$${n}`);
const paid = tiers.filter((t) => t.id !== 'basic');
const offeredIn = subscriptionStates.map((s) => s.name).join(', ');

/**
 * Footer page (plan §4, phase 4): written terms for Plus and Family, kept apart from any sale.
 * Prices and availability come from src/content/pricing.ts (owner, 2026-11-25; review INS-30).
 */
export default function SubscriptionTermsPage() {
  return (
    <LegalPage
      title="Subscription Terms & Fee Disclosure"
      lead="The written terms for the optional Plus and Family subscriptions. They sell ongoing service only, never insurance."
      updated="November 26, 2026"
      sections={[
        {
          heading: 'Fee disclosure',
          body: (
            <>
              <p>
                <strong>{feeDisclosure}</strong>
              </p>
              <p>You tick this statement before checkout, and a copy is kept with your subscription record.</p>
            </>
          ),
        },
        {
          heading: 'No insurance purchase required',
          body: (
            <p>
              <strong>You are not required to buy insurance to subscribe, and buying insurance through us never requires a subscription.</strong> Plan advice,
              enrollment help, our calls and the yearly <Link href="/annual-review">Annual Plan Review</Link> stay free for everyone, paid by insurance company
              commissions. No subscription is needed to get help with a Medicare Advantage or any other enrollment decision.
            </p>
          ),
        },
        {
          heading: 'What the subscriptions include',
          body: (
            <ul>
              <li>Plus: alerts when drug costs or doctor networks change, and deadline reminders.</li>
              <li>
                Family: everything in Plus, and a <Link href="/family-dashboard">caregiver dashboard</Link> for an adult child or caregiver, with the parent’s written
                permission on file.
              </li>
              <li>Neither includes insurance, plan recommendations or enrollment, guarantees a plan’s benefits, or gives discounts or perks for enrolling in a plan.</li>
            </ul>
          ),
        },
        {
          heading: 'Where the subscriptions are offered',
          body: (
            <p>
              Plus and Family are offered to residents of {offeredIn}. They are <strong>not offered in California</strong>, where agents may not charge service fees
              of this kind. If you move to a state where they are not offered, tell us and we will cancel with a prorated refund.
            </p>
          ),
        },
        {
          heading: 'Price and billing',
          body: (
            <>
              <ul>
                {paid.map((t) => (
                  <li key={t.id}>
                    {t.name}: {usd(t.monthly)} a month, or {usd(t.yearly)} a year (about two months free).
                  </li>
                ))}
              </ul>
              <p>
                You pay by card through Stripe, our payment provider, at the price shown before checkout. Monthly plans renew each month and yearly plans each year
                until you cancel. We will email you before a yearly renewal and before any price change. Checkout is separate from any insurance application.
              </p>
            </>
          ),
        },
        {
          heading: 'Cancelling and refunds',
          body: (
            <ul>
              <li>Cancel at any time from the link in your receipt email, from the Plans &amp; Pricing page after checkout, or by calling {site.phone.display}.</li>
              <li>If you cancel within 14 days of your first payment, we refund it in full.</li>
              <li>After that, cancelling stops the next charge, and your subscription runs to the end of the period you paid for.</li>
            </ul>
          ),
        },
        {
          heading: 'State-specific fee disclosures',
          body: <p>Any disclosure a state requires will be listed here, by state. None beyond the fee disclosure above applies in the states where we offer the subscriptions today.</p>,
        },
      ]}
    />
  );
}
