import type { ReactNode } from 'react';
import { PageIntro } from '@/components/layout/PageIntro';
import { site } from '@/content/site';

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared layout for the legal pages: intro band, a review notice while placeholder data is
 * live, and numbered sections in a readable 70-character column.
 */
export function LegalPage({ title, lead, updated, sections }: { title: string; lead: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageIntro eyebrow="Legal" title={title} lead={lead}>
        <p className="text-base">Last updated {updated}.</p>
      </PageIntro>
      <section className="section-y">
        <div className="container-x flex max-w-[78ch] flex-col gap-10">
          {site.placeholder && (
            <p role="note" className="rounded-card-sm border-l-4 border-green-700 bg-surface p-5 text-base">
              <strong>Template text.</strong> This page is a plain-language starting point. Have it reviewed by the agency’s counsel and compliance
              team before launch.
            </p>
          )}
          {sections.map((s, i) => (
            <section key={s.heading} aria-labelledby={`legal-${i}`} className="flex flex-col gap-3 [&_a]:font-semibold [&_a]:text-green-700 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2">
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
