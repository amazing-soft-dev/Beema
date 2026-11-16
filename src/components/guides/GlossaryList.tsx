'use client';

import { MagnifyingGlass } from '@phosphor-icons/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { GlossaryTerm } from '@/content/glossary';

const letterOf = (t: GlossaryTerm) => t.term[0]!.toUpperCase();

/**
 * Glossary with A–Z navigation and a quick filter. All terms render on the server, so the
 * list and anchors work without JavaScript; the filter only narrows what is shown.
 */
export function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState('');
  const sorted = useMemo(() => [...terms].sort((a, b) => a.term.localeCompare(b.term)), [terms]);
  const q = query.trim().toLowerCase();
  const visible = q ? sorted.filter((t) => `${t.term} ${t.aka ?? ''} ${t.definition}`.toLowerCase().includes(q)) : sorted;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const present = new Set(sorted.map(letterOf));
  const groups = letters.map((l) => ({ letter: l, items: visible.filter((t) => letterOf(t) === l) })).filter((g) => g.items.length);

  return (
    <div className="flex flex-col gap-10">
      <nav aria-label="Glossary letters" className="flex flex-wrap gap-2">
        {letters.map((l) =>
          present.has(l) ? (
            <a key={l} href={`#letter-${l}`} className="inline-flex size-12 items-center justify-center rounded-card-sm bg-surface text-lg font-semibold hover:bg-lime">
              {l}
            </a>
          ) : (
            <span key={l} aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-card-sm text-lg text-muted">
              {l}
            </span>
          ),
        )}
      </nav>

      <div className="flex max-w-[480px] flex-col gap-2">
        <label htmlFor="glossary-filter" className="t-label font-semibold">
          Find a term
        </label>
        <div className="relative">
          <Icon icon={MagnifyingGlass} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
          <input
            id="glossary-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-14 w-full rounded-pill border-2 border-field bg-white pr-5 pl-12 text-lg"
            placeholder="For example, IRMAA or deductible"
          />
        </div>
        <p aria-live="polite" className="text-base">
          {q ? `${visible.length} ${visible.length === 1 ? 'term' : 'terms'} found` : `${sorted.length} terms`}
        </p>
      </div>

      {groups.map((g) => (
        <section key={g.letter} aria-labelledby={`letter-${g.letter}`} className="scroll-mt-40">
          <h2 id={`letter-${g.letter}`} className="t-h2 border-b border-line pb-2">
            {g.letter}
          </h2>
          <dl className="mt-4 flex flex-col">
            {g.items.map((t) => (
              <div key={t.slug} id={t.slug} className="scroll-mt-40 border-b border-line py-5 last:border-0">
                <dt className="t-h4">
                  {t.term}
                  {t.aka && <span className="ml-2 font-sans text-lg font-medium text-muted">({t.aka})</span>}
                </dt>
                <dd className="mt-2 max-w-[70ch]">
                  {t.definition}{' '}
                  {t.href && (
                    <Link href={t.href} className="font-semibold text-green-700 underline underline-offset-4">
                      Learn more
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
