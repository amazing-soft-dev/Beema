import { CalendarCheck } from '@phosphor-icons/react/dist/ssr';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { NextSteps } from '@/components/content/NextSteps';
import { EnrollmentWindows } from '@/components/guides/EnrollmentWindows';
import { LatePenalties } from '@/components/guides/LatePenalties';
import { StepPath } from '@/components/guides/StepPath';
import { PageIntro } from '@/components/layout/PageIntro';
import { GuidePdfActions } from '@/components/print/GuidePdfActions';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { turning65 } from '@/content/guides/turning-65';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Turning 65: your step-by-step Medicare guide',
  description: 'What to do and when if you are turning 65: retiring at 65 or working past 65, your 7-month enrollment window, Medigap Open Enrollment and late penalties.',
  path: '/turning-65',
});

export default function Turning65Page() {
  const t = turning65;
  return (
    <>
      <PageIntro
        breadcrumb={<Breadcrumb trail={[{ label: 'Services', href: '/services' }, { label: 'Turning 65', href: '/turning-65' }]} />}
        eyebrow={t.intro.eyebrow}
        title={t.intro.title}
        lead={t.intro.lead}
        aside={<Photo id="turning-65-walk" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      >
        <nav aria-label="Choose your path" className="flex flex-wrap gap-3">
          <ButtonLink href={`#${t.paths.retiring.id}`} variant="secondary">
            I’m retiring at 65
          </ButtonLink>
          <ButtonLink href={`#${t.paths.working.id}`} variant="outline">
            I’m still working
          </ButtonLink>
        </nav>
      </PageIntro>
      <div className="container-x pt-8">
        <GuidePdfActions slug="turning-65" />
      </div>

      <section className="section-y" aria-labelledby="paths-heading">
        <div className="container-x flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="paths-heading" className="t-h2">
              {t.paths.title}
            </h2>
            <ButtonLink href="/tools/enrollment-calculator" icon={<Icon icon={CalendarCheck} />}>
              Find my dates
            </ButtonLink>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <StepPath {...t.paths.retiring} />
            <StepPath {...t.paths.working} tone="sand" />
          </div>
        </div>
      </section>
      <EnrollmentWindows />
      <LatePenalties />
      <div className="container-x pb-16">
        <GuidePdfActions slug="turning-65" />
      </div>
      <NextSteps
        title="Know your dates? Find your coverage."
        text="The free plan match suggests the coverage type that fits your situation, or get the turning-65 checklist and work through it at your own pace."
        secondary={{ label: 'Get the checklist PDF', href: '/guides/turning-65-checklist.pdf' }}
      />
    </>
  );
}
