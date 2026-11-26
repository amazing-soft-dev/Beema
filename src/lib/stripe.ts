/**
 * Stripe Checkout for the Plus and Family subscriptions (server only), through Stripe's REST
 * API with fetch, so no SDK dependency is added. Settings (see .env.example):
 * STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and one price id per tier and billing period.
 * Without the key or a price id, checkout is "not configured" and the site tells visitors to
 * call instead.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { site } from '../content/site.ts';

/**
 * Checks a Stripe-Signature header ("t=<unix seconds>,v1=<hex HMAC>") against the raw request
 * body, as Stripe documents: HMAC-SHA256 of "<t>.<body>" with the endpoint secret, compared in
 * constant time, and rejected when older than `toleranceSeconds` (replay protection).
 */
export function verifyStripeSignature(payload: string, header: string | null, secret: string | undefined, nowMs = Date.now(), toleranceSeconds = 300): boolean {
  if (!header || !secret) return false;
  const parts = header.split(',').map((p) => p.trim().split('='));
  const t = Number(parts.find(([k]) => k === 't')?.[1]);
  const signatures = parts.filter(([k]) => k === 'v1').map(([, v]) => v ?? '');
  if (!Number.isFinite(t) || !signatures.length) return false;
  if (Math.abs(nowMs / 1000 - t) > toleranceSeconds) return false;
  const expected = Buffer.from(createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex'));
  return signatures.some((sig) => {
    const given = Buffer.from(sig);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

/** The parts of a Stripe event the agency email needs. */
export type StripeEvent = {
  type: string;
  data: { object: { id?: string; status?: string; customer?: string; customer_details?: { email?: string; name?: string }; metadata?: Record<string, string>; cancel_at_period_end?: boolean } };
};

const EVENT_SUBJECTS: Record<string, string> = {
  'checkout.session.completed': 'New subscription started',
  'customer.subscription.updated': 'Subscription changed',
  'customer.subscription.deleted': 'Subscription cancelled',
};

/** Lead-email subject and fields for the events we act on; null for every other event. */
export function subscriptionNotice(event: StripeEvent): { subject: string; fields: Record<string, string> } | null {
  const subject = EVENT_SUBJECTS[event.type];
  if (!subject) return null;
  const o = event.data.object;
  const m = o.metadata ?? {};
  return {
    subject,
    fields: {
      Event: event.type,
      Tier: m.tier ?? 'unknown',
      Billing: m.billing ?? 'unknown',
      State: m.state ?? 'unknown',
      ...(o.customer_details?.email ? { Email: o.customer_details.email } : {}),
      ...(o.customer_details?.name ? { Name: o.customer_details.name } : {}),
      ...(o.status ? { Status: o.status + (o.cancel_at_period_end ? ' (cancels at period end)' : '') } : {}),
      'Stripe customer': o.customer ?? 'unknown',
      'Stripe object': o.id ?? 'unknown',
    },
  };
}

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

/**
 * A Stripe Customer Portal link for the subscriber of a finished Checkout Session, so they can
 * update their card or cancel. The session id comes back on the success URL; Stripe's own
 * receipt emails carry a portal link too.
 */
export async function createPortalSession(checkoutSessionId: string, env: Env = process.env, fetchImpl: typeof fetch = fetch, origin = site.url): Promise<StripeResult<{ url: string }>> {
  if (!/^cs_[A-Za-z0-9_]+$/.test(checkoutSessionId)) return { ok: false, reason: 'not a checkout session id' };
  const session = await stripeRequest<{ customer?: string }>(`checkout/sessions/${checkoutSessionId}`, undefined, env, fetchImpl);
  if (!session.ok) return session;
  if (!session.data.customer) return { ok: false, reason: 'checkout session has no customer' };
  const body = new URLSearchParams({ customer: session.data.customer, return_url: new URL('/plans-pricing', origin).toString() });
  const portal = await stripeRequest<{ url?: string }>('billing_portal/sessions', body, env, fetchImpl);
  if (!portal.ok) return portal;
  return portal.data.url ? { ok: true, data: { url: portal.data.url } } : { ok: false, reason: 'Stripe returned no portal URL' };
}
