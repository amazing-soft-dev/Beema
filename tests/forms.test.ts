import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { contactSchema, fieldErrors, guideEmailSchema } from '../src/lib/forms/schemas.ts';
import { rateLimited } from '../src/lib/forms/server.ts';

const valid = { name: 'Pat Doe', zip: '78701', phone: '(555) 010-0123', bestTime: 'morning', consent: 'yes', website: '' };

describe('contact form schema', () => {
  it('accepts a complete form and normalizes the phone number', () => {
    const r = contactSchema.parse(valid);
    assert.equal(r.phone, '+15550100123');
  });

  it('accepts an 11-digit number starting with 1', () => {
    assert.equal(contactSchema.parse({ ...valid, phone: '1-555-010-0123' }).phone, '+15550100123');
  });

  it('requires the consent box (never assumed)', () => {
    const r = contactSchema.safeParse({ ...valid, consent: undefined });
    assert.equal(r.success, false);
    assert.match(fieldErrors(r.error!).consent!, /check the box/);
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
