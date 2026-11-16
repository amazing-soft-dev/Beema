import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossary } from '@/content/glossary';
import { guidesLibrary } from '@/content/guides-library';
import type { ChecklistGroup } from '@/content/library/checklists';
import { annualEnrollmentChecklist, partBSignup, turning65Checklist } from '@/content/library/checklists';
import { medicare101 } from '@/content/guides/medicare-101';
import { site } from '@/content/site';

/**
 * Large-print layouts for the ready-made PDF library (npm run pdf:library renders them to
 * public/guides/<slug>.pdf). Internal pages: noindex and left out of the sitemap.
 * 16pt+ text, plan year and last-updated date on each, checklist boxes for ticking on paper
 * (made fillable in #52).
 */
export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return guidesLibrary.map((g) => ({ slug: g.slug }));
}

const fmt = (iso: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

function Checklist({ groups }: { groups: ChecklistGroup[] }) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((g) => (
        <section key={g.title} className="break-inside-avoid">
          <h2 className="text-[20pt] font-semibold">{g.title}</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {g.items.map((item) => (
              <li key={item} className="flex gap-4 text-[16pt] leading-snug" data-checkbox="">
                <span aria-hidden="true" className="mt-1 inline-block size-[20pt] shrink-0 rounded-[3pt] border-[2pt] border-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Body({ slug }: { slug: string }) {
  const m = medicare101;
  switch (slug) {
    case 'turning-65-checklist':
      return <Checklist groups={turning65Checklist} />;
    case 'annual-enrollment-checklist':
      return <Checklist groups={annualEnrollmentChecklist} />;
    case 'part-b-signup-guide':
      return (
        <ol className="flex flex-col gap-6">
          {partBSignup.steps.map((s, i) => (
            <li key={s.title} className="break-inside-avoid">
              <h2 className="text-[20pt] font-semibold">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-1 text-[16pt]">{s.text}</p>
            </li>
          ))}
        </ol>
      );
    case 'medigap-vs-medicare-advantage':
      return (
        <table className="w-full border-collapse text-left text-[14pt]">
          <thead>
            <tr>
              <th scope="col" className="border-2 border-black p-3">
                Topic
              </th>
              {m.compare.columns.map((c) => (
                <th key={c} scope="col" className="border-2 border-black p-3">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.compare.rows.map((r) => (
              <tr key={r.topic} className="break-inside-avoid">
                <th scope="row" className="border-2 border-black p-3 align-top">
                  {r.topic}
                </th>
                <td className="border-2 border-black p-3 align-top">{r.medigap}</td>
                <td className="border-2 border-black p-3 align-top">{r.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'medicare-101-guide':
      return (
        <div className="flex flex-col gap-8 text-[16pt]">
          {m.parts.items.map((p) => (
            <section key={p.id} className="break-inside-avoid">
              <h2 className="text-[20pt] font-semibold">
                Part {p.letter}: {p.name}
              </h2>
              <p className="mt-1">Covers: {p.covers.join('; ')}.</p>
              <p className="mt-1">{p.cost}</p>
            </section>
          ))}
          <section className="break-inside-avoid">
            <h2 className="text-[20pt] font-semibold">{m.medigap.title}</h2>
            {m.medigap.plans.map((p) => (
              <p key={p.name} className="mt-2">
                <strong>{p.name}:</strong> {p.summary}
              </p>
            ))}
          </section>
          <section>
            <h2 className="text-[20pt] font-semibold">{m.periods.title}</h2>
            {m.periods.rows.map((r) => (
              <p key={r.name} className="mt-2 break-inside-avoid">
                <strong>{r.name}</strong> ({r.when}): {r.what}
              </p>
            ))}
          </section>
        </div>
      );
    case 'medicare-glossary':
      return (
        <dl className="columns-1 text-[14pt]">
          {[...glossary]
            .sort((a, b) => a.term.localeCompare(b.term))
            .map((t) => (
              <div key={t.slug} className="mb-4 break-inside-avoid">
                <dt className="font-semibold">
                  {t.term}
                  {t.aka ? ` (${t.aka})` : ''}
                </dt>
                <dd>{t.definition}</dd>
              </div>
            ))}
        </dl>
      );
    default:
      return null;
  }
}

export default async function LibraryPrintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guidesLibrary.find((g) => g.slug === slug);
  if (!guide) notFound();
  return (
    <article className="mx-auto max-w-[760px] px-6 py-10 text-black print:max-w-none print:p-0">
      <header className="mb-8 border-b-2 border-black pb-4">
        <p className="text-[14pt] font-semibold">{site.name}</p>
        <h1 className="mt-2 text-[30pt] leading-tight font-semibold">{guide.title}</h1>
        <p className="mt-2 text-[14pt]">
          {guide.planYear} plan year · Last updated {fmt(guide.updated)} · Questions? Call {site.phone.display} ({site.tty.display})
        </p>
      </header>
      <Body slug={slug} />
    </article>
  );
}
