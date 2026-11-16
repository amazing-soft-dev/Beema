import { PageIntro } from '@/components/layout/PageIntro';
import { EnrollmentCalculator } from '@/components/tools/EnrollmentCalculator';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare enrollment date calculator',
  description: 'Enter your date of birth to see your Initial Enrollment Period, when Part B can start and your Medigap Open Enrollment dates.',
  path: '/tools/enrollment-calculator',
});

export default function EnrollmentCalculatorPage() {
  return (
    <>
      <PageIntro
        eyebrow="Free tool"
        title="When can I sign up for Medicare?"
        lead="Enter your date of birth to see your sign-up window, when coverage can start and the best time to buy a Medigap policy."
      />
      <section className="section-y">
        <div className="container-x">
          <EnrollmentCalculator />
        </div>
      </section>
    </>
  );
}
