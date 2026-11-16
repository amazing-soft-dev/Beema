import type { ReactNode } from 'react';
import { TextAppear } from '@/components/motion/TextAppear';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Inner-page header: sand band with eyebrow, H1 and lead (the Beema "green band" hero,
 * made light so body-size text keeps maximum contrast). Optional actions or aside.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="bg-sand">
      <div className={`container-x grid gap-10 py-12 md:py-16 lg:py-20 ${aside ? 'items-center lg:grid-cols-[1.1fr_1fr] lg:gap-16' : ''}`}>
        <div className="flex max-w-[62ch] flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <TextAppear as="h1" onMount className="t-h1">
            {title}
          </TextAppear>
          {lead && <div className="t-lead">{lead}</div>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
