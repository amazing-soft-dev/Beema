import { CheckCircle, Warning } from '@phosphor-icons/react/dist/ssr';
import { TextAppear } from '@/components/motion/TextAppear';
import { Icon } from '@/components/ui/Icon';
import { turning65 } from '@/content/guides/turning-65';
import { medicareFigures } from '@/content/medicare-figures';
import { formatUSD } from '@/lib/medicare/irmaa';

/** Late enrollment penalties for Parts A, B and D, with a worked Part B example. */
export function LatePenalties() {
  const p = turning65.penalties;
  const f = medicareFigures;
  return (
    <section id={p.id} className="section-y scroll-mt-40" aria-labelledby="penalties-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <TextAppear id="penalties-heading" className="t-h2">
            {p.title}
          </TextAppear>
          <p className="t-lead">{p.lead}</p>
          <div className="mt-2 rounded-card bg-sand p-6">
            <h3 className="t-h4">How to avoid them</h3>
            <ul className="mt-3 flex flex-col gap-3">
              {p.avoid.map((a) => (
                <li key={a} className="flex gap-3">
                  <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-green-700" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="flex flex-col gap-4">
          {p.items.map((item) => {
            const years = 'exampleYears' in item ? item.exampleYears : undefined;
            const extra = years ? Math.round(f.partB.standardMonthly * 0.1 * years * 100) / 100 : 0;
            return (
              <div key={item.part} className="rounded-card border-2 border-line p-6">
                <dt className="flex items-center gap-3 t-h4">
                  <Icon icon={Warning} weight="fill" className="text-error" />
                  {item.part}
                </dt>
                <dd className="mt-2">{item.rule}</dd>
                {years && (
                  <dd className="mt-3 rounded-card-sm bg-surface p-4 text-base">
                    <strong>Example:</strong> {years} full years late means {years * 10}% more. At the {f.planYear} standard premium of{' '}
                    {formatUSD(f.partB.standardMonthly)}, that is about {formatUSD(extra)} extra every month.
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
