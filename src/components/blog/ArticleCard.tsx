import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { type Article, articleHref, topics } from '@/content/blog';

const date = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/**
 * Blog card: topic tag, title, summary and a "Read more ↗"
 * link whose arrow swaps on hover. The whole card is one link; it fades up in a stagger.
 */
export function ArticleCard({ article: a, stagger }: { article: Article; stagger?: number }) {
  return (
    <Reveal as="li" stagger={stagger}>
      <Link
        href={articleHref(a.slug)}
        className="group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-6 transition-colors duration-300 hover:border-navy-700 focus-visible:border-navy-700 md:p-8"
      >
        <span className="t-caps self-start rounded-pill bg-sand px-3 py-1 text-ink">{topics[a.topic]}</span>
        <span className="t-h4">{a.title}</span>
        <span>{a.description}</span>
        <span className="mt-auto flex flex-wrap items-center justify-between gap-3 text-base">
          <span>
            {date(a.updated ?? a.published)} · {a.readMinutes} min read
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-navy-700">
            Read more
            <ArrowSwap dir="up-right" size={20} />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export { date as articleDate };
