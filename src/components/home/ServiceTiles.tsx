import { CalendarCheck, Lifebuoy, Pill, ShieldCheck, Sparkle, Stethoscope } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { FanCarousel } from '@/components/motion/FanCarousel';
import { TextAppear } from '@/components/motion/TextAppear';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { home } from '@/content/home';

const icons: Record<string, PhosphorIcon> = { sparkle: Sparkle, calendar: CalendarCheck, shield: ShieldCheck, stethoscope: Stethoscope, pill: Pill, lifebuoy: Lifebuoy };

/** Card widths in FanCarousel: 555px fanned (810px and up), 342px flat. */
const photoSizes = '(min-width: 810px) 555px, 342px';
const photoClass = '!absolute inset-0';

/** One photo per card, keyed by the tile's link. Literal ids so `npm run check:images` can count each use. */
const cardPhotos: Record<string, ReactNode> = {
  '/plan-match': <Photo id="service-plan-match" sizes={photoSizes} rounded={false} className={photoClass} />,
  '/turning-65': <Photo id="service-turning-65" sizes={photoSizes} rounded={false} className={photoClass} />,
  '/medigap': <Photo id="service-medigap" sizes={photoSizes} rounded={false} className={photoClass} />,
  '/medicare-advantage': <Photo id="service-medicare-advantage" sizes={photoSizes} rounded={false} className={photoClass} />,
  '/part-d': <Photo id="service-part-d" sizes={photoSizes} rounded={false} className={photoClass} />,
  '/beyond-medicare': <Photo id="service-beyond-medicare" sizes={photoSizes} rounded={false} className={photoClass} />,
};

/**
 * Service tiles in the Framer Services fan carousel (dark section). Each card has a photo on
 * its top part and its text on solid navy below. Each card names its group (AI Plan Match,
 * Medicare or Beyond Medicare) so the tool and the add-ons never read as Medicare plans.
 */
export function ServiceTiles() {
  const s = home.services;
  return (
    <section className="on-dark section-y overflow-x-clip bg-ink text-white" aria-labelledby="services-heading">
      <div className="container-x flex flex-col gap-12">
        <div className="flex max-w-[34rem] flex-col gap-4">
          <Eyebrow variant="pill" tone="dark">
            {s.eyebrow}
          </Eyebrow>
          <TextAppear id="services-heading" className="t-h2 text-white">
            {s.title}
          </TextAppear>
          <Reveal as="p">{s.lead}</Reveal>
        </div>
        <FanCarousel
          label={s.title}
          start={1}
          items={s.tiles.map((t) => ({
            key: t.href,
            node: (
              <Link href={t.href} className="flex h-full flex-col overflow-hidden rounded-card bg-[linear-gradient(160deg,#154a8a_0%,#0b2545_70%)] text-white ring-1 ring-white/15">
                <div className="relative isolate h-[42%] shrink-0 md:h-[55%]">
                  {cardPhotos[t.href]}
                  {/* Fades the photo into the card's navy so the seam disappears. */}
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_70_130/0)_55%,#144682_100%)]" />
                  <span className="t-caps absolute top-4 left-4 rounded-pill border border-white/40 bg-ink/75 px-3 py-1 backdrop-blur-sm md:top-6 md:left-6">{t.group}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-6 md:px-8 md:pb-8">
                  {/* Gold icon badge riding on the seam between the photo and the text. */}
                  <span className="relative -mt-7 inline-flex size-14 items-center justify-center rounded-pill bg-gold text-on-gold ring-4 ring-[#144682]">
                    <Icon icon={icons[t.icon] ?? ShieldCheck} weight="fill" size={28} />
                  </span>
                  <span className="t-h3 text-white">{t.title}</span>
                  <span>{t.text}</span>
                  <span className="mt-auto inline-flex items-center gap-2 font-semibold text-gold">
                    Learn more
                    <ArrowSwap dir="up-right" />
                  </span>
                </div>
              </Link>
            ),
          }))}
        />
      </div>
    </section>
  );
}
