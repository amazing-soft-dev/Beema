import { notices } from '@/content/site';

/**
 * Required CMS disclaimer. Text comes verbatim from site.ts (with the organization and
 * product counts). `note` is the bordered block used beside tools and on Book a Call;
 * `plain` is the paragraph used in the footer and PDFs.
 */
export function CmsDisclaimer({ variant = 'note', className = '' }: { variant?: 'note' | 'plain'; className?: string }) {
  if (variant === 'plain') {
    return <p className={`text-base ${className}`.trim()}>{notices.cmsDisclaimer}</p>;
  }
  return (
    <aside aria-label="Important notice" className={`rounded-card-sm border-l-4 border-green-700 bg-surface p-5 text-base text-ink ${className}`.trim()}>
      <p>{notices.cmsDisclaimer}</p>
    </aside>
  );
}
