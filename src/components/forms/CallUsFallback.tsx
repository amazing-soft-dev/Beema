import { Phone } from '@phosphor-icons/react/dist/ssr';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';

/** Shown instead of a form in the static export (no server to send it to). */
export function CallUsFallback({ title = 'Call us instead' }: { title?: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-card bg-surface p-6 md:p-8">
      <h2 className="t-h3">{title}</h2>
      <p>This version of the site cannot send forms. A licensed advisor will answer your questions by phone.</p>
      <ButtonLink href={`tel:${site.phone.tel}`} size="lg" className="self-start" icon={<Icon icon={Phone} weight="fill" />}>
        {site.phone.display}
      </ButtonLink>
      <p className="text-base">
        {site.tty.display}. {site.hours[0]?.days}, {site.hours[0]?.time}.
      </p>
    </div>
  );
}
