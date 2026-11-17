import { BookOpen, Calculator, CalendarCheck, Lifebuoy, ListMagnifyingGlass, Newspaper, Question, Scales, Sparkle, VideoCamera } from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { PageIntro } from '@/components/layout/PageIntro';
import { GuideLibrary } from '@/components/resources/GuideLibrary';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { planMatch, site } from '@/content/site';
import { freeAlternatives } from '@/lib/match/engine';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare resources: guides, tools and downloads',
  description: 'Free large-print PDF guides, the enrollment date calculator, the blog, FAQ and glossary, and free Medicare help from Medicare.gov and SHIP.',
  path: '/resources',
});

type Item = { title: string; text: string; href: string; icon: PhosphorIcon };

const GUIDES: Item[] = [
  { title: 'Turning 65 guide', text: 'Step-by-step paths for retiring at 65 or working past 65.', href: '/turning-65', icon: CalendarCheck },
  { title: 'Medicare 101', text: 'The four parts, Medigap, Medicare Advantage and key dates.', href: '/medicare-101', icon: BookOpen },
  { title: 'Medigap vs Medicare Advantage', text: 'The two paths compared side by side.', href: '/medigap#compare', icon: Scales },
  { title: 'What Medicare doesn’t cover', text: 'Dental, vision, hearing, final costs and more, and who needs extra coverage.', href: '/beyond-medicare', icon: Lifebuoy },
  { title: 'Blog', text: 'Articles for you and your family, including helping a parent.', href: '/blog', icon: Newspaper },
  { title: 'Questions and answers', text: 'Short answers to the questions we hear most.', href: '/faq', icon: Question },
  { title: 'Glossary', text: 'Medicare terms and abbreviations from A to Z.', href: '/resources/glossary', icon: ListMagnifyingGlass },
];

const TOOLS: Item[] = [
  { title: 'Free AI Plan Match', text: 'Which coverage type fits you, and why. No purchase required.', href: '/plan-match', icon: Sparkle },
  { title: 'Enrollment date calculator', text: 'Your sign-up window and when coverage starts.', href: '/tools/enrollment-calculator', icon: CalendarCheck },
  { title: 'Plan comparison', text: 'Share your ZIP code, medicines and doctors; we compare plans.', href: '/tools/plan-comparison', icon: Scales },
  { title: 'IRMAA calculator', text: 'Whether your income raises your premiums.', href: '/tools/irmaa-calculator', icon: Calculator },
];

function Grid({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.href} as="li" stagger={i % 3}>
          <Link href={it.href} className="group flex h-full flex-col gap-3 rounded-card bg-surface p-6 transition-colors duration-300 hover:bg-sand focus-visible:bg-sand md:p-8">
            <Icon icon={it.icon} weight="fill" size={32} className="text-navy-700" />
            <span className="t-h4">{it.title}</span>
            <span>{it.text}</span>
            <span className="mt-auto inline-flex items-center gap-2 font-semibold text-navy-700">
              Open <ArrowSwap />
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
      <PageIntro
        eyebrow="Resources Hub"
        title="Everything in one place"
        lead="Free large-print PDFs you can download without signing up, our guides and tools, and free help from Medicare itself."
        breadcrumb={<Breadcrumb trail={[{ label: 'Resources', href: '/resources' }]} />}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#downloads" size="lg">
            Download a free PDF
          </ButtonLink>
          <ButtonLink href={planMatch.href} size="lg" variant="light" icon={<Icon icon={Sparkle} weight="fill" />}>
            Try the free plan match
          </ButtonLink>
        </div>
      </PageIntro>

      <section className="section-y" aria-labelledby="guides-heading">
        <div className="container-x flex flex-col gap-8">
          <TextAppear id="guides-heading" className="t-h2">
            Guides
          </TextAppear>
          <Grid items={GUIDES} />
        </div>
      </section>

      <GuideLibrary />

      <section className="section-y bg-surface" aria-labelledby="tools-heading">
        <div className="container-x flex flex-col gap-8">
          <TextAppear id="tools-heading" className="t-h2">
            Free tools
          </TextAppear>
          <Grid items={TOOLS} />
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="free-help-heading">
        <div className="container-x flex flex-col gap-8">
          <div className="flex max-w-[62ch] flex-col gap-3">
            <TextAppear id="free-help-heading" className="t-h2">
              Free help from Medicare and your state
            </TextAppear>
            <p>We do not offer every plan in your area. These free, unbiased services can help you compare every option.</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {freeAlternatives.map((a, i) => (
              <Reveal key={a.href} as="li" stagger={i} className="flex flex-col gap-2 rounded-card bg-white p-6">
                <a href={a.href} className="inline-flex items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
                  {a.label}
                  <ArrowSwap dir="up-right" size={20} />
                </a>
                <p>{a.detail}</p>
              </Reveal>
            ))}
          </ul>
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
