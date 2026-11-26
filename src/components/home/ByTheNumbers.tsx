import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Photo } from '@/components/ui/Photo';
import { home } from '@/content/home';

/**
 * "By The Numbers": the block fades up, then each figure counts up in about 0.8s once
 * in view. The figures are Medicare's own rules, not sales claims. The dates sit on a calendar
 * photo, softly blurred so its own digits read as texture rather than competing figures,
 * behind an ink overlay (86–92%), so the white figures keep well over 4.5:1 on any part of
 * the photo; it is a dark section, so it looks the same in both themes.
 */
export function ByTheNumbers() {
  const n = home.numbers;
  return (
    <section className="on-dark section-y relative isolate overflow-hidden bg-ink text-white" aria-labelledby="numbers-heading">
      <Photo id="numbers-calendar" rounded={false} sizes="100vw" className="!absolute inset-0 -z-20 [&_img]:scale-105 [&_img]:blur-sm" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_37_69/0.92)_0%,rgb(11_37_69/0.86)_100%)]" />
      <div className="container-x flex flex-col gap-12">
        <div className="flex max-w-[40rem] flex-col gap-4">
          <Eyebrow variant="pill" tone="dark" className="self-start">
            {n.eyebrow}
          </Eyebrow>
          <TextAppear id="numbers-heading" className="t-h3 text-white">
            {n.title}
          </TextAppear>
        </div>
        <Reveal as="ul" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/25">
          {n.stats.map((s) => (
            <li key={s.label} className="flex flex-col items-center gap-2 px-4 text-center">
              <Counter value={s.value} suffix={s.suffix} className="font-display text-[2.25rem] leading-none font-semibold text-gold md:text-[2.75rem] lg:text-[3.25rem]" />
              <p className="font-semibold">{s.label}</p>
              <p className="text-base">{s.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
