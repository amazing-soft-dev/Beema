import { ChatsCircle, ListChecks, ShieldCheck, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';
import { planMatch } from '@/content/site';

const icons = [Sparkle, ListChecks, ShieldCheck, ChatsCircle];

/**
 * The free AI Plan Match box on the Framer "Smart Technology" section: a dark band with four
 * glass cards (white 16%, 1px white 24% border, 10px blur) in the staggered two-by-two stair
 * layout, fading up in turn. The TPMO disclaimer follows right after it (plan §6).
 */
export function MatchBox() {
  const m = home.matchBox;
  return (
    <>
    <section className="on-dark relative isolate overflow-hidden bg-[linear-gradient(135deg,#0b2545_0%,#154a8a_60%,#0b2545_100%)] py-16 text-white md:py-24 lg:py-36" aria-labelledby="match-heading">
      <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-gold/20 blur-3xl" />
      <div className="container-x flex flex-col gap-12 lg:gap-24">
        <div className="flex max-w-[30rem] flex-col gap-4">
          <Eyebrow variant="pill" tone="dark" ping>
            {m.eyebrow}
          </Eyebrow>
          <TextAppear id="match-heading" className="t-h2 text-white">
            {m.title}
          </TextAppear>
          <Reveal as="p">{m.text}</Reveal>
          <Reveal stagger={0}>
            <ButtonLink href={planMatch.href} size="lg" icon={<Icon icon={Sparkle} weight="fill" />}>
              {planMatch.label}
            </ButtonLink>
          </Reveal>
        </div>
        <div className="flex flex-col gap-2 lg:ms-auto lg:w-[880px]">
          {[m.cards.slice(0, 2), m.cards.slice(2)].map((row, r) => (
            <div key={r} className={`grid gap-2 sm:grid-cols-2 lg:w-[706px] ${r === 1 ? 'lg:ms-auto' : ''}`}>
              {row.map((c, i) => (
                <Reveal key={c} stagger={r * 2 + i} className="flex flex-col gap-3 rounded-card-sm border border-white/25 bg-white/15 p-6 backdrop-blur-[10px] md:p-8">
                  <Icon icon={icons[r * 2 + i] ?? Sparkle} weight="fill" className="text-gold" />
                  <p>{c}</p>
                </Reveal>
              ))}
            </div>
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
