import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { PageIntro } from '@/components/layout/PageIntro';
import { PlanIntake } from '@/components/tools/PlanIntake';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Compare Medicare plans in your area',
  description: 'Tell us your ZIP code, medicines and doctors, and a licensed advisor will compare Medicare plans for you. Or use the official Medicare.gov Plan Finder.',
  path: '/tools/plan-comparison',
});

export default function PlanComparisonPage() {
  return (
    <>
      <PageIntro
        eyebrow="Free tool"
        title="Compare plans in your area"
        lead="Tell us where you live, the medicines you take and the doctors you want to keep. A licensed advisor will compare plans for you and call with the results."
      />
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          <PlanIntake />
          <aside className="flex flex-col gap-4">
            <CmsDisclaimer />
            <p className="text-base">We show no prices on this page. Plan costs depend on your situation, and we confirm them with you before you decide anything.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
