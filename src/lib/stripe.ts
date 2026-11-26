/**
 * Stripe Checkout for the Plus and Family subscriptions (server only), through Stripe's REST
 * API with fetch, so no SDK dependency is added. Settings (see .env.example):
 * STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and one price id per tier and billing period.
 * Without the key or a price id, checkout is "not configured" and the site tells visitors to
 * call instead.
 */
import { site } from '../content/site.ts';

export type PaidTier = 'plus' | 'family';
export type Billing = 'monthly' | 'yearly';

type Env = Record<string, string | undefined>;

const PRICE_ENV: Record<PaidTier, Record<Billing, string>> = {
  plus: { monthly: 'STRIPE_PRICE_PLUS_MONTHLY', yearly: 'STRIPE_PRICE_PLUS_YEARLY' },
  family: { monthly: 'STRIPE_PRICE_FAMILY_MONTHLY', yearly: 'STRIPE_PRICE_FAMILY_YEARLY' },
};

/** The Stripe price id for a tier and billing period, or undefined when it is not set. */
export function priceIdFor(tier: PaidTier, billing: Billing, env: Env = process.env): string | undefined {
  return env[PRICE_ENV[tier][billing]] || undefined;
}

/** Form-encoded body for POST /v1/checkout/sessions (subscription mode). */
export function checkoutParams({ tier, billing, state, priceId, origin = site.url }: { tier: PaidTier; billing: Billing; state: string; priceId: string; origin?: string }) {
  const p = new URLSearchParams();
  p.set('mode', 'subscription');
  p.set('line_items[0][price]', priceId);
  p.set('line_items[0][quantity]', '1');
  p.set('success_url', new URL('/plans-pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}', origin).toString().replace('%7BCHECKOUT_SESSION_ID%7D', '{CHECKOUT_SESSION_ID}'));
  p.set('cancel_url', new URL('/plans-pricing?checkout=cancelled', origin).toString());
  p.set('billing_address_collection', 'required');
  for (const [k, v] of Object.entries({ tier, billing, state })) {
    p.set(`metadata[${k}]`, v);
    p.set(`subscription_data[metadata][${k}]`, v);
  }
  p.set(
    'custom_text[submit][message]',
    'This subscription is a service, not insurance. Plan advice and enrollment stay free, and you can cancel at any time.',
  );
  return p;
}

export type StripeResult<T> = { ok: true; data: T } | { ok: false; reason: string };

/** Calls the Stripe REST API with the secret key. GET when `body` is omitted. */
export async function stripeRequest<T>(path: string, body?: URLSearchParams, env: Env = process.env, fetchImpl: typeof fetch = fetch): Promise<StripeResult<T>> {
  const key = env.STRIPE_SECRET_KEY;
  if (!key) return { ok: false, reason: 'STRIPE_SECRET_KEY is not set' };
  try {
    const res = await fetchImpl(`https://api.stripe.com/v1/${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${key}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
      body,
    });
    const json = (await res.json()) as T & { error?: { message?: string } };
    if (!res.ok) return { ok: false, reason: json.error?.message ?? `Stripe returned ${res.status}` };
    return { ok: true, data: json };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'unknown error' };
  }
}

/** Creates a Checkout Session and returns the URL to send the visitor to. */
export async function createCheckoutSession(
  input: { tier: PaidTier; billing: Billing; state: string },
  env: Env = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<StripeResult<{ url: string }>> {
  const priceId = priceIdFor(input.tier, input.billing, env);
  if (!priceId) return { ok: false, reason: `no Stripe price is set for ${input.tier} ${input.billing}` };
  const res = await stripeRequest<{ url?: string }>('checkout/sessions', checkoutParams({ ...input, priceId }), env, fetchImpl);
  if (!res.ok) return res;
  return res.data.url ? { ok: true, data: { url: res.data.url } } : { ok: false, reason: 'Stripe returned no checkout URL' };
}
