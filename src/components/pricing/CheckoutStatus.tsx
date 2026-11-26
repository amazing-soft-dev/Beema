'use client';

import { useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';

const noSubscribe = () => () => {};

/**
 * Shown on Plans & Pricing when Stripe Checkout sends the visitor back: a thank-you with a
 * button to manage or cancel the subscription (Stripe Customer Portal), or a short note when
 * they left checkout without paying.
 */
export function CheckoutStatus() {
  const query = useSyncExternalStore(noSubscribe, () => window.location.search, () => '');
  const params = new URLSearchParams(query);
  const status = params.get('checkout');
  const sessionId = params.get('session_id') ?? '';
  const [error, setError] = useState('');
  const [opening, setOpening] = useState(false);

  async function manage() {
    setOpening(true);
    setError('');
    try {
      const res = await fetch('/api/billing-portal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId }) });
      const body = (await res.json()) as { ok: boolean; url?: string; errors?: Record<string, string> };
      if (body.ok && body.url) return window.location.assign(body.url);
      setError(body.errors?.form ?? 'We could not open your billing page. Please call us.');
    } catch {
      setError('We could not open your billing page. Please call us.');
    }
    setOpening(false);
  }

  if (status === 'cancelled') {
    return (
      <p role="status" className="rounded-card-sm bg-surface p-5">
        You left checkout, and nothing was charged. Our free help is always here: call {site.phone.display} ({site.tty.display}).
      </p>
    );
  }
  if (status !== 'success') return null;
  return (
    <div role="status" className="flex flex-col items-start gap-3 rounded-card bg-surface p-6 md:p-8">
      <h3 className="t-h3">Thank you. Your subscription has started.</h3>
      <p>Stripe emails your receipt. You can update your card or cancel at any time, from the link in that email or here.</p>
      <Button size="lg" variant="outline" onClick={manage} disabled={opening || !sessionId}>
        {opening ? 'Opening…' : 'Manage or cancel my subscription'}
      </Button>
      {error && (
        <p role="alert" className="font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
