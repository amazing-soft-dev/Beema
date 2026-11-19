import { ChatsCircle, ListChecks, ShieldCheck, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';
import { planMatch } from '@/content/site';
import { MatchPreview } from './MatchPreview';

const icons = [Sparkle, ListChecks, ShieldCheck, ChatsCircle];

/**
 * The free AI Plan Match band on the Framer "Smart Technology" section. It keeps the brand
 * gradient (a photo would compete with the call to action) and shows the product instead:
 * the copy and button beside an example result (MatchPreview) from 1200px, then the four
 * glass cards (white 16%, 1px white 24% border, 10px blur) in one row, fading up in turn.
 * The TPMO disclaimer follows right after it (plan §6).
 */
export function MatchBox() {
  const m = home.matchBox;
  return (
    <>
    <section className="on-dark relative isolate overflow-hidden bg-[linear-gradient(135deg,#0b2545_0%,#154a8a_60%,#0b2545_100%)] py-16 text-white md:py-24 lg:py-28" aria-labelledby="match-heading">
      <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x flex flex-col gap-12 lg:gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="flex max-w-[34rem] flex-col gap-4">
            <Eyebrow variant="pill" tone="dark" ping className="self-start">
              {m.eyebrow}
            </Eyebrow>
            <TextAppear id="match-heading" className="t-h2 text-white">
              {m.title}
            </TextAppear>
            <Reveal as="p" className="t-lead">
              {m.text}
            </Reveal>
            <Reveal stagger={0}>
              <ButtonLink href={planMatch.href} size="lg" icon={<Icon icon={Sparkle} weight="fill" />}>
                {planMatch.label}
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal stagger={1}>
            <MatchPreview />
          </Reveal>
        </div>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {m.cards.map((c, i) => (
            <Reveal key={c} stagger={i} className="flex flex-col gap-3 rounded-card-sm border border-white/25 bg-white/15 p-6 backdrop-blur-[10px]">
              <Icon icon={icons[i] ?? Sparkle} weight="fill" className="text-gold" />
              <p>{c}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    {/* Right after the box, outside the dark band so it keeps its own colors in both themes. */}
    <div className="container-x pt-6">
      <CmsDisclaimer />
    </div>
    </>
  );
}
