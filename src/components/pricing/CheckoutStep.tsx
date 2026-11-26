'use client';

import { useId, useState } from 'react';
import { formsDisabled } from '@/components/forms/useFormSubmit';
import { Button } from '@/components/ui/Button';
import { feeDisclosure, subscriptionStates } from '@/content/pricing';
import { site } from '@/content/site';

type Billing = 'monthly' | 'yearly';

/**
 * The step between "Start Plus/Family" and Stripe Checkout: the visitor picks their state and
 * ticks the fee disclosure (review 2026-11-25, INS-30), then is sent to Stripe. In the static
 * export, or when Stripe is not set up, it points to the phone number instead.
 */
export function CheckoutStep({ tier, billing, label }: { tier: 'plus' | 'family'; billing: Billing; label: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const call = (
    <a href={`tel:${site.phone.tel}`} className="font-semibold underline underline-offset-4">
      {site.phone.display}
    </a>
  );

  if (formsDisabled) {
    return <p className="text-base">To start {label.replace('Start ', '')}, call {call} ({site.tty.display}).</p>;
  }
  if (!open) {
    return (
      <Button size="lg" onClick={() => setOpen(true)} aria-expanded={false} aria-controls={`${id}-step`}>
        {label}
      </Button>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!state) return setError('Please choose your state.');
    if (!agreed) return setError('Please confirm you have read the fee disclosure.');
    setSending(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier, billing, state, disclosure: 'yes' }) });
      const body = (await res.json()) as { ok: boolean; url?: string; errors?: Record<string, string> };
      if (body.ok && body.url) {
        window.location.assign(body.url);
        return;
      }
      setError(Object.values(body.errors ?? {})[0] ?? 'Online sign-up is not available right now. Please call us.');
    } catch {
      setError('We could not reach our sign-up page. Please check your connection or call us.');
    }
    setSending(false);
  }

  return (
    <form id={`${id}-step`} onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-card-sm border-2 border-line p-4 text-base">
      <label htmlFor={`${id}-state`} className="flex flex-col gap-2 font-semibold">
        Which state do you live in?
        <select id={`${id}-state`} value={state} onChange={(e) => setState(e.target.value)} className="min-h-12 rounded-card-sm border-2 border-field bg-white px-3 font-normal">
          <option value="">Choose your state</option>
          {subscriptionStates.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
          <option value="CA">California</option>
          <option value="other">Another state</option>
        </select>
      </label>
      {state === 'CA' && (
        <p role="note">
          Plus and Family are not offered to California residents: California does not allow agents to charge these service fees. Everything else we do, including
          plan advice, enrollment and your yearly review, is free in California: call {call}.
        </p>
      )}
      {state === 'other' && (
        <p role="note">
          Plus and Family are offered only in {subscriptionStates.map((s) => s.name).join(', ')} for now. Our plan match, plan advice and enrollment help are free
          wherever we are licensed: call {call}.
        </p>
      )}
      <label className="flex cursor-pointer items-start gap-3">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-6 shrink-0 accent-navy-700" />
        <span>{feeDisclosure}</span>
      </label>
      {error && (
        <p role="alert" className="font-medium text-error">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={sending || state === 'other' || state === 'CA'}>
        {sending ? 'Opening secure checkout…' : 'Continue to secure checkout'}
      </Button>
      <p>Payment is handled by Stripe. You can cancel at any time.</p>
    </form>
  );
}
