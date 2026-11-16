import { ChatCircleText, PencilSimple, Star } from '@phosphor-icons/react/dist/ssr';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { reviews } from '@/content/reviews';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Client reviews',
  description: 'Ratings from Google, Facebook and Trustpilot and stories from people we helped with Medicare, shared with their permission.',
  path: '/reviews',
});

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={22} weight={rating >= i - 0.25 ? 'fill' : 'regular'} className="text-ink" />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const rated = reviews.platforms.filter((p) => p.rating !== null);
  const writable = reviews.platforms.filter((p) => p.reviewUrl);
  return (
    <>
      <PageIntro
        eyebrow="Reviews"
        title="What our clients say"
        lead="We ask every client how we did. Here are their ratings and, with permission, a few of their stories."
        aside={<Photo id="reviews-couple-laughing" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      />

      <section className="section-y" aria-labelledby="ratings-heading">
        <div className="container-x flex flex-col gap-8">
          <h2 id="ratings-heading" className="t-h2">
            Ratings
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {reviews.platforms.map((p) => (
              <li key={p.name} className="flex flex-col gap-3 rounded-card bg-surface p-6">
                <p className="t-h4">{p.name}</p>
                {p.rating !== null ? (
                  <>
                    <Stars rating={p.rating} />
                    <p>
                      <strong className="text-2xl">{p.rating.toFixed(1)}</strong> out of 5{p.count !== null && `, from ${p.count.toLocaleString('en-US')} reviews`}
                    </p>
                  </>
                ) : (
                  <p>Our {p.name} rating will appear here soon.</p>
                )}
                {p.profileUrl && (
                  <a href={p.profileUrl} className="mt-auto font-semibold text-green-700 underline underline-offset-4">
                    Read our {p.name} reviews
                  </a>
                )}
              </li>
            ))}
          </ul>
          {rated.length === 0 && <p className="text-base">We only show ratings copied from our real review profiles.</p>}
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="stories-heading">
        <div className="container-x flex flex-col gap-8">
          <h2 id="stories-heading" className="t-h2">
            Client stories
          </h2>
          {reviews.quotes.length ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {reviews.quotes
                .filter((q) => q.consent)
                .map((q, i) => (
                  <Reveal key={q.name} as="li" delay={(i % 2) * 0.1} className="flex flex-col gap-4 rounded-card bg-white p-6 md:p-8">
                    <Icon icon={ChatCircleText} weight="fill" size={32} className="text-green-700" />
                    <blockquote className="t-lead">“{q.quote}”</blockquote>
                    {q.story && <p>{q.story}</p>}
                    <p className="font-semibold">
                      {q.name}, <span className="font-normal">{q.detail}</span>
                    </p>
                  </Reveal>
                ))}
            </ul>
          ) : (
            <p className="max-w-[60ch]">Client stories will appear here once clients give us written permission to share them.</p>
          )}
        </div>
      </section>

      <section className="section-y" aria-labelledby="leave-heading">
        <div className="container-x flex flex-col items-start gap-5">
          <h2 id="leave-heading" className="t-h2">
            Worked with us?
          </h2>
          <p className="max-w-[60ch]">A short review helps other people turning 65 find honest help. Thank you for taking a minute.</p>
          {writable.length ? (
            <div className="flex flex-wrap gap-4">
              {writable.map((p) => (
                <ButtonLink key={p.name} href={p.reviewUrl!} icon={<Icon icon={PencilSimple} />}>
                  Leave a review on {p.name}
                </ButtonLink>
              ))}
            </div>
          ) : (
            <ButtonLink href="/contact" variant="secondary" icon={<Icon icon={PencilSimple} />}>
              Leave a review
            </ButtonLink>
          )}
        </div>
      </section>
    </>
  );
}
