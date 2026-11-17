import { CalendarCheck, Lifebuoy, Pill, ShieldCheck, Sparkle, Stethoscope } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { FanCarousel } from '@/components/motion/FanCarousel';
import { TextAppear } from '@/components/motion/TextAppear';
import { Reveal } from '@/components/motion/Reveal';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';

const icons: Record<string, PhosphorIcon> = { sparkle: Sparkle, calendar: CalendarCheck, shield: ShieldCheck, stethoscope: Stethoscope, pill: Pill, lifebuoy: Lifebuoy };

/**
 * Service tiles in the Framer Services fan carousel (dark section). Each card names its group
 * (AI Plan Match, Medicare or Beyond Medicare) so the tool and the add-ons never read as
 * Medicare plans.
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
              <Link
                href={t.href}
                className="flex h-full flex-col justify-end gap-4 overflow-hidden rounded-card bg-[linear-gradient(160deg,#154a8a_0%,#0b2545_70%)] p-6 text-white ring-1 ring-white/15 md:p-8"
              >
                <span className="t-caps self-start rounded-pill border border-white/40 bg-black/20 px-3 py-1">{t.group}</span>
                <Icon icon={icons[t.icon] ?? ShieldCheck} weight="fill" size={56} className="mb-auto mt-4 text-gold" />
                <span className="t-h3 text-white">{t.title}</span>
                <span>{t.text}</span>
                <span className="inline-flex items-center gap-2 font-semibold text-gold">
                  Learn more
                  <ArrowSwap dir="up-right" />
                </span>
              </Link>
            ),
          }))}
        />
      </div>
    </section>
  );
}
