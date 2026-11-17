import { ArrowRight, CalendarCheck, Star } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';

/** Why it's free + the 7-month window, side by side. */
export function FreeAndWindow() {
  const { free, window: w } = home;
  return (
    <section className="section-y bg-surface">
      <div className="container-x grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal as="article" className="flex flex-col gap-4 rounded-card bg-white p-6 md:p-10">
          <Eyebrow>{free.eyebrow}</Eyebrow>
          <h2 className="t-h3">{free.title}</h2>
          <p>{free.text}</p>
          <ButtonLink href={free.link.href} variant="outline" className="mt-auto self-start" icon={<Icon icon={ArrowRight} />}>
            {free.link.label}
          </ButtonLink>
        </Reveal>
        <Reveal as="article" stagger={1} className="flex flex-col gap-5 rounded-card bg-ink p-6 text-white md:p-10 on-dark">
          <Eyebrow tone="dark">{w.eyebrow}</Eyebrow>
          <h2 className="t-h3 text-white">{w.title}</h2>
          <p>{w.text}</p>
          <ol className="grid gap-2 sm:grid-cols-[1fr_1.2fr_1fr]" aria-label="The 7-month Initial Enrollment Period">
            {w.steps.map((s, i) => (
              <li key={s} className={`rounded-card-sm px-4 py-3 text-center font-semibold ${i === 1 ? 'bg-gold text-on-gold' : 'bg-white/10'}`}>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-2 flex flex-wrap gap-4">
            <ButtonLink href={w.link.href} icon={<Icon icon={CalendarCheck} />}>
              {w.link.label}
            </ButtonLink>
            <ButtonLink href={w.secondary.href} variant="light">
              {w.secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Reviews teaser. Shows no ratings or quotes itself, so nothing unverified appears here. */
export function ReviewsTeaser() {
  const r = home.reviews;
  return (
    <section className="section-y" aria-labelledby="reviews-teaser">
      <div className="container-x flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-[50ch] flex-col gap-4">
          <Eyebrow>{r.eyebrow}</Eyebrow>
          <TextAppear id="reviews-teaser" className="t-h2">
            {r.title}
          </TextAppear>
          <p className="t-lead">{r.text}</p>
        </div>
        <ButtonLink href={r.link.href} size="lg" variant="secondary" icon={<Icon icon={Star} weight="fill" />}>
          {r.link.label}
        </ButtonLink>
      </div>
    </section>
  );
}
