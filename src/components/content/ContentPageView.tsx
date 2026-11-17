import { FilePdf } from '@phosphor-icons/react/dist/ssr';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { DownloadGuideLink } from '@/components/resources/DownloadGuideLink';
import { Icon } from '@/components/ui/Icon';
import { findGuide } from '@/content/guides-library';
import type { ContentPage } from '@/content/pages/types';
import { Breadcrumb } from './Breadcrumb';
import { ContentSections, JumpLinks } from './ContentSections';
import { NextSteps } from './NextSteps';

/** A whole content page from its data: hero, sections, related PDF and next steps. */
export function ContentPageView({ page }: { page: ContentPage }) {
  const guide = page.pdf ? findGuide(page.pdf) : undefined;
  return (
    <>
      <PageIntro eyebrow={page.intro.eyebrow} title={page.intro.title} lead={page.intro.lead} breadcrumb={<Breadcrumb trail={page.crumbs} />}>
        {page.jump && <JumpLinks sections={page.sections} />}
      </PageIntro>

      <ContentSections sections={page.sections} />

      {guide && (
        <section className="section-y bg-sand" aria-labelledby="related-pdf">
          <Reveal className="container-x flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-[56ch] gap-4">
              <Icon icon={FilePdf} weight="fill" size={40} className="shrink-0 text-navy-700" />
              <div>
                <h2 id="related-pdf" className="t-h4">
                  {guide.title} (free PDF)
                </h2>
                <p>
                  {guide.description} Large print, {guide.pages} {guide.pages === 1 ? 'page' : 'pages'}, {guide.planYear} plan year. No sign-up needed.
                </p>
              </div>
            </div>
            <DownloadGuideLink slug={guide.slug} />
          </Reveal>
        </section>
      )}

      <NextSteps title={page.next.title} text={page.next.text} primary={page.next.primary} secondary={page.next.secondary} />
    </>
  );
}
