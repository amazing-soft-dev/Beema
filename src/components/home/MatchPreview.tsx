import { CheckCircle, MinusCircle, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '@/components/ui/Icon';
import { home } from '@/content/home';
import { match } from '@/lib/match/engine';

/**
 * A sample of what the free AI Plan Match gives back, for the home plan match band: the
 * coverage type (never a company), three reasons it fits and the main trade-offs, styled
 * like the real result card. It is worked out by the real engine from the example answers
 * in home.ts, so it can never drift from the tool, and it is labelled as an example twice
 * (badge and caption). A light card, so it keeps ink text inside the dark band in both themes.
 */
export function MatchPreview({ className = '' }: { className?: string }) {
  const e = home.matchBox.example;
  const m = match(e.answers, e.today);
  return (
    <figure className={`flex flex-col gap-5 rounded-card bg-white p-6 text-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.6)] md:p-8 ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="t-caps text-navy-700">Your free plan match</p>
        <span className="rounded-pill border border-line bg-surface px-3 py-1 text-base font-semibold">{e.label}</span>
      </div>
      <p className="t-h3">{m.title}</p>
      <div>
        <p className="font-semibold">Why it fits</p>
        <ol className="mt-3 flex flex-col gap-3">
          {m.reasons.map((r) => (
            <li key={r} className="flex gap-3">
              <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
              {r}
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-card-sm bg-sand p-4">
        <p className="font-semibold">Trade-offs to know</p>
        <ul className="mt-2 flex flex-col gap-2 text-base">
          {m.tradeoffs.slice(0, 2).map((t) => (
            <li key={t} className="flex gap-3">
              <Icon icon={MinusCircle} className="mt-0.5 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="flex gap-3 border-t border-line pt-4 text-base">
        <Icon icon={ShieldCheck} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
        <span>
          {e.caption} {e.review}
        </span>
      </figcaption>
    </figure>
  );
}
