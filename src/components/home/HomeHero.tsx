import { CalendarCheck, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { home } from '@/content/home';
import { bookCall, planMatch, site } from '@/content/site';

/**
 * Home hero: a full-bleed
 * photo under the clear header with the home overlay gradient, the H1 rising 0.4s after load,
 * the lead and calls to action fading up 50px with it, and the brand wordmark rising 75px
 * along the bottom edge. The overlay keeps white text above 4.5:1.
 */
export function HomeHero() {
  const h = home.hero;
  return (
    <section data-hero="dark" className="on-dark relative isolate -mt-(--header-space) flex min-h-[max(640px,calc(100svh_-_48px))] flex-col justify-end overflow-hidden pt-(--header-space) text-white max-md:min-h-[max(560px,calc(100svh_-_48px_-_72px_-_env(safe-area-inset-bottom)))] print:mt-0 print:pt-0" aria-labelledby="home-title">
      <Photo id="home-hero-couple" priority rounded={false} sizes="100vw" className="!absolute inset-0 -z-20" />
      {/* Home-hero overlay, darkened a little so 18px text stays readable on any crop. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.6)_0%,rgba(0,0,0,.42)_50%,rgba(0,0,0,.62)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pt-10 pb-4 lg:px-10 [@media(min-width:1200px)_and_(max-height:860px)]:gap-y-6 [@media(min-width:1200px)_and_(max-height:860px)]:pt-2">
        <div className="flex max-w-[44rem] flex-col gap-6 [@media(min-width:1200px)_and_(max-height:860px)]:gap-y-4">
          <Reveal onMount y="md" delay={0.4}>
            <Eyebrow variant="pill" tone="dark" ping className="bg-white/15 backdrop-blur-md">
              {h.eyebrow}
            </Eyebrow>
          </Reveal>
          <TextAppear as="h1" id="home-title" onMount className="t-h1 text-white">
            {h.title}
          </TextAppear>
          <Reveal onMount y="md" delay={0.4} className="t-lead max-w-[40rem]">
            {h.lead}
          </Reveal>
          <Reveal onMount y="md" delay={0.4} className="flex flex-wrap gap-4">
            <ButtonLink href={planMatch.href} size="lg" icon={<Icon icon={Sparkle} weight="fill" />}>
              {planMatch.label}
            </ButtonLink>
            <ButtonLink href={bookCall.href} size="lg" variant="light" icon={<Icon icon={CalendarCheck} />}>
              {h.secondaryCta}
            </ButtonLink>
          </Reveal>
          <Reveal onMount y="md" delay={0.6} className="text-base">
            {h.callPrompt}{' '}
            <a href={`tel:${site.phone.tel}`} className="font-semibold underline underline-offset-4">
              {site.phone.display}
            </a>{' '}
            ({site.tty.display})
          </Reveal>
        </div>

        {/*
          The wordmark: the brand name across the full width, sitting on the bottom edge.
          The viewBox hugs the glyphs (Switzer 600 at 128 units rises 93 above the baseline and
          the name has no descenders), so the whole word stays inside the hero at every width;
          the wrapper only clips the 75px rise while it plays.
        */}
        <div aria-hidden="true" className="overflow-hidden select-none print:hidden [@media(min-width:1200px)_and_(max-height:860px)]:[&_svg]:max-h-[max(80px,calc(100svh_-_630px))]">
          <Reveal onMount y="lg" delay={0.4}>
            <svg viewBox="0 0 1000 104" className="block w-full" focusable="false">
              <text
                x="500"
                y="99"
                textAnchor="middle"
                textLength="996"
                lengthAdjust="spacingAndGlyphs"
                fill="currentColor"
                fontSize="128"
                fontWeight="600"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {site.name}
              </text>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
