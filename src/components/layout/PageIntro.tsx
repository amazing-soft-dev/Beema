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
/**
 * Background for a text-only hero: a soft gold glow at the top right, a cooler one at the
 * bottom, and a faint dot grid that fades in from the middle, so the right half reads as
 * designed space rather than a gap. Decorative and quiet enough for legal and tool pages;
 * the dots use the text color, so they follow the band and the theme.
 */
function HeroDecor({ dark }: { dark: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 print:hidden">
      <div
        className={`absolute inset-0 ${
          dark
            ? 'bg-[radial-gradient(circle_at_88%_12%,rgb(245_196_81/0.2),transparent_42%),radial-gradient(circle_at_70%_115%,rgb(69_201_207/0.16),transparent_45%)]'
            : 'bg-[radial-gradient(circle_at_88%_12%,rgb(245_196_81/0.3),transparent_42%),radial-gradient(circle_at_70%_115%,rgb(21_74_138/0.1),transparent_45%)]'
        }`}
      />
      <div
        className={`absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1.6px)] [background-size:24px_24px] [mask-image:linear-gradient(90deg,transparent_40%,black_85%)] ${dark ? 'text-white/[0.14]' : 'text-ink/10'}`}
      />
    </div>
  );
}

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
      className={`under-header relative isolate overflow-hidden ${dark ? 'on-dark bg-ink text-white [&_h1]:text-white' : 'bg-sand'}`}
      data-hero={dark ? 'dark' : undefined}
    >
      {!aside && <HeroDecor dark={dark} />}
      {/* Without a photo the band is text only, so it stays compact instead of leaving an empty half. */}
      <div className={`container-x grid gap-10 ${aside ? 'items-center pt-10 pb-16 md:pt-16 md:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-32' : 'pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20'}`}>
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
