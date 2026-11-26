import { CheckCircle, Info, Warning } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import type { Block, ContentSection } from '@/content/pages/types';

/**
 * A content page's sections in the site motion vocabulary: headings rise into view
 * (TextAppear), paragraphs and blocks fade up 50px, cards stagger 0.2s apart. Sections
 * alternate white and surface backgrounds.
 */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className={`section-y scroll-mt-32 ${i % 2 ? 'bg-surface' : ''}`} aria-labelledby={`${s.id}-heading`}>
          <div className="container-x flex flex-col gap-8">
            <div className="flex max-w-[64ch] flex-col gap-4">
              {s.eyebrow && <Eyebrow>{s.eyebrow}</Eyebrow>}
              <TextAppear id={`${s.id}-heading`} className="t-h2">
                {s.title}
              </TextAppear>
              {s.lead && (
                <Reveal as="p" className="t-lead">
                  {s.lead}
                </Reveal>
              )}
            </div>
            {s.blocks.map((b, j) => (
              <BlockView key={j} block={b} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/** "On this page" links for long pages. */
export function JumpLinks({ sections }: { sections: ContentSection[] }) {
  return (
    <nav aria-label="On this page" className="flex flex-wrap gap-3">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-12 items-center rounded-pill border-2 border-current px-5 font-medium">
          {s.title}
        </a>
      ))}
    </nav>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case 'p':
      return (
        <Reveal as="p" className="max-w-[68ch]">
          {b.text}
        </Reveal>
      );
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return (
        <Reveal>
          <Tag className={`flex max-w-[68ch] flex-col gap-3 ${b.ordered ? 'ml-6 list-decimal' : ''}`}>
            {b.items.map((item) => (
              <li key={item} className={b.ordered ? 'pl-2' : 'flex gap-3'}>
                {!b.ordered && <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />}
                <span>{item}</span>
              </li>
            ))}
          </Tag>
        </Reveal>
      );
    }
    case 'cards':
      return (
        <ul className={`grid gap-6 ${b.items.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {b.items.map((c, i) => (
            <Reveal key={c.title} as="li" stagger={i % 3} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 md:p-8">
              {c.tag && <p className="t-caps self-start rounded-pill bg-sand px-3 py-1 text-ink">{c.tag}</p>}
              <h3 className="t-h4">{c.title}</h3>
              <p>{c.text}</p>
              {c.points && (
                <ul className="ml-6 list-disc space-y-1">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      );
    case 'table':
      return (
        <Reveal className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">{b.caption}</caption>
            <thead className="on-dark bg-ink text-white">
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" className="p-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line even:bg-surface">
                  {row.map((cell, k) =>
                    k === 0 ? (
                      <th key={k} scope="row" className="p-4 align-top font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={k} className="p-4 align-top">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      );
    case 'callout': {
      const warn = b.tone === 'warning';
      return (
        <Reveal as="aside" className={`flex max-w-[72ch] gap-4 rounded-card-sm border-l-4 p-5 ${warn ? 'border-error bg-error-bg' : 'border-navy-700 bg-sand'}`}>
          <Icon icon={warn ? Warning : Info} weight="fill" className={`mt-0.5 shrink-0 ${warn ? 'text-error' : 'text-navy-700'}`} />
          <div className="flex flex-col gap-1">
            {b.title && <p className="font-semibold">{b.title}</p>}
            <p>{b.text}</p>
          </div>
        </Reveal>
      );
    }
    case 'steps':
      return (
        <ol className="grid gap-6 md:grid-cols-2">
          {b.items.map((s, i) => (
            <Reveal key={s.title} as="li" stagger={i % 2} className="grid grid-cols-[48px_1fr] gap-4">
              <span className="flex size-12 items-center justify-center rounded-pill bg-gold text-lg font-semibold text-on-gold" aria-hidden="true">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="t-h4">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      );
    case 'links':
      return (
        <ul className="flex flex-col gap-2">
          {b.items.map((l, i) => (
            <Reveal key={l.href} as="li" stagger={i % 3}>
              <Link href={l.href} className="inline-flex min-h-12 items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
                {l.label}
                <ArrowSwap />
              </Link>
            </Reveal>
          ))}
        </ul>
      );
  }
}
