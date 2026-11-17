import { statSync } from 'node:fs';
import { join } from 'node:path';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { guideHref, guidesLibrary } from '@/content/guides-library';
import { DownloadGuideLink } from './DownloadGuideLink';
import { EmailCopyForm } from './EmailCopyForm';

const fileSize = (slug: string) => {
  try {
    const bytes = statSync(join(process.cwd(), 'public', guideHref(slug))).size;
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null;
  }
};
const fmt = (iso: string) => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Free PDF guides: cover, one-line description, file size (read at build time), a big
 * Download button, a print link and an optional "Email me a copy". No sign-up needed.
 */
export function GuideLibrary() {
  return (
    <section id="downloads" className="section-y scroll-mt-40 bg-sand" aria-labelledby="downloads-heading">
      <div className="container-x flex flex-col gap-8">
        <div className="flex max-w-[62ch] flex-col gap-3">
          <h2 id="downloads-heading" className="t-h2">
            Free large-print guides
          </h2>
          <p className="t-lead">Download, print or email any guide. No sign-up needed.</p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guidesLibrary.map((g) => {
            const size = fileSize(g.slug);
            return (
              <li key={g.slug} className="flex flex-col gap-4 rounded-card bg-white p-6">
                <div className="relative aspect-[360/466] w-full overflow-hidden rounded-card-sm border border-line bg-surface">
                  <Image src={`/guides/${g.slug}-cover.webp`} alt={`Cover of the ${g.title} guide`} fill sizes="(min-width: 1200px) 360px, (min-width: 810px) 50vw, 100vw" className="object-cover object-top" unoptimized />
                </div>
                <h3 className="t-h4">{g.title}</h3>
                {g.addOn && <p className="t-caps self-start rounded-pill border-2 border-ink px-3 py-1 text-ink">Not Medicare: add-on products</p>}
                <p>{g.description}</p>
                <p className="text-base">
                  PDF{size ? `, ${size}` : ''}, {g.pages} {g.pages === 1 ? 'page' : 'pages'}. {g.planYear} plan year, updated {fmt(g.updated)}.
                </p>
                <DownloadGuideLink slug={g.slug} />
                <a href={guideHref(g.slug)} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 self-start font-semibold text-navy-700 underline underline-offset-4">
                  <Icon icon={ArrowSquareOut} /> Open to print
                  <span className="sr-only"> {g.title} (opens in a new tab)</span>
                </a>
                <EmailCopyForm slug={g.slug} title={g.title} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
