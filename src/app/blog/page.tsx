import { ArticleCard } from '@/components/blog/ArticleCard';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { NextSteps } from '@/components/content/NextSteps';
import { PageIntro } from '@/components/layout/PageIntro';
import { TextAppear } from '@/components/motion/TextAppear';
import { type Topic, articles, topics } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog: Medicare insights for you and your family',
  description: 'Plain-English articles on turning 65, Medigap, Medicare Advantage, Part D, coverage beyond Medicare, and helping a parent with Medicare.',
  path: '/blog',
});

/** Resources › Blog (plan §4): every article, grouped by topic; topic links jump within the page. */
export default function BlogPage() {
  const used = (Object.keys(topics) as Topic[]).filter((t) => articles.some((a) => a.topic === t));
  return (
    <>
      <PageIntro
        eyebrow="Blog insights"
        title="Medicare insights for you and your family"
        lead="Short, plain-English articles. Every cost figure shows its plan year, and every article is written by our licensed agents."
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Resources', href: '/resources' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
        }
      >
        <nav aria-label="Topics" className="flex flex-wrap gap-3">
          {used.map((t) => (
            <a key={t} href={`#topic-${t}`} className="inline-flex min-h-12 items-center rounded-pill border-2 border-current px-5 font-medium">
              {topics[t]}
            </a>
          ))}
        </nav>
      </PageIntro>

      <section className="section-y" aria-labelledby="latest">
        <div className="container-x flex flex-col gap-8">
          <TextAppear id="latest" className="t-h2">
            Latest articles
          </TextAppear>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <ArticleCard key={a.slug} article={a} stagger={i % 3} />
            ))}
          </ul>
        </div>
      </section>

      {used.map((t, i) => (
        <section key={t} id={`topic-${t}`} className={`section-y scroll-mt-32 ${i % 2 ? '' : 'bg-surface'}`} aria-labelledby={`topic-${t}-heading`}>
          <div className="container-x flex flex-col gap-8">
            <TextAppear id={`topic-${t}-heading`} className="t-h3">
              {topics[t]}
            </TextAppear>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles
                .filter((a) => a.topic === t)
                .map((a, j) => (
                  <ArticleCard key={a.slug} article={a} stagger={j % 3} />
                ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="container-x pt-10">
        <CmsDisclaimer />
      </div>
      <NextSteps title="Want answers for your situation?" text="Try the free plan match, or talk with a licensed agent at no cost." disclaimer={false} />
    </>
  );
}
