import { TextAppear } from '@/components/motion/TextAppear';
import { medicare101 } from '@/content/guides/medicare-101';

/**
 * Medicare Advantage vs Medigap. A real table with a caption, column headers and row
 * headers on desktop; below 810px each row becomes a labelled card (same markup, CSS only),
 * so it never scrolls sideways on a phone and screen readers keep the table semantics.
 */
export function CompareTable() {
  const c = medicare101.compare;
  return (
    <section id={c.id} className="section-y scroll-mt-40" aria-labelledby="compare-heading">
      <div className="container-x flex flex-col gap-8">
        <div className="flex max-w-[64ch] flex-col gap-4">
          <TextAppear id="compare-heading" className="t-h2">
            {c.title}
          </TextAppear>
          <p className="t-lead">{c.lead}</p>
        </div>
        <table className="w-full border-collapse text-left max-md:block">
          <caption className="sr-only">{c.title}</caption>
          <thead className="max-md:sr-only">
            <tr>
              <th scope="col" className="w-1/4 border-b-2 border-ink py-4 pr-4 align-bottom">
                <span className="sr-only">Topic</span>
              </th>
              {c.columns.map((col, i) => (
                <th key={col} scope="col" className={`border-b-2 border-ink p-4 align-bottom t-h4 ${i === 0 ? 'bg-surface' : 'bg-sand'}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-md:flex max-md:flex-col max-md:gap-4">
            {c.rows.map((r) => (
              <tr key={r.topic} className="border-b border-line max-md:flex max-md:flex-col max-md:rounded-card max-md:border-0 max-md:bg-surface max-md:p-5">
                <th scope="row" className="py-4 pr-4 align-top font-semibold max-md:p-0 max-md:text-xl">
                  {r.topic}
                </th>
                <td className="bg-surface p-4 align-top max-md:bg-transparent max-md:px-0 max-md:pt-3 max-md:pb-0">
                  <span className="block font-semibold md:hidden">{c.columns[0]}</span>
                  {r.medigap}
                </td>
                <td className="bg-sand p-4 align-top max-md:bg-transparent max-md:px-0 max-md:pt-3 max-md:pb-0">
                  <span className="block font-semibold md:hidden">{c.columns[1]}</span>
                  {r.advantage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
