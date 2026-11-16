import { BookingWidget } from '@/components/booking/BookingWidget';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { ScopeOfAppointmentNotice } from '@/components/compliance/ScopeOfAppointmentNotice';
import { PageIntro } from '@/components/layout/PageIntro';
import { Photo } from '@/components/ui/Photo';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Book a call with a licensed Medicare advisor',
  description: 'Choose a phone, video or in-person appointment and a topic: turning 65, Medigap, Medicare Advantage or drug plans. Free, no pressure.',
  path: '/book-a-call',
});

export default function BookACallPage() {
  return (
    <>
      <PageIntro
        eyebrow="Book a call"
        title="Pick a time that works for you"
        lead="A free, no-pressure appointment with a licensed advisor by phone, video or in person. Most calls take 30 to 45 minutes."
        aside={<Photo id="book-call-laptop" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      />
      <section className="section-y">
        <div className="container-x flex flex-col gap-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <ScopeOfAppointmentNotice />
            <p className="rounded-card-sm bg-surface p-5 text-base">
              <strong>Your consent.</strong> By booking, you agree that {site.legalName} may contact you about the appointment and the plan types you choose. We will not
              discuss other products unless you ask.
            </p>
          </div>
          <BookingWidget />
          <CmsDisclaimer />
        </div>
      </section>
    </>
  );
}
