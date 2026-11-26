import type { ReactNode } from 'react';
import { PageIntro } from '@/components/layout/PageIntro';

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared layout for the legal pages: intro band and numbered sections in a readable 70-character column.
 */
export function LegalPage({ title, lead, updated, sections }: { title: string; lead: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageIntro eyebrow="Legal" title={title} lead={lead}>
        <p className="text-base">Last updated {updated}.</p>
      </PageIntro>
      <section className="section-y">
        <div className="container-x flex max-w-[78ch] flex-col gap-10">
          {sections.map((s, i) => (
            <section key={s.heading} aria-labelledby={`legal-${i}`} className="flex flex-col gap-3 [&_a]:font-semibold [&_a]:text-navy-700 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2">
              <h2 id={`legal-${i}`} className="t-h3">
                {i + 1}. {s.heading}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
