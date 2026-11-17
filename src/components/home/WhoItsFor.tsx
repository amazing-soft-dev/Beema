import { Heart, UserCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { LineWipe } from '@/components/motion/LineWipe';
import { Reveal } from '@/components/motion/Reveal';
import { ZoomOutCard } from '@/components/motion/ZoomOutCard';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { home } from '@/content/home';

/**
 * Framer "About Us" section, used for who the site is for (plan §4 Home: seniors and the
 * adult children who help them): the lead wipes to full ink line by line, then the photo card
 * zooms out (scale 1.8 from 260px lower on desktop) when half of it is in view, with the two
 * audiences on top. The section clips the card's start pose.
 */
export function WhoItsFor() {
  const w = home.whoFor;
  return (
    <section className="section-y overflow-x-clip" aria-labelledby="who-heading">
      <div className="container-x flex flex-col gap-12 lg:gap-16">
        <div className="flex max-w-[56rem] flex-col gap-4">
          <Eyebrow variant="pill">{w.eyebrow}</Eyebrow>
          <h2 id="who-heading" className="sr-only">
            {w.eyebrow}
          </h2>
          <LineWipe className="font-display text-[1.75rem] leading-[1.4] font-semibold md:text-[2rem] lg:text-[2.25rem]" barClassName="bg-white">
            {w.lead}
          </LineWipe>
        </div>

        <ZoomOutCard>
          <div className="relative overflow-hidden rounded-card">
            <Photo id="cta-bench-sea" rounded={false} sizes="(min-width: 1200px) 1200px, 100vw" className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[1196/650]" />
            <div className="absolute inset-x-0 bottom-0 grid gap-4 p-4 sm:grid-cols-2 md:p-6">
              {w.audiences.map((a, i) => (
                <Reveal key={a.title} stagger={i} className="flex flex-col gap-2 rounded-card-sm bg-white/95 p-5 text-ink md:p-6">
                  <Icon icon={i === 0 ? UserCircle : Heart} weight="fill" size={32} className="text-navy-700" />
                  <h3 className="t-h4">{a.title}</h3>
                  <p>{a.text}</p>
                  <Link href={a.link.href} className="mt-1 inline-flex min-h-12 items-center gap-2 self-start font-semibold text-navy-700 underline underline-offset-4">
                    {a.link.label}
                    <ArrowSwap />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </ZoomOutCard>
      </div>
    </section>
  );
}
