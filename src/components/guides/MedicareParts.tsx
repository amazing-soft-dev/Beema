import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Icon } from '@/components/ui/Icon';
import { medicare101 } from '@/content/guides/medicare-101';

/** Parts A–D as four cards: what each covers and what it costs. */
export function MedicareParts() {
  const p = medicare101.parts;
  return (
    <section id={p.id} className="section-y scroll-mt-40" aria-labelledby="parts-heading">
      <div className="container-x flex flex-col gap-10">
        <div className="flex max-w-[62ch] flex-col gap-4">
          <TextAppear id="parts-heading" className="t-h2">
            {p.title}
          </TextAppear>
          <p className="t-lead">{p.lead}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {p.items.map((part, i) => (
            <Reveal key={part.id} as="article" delay={(i % 2) * 0.1} id={part.id} className="flex scroll-mt-40 flex-col gap-5 rounded-card bg-surface p-6 md:p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-card-sm bg-ink font-display text-3xl font-semibold text-gold" aria-hidden="true">
                  {part.letter}
                </span>
                <h3 className="t-h3">
                  Part {part.letter}: {part.name}
                </h3>
              </div>
              <div>
                <h4 className="t-label font-semibold">What it covers</h4>
                <ul className="mt-2 flex flex-col gap-2">
                  {part.covers.map((c) => (
                    <li key={c} className="flex gap-3">
                      <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="t-label font-semibold">What it costs</h4>
                <p className="mt-2">{part.cost}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
