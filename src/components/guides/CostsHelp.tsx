import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Icon } from '@/components/ui/Icon';
import { medicare101 } from '@/content/guides/medicare-101';

/** IRMAA, Extra Help, Medicare Savings Programs and dental/vision/hearing. */
export function CostsHelp() {
  const c = medicare101.costs;
  return (
    <section id={c.id} className="section-y scroll-mt-40 bg-sand" aria-labelledby="costs-heading">
      <div className="container-x flex flex-col gap-10">
        <TextAppear id="costs-heading" className="t-h2 max-w-[24ch]">
          {c.title}
        </TextAppear>
        <div className="grid gap-6 md:grid-cols-2">
          {c.items.map((item, i) => (
            <Reveal key={item.id} as="article" id={item.id} delay={(i % 2) * 0.1} className="flex scroll-mt-40 flex-col gap-3 rounded-card bg-white p-6 md:p-8">
              <h3 className="t-h3">{item.title}</h3>
              <p>{item.text}</p>
              {item.link.href.startsWith('http') ? (
                <a href={item.link.href} className="mt-auto inline-flex min-h-12 items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
                  {item.link.label}
                  <Icon icon={ArrowRight} />
                </a>
              ) : (
                <Link href={item.link.href} className="mt-auto inline-flex min-h-12 items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
                  {item.link.label}
                  <Icon icon={ArrowRight} />
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
