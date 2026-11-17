import { ShieldWarning } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '@/components/ui/Icon';
import { type DisclosureKind, disclosures } from '@/content/disclosures';

/**
 * Non-Medicare product notice (plan §6). A labelled, high-contrast box; `compact` drops
 * the heading for the repeat at the bottom of a page. Text comes verbatim from
 * src/content/disclosures.ts.
 */
export function ProductDisclosure({ kind = 'general', compact = false, className = '' }: { kind?: DisclosureKind; compact?: boolean; className?: string }) {
  const d = disclosures[kind];
  return (
    <aside aria-label={d.title} className={`flex gap-4 rounded-card-sm border-2 border-ink bg-white p-5 text-ink ${className}`.trim()}>
      <Icon icon={ShieldWarning} weight="fill" size={28} className="mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">
        {!compact && <p className="font-semibold">{d.title}</p>}
        <p className="text-base">{d.text}</p>
      </div>
    </aside>
  );
}
