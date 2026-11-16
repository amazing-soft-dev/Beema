'use client';

import { DownloadSimple } from '@phosphor-icons/react';
import { buttonClasses } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { guideHref } from '@/content/guides-library';
import { track } from '@/lib/analytics';

/** Big "Download PDF" button that records which library guides are used most. */
export function DownloadGuideLink({ slug }: { slug: string }) {
  return (
    <a href={guideHref(slug)} download className={buttonClasses('primary', 'lg', 'self-start')} onClick={() => track('guide_download', { guide: slug, format: 'library-pdf' })}>
      <Icon icon={DownloadSimple} weight="bold" />
      <span>Download PDF</span>
    </a>
  );
}
