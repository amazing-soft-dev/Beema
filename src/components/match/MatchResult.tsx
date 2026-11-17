'use client';

import { ArrowCounterClockwise, CalendarCheck, CheckCircle, MinusCircle, Robot } from '@phosphor-icons/react';
import { MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CmsDisclaimer } from '@/components/compliance/CmsDisclaimer';
import { ArrowSwap } from '@/components/ui/ArrowSwap';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { bookCall } from '@/content/site';
import { type Match, freeAlternatives } from '@/lib/match/engine';
import { fadeOffset, revealSpring, staggerStep } from '@/lib/motion';

const dateLabel = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * The plan match in plain words (plan §9): the recommendation, three reasons it fits, the
 * trade-offs and the free alternatives, with the CMS (TPMO) disclaimer right beside it
 * (plan §6). "Review my match with a licensed agent" carries only the result type into Book
 * a Call; no personal answers travel in the link. Blocks fade up 50px in 0.2s steps.
 */
export function MatchResult({ match, onRestart }: { match: Match; onRestart: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  const item = (i: number) => ({
    initial: { opacity: 0, y: fadeOffset.md },
    animate: { opacity: 1, y: 0 },
    transition: { ...revealSpring, delay: i * staggerStep },
  });
  const book = `${bookCall.href}?match=${match.type}&topic=${match.topic}`;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-8" aria-live="polite">
        <motion.div {...item(0)} className="on-dark flex flex-col gap-4 rounded-card bg-ink p-6 text-white md:p-10">
          <p className="t-caps text-gold">Your free plan match</p>
          <h2 ref={headingRef} tabIndex={-1} className="t-h2 text-white outline-none">
            {match.title}
          </h2>
          <p className="t-lead">{match.summary}</p>
          {match.window && (
            <p className="rounded-card-sm bg-white/10 p-4">
              Your 7-month Initial Enrollment Period runs from <strong>{dateLabel(match.window.start)}</strong> to <strong>{dateLabel(match.window.end)}</strong> (a month earlier if you were
              born on the 1st).
            </p>
          )}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.section {...item(1)} aria-labelledby="match-reasons" className="rounded-card border border-line bg-white p-6 md:p-8">
            <h3 id="match-reasons" className="t-h4">
              Why it fits you
            </h3>
            <ol className="mt-4 flex flex-col gap-3">
              {match.reasons.map((r) => (
                <li key={r} className="flex gap-3">
                  <Icon icon={CheckCircle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
                  {r}
                </li>
              ))}
            </ol>
          </motion.section>
          <motion.section {...item(2)} aria-labelledby="match-tradeoffs" className="rounded-card bg-sand p-6 md:p-8">
            <h3 id="match-tradeoffs" className="t-h4">
              Trade-offs to know
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {match.tradeoffs.map((t) => (
                <li key={t} className="flex gap-3">
                  <Icon icon={MinusCircle} className="mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.div {...item(3)} className="flex flex-col gap-4">
          <CmsDisclaimer />
          <p className="flex gap-3 rounded-card-sm border border-line p-4 text-base">
            <Icon icon={Robot} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
            <span>
              This match comes from a computer program that suggests a type of coverage, not a specific plan. A licensed agent reviews it with you before any enrollment.{' '}
              <Link href="/legal/ai-health-data" className="underline underline-offset-4">
                How the AI match works
              </Link>
            </span>
          </p>
        </motion.div>

        <motion.div {...item(4)} className="flex flex-wrap gap-4">
          <ButtonLink href={book} size="lg" icon={<Icon icon={CalendarCheck} />}>
            Review my match with a licensed agent
          </ButtonLink>
          <ButtonLink href={match.learnMore.href} size="lg" variant="outline">
            {match.learnMore.label}
          </ButtonLink>
          <Button size="lg" variant="outline" onClick={onRestart} icon={<Icon icon={ArrowCounterClockwise} />}>
            Start over
          </Button>
        </motion.div>

        <motion.section {...item(5)} aria-labelledby="free-alternatives" className="rounded-card bg-surface p-6 md:p-8">
          <h3 id="free-alternatives" className="t-h4">
            Free, unbiased ways to check
          </h3>
          <p className="mt-2">You can always compare every plan yourself or get free counseling:</p>
          <ul className="mt-4 flex flex-col gap-3">
            {freeAlternatives.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="inline-flex min-h-12 items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">
                  {a.label}
                  <ArrowSwap dir="up-right" />
                </a>
                <p>{a.detail}</p>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </MotionConfig>
  );
}
