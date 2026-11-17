import { ArrowRight, CheckCircle, MinusCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';

/** The two coverage paths, side by side, with plain-word pros and trade-offs. */
export function TwoPaths() {
  const p = home.paths;
  return (
    <section className="section-y" aria-labelledby="paths-heading">
      <div className="container-x flex flex-col gap-10 lg:gap-14">
        <div className="flex max-w-[60ch] flex-col gap-4">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <TextAppear id="paths-heading" className="t-h2">
            {p.title}
          </TextAppear>
          <p className="t-lead">{p.lead}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {p.options.map((o, i) => (
            <Reveal key={o.title} as="article" stagger={i} className={`flex flex-col gap-6 rounded-card p-6 md:p-10 ${i === 0 ? 'bg-surface' : 'bg-sand'}`}>
              <div className="flex flex-col gap-3">
                <p className="t-caps text-navy-700">{o.label}</p>
                <h3 className="t-h3">{o.title}</h3>
                <p>{o.summary}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="t-label font-semibold">Good to know</h4>
                  <ul className="mt-3 flex flex-col gap-3">
                    {o.pros.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="t-label font-semibold">Keep in mind</h4>
                  <ul className="mt-3 flex flex-col gap-3">
                    {o.tradeoffs.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Icon icon={MinusCircle} className="mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ButtonLink href={o.href} variant="outline" className="mt-auto self-start" icon={<Icon icon={ArrowRight} />}>
                {o.cta}
              </ButtonLink>
            </Reveal>
          ))}
        </div>

        <Link href={p.compare.href} className="inline-flex min-h-12 items-center gap-2 self-start text-lg font-semibold text-navy-700 underline underline-offset-4">
          {p.compare.label}
          <Icon icon={ArrowRight} />
        </Link>
      </div>
    </section>
  );
}
