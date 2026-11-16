import { CompareTable } from '@/components/guides/CompareTable';
import { MedicareParts } from '@/components/guides/MedicareParts';
import { MedigapPlans } from '@/components/guides/MedigapPlans';
import { PartDAndPeriods } from '@/components/guides/PartDAndPeriods';
import { PageIntro } from '@/components/layout/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { medicare101 } from '@/content/guides/medicare-101';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare 101: the parts, Medigap, Medicare Advantage and key dates',
  description: 'Parts A, B, C and D in plain words, Medigap Plans G and N, Medicare Advantage vs Medigap, Part D basics, enrollment periods and help with costs.',
  path: '/medicare-101',
});

export default function Medicare101Page() {
  const m = medicare101;
  return (
    <>
      <PageIntro
        eyebrow={m.intro.eyebrow}
        title={m.intro.title}
        lead={m.intro.lead}
        aside={<Photo id="medicare-101-paperwork" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-3">
          <ButtonLink href="#parts" variant="secondary">
            The four parts
          </ButtonLink>
          <ButtonLink href="#medigap" variant="outline">
            Medigap plans
          </ButtonLink>
          <ButtonLink href="#compare" variant="outline">
            Compare the two paths
          </ButtonLink>
          <ButtonLink href="#enrollment-periods" variant="outline">
            Key dates
          </ButtonLink>
        </nav>
      </PageIntro>
      <MedicareParts />
      <MedigapPlans />
      <CompareTable />
      <PartDAndPeriods />
    </>
  );
}
