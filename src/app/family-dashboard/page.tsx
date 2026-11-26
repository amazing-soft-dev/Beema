import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { ContentSections } from '@/components/content/ContentSections';
import { NextSteps } from '@/components/content/NextSteps';
import { PageIntro } from '@/components/layout/PageIntro';
import { subscriptionStates, tiers } from '@/content/pricing';
import { buildMetadata } from '@/lib/seo';

const family = tiers.find((t) => t.id === 'family')!;
const offeredIn = subscriptionStates.map((s) => s.name).join(', ');
const price = `$${family.monthly} a month or $${family.yearly} a year`;

export const metadata: Metadata = buildMetadata({
  title: 'Family Dashboard for caregivers',
  description: 'Part of the optional Family subscription: one place for an adult child or caregiver to follow a parent’s Medicare coverage, deadlines and alerts, with permission.',
  path: '/family-dashboard',
});

/** Services › AI Plan Match › Family Dashboard (plan §4). Part of the Family tier (owner, 2026-11-25). */
export default function FamilyDashboardPage() {
  return (
    <>
      <PageIntro
        eyebrow="Family tier"
        title="Family Dashboard"
        lead={`For adult children and caregivers who help a parent with Medicare. It comes with the optional Family subscription (${price}), with your parent’s written permission. Offered in ${offeredIn}; not available in California.`}
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Services', href: '/services' },
              { label: 'Family Dashboard', href: '/family-dashboard' },
            ]}
          />
        }
      />
      <ContentSections
        sections={[
          {
            id: 'what-it-shows',
            eyebrow: 'In one place',
            title: 'What the dashboard shows',
            lead: 'Everything you need to keep an eye on your parent’s coverage without taking over.',
            blocks: [
              {
                type: 'cards',
                items: [
                  { title: 'Coverage summary', text: 'Your parent’s current plans, member ID numbers and monthly costs.' },
                  { title: 'Deadlines', text: 'Enrollment dates and renewal reminders, so nothing is missed.' },
                  { title: 'Alerts', text: 'Changes to drug costs or doctor networks in your parent’s plans, as soon as we see them.' },
                ],
              },
            ],
          },
          {
            id: 'how-it-works',
            eyebrow: 'Getting started',
            title: 'How it works',
            blocks: [
              {
                type: 'steps',
                items: [
                  { title: 'Subscribe to Family', text: 'Start Family on the Plans & Pricing page. You can cancel at any time.' },
                  { title: 'Your parent gives permission', text: 'We send a short written permission form for your parent to sign. Nothing is shared until it is on file.' },
                  { title: 'We set up your dashboard', text: 'A licensed agent calls you to set up the dashboard. Until it opens online, we send you the same summary and alerts by email.' },
                ],
              },
            ],
          },
          {
            id: 'permission',
            eyebrow: 'Privacy first',
            title: 'Your parent stays in charge',
            blocks: [
              {
                type: 'list',
                items: [
                  'Before you can see anything, your parent gives us written permission, which they can take back at any time.',
                  'Insurance companies may also need their own authorization form before they talk with you.',
                  'Plan advice, enrollment and the yearly review stay free for your parent, with or without a subscription.',
                  'We never sell health information or use it for advertising.',
                ],
              },
            ],
          },
        ]}
      />
      <NextSteps
        title="Helping a parent now?"
        text="You do not need a subscription to get help. Book a call with your parent, or see what Family includes."
        primary={{ label: 'See Plans & Pricing', href: '/plans-pricing' }}
        secondary={{ label: 'Book a Call', href: '/book-a-call' }}
      />
    </>
  );
}
