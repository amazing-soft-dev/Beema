import { ContentPageView } from '@/components/content/ContentPageView';
import { LeadForm } from '@/components/forms/LeadForm';
import { finalExpensePage } from '@/content/pages/final-expense';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...finalExpensePage.meta, path: finalExpensePage.path });

export default function FinalExpensePage() {
  return (
    <>
      <ContentPageView page={finalExpensePage} />
      {/* Final expense has its own request form, apart from any Medicare booking (review INS-09). */}
      <section id="final-expense-request" className="section-y scroll-mt-28" aria-labelledby="final-expense-request-title">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 id="final-expense-request-title" className="t-h2">
              Request a separate final expense call
            </h2>
            <p>
              A licensed life insurance agent calls you to talk about final expense coverage only. This is not a Medicare appointment, and we will not discuss
              Medicare plans on this call unless you ask for a separate Medicare appointment.
            </p>
            <p role="note" className="rounded-card-sm bg-sand p-5 text-base">
              <strong>California residents 65 and older:</strong> if you would like an agent to visit you at home, we first send you a separate written notice at
              least 24 hours (and no more than 14 days) before the visit. It lists the agent’s name and California license number, what we will discuss, your right
              to have others present and to end the meeting at any time, and California Department of Insurance phone numbers. At your door, the agent will say
              the visit is about insurance and will leave whenever you ask.
            </p>
          </div>
          <LeadForm endpoint="/api/final-expense" form="final-expense" idPrefix="final-expense" submitLabel="Request a final expense call" />
        </div>
      </section>
    </>
  );
}
