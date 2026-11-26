import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { checkoutSchema } from '../src/lib/forms/schemas.ts';
import { checkoutParams, createCheckoutSession, priceIdFor } from '../src/lib/stripe.ts';

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
