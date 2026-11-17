import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { ContentSections } from '@/components/content/ContentSections';
import { NextSteps } from '@/components/content/NextSteps';
import { PageIntro } from '@/components/layout/PageIntro';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Family Dashboard (coming later)',
    description: 'A planned sign-in area for adult children and caregivers helping a parent with Medicare, with the parent’s written permission.',
    path: '/family-dashboard',
  }),
  // Phase 5 placeholder: keep it out of search until the dashboard exists.
  robots: { index: false, follow: true },
};

/** Services › AI Plan Match › Family Dashboard (plan §4, phase 5 "Later"). No sign-in yet. */
export default function FamilyDashboardPage() {
  return (
    <>
      <PageIntro
        eyebrow="Coming later"
        title="Family Dashboard"
        lead="A sign-in area for adult children and caregivers who help a parent with Medicare. It is not open yet; until then, we help families by phone and in person."
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
            id: 'what-it-will-do',
            eyebrow: 'Planned',
            title: 'What the dashboard will show',
            lead: 'Part of the optional Family tier, once it is available.',
            blocks: [
              {
                type: 'cards',
                items: [
                  { title: 'Coverage summary', text: 'Your parent’s current plans, ID numbers and costs in one place.' },
                  { title: 'Deadlines and alerts', text: 'Enrollment dates and changes to drug costs or doctor networks.' },
                  { title: 'Claims and billing help', text: 'Send us a question about a bill or a claim and track the answer.' },
                  { title: 'Priority calls', text: 'Book a call with our team ahead of the regular queue.' },
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
                  'We never sell health information or use it for advertising.',
                ],
              },
            ],
          },
        ]}
      />
      <NextSteps
        title="Helping a parent now?"
        text="You do not need the dashboard to get help. Book a call with your parent, or request help and we will call you back."
        primary={{ label: 'Request help', href: '/contact' }}
        secondary={{ label: 'Book a Call', href: '/book-a-call' }}
      />
    </>
  );
}
