import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { home } from '@/content/home';

/**
 * Framer "By The Numbers": the block fades up, then each figure counts up in about 0.8s once
 * in view. The figures are Medicare's own rules, not sales claims.
 */
export function ByTheNumbers() {
  const n = home.numbers;
  return (
    <section className="section-y bg-surface" aria-labelledby="numbers-heading">
      <div className="container-x flex flex-col gap-12">
        <div className="flex max-w-[40rem] flex-col gap-4">
          <Eyebrow variant="pill">{n.eyebrow}</Eyebrow>
          <TextAppear id="numbers-heading" className="t-h3">
            {n.title}
          </TextAppear>
        </div>
        <Reveal as="ul" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {n.stats.map((s) => (
            <li key={s.label} className="flex flex-col items-center gap-2 px-4 text-center">
              <Counter value={s.value} suffix={s.suffix} className="font-display text-[2.25rem] leading-none font-semibold text-ink md:text-[2.75rem] lg:text-[3.25rem]" />
              <p className="font-semibold">{s.label}</p>
              <p className="text-base">{s.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
