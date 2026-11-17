import { PageIntro } from '@/components/layout/PageIntro';
import { IrmaaCalculator } from '@/components/tools/IrmaaCalculator';
import { medicareFigures } from '@/content/medicare-figures';
import { formatUSD } from '@/lib/medicare/irmaa';
import { buildMetadata } from '@/lib/seo';

const f = medicareFigures;

export const metadata = buildMetadata({
  title: `IRMAA calculator for ${f.planYear}`,
  description: `See whether your income adds an extra charge (IRMAA) to your ${f.planYear} Medicare Part B and Part D premiums.`,
  path: '/tools/irmaa-calculator',
});

export default function IrmaaCalculatorPage() {
  return (
    <>
      <PageIntro
        eyebrow="Free tool"
        title="Will I pay more for Medicare because of my income?"
        lead={
          <>
            People with higher incomes pay an Income-Related Monthly Adjustment Amount, or IRMAA, on top of the standard Part B premium (
            {formatUSD(f.partB.standardMonthly)} a month in {f.planYear}) and their Part D premium.
          </>
        }
      />
      <section className="section-y">
        <div className="container-x">
          <IrmaaCalculator />
        </div>
      </section>
      <section className="section-y bg-surface" aria-labelledby="irmaa-faq">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <h2 id="irmaa-faq" className="t-h2">
            Good to know about IRMAA
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="t-h4">It looks back two years</h3>
              <p className="mt-2">
                Social Security usually uses the tax return from two years earlier. Your {f.planYear} amounts are based on your {f.incomeYear} income.
              </p>
            </div>
            <div>
              <h3 className="t-h4">You can ask for a new decision</h3>
              <p className="mt-2">
                If your income went down because of a life-changing event, such as retiring, working less, marriage, divorce or the death of a spouse,
                you can ask Social Security to use your newer income with{' '}
                <a href={f.sources.lifeChangingEvent} className="font-semibold text-navy-700 underline underline-offset-4">
                  form SSA-44
                </a>
                .
              </p>
            </div>
            <p className="text-base">
              Figures for {f.planYear} from the{' '}
              <a href={f.sources.cms} className="underline underline-offset-4">
                Centers for Medicare &amp; Medicaid Services
              </a>{' '}
              and{' '}
              <a href={f.sources.ssa} className="underline underline-offset-4">
                Social Security
              </a>
              , checked {new Date(`${f.verifiedOn}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
