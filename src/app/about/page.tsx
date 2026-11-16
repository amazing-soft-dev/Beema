import { ArrowRight, CheckCircle, MapPin } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { about } from '@/content/about';
import { bookCall, site } from '@/content/site';
import { isSolo, team } from '@/content/team';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About us',
  description: `Who we are, why our Medicare help is free to you, and the states where ${site.name} is licensed.`,
  path: '/about',
});

export default function AboutPage() {
  const a = about;
  return (
    <>
      <PageIntro
        eyebrow={a.intro.eyebrow}
        title={a.intro.title}
        lead={a.intro.lead}
        aside={<Photo id="about-advisor-meeting" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={bookCall.href}>{bookCall.label}</ButtonLink>
          <ButtonLink href="/about/team" variant="outline" icon={<Icon icon={ArrowRight} />}>
            Meet the team
          </ButtonLink>
        </div>
      </PageIntro>

      <section className="section-y" aria-labelledby="story-heading">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <TextAppear id="story-heading" className="t-h2">
              {a.story.title}
            </TextAppear>
            {a.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Reveal>
            <Photo id="about-cafe-friends" sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[3/2] w-full" />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="mission-heading">
        <div className="container-x flex flex-col gap-10">
          <div className="flex max-w-[60ch] flex-col gap-4">
            <TextAppear id="mission-heading" className="t-h2">
              {a.mission.title}
            </TextAppear>
            <p className="t-lead">{a.mission.text}</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {a.mission.values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={i * 0.1} className="rounded-card bg-white p-6 md:p-8">
                <h3 className="t-h4">{v.title}</h3>
                <p className="mt-2">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="free-heading">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <TextAppear id="free-heading" className="t-h2">
            {a.free.title}
          </TextAppear>
          <ul className="flex flex-col gap-5">
            {a.free.points.map((p) => (
              <li key={p.slice(0, 24)} className="flex gap-3">
                <Icon icon={CheckCircle} weight="fill" size={28} className="shrink-0 text-green-700" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="states-heading">
        <div className="container-x flex flex-col gap-6">
          <h2 id="states-heading" className="t-h2">
            {a.states.title}
          </h2>
          <p className="max-w-[60ch]">{a.states.text}</p>
          <ul className="flex flex-wrap gap-3">
            {site.licensedStates.map((s) => (
              <li key={s.code} className="inline-flex min-h-12 items-center gap-2 rounded-pill bg-white px-5 font-semibold">
                <Icon icon={MapPin} weight="fill" className="text-green-700" />
                {s.name}
              </li>
            ))}
          </ul>
          <Link href="/legal/licensing" className="self-start font-semibold text-green-700 underline underline-offset-4">
            Licensing details
          </Link>
        </div>
      </section>

      {/* Solo agency: a founder bio here instead of a separate team (content plan). */}
      {isSolo && team[0] && (
        <section className="section-y" aria-labelledby="founder-heading">
          <div className="container-x flex max-w-[70ch] flex-col gap-4">
            <p className="t-caps text-green-700">Meet the founder</p>
            <h2 id="founder-heading" className="t-h2">
              {team[0].name}
            </h2>
            <p className="font-medium">{team[0].role}</p>
            <p>{team[0].bio}</p>
            <ButtonLink href={`${bookCall.href}?advisor=${team[0].slug}`} className="self-start">
              Book a call with {team[0].name.split(' ')[0]}
            </ButtonLink>
          </div>
        </section>
      )}

      {a.press.length > 0 && (
        <section className="section-y" aria-labelledby="press-heading">
          <div className="container-x">
            <h2 id="press-heading" className="t-caps text-green-700">
              As seen in
            </h2>
            <ul className="mt-6 flex flex-wrap gap-8">
              {a.press.map((p) => (
                <li key={p.name}>
                  <a href={p.href} className="text-xl font-semibold underline-offset-4 hover:underline">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
