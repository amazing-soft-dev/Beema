import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { contactSchema, fieldErrors, guideEmailSchema } from '../src/lib/forms/schemas.ts';
import { consentContext, consentRecord, consentTextVersion, FORM_VERSION } from '../src/lib/forms/consent.ts';
import { endpointKey, rateLimited, readForm } from '../src/lib/forms/server.ts';

const valid = { name: 'Pat Doe', zip: '78701', phone: '(555) 010-0123', bestTime: 'morning', consent: 'yes', website: '' };

describe('contact form schema', () => {
  it('accepts a complete form and normalizes the phone number', () => {
    const r = contactSchema.parse(valid);
    assert.equal(r.phone, '+15550100123');
  });

  it('accepts an 11-digit number starting with 1', () => {
    assert.equal(contactSchema.parse({ ...valid, phone: '1-555-010-0123' }).phone, '+15550100123');
  });

  it('accepts a request without the consent box, and never assumes consent', () => {
    assert.equal(contactSchema.parse({ ...valid, consent: undefined }).consent, undefined);
    assert.equal(contactSchema.parse({ ...valid, consent: '' }).consent, undefined);
    assert.equal(contactSchema.parse(valid).consent, 'yes');
    assert.equal(contactSchema.safeParse({ ...valid, consent: 'on' }).success, false);
  });

  it('records manual-only calls when the box is not checked', () => {
    assert.match(consentRecord(undefined), /^No, not checked .*Manual calls only/);
    assert.match(consentRecord('yes'), /^Yes, checked at /);
  });

  it('gives plain-language errors per field', () => {
    const r = contactSchema.safeParse({ name: 'P', zip: '7870', phone: '555', bestTime: 'noon', consent: 'yes' });
    const e = fieldErrors(r.error!);
    assert.deepEqual(Object.keys(e).sort(), ['bestTime', 'name', 'phone', 'zip']);
    assert.match(e.zip!, /5-digit/);
  });

  it('rejects a filled honeypot', () => {
    assert.equal(contactSchema.safeParse({ ...valid, website: 'spam' }).success, false);
  });
});

describe('guide email schema', () => {
  it('lowercases the email and rejects bad ones', () => {
    assert.equal(guideEmailSchema.parse({ name: 'Pat', email: ' Pat@Example.COM ', guide: 'checklist' }).email, 'pat@example.com');
    assert.equal(guideEmailSchema.safeParse({ name: 'Pat', email: 'pat@', guide: 'checklist' }).success, false);
  });
});

describe('rate limit', () => {
  it('allows 5 requests per address in 10 minutes, then blocks', () => {
    const t = 1_000_000;
    const results = Array.from({ length: 6 }, (_, i) => rateLimited('203.0.113.9', t + i));
    assert.deepEqual(results, [false, false, false, false, false, true]);
    assert.equal(rateLimited('203.0.113.9', t + 11 * 60 * 1000), false);
  });
});

import { planIntakeSchema } from '../src/lib/forms/schemas.ts';

describe('plan intake schema', () => {
  const base = { name: 'Pat Doe', zip: '78701', phone: '5550100123', bestTime: 'evening', consent: 'yes' };

  it('accepts medicines and doctors, filling optional fields', () => {
    const r = planIntakeSchema.parse({ ...base, drugs: [{ name: 'Metformin', dose: '500 mg' }], doctors: [] });
    assert.deepEqual(r.drugs, [{ name: 'Metformin', dose: '500 mg', frequency: '' }]);
  });

  it('defaults missing lists to empty', () => {
    assert.deepEqual(planIntakeSchema.parse(base).drugs, []);
  });

  it('caps each list at 15', () => {
    const drugs = Array.from({ length: 16 }, (_, i) => ({ name: `Drug ${i}` }));
    assert.equal(planIntakeSchema.safeParse({ ...base, drugs }).success, false);
  });
});

describe('consent record context', () => {
  it('keeps the page, form version, consent text version, IP and browser', () => {
    const req = new Request('https://example.test/api/contact', { headers: { 'x-forwarded-for': '203.0.113.7, 10.0.0.1', 'user-agent': 'TestBrowser/1.0' } });
    assert.deepEqual(consentContext(req, '/contact'), {
      'Submitted from page': '/contact',
      'Form version': FORM_VERSION,
      'Consent text version': consentTextVersion,
      'IP address': '203.0.113.7',
      Browser: 'TestBrowser/1.0',
    });
    assert.match(consentTextVersion, /^[0-9a-f]{12}$/);
  });

  it('accepts only a site path for the page', () => {
    assert.equal(contactSchema.parse({ ...valid, page: '/book-a-call' }).page, '/book-a-call');
    assert.equal(contactSchema.parse({ ...valid, page: 'https://evil.test/' }).page, undefined);
  });
});


describe('readForm', () => {
  const post = (body: string, ip: string) => new Request('https://example.test/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip }, body });

  it('answers 400, not a crash, for a JSON body that is not a form', async () => {
    for (const [i, body] of ['null', '42', '[]'].entries()) {
      const r = await readForm(post(body, `198.51.100.${i + 1}`), contactSchema);
      assert.ok('response' in r);
      assert.equal(r.response.status, 400);
    }
  });

  it('quietly accepts a filled honeypot without validating', async () => {
    const r = await readForm(post(JSON.stringify({ website: 'spam' }), '198.51.100.9'), contactSchema);
    assert.ok('response' in r);
    assert.equal(r.response.status, 200);
  });
});

describe('per-endpoint rate limits', () => {
  const req = (path: string, ip: string) => new Request(`https://example.test${path}`, { headers: { 'x-forwarded-for': ip } });

  it('keys each endpoint and address separately', () => {
    assert.equal(endpointKey(req('/api/contact', '203.0.113.20')), '/api/contact 203.0.113.20');
    const t = 1_900_000_000_000;
    for (let i = 0; i < 6; i++) rateLimited(endpointKey(req('/api/contact', '203.0.113.21')), t + i);
    assert.equal(rateLimited(endpointKey(req('/api/contact', '203.0.113.21')), t + 7), true);
    assert.equal(rateLimited(endpointKey(req('/api/newsletter', '203.0.113.21')), t + 8), false, 'another form keeps its own allowance');
  });

  it('honours a higher limit where asked', () => {
    const t = 1_900_000_100_000;
    const results = Array.from({ length: 30 }, (_, i) => rateLimited('plan-match-test', t + i, 30));
    assert.ok(results.every((r) => r === false));
    assert.equal(rateLimited('plan-match-test', t + 31, 30), true);
  });
});
