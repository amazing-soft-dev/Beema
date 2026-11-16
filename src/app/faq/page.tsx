import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { PageIntro } from '@/components/layout/PageIntro';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { faqGroups } from '@/content/guides/faq';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare questions and answers',
  description: 'Short, plain answers about Medicare coverage, enrollment, costs, working past 65 and special situations, with links to the full guides.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Questions people ask us most"
        lead="Short answers in plain words. Each one links to the full explanation."
        aside={<Photo id="faq-man-reading" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      >
        <nav aria-label="Question topics" className="flex flex-wrap gap-3">
          {faqGroups.map((g) => (
            <ButtonLink key={g.id} href={`#${g.id}`} variant="outline">
              {g.title}
            </ButtonLink>
          ))}
        </nav>
      </PageIntro>

      <section className="section-y">
        <div className="container-x flex max-w-[860px] flex-col gap-14">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="scroll-mt-40">
              <h2 id={`${g.id}-heading`} className="t-h2">
                {g.title}
              </h2>
              {/* Native details/summary: keyboard and screen-reader friendly, works without JavaScript. */}
              <div className="mt-6 flex flex-col border-t border-line">
                {g.items.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 t-h4 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Icon icon={CaretDown} weight="bold" className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="flex flex-col gap-3 pr-10 pb-6">
                      <p>{f.a}</p>
                      {f.link && (
                        <Link href={f.link.href} className="self-start font-semibold text-green-700 underline underline-offset-4">
                          {f.link.label}
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqGroups.flatMap((g) => g.items).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
    </>
  );
}
