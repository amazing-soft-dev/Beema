import { strict as assert } from 'node:assert';
import { createHmac } from 'node:crypto';
import { describe, it } from 'node:test';
import { checkoutSchema } from '../src/lib/forms/schemas.ts';
import { checkoutParams, createCheckoutSession, createPortalSession, priceIdFor, subscriptionNotice, verifyStripeSignature } from '../src/lib/stripe.ts';

const env = { STRIPE_SECRET_KEY: 'sk_test_x', STRIPE_PRICE_PLUS_MONTHLY: 'price_plus_m', STRIPE_PRICE_FAMILY_YEARLY: 'price_family_y' };

describe('Stripe checkout', () => {
  it('reads the price id for each tier and billing period from the environment', () => {
    assert.equal(priceIdFor('plus', 'monthly', env), 'price_plus_m');
    assert.equal(priceIdFor('family', 'yearly', env), 'price_family_y');
    assert.equal(priceIdFor('plus', 'yearly', env), undefined);
  });

  it('builds a subscription session with the state recorded and Stripe’s session placeholder intact', () => {
    const p = checkoutParams({ tier: 'plus', billing: 'monthly', state: 'TX', priceId: 'price_plus_m', origin: 'https://www.senioraiplans.com' });
    assert.equal(p.get('mode'), 'subscription');
    assert.equal(p.get('line_items[0][price]'), 'price_plus_m');
    assert.equal(p.get('metadata[state]'), 'TX');
    assert.equal(p.get('subscription_data[metadata][tier]'), 'plus');
    assert.equal(p.get('success_url'), 'https://www.senioraiplans.com/plans-pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}');
    assert.match(p.get('custom_text[submit][message]')!, /not insurance/);
  });

  it('posts to Stripe with the secret key and returns the checkout URL', async () => {
    let seen: { url: string; init: RequestInit } | undefined;
    const fakeFetch = (async (url: string, init: RequestInit) => {
      seen = { url, init };
      return new Response(JSON.stringify({ url: 'https://checkout.stripe.com/c/pay/cs_test_1' }), { status: 200 });
    }) as unknown as typeof fetch;
    const r = await createCheckoutSession({ tier: 'plus', billing: 'monthly', state: 'FL' }, env, fakeFetch);
    assert.deepEqual(r, { ok: true, data: { url: 'https://checkout.stripe.com/c/pay/cs_test_1' } });
    assert.equal(seen!.url, 'https://api.stripe.com/v1/checkout/sessions');
    assert.equal((seen!.init.headers as Record<string, string>).Authorization, 'Bearer sk_test_x');
  });

  it('reports "not configured" without a key or a price, so the site can say to call', async () => {
    assert.equal((await createCheckoutSession({ tier: 'plus', billing: 'yearly', state: 'TX' }, env)).ok, false);
    assert.equal((await createCheckoutSession({ tier: 'plus', billing: 'monthly', state: 'TX' }, { STRIPE_PRICE_PLUS_MONTHLY: 'p' })).ok, false);
  });
});

describe('checkout form', () => {
  const valid = { tier: 'family', billing: 'yearly', state: 'AZ', disclosure: 'yes' };

  it('accepts a state where the subscriptions are offered with the disclosure ticked', () => {
    assert.ok(checkoutSchema.safeParse(valid).success);
  });

  it('refuses California, unlicensed states and a missing disclosure', () => {
    assert.ok(!checkoutSchema.safeParse({ ...valid, state: 'CA' }).success);
    assert.ok(!checkoutSchema.safeParse({ ...valid, state: 'NY' }).success);
    assert.ok(!checkoutSchema.safeParse({ ...valid, disclosure: undefined }).success);
    assert.ok(!checkoutSchema.safeParse({ ...valid, tier: 'basic' }).success);
  });
});


describe('Stripe webhook', () => {
  const secret = 'whsec_test';
  const body = '{"type":"checkout.session.completed"}';
  const now = 1_800_000_000_000;
  const t = now / 1000;
  const sign = (ts: number, payload = body) => createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex');

  it('accepts a correctly signed, recent event', () => {
    assert.ok(verifyStripeSignature(body, `t=${t},v1=${sign(t)}`, secret, now));
    assert.ok(verifyStripeSignature(body, `t=${t},v1=deadbeef,v1=${sign(t)}`, secret, now));
  });

  it('rejects a wrong signature, a changed body, an old timestamp or a missing secret', () => {
    assert.ok(!verifyStripeSignature(body, `t=${t},v1=${sign(t)}0`, secret, now));
    assert.ok(!verifyStripeSignature(body + ' ', `t=${t},v1=${sign(t)}`, secret, now));
    assert.ok(!verifyStripeSignature(body, `t=${t - 600},v1=${sign(t - 600)}`, secret, now));
    assert.ok(!verifyStripeSignature(body, `t=${t},v1=${sign(t)}`, undefined, now));
    assert.ok(!verifyStripeSignature(body, null, secret, now));
  });

  it('turns subscription events into an agency email and ignores the rest', () => {
    const n = subscriptionNotice({ type: 'checkout.session.completed', data: { object: { id: 'cs_1', customer: 'cus_1', customer_details: { email: 'pat@example.test' }, metadata: { tier: 'plus', billing: 'monthly', state: 'TX' } } } });
    assert.equal(n!.subject, 'New subscription started');
    assert.equal(n!.fields.State, 'TX');
    assert.equal(n!.fields.Email, 'pat@example.test');
    assert.equal(subscriptionNotice({ type: 'invoice.paid', data: { object: {} } }), null);
  });
});

describe('Stripe billing portal', () => {
  it('looks up the checkout customer and opens a portal session that returns to Plans & Pricing', async () => {
    const calls: string[] = [];
    const fakeFetch = (async (url: string, init: RequestInit) => {
      calls.push(`${init.method} ${url}`);
      if (url.includes('checkout/sessions/')) return new Response(JSON.stringify({ customer: 'cus_9' }), { status: 200 });
      assert.equal(new URLSearchParams(String(init.body)).get('customer'), 'cus_9');
      return new Response(JSON.stringify({ url: 'https://billing.stripe.com/p/session/x' }), { status: 200 });
    }) as unknown as typeof fetch;
    const r = await createPortalSession('cs_test_123', env, fakeFetch, 'https://www.senioraiplans.com');
    assert.deepEqual(r, { ok: true, data: { url: 'https://billing.stripe.com/p/session/x' } });
    assert.deepEqual(calls, ['GET https://api.stripe.com/v1/checkout/sessions/cs_test_123', 'POST https://api.stripe.com/v1/billing_portal/sessions']);
  });

  it('refuses anything that is not a checkout session id', async () => {
    assert.equal((await createPortalSession('../customers/cus_1', env)).ok, false);
  });
});
