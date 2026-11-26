'use client';

import { CheckCircle, MinusCircle } from '@phosphor-icons/react';
import { MotionConfig, motion } from 'motion/react';
import { useId, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { type Tier, features, tiers } from '@/content/pricing';
import { uiSpring } from '@/lib/motion';
import { CheckoutStatus } from './CheckoutStatus';
import { CheckoutStep } from './CheckoutStep';

type Billing = 'monthly' | 'yearly';

function price(t: Tier, billing: Billing) {
  if (!t.billing.includes(billing)) return { main: 'Price TBD', note: 'billed yearly only' };
  const value = billing === 'monthly' ? t.monthly : t.yearly;
  const per = billing === 'monthly' ? 'per month' : 'per year';
  if (value === 0) return { main: 'Free', note: 'always' };
  if (value === null) return { main: 'Price TBD', note: per };
  return { main: '$' + value, note: per };
}

/**
 * Basic, Plus and Family side by side (plan §9) with a clearly labelled Monthly/Yearly
 * choice (a radio group). The price text changes with the variant spring (k 200,
 * c 40). No countdowns or pressure copy. Paid tiers start with a state and fee-disclosure step,
 * then Stripe Checkout.
 */
export function TierTable() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const name = useId();
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-8">
        <CheckoutStatus />
        <fieldset className="flex flex-wrap items-center gap-4">
          <legend className="t-label mb-3 font-semibold">Show prices</legend>
          {(['monthly', 'yearly'] as Billing[]).map((b) => (
            <label
              key={b}
              className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-pill border-2 border-ink px-5 font-semibold has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus"
            >
              <input type="radio" name={name} value={b} checked={billing === b} onChange={() => setBilling(b)} className="sr-only" />
              {b === 'monthly' ? 'Monthly' : 'Yearly'}
            </label>
          ))}
        </fieldset>

        <ul className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const p = price(t, billing);
            const basic = t.id === 'basic';
            return (
              <Reveal key={t.id} as="li" stagger={i} className={`flex flex-col gap-5 rounded-card p-6 md:p-8 ${basic ? 'on-dark bg-ink text-white [&_h3]:text-white' : 'border border-line bg-white'}`}>
                <h3 className="t-h3">{t.name}</h3>
                <p>{t.bestFor}</p>
                <p aria-live="polite" className="flex items-baseline gap-2">
                  <motion.span key={t.id + billing} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={uiSpring} className="t-h2 inline-block">
                    {p.main}
                  </motion.span>
                  <span>{p.note}</span>
                </p>
                <ul className="flex flex-col gap-2">
                  {features.slice(0, 6).map(([f, ...v]) => {
                    const yes = v[i] === 'Yes';
                    return (
                      <li key={f} className="flex gap-3">
                        <Icon icon={yes ? CheckCircle : MinusCircle} weight={yes ? 'fill' : 'regular'} className={`mt-0.5 shrink-0 ${yes && !basic ? 'text-navy-700' : ''}`} />
                        <span>
                          <span className="sr-only">{yes ? 'Included: ' : 'Not included: '}</span>
                          {f}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto">
                  {t.cta.href ? (
                    <ButtonLink href={t.cta.href} size="lg">
                      {t.cta.label}
                    </ButtonLink>
                  ) : (
                    <CheckoutStep tier={t.id as 'plus' | 'family'} billing={billing} label={t.cta.label} />
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </MotionConfig>
  );
}
