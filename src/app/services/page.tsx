import { Info } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { NextSteps } from '@/components/content/NextSteps';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { availableMenu } from '@/content/site';
import { existingRoutes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services: AI Plan Match, Medicare and beyond',
  description:
    'Everything we help with: the free AI Plan Match, Medicare for people turning 65 (Medigap, Medicare Advantage, Part D and a yearly review), and coverage Medicare leaves out.',
  path: '/services',
});

const eyebrows: Record<string, string> = { 'AI Plan Match': 'Our free tool', Medicare: 'Medicare', 'Beyond Medicare': 'Extra protection' };

const intros: Record<string, string> = {
  'AI Plan Match': 'Our own software. It suggests the type of coverage that fits you and explains why. Using it is free and never requires buying anything.',
  Medicare: 'Plain-English guides and free, licensed help choosing and enrolling. Insurance companies pay us, so our help costs you nothing.',
  'Beyond Medicare': 'Separate policies for what Medicare leaves out, such as dental, final costs and hospital bills. Many people do not need them, and we will say so.',
};

/** Services landing page: the three labelled groups from the menu (plan §3). */
export default function ServicesPage() {
  const services = availableMenu(existingRoutes()).find((i) => i.label === 'Services');
  const groups = services?.groups ?? [];
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="Medicare help, and the coverage around it"
        lead="Start with the free plan match, read the guide for your situation, or talk with a licensed agent. Each group below is kept separate, so our tool and the extra policies never look like Medicare plans."
        aside={<Photo id="services-advisor-couple" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
        breadcrumb={<Breadcrumb trail={[{ label: 'Services', href: '/services' }]} />}
      />

      {groups.map((group, g) => (
        <section key={group.heading} className={`section-y ${g % 2 ? 'bg-surface' : ''}`} aria-labelledby={`group-${g}`}>
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <Eyebrow>{eyebrows[group.heading] ?? group.heading}</Eyebrow>
              <TextAppear id={`group-${g}`} className="t-h2">
                {group.heading}
              </TextAppear>
              <Reveal as="p" className="t-lead">
                {intros[group.heading]}
              </Reveal>
              {group.note && (
                <Reveal as="p" stagger={0} className="inline-flex items-start gap-3 rounded-card-sm bg-sand p-4 font-medium">
                  <Icon icon={Info} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
                  {group.note}
                </Reveal>
              )}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.links.map((link, i) => (
                <Reveal key={link.href} as="li" stagger={i % 2}>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 transition-colors duration-300 hover:border-navy-700 focus-visible:border-navy-700 md:p-8"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="t-h4">{link.label}</span>
                      <ArrowSwap dir="up-right" className="mt-1 text-navy-700" />
                    </span>
                    {link.description && <span>{link.description}.</span>}
                    {link.later && <span className="self-start rounded-pill bg-sand px-3 py-1 text-base font-medium">Coming later</span>}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <NextSteps title="Not sure where to start?" text="The free plan match takes a few minutes and suggests the coverage type that fits you, or a licensed agent can walk you through it on a call." />
    </>
  );
}
