'use client';

import { FilePdf } from '@phosphor-icons/react';
import manifest from '../../../public/pdf/manifest.json';
import { buttonClasses } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { track } from '@/lib/analytics';
import { PrintButton } from './PrintButton';

type Slug = 'turning-65' | 'medicare-101' | 'faq';
const files = manifest.files as Record<Slug, { path: string; title: string; bytes: number }>;
const size = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

/**
 * "Download PDF" and "Print" for a guide page, placed at the top and bottom of the page.
 * The PDF is pre-rendered from this page by `npm run pdf`, so the two always match.
 */
export function GuidePdfActions({ slug, className = '' }: { slug: Slug; className?: string }) {
  const file = files[slug];
  return (
    <div className={`flex flex-wrap items-center gap-3 print:hidden ${className}`.trim()}>
      <a
        href={file.path}
        download={`${slug}.pdf`}
        onClick={() => track('guide_download', { guide: slug, format: 'page-pdf' })}
        className={buttonClasses('secondary', 'md')}
      >
        <Icon icon={FilePdf} weight="fill" />
        <span>
          Download as PDF <span className="font-normal">({size(file.bytes)})</span>
        </span>
      </a>
      <PrintButton guide={slug} />
    </div>
  );
}
