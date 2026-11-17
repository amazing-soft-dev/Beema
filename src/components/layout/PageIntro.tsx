import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Inner-page hero, Framer variant A ("green band", here navy; audit/components/
 * inner-page-templates.md): a dark band under the transparent header with the caps
 * eyebrow pill and its ping dot, the H1 rising on load (0.4s), and the lead and actions
 * fading up 50px. `variant="light"` keeps the cream band for pages that need it.
 * `data-hero="dark"` tells the header to start in its clear state over this band.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  aside,
  variant = 'dark',
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  variant?: 'dark' | 'light';
  /** Trail above the eyebrow, for pages under a section (Services › Medicare › …). */
  breadcrumb?: ReactNode;
}) {
  const dark = variant === 'dark';
  return (
    <section
      className={`under-header ${dark ? 'on-dark bg-ink text-white [&_h1]:text-white' : 'bg-sand'}`}
      data-hero={dark ? 'dark' : undefined}
    >
      <div className={`container-x grid gap-10 pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 ${aside ? 'items-center lg:grid-cols-[1.1fr_1fr] lg:gap-16' : ''}`}>
        <div className="flex max-w-[62ch] flex-col gap-5">
          {breadcrumb}
          <Eyebrow variant="pill" tone={dark ? 'dark' : 'light'} ping className="self-start">
            {eyebrow}
          </Eyebrow>
          <TextAppear as="h1" onMount className="t-h1">
            {title}
          </TextAppear>
          {lead && (
            <Reveal onMount y="md" delay={0.4} className="t-lead">
              {lead}
            </Reveal>
          )}
          {children && (
            <Reveal onMount y="md" delay={0.6}>
              {children}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal onMount y="lg" delay={0.4}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
