import { Clock, LockSimple, UserCheck } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { PageIntro } from '@/components/layout/PageIntro';
import { PlanMatchTool } from '@/components/match/PlanMatchTool';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import { freeAlternatives } from '@/lib/match/engine';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Free AI Plan Match: which Medicare coverage fits you',
  description:
    'Answer a few plain questions and our free AI Plan Match suggests the type of Medicare coverage that fits you, with three reasons and the trade-offs. No purchase required.',
  path: '/plan-match',
});

const promises = [
  { icon: Clock, title: 'A few minutes', text: 'Seven or nine short questions, one at a time. No time limit.' },
  { icon: LockSimple, title: 'Free, nothing to buy', text: 'The match is free and never requires buying insurance or a subscription.' },
  { icon: UserCheck, title: 'A person checks it', text: 'A licensed agent reviews every match with you before any enrollment.' },
];

/** Services › AI Plan Match (plan §4, phase 2): the free match with its notices beside it. */
export default function PlanMatchPage() {
  return (
    <>
      <PageIntro
        eyebrow="AI Plan Match"
        title="Find the Medicare coverage that fits you"
        lead="Our free tool suggests the type of coverage that fits your situation, Original Medicare with Medigap, Medicare Advantage or keeping your job coverage, and explains why in plain words."
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Services', href: '/services' },
              { label: 'AI Plan Match', href: '/plan-match' },
            ]}
          />
        }
      />

      <section className="section-y" aria-label="Plan match">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="rounded-card border border-line bg-white p-6 md:p-10">
            <PlanMatchTool />
          </div>
          <aside className="flex flex-col gap-6" aria-label="About the plan match">
            {/* Plan §6: the TPMO disclaimer sits right next to the tool and its results. */}
            <CmsDisclaimer />
            <ul className="flex flex-col gap-5">
              {promises.map((p, i) => (
                <Reveal key={p.title} as="li" stagger={i} className="flex gap-4">
                  <Icon icon={p.icon} weight="fill" size={28} className="shrink-0 text-navy-700" />
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="rounded-card bg-surface p-6">
              <p className="font-semibold">Free, unbiased alternatives</p>
              <ul className="mt-3 flex flex-col gap-2">
                {freeAlternatives.map((a) => (
                  <li key={a.href}>
                    <a href={a.href} className="font-medium underline underline-offset-4">
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-base">
              The match uses your answers only to suggest a coverage type. Read the{' '}
              <Link href="/legal/ai-health-data" className="underline underline-offset-4">
                AI Tool &amp; Health Data Notice
              </Link>{' '}
              and our{' '}
              <Link href="/legal/privacy" className="underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
