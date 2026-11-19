import { CalendarCheck } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { bookCall, site } from '@/content/site';
import type { Advisor } from '@/content/team';
import { PHOTO_QUALITY } from '@/lib/image-widths';
import type { Photo } from '@/lib/photos';

const stateName = (code: string) => site.licensedStates.find((s) => s.code === code)?.name ?? code;

/**
 * Advisor card: photo, name, role, licensed states, years of experience, bio and a
 * "Book a call with [name]" button that pre-selects the advisor on the booking page.
 * The caller resolves `image` with photo('<id>') so each portrait is referenced once.
 */
export function AdvisorCard({ advisor, image }: { advisor: Advisor; image: Photo }) {
  const firstName = advisor.name.split(' ')[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-card bg-surface">
      <div className="relative aspect-[4/5] w-full">
        <Image src={image.src} alt={`${advisor.name}, ${advisor.role}`} fill quality={PHOTO_QUALITY} sizes="(min-width: 1200px) 400px, (min-width: 810px) 50vw, 100vw" className="object-cover" style={{ objectPosition: image.position }} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h2 className="t-h3">{advisor.name}</h2>
          <p className="font-medium text-navy-700">{advisor.role}</p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-base">
          <dt className="font-semibold">Licensed in</dt>
          <dd>{advisor.states.map(stateName).join(', ')}</dd>
          <dt className="font-semibold">Experience</dt>
          <dd>{advisor.yearsExperience} years</dd>
          {advisor.languages && (
            <>
              <dt className="font-semibold">Speaks</dt>
              <dd>{advisor.languages.join(', ')}</dd>
            </>
          )}
        </dl>
        <p>{advisor.bio}</p>
        <ButtonLink href={`${bookCall.href}?advisor=${advisor.slug}`} className="mt-auto self-start" icon={<Icon icon={CalendarCheck} />}>
          Book a call with {firstName}
        </ButtonLink>
      </div>
    </article>
  );
}
