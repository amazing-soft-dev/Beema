import { Info } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Icon } from '@/components/ui/Icon';
import { medicare101 } from '@/content/guides/medicare-101';

/** Medigap Plans G, N and high-deductible G compared as cards, plus key notes. */
export function MedigapPlans() {
  const m = medicare101.medigap;
  return (
    <section id={m.id} className="section-y scroll-mt-40 bg-surface" aria-labelledby="medigap-heading">
      <div className="container-x flex flex-col gap-10">
        <div className="flex max-w-[64ch] flex-col gap-4">
          <TextAppear id="medigap-heading" className="t-h2">
            {m.title}
          </TextAppear>
          <p className="t-lead">{m.lead}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {m.plans.map((p, i) => (
            <Reveal key={p.name} as="article" stagger={i} className="flex flex-col gap-4 rounded-card bg-white p-6 md:p-8">
              <p className="t-caps self-start rounded-pill bg-sand px-3 py-1 text-ink">{p.tag}</p>
              <h3 className="t-h3">{p.name}</h3>
              <p>{p.summary}</p>
              <div>
                <h4 className="t-label font-semibold">What you pay</h4>
                <ul className="mt-2 ml-6 list-disc space-y-1">
                  {p.youPay.map((y) => (
                    <li key={y}>{y}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-auto rounded-card-sm bg-surface p-4 text-base">
                <strong>Good for:</strong> {p.goodFor}
              </p>
            </Reveal>
          ))}
        </div>
        <ul className="flex flex-col gap-3">
          {m.notes.map((n) => (
            <li key={n} className="flex gap-3">
              <Icon icon={Info} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
