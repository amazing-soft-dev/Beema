import { Marquee } from '@/components/motion/Marquee';
import { home } from '@/content/home';

/**
 * Framer "Trusted by families at" ticker, here the things we help with (we show no carrier
 * logos: plan §6, no implied affiliation). Scrolls at 30px/s with a Pause button.
 */
export function HelpTicker() {
  return (
    <section className="py-10 md:py-16" aria-labelledby="ticker-label">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 md:flex-row md:items-center md:gap-14 lg:px-10">
        <h2 id="ticker-label" className="t-caps shrink-0 text-navy-700">
          {home.ticker.label}
        </h2>
        <Marquee
          label={home.ticker.label}
          className="min-w-0 flex-1"
          itemClassName="font-display text-2xl font-semibold whitespace-nowrap md:text-3xl"
          items={home.ticker.items.map((t) => (
            <span key={t} className="inline-flex items-center gap-8 md:gap-14">
              {t}
              <span aria-hidden="true" className="size-2 rounded-pill bg-gold" />
            </span>
          ))}
        />
      </div>
    </section>
  );
}
