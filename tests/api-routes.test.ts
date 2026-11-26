import { strict as assert } from 'node:assert';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { POST as callback } from '../src/app/api/callback/route.server.ts';
import { POST as contact } from '../src/app/api/contact/route.server.ts';
import { POST as guideEmail } from '../src/app/api/guide-email/route.server.ts';
import { POST as stripeWebhook } from '../src/app/api/stripe-webhook/route.server.ts';

/** Captures what the Resend SDK sends, instead of reaching api.resend.com. */
type Sent = { to: string | string[]; from: string; subject: string; text: string; html: string };
let sent: Sent[] = [];
const realFetch = globalThis.fetch;
const env = { ...process.env };
let ip = 0;

beforeEach(() => {
  sent = [];
  Object.assign(process.env, { NODE_ENV: 'production', RESEND_API_KEY: 're_test_123', LEADS_FROM_EMAIL: 'Senior AI Plans <hello@senioraiplans.com>', LEADS_TO_EMAIL: 'leads@senioraiplans.com' });
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    assert.match(String(url), /^https:\/\/api\.resend\.com\//);
    sent.push(JSON.parse(String(init?.body)) as Sent);
    return new Response(JSON.stringify({ id: 'email_1' }), { status: 200, headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of Object.keys(process.env)) if (!(k in env)) delete process.env[k];
  Object.assign(process.env, env);
});

/** Each request comes from a new address, so the rate limit never interferes. */
const post = (path: string, body: unknown) =>
  new Request(`https://www.senioraiplans.com${path}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `192.0.2.${++ip}`, 'user-agent': 'RouteTest/1.0' }, body: JSON.stringify(body) });

const lead = { name: 'Pat Doe', zip: '78701', phone: '(254) 356-3878', bestTime: 'morning', page: '/contact' };

describe('lead routes, with Resend mocked', () => {
  it('emails the lead inbox with the consent record and the California license line', async () => {
    const res = await contact(post('/api/contact', { ...lead, consent: 'yes' }));
    assert.equal(res.status, 200);
    assert.equal(sent.length, 1);
    assert.deepEqual([sent[0]!.to].flat(), ['leads@senioraiplans.com']);
    assert.match(sent[0]!.text, /Consent to contact: Yes, checked at /);
    assert.match(sent[0]!.text, /Submitted from page: \/contact/);
    assert.match(sent[0]!.text, /Browser: RouteTest\/1\.0/);
    assert.match(sent[0]!.text, /California license 0M84910/);
  });

  it('records manual-only calls when the consent box is left unchecked', async () => {
    const res = await callback(post('/api/callback', lead));
    assert.equal(res.status, 200);
    assert.match(sent[0]!.text, /Manual calls only/);
  });

  it('fails closed in production without a lead inbox, and sends nothing', async () => {
    delete process.env.LEADS_TO_EMAIL;
    const res = await contact(post('/api/contact', lead));
    assert.equal(res.status, 502);
    assert.equal(sent.length, 0);
  });

  it('fakes success for a filled honeypot and sends nothing', async () => {
    const res = await contact(post('/api/contact', { ...lead, website: 'http://spam.test' }));
    assert.equal(res.status, 200);
    assert.equal(sent.length, 0);
  });

  it('returns field errors for a bad phone number', async () => {
    const res = await contact(post('/api/contact', { ...lead, phone: '123' }));
    assert.equal(res.status, 422);
    assert.ok(((await res.json()) as { errors: Record<string, string> }).errors.phone);
  });
});

describe('guide email route', () => {
  it('sends only our own content to the visitor, never the typed name', async () => {
    const res = await guideEmail(post('/api/guide-email', { name: 'Visit cheap-pills.test now', email: 'someone@example.test', guide: 'turning-65-checklist' }));
    assert.equal(res.status, 200);
    assert.equal(sent.length, 1);
    assert.doesNotMatch(sent[0]!.text + sent[0]!.html, /cheap-pills/);
  });
});

describe('Stripe webhook route', () => {
  it('rejects an unsigned event without emailing anyone', async () => {
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
    const res = await stripeWebhook(new Request('https://www.senioraiplans.com/api/stripe-webhook', { method: 'POST', body: '{"type":"checkout.session.completed"}' }));
    assert.equal(res.status, 400);
    assert.equal(sent.length, 0);
  });
});
