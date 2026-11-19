import { CaretDown, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { ContentSections } from '@/components/content/ContentSections';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { TierTable } from '@/components/pricing/TierTable';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { caregiverFaq, features, notIncluded, tiers } from '@/content/pricing';
import { freeAlternatives } from '@/lib/match/engine';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Plans & Pricing: Basic, Plus and Family',
  description: 'The AI Plan Match is free. Optional Plus and Family subscriptions add year-round alerts and caregiver help. No insurance purchase is ever required.',
  path: '/plans-pricing',
});

/** Services › AI Plan Match › Plans & Pricing (plan §2 and §4, phase 4). Sells service, never insurance. */
export default function PlansPricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Plans & Pricing"
        title="The match is free. Extra help is optional."
        lead="Basic is free for everyone. Plus and Family add year-round watching and help for caregivers. None of them sells insurance, and none is needed to get advice or enroll."
        aside={<Photo id="plans-pricing-bench" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Services', href: '/services' },
              { label: 'Plans & Pricing', href: '/plans-pricing' },
            ]}
          />
        }
      />

      <section className="section-y" aria-labelledby="tiers-heading">
        <div className="container-x flex flex-col gap-8">
          <div className="flex max-w-[64ch] flex-col gap-4">
            <TextAppear id="tiers-heading" className="t-h2">
              Basic, Plus and Family
            </TextAppear>
            <Reveal as="p" className="flex gap-3 rounded-card-sm border-2 border-ink p-4 font-semibold">
              <Icon icon={ShieldCheck} weight="fill" className="mt-0.5 shrink-0" />
              No plan purchase required, and buying a plan through us never requires a subscription.
            </Reveal>
          </div>
          <TierTable />
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="compare-heading">
        <div className="container-x flex flex-col gap-8">
          <TextAppear id="compare-heading" className="t-h2">
            Compare every feature
          </TextAppear>
          <Reveal className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">AI Plan Match features by tier</caption>
              <thead className="on-dark bg-ink text-white">
                <tr>
                  <th scope="col" className="p-4">
                    Feature
                  </th>
                  {tiers.map((t) => (
                    <th key={t.id} scope="col" className="p-4">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map(([f, ...v]) => (
                  <tr key={f} className="border-t border-line even:bg-surface">
                    <th scope="row" className="p-4 font-semibold">
                      {f}
                    </th>
                    {v.map((cell, i) => (
                      <td key={i} className="p-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <ContentSections
        sections={[
          { id: 'not-included', eyebrow: 'Be clear', title: 'What a subscription does not include', blocks: [{ type: 'list', items: notIncluded }] },
        ]}
      />

      <section className="section-y bg-surface" aria-labelledby="caregiver-faq">
        <div className="container-x flex max-w-[78ch] flex-col gap-6">
          <TextAppear id="caregiver-faq" className="t-h2">
            Questions from caregivers
          </TextAppear>
          {caregiverFaq.map((f, i) => (
            <Reveal key={f.q} stagger={i % 2}>
              <details className="group rounded-card-sm border border-line bg-white">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                  {f.q}
                  <Icon icon={CaretDown} weight="bold" className="shrink-0 transition-transform duration-400 group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="px-5 pb-5">{f.a}</p>
              </details>
            </Reveal>
          ))}
          <p>
            Full terms: <Link href="/legal/subscription-terms" className="font-semibold underline underline-offset-4">Subscription Terms &amp; Fee Disclosure</Link>. Cancel any time.
          </p>
        </div>
      </section>

      <section className="section-y" aria-labelledby="free-options">
        <div className="container-x flex flex-col gap-6">
          <h2 id="free-options" className="t-h3">
            Free, unbiased options
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {freeAlternatives.map((a, i) => (
              <Reveal key={a.href} as="li" stagger={i} className="rounded-card bg-sand p-6">
                <a href={a.href} className="font-semibold underline underline-offset-4">
                  {a.label}
                </a>
                <p className="mt-2">{a.detail}</p>
              </Reveal>
            ))}
          </ul>
          <CmsDisclaimer />
        </div>
      </section>
    </>
  );
}
