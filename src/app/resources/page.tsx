import { ArrowRight, BookOpen, Calculator, CalendarCheck, ListMagnifyingGlass, Question, Scales, VideoCamera } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { PageIntro } from '@/components/layout/PageIntro';
import { GuideLibrary } from '@/components/resources/GuideLibrary';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare resources: guides, tools and downloads',
  description: 'Every guide, checklist, calculator and download in one place, plus our newsletter.',
  path: '/resources',
});

type Item = { title: string; text: string; href: string; icon: PhosphorIcon };

const GUIDES: Item[] = [
  { title: 'Turning 65 guide', text: 'Step-by-step paths for retiring at 65 or working past 65.', href: '/turning-65', icon: CalendarCheck },
  { title: 'Medicare 101', text: 'The four parts, Medigap, Medicare Advantage and key dates.', href: '/medicare-101', icon: BookOpen },
  { title: 'Medigap vs Medicare Advantage', text: 'The two paths compared side by side.', href: '/medigap#compare', icon: Scales },
  { title: 'Questions and answers', text: 'Short answers to the questions we hear most.', href: '/faq', icon: Question },
  { title: 'Glossary', text: 'Medicare terms and abbreviations from A to Z.', href: '/resources/glossary', icon: ListMagnifyingGlass },
];

const TOOLS: Item[] = [
  { title: 'Enrollment date calculator', text: 'Your sign-up window and when coverage starts.', href: '/tools/enrollment-calculator', icon: CalendarCheck },
  { title: 'Plan comparison', text: 'Share your ZIP code, medicines and doctors; we compare plans.', href: '/tools/plan-comparison', icon: Scales },
  { title: 'IRMAA calculator', text: 'Whether your income raises your premiums.', href: '/tools/irmaa-calculator', icon: Calculator },
];

function Grid({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.href} as="li" stagger={i % 3}>
          <Link href={it.href} className="group flex h-full flex-col gap-3 rounded-card bg-surface p-6 hover:bg-sand md:p-8">
            <Icon icon={it.icon} weight="fill" size={32} className="text-navy-700" />
            <span className="t-h4">{it.title}</span>
            <span>{it.text}</span>
            <span className="mt-auto inline-flex items-center gap-2 font-semibold text-navy-700 underline-offset-4 group-hover:underline">
              Open <Icon icon={ArrowRight} />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageIntro eyebrow="Resources" title="Everything in one place" lead="Our guides, free tools and downloads, plus a newsletter before each Annual Enrollment." />

      <section className="section-y" aria-labelledby="guides-heading">
        <div className="container-x flex flex-col gap-8">
          <h2 id="guides-heading" className="t-h2">
            Guides
          </h2>
          <Grid items={GUIDES} />
        </div>
      </section>

      <GuideLibrary />

      <section className="section-y bg-surface" aria-labelledby="tools-heading">
        <div className="container-x flex flex-col gap-8">
          <h2 id="tools-heading" className="t-h2">
            Free tools
          </h2>
          <Grid items={TOOLS} />
        </div>
      </section>

      <section className="section-y" aria-labelledby="webinars-heading">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <Icon icon={VideoCamera} weight="fill" size={36} className="text-navy-700" />
            <h2 id="webinars-heading" className="t-h2">
              Videos and webinars
            </h2>
            <p>
              No webinars are scheduled right now. Our free “Turning 65” sessions run before each Annual Enrollment. Join the newsletter to hear about the
              next one, or call {site.phone.display} to ask a question today.
            </p>
          </div>
          <div id="newsletter" className="flex scroll-mt-40 flex-col gap-4 rounded-card bg-sand p-6 md:p-8">
            <h2 className="t-h3">Get our Medicare updates</h2>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
