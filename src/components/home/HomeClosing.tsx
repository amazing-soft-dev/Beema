import { CalendarCheck, Check, FilePdf, Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { GovDisclaimer } from '@/components/compliance/GovDisclaimer';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { TestimonialSlider } from '@/components/motion/TestimonialSlider';
import { TextAppear } from '@/components/motion/TextAppear';
import { DownloadGuideLink } from '@/components/resources/DownloadGuideLink';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { articles } from '@/content/blog';
import { findGuide } from '@/content/guides-library';
import { home } from '@/content/home';
import { reviews } from '@/content/reviews';
import { bookCall, site } from '@/content/site';

/** Framer "Results & Reflections": the testimonial slider once real, permitted stories exist. */
export function HomeReviews() {
  const r = home.reviews;
  const quotes = reviews.quotes.filter((q) => q.consent && q.planMember);
  return (
    <section className="section-y bg-surface" aria-labelledby="reviews-teaser">
      <div className="container-x flex flex-col gap-8">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[50ch] flex-col gap-4">
            <Eyebrow variant="pill">{r.eyebrow}</Eyebrow>
            <TextAppear id="reviews-teaser" className="t-h2">
              {r.title}
            </TextAppear>
            <Reveal as="p" className="t-lead">
              {r.text}
            </Reveal>
          </div>
          <ButtonLink href={r.link.href} size="lg" variant="secondary">
            {r.link.label}
          </ButtonLink>
        </div>
        <TestimonialSlider quotes={quotes} />
      </div>
    </section>
  );
}

/** The turning-65 checklist PDF (plan §4 Home), with no sign-up. */
export function ChecklistBand() {
  const guide = findGuide('turning-65-checklist');
  if (!guide) return null;
  return (
    <section className="section-y" aria-labelledby="checklist-heading">
      <Reveal className="container-x flex flex-col items-start gap-6 rounded-card bg-sand p-6 md:flex-row md:items-center md:justify-between md:p-12">
        <div className="flex max-w-[52ch] gap-4">
          <Icon icon={FilePdf} weight="fill" size={44} className="shrink-0 text-navy-700" />
          <div className="flex flex-col gap-2">
            <h2 id="checklist-heading" className="t-h3">
              {home.checklist.title}
            </h2>
            <p>
              {guide.description} Large print with boxes to tick, {guide.planYear} plan year. No sign-up.
            </p>
          </div>
        </div>
        <DownloadGuideLink slug={guide.slug} />
      </Reveal>
    </section>
  );
}

/** Framer Blogs section: the three latest articles. */
export function LatestArticles() {
  return (
    <section className="section-y bg-surface" aria-labelledby="articles-heading">
      <div className="container-x flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-4">
            <Eyebrow variant="pill">Blog</Eyebrow>
            <TextAppear id="articles-heading" className="t-h2">
              {home.articles.title}
            </TextAppear>
          </div>
          <Link href="/blog" className="inline-flex min-h-12 items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
            All articles
            <ArrowSwap />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <ArticleCard key={a.slug} article={a} stagger={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Framer CTA banner: a dark band whose advisor photo drifts against the scroll (parallax), the
 * heading rising into view, a three-point checklist and the calls to action, then the
 * not-government notice.
 */
export function HomeCta() {
  const c = home.cta;
  return (
    <section className="pb-16 md:pb-24" aria-labelledby="cta-heading">
      <div className="container-x flex flex-col gap-6">
        <div className="on-dark relative isolate overflow-hidden rounded-card bg-ink text-white">
          {/*
            The advisor photo drifts against the scroll. From 1200px it fills the band and an ink
            scrim keeps the left half solid for the text; below that it is a block above the text,
            fading into the ink, so the copy never sits on the photo.
          */}
          <div className="relative aspect-[16/10] md:aspect-[2/1] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
            <Parallax>
              <Photo id="cta-advisor-headset" rounded={false} sizes="(min-width: 1280px) 1200px, 100vw" className="!absolute inset-0" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_37_69/0)_55%,#0b2545_100%)] lg:bg-[linear-gradient(90deg,#0b2545_0%,#0b2545_28%,rgb(11_37_69/0.7)_50%,rgb(11_37_69/0.1)_78%)]" />
            </Parallax>
          </div>
          <div className="flex flex-col gap-10 px-6 pt-2 pb-10 md:px-12 md:pb-14 lg:flex-row lg:items-end lg:justify-between lg:pt-40">
            <div className="flex max-w-[30rem] flex-col gap-6">
              <TextAppear id="cta-heading" className="t-h2 text-white">
                {c.title}
              </TextAppear>
              <Reveal stagger={0} className="flex flex-wrap gap-4">
                <ButtonLink href={bookCall.href} size="lg" icon={<Icon icon={CalendarCheck} />}>
                  {c.button}
                </ButtonLink>
                <ButtonLink href={`tel:${site.phone.tel}`} size="lg" variant="light" icon={<Icon icon={Phone} weight="fill" />}>
                  {site.phone.display}
                </ButtonLink>
              </Reveal>
              <p className="text-base">{site.tty.display}</p>
            </div>
            <Reveal as="ul" stagger={1} className="flex flex-col gap-3 rounded-card-sm bg-ink/75 p-6 ring-1 ring-white/15 backdrop-blur-md">
              {c.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Icon icon={Check} weight="bold" className="shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
        <GovDisclaimer />
      </div>
    </section>
  );
}
