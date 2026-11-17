import { Pill } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Icon } from '@/components/ui/Icon';
import { medicare101 } from '@/content/guides/medicare-101';
import { ReadMore } from '@/components/content/ReadMore';

/** Part D basics and a table of every enrollment period. */
export function PartDAndPeriods() {
  const { partD, periods } = medicare101;
  return (
    <>
      <section id={partD.id} className="section-y scroll-mt-40 bg-surface" aria-labelledby="partd-heading">
        <div className="container-x flex flex-col gap-10">
          <TextAppear id="partd-heading" className="t-h2">
            {partD.title}
          </TextAppear>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partD.points.map((p, i) => (
              <Reveal key={p.title} as="li" stagger={i % 3} className="flex flex-col gap-3 rounded-card bg-white p-6">
                <Icon icon={Pill} weight="fill" size={28} className="text-navy-700" />
                <h3 className="t-h4">{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ul>
          <ReadMore href="/part-d">Read the full Part D guide</ReadMore>
        </div>
      </section>

      <section id={periods.id} className="section-y scroll-mt-40" aria-labelledby="periods-heading">
        <div className="container-x flex flex-col gap-8">
          <TextAppear id="periods-heading" className="t-h2">
            {periods.title}
          </TextAppear>
          <div className="overflow-hidden rounded-card border-2 border-line">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{periods.title}</caption>
              <thead className="bg-ink text-white max-md:sr-only">
                <tr>
                  <th scope="col" className="p-4">
                    Period
                  </th>
                  <th scope="col" className="p-4">
                    When
                  </th>
                  <th scope="col" className="p-4">
                    What you can do
                  </th>
                </tr>
              </thead>
              <tbody>
                {periods.rows.map((r) => (
                  <tr key={r.name} className="border-t border-line max-md:block max-md:p-4">
                    <th scope="row" className="p-4 align-top font-semibold max-md:block max-md:p-0 max-md:text-xl">
                      {r.name}
                    </th>
                    <td className="p-4 align-top font-medium text-navy-700 max-md:block max-md:px-0 max-md:pt-1 max-md:pb-0">{r.when}</td>
                    <td className="p-4 align-top max-md:block max-md:px-0 max-md:pt-1 max-md:pb-0">{r.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
