import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard, articleDate } from '@/components/blog/ArticleCard';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { ContentSections } from '@/components/content/ContentSections';
import { NextSteps } from '@/components/content/NextSteps';
import { PageIntro } from '@/components/layout/PageIntro';
import { DownloadGuideLink } from '@/components/resources/DownloadGuideLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleHref, articles, findArticle, topics } from '@/content/blog';
import { findGuide } from '@/content/guides-library';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = findArticle((await params).slug);
  if (!a) return {};
  const meta = buildMetadata({ title: a.title, description: a.description, path: articleHref(a.slug) });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: a.published, modifiedTime: a.updated ?? a.published } };
}

/** Blog article (Framer article template): hero, rich text column, related PDF, related posts. */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = findArticle((await params).slug);
  if (!a) notFound();
  const guide = a.pdf ? findGuide(a.pdf) : undefined;
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <PageIntro
        eyebrow={topics[a.topic]}
        title={a.title}
        lead={a.description}
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Blog', href: '/blog' },
              { label: a.title, href: articleHref(a.slug) },
            ]}
          />
        }
      >
        <p className="text-base">
          By {a.author.name}. {articleDate(a.updated ?? a.published)} · {a.readMinutes} min read · Cost figures for the {a.planYear} plan year.
        </p>
      </PageIntro>

      <article>
        <ContentSections sections={a.sections.map((s, i) => ({ id: `part-${i + 1}`, title: s.heading, blocks: s.blocks }))} />
        <div className="container-x flex max-w-[78ch] flex-col gap-6 pb-10">
          <p className="text-base">
            <strong>About the author:</strong> {a.author.license}
          </p>
          {guide && (
            <div className="flex flex-col gap-3 rounded-card bg-sand p-6">
              <p className="font-semibold">Related free PDF: {guide.title}</p>
              <p>{guide.description}</p>
              <DownloadGuideLink slug={guide.slug} />
            </div>
          )}
          <CmsDisclaimer />
        </div>
      </article>

      <section className="section-y bg-surface" aria-labelledby="related-posts">
        <div className="container-x flex flex-col gap-8">
          <h2 id="related-posts" className="t-h2">
            More articles
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <ArticleCard key={r.slug} article={r} stagger={i} />
            ))}
          </ul>
        </div>
      </section>

      <NextSteps disclaimer={false} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          dateModified: a.updated ?? a.published,
          author: { '@type': 'Organization', name: a.author.name },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: new URL(articleHref(a.slug), site.url).toString(),
        }}
      />
    </>
  );
}
