import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { emailRoute, missingProductionEnv } from '../src/lib/env.ts';

const dev = { from: 'Dev <onboarding@resend.dev>', to: 'hello@senioraiplans.com' };

describe('production email settings', () => {
  it('lists every missing setting', () => {
    assert.deepEqual(missingProductionEnv({ RESEND_API_KEY: 're_x', LEADS_FROM_EMAIL: ' ' }), ['LEADS_FROM_EMAIL', 'LEADS_TO_EMAIL', 'NEXT_PUBLIC_SITE_URL']);
    assert.deepEqual(missingProductionEnv({ RESEND_API_KEY: 'a', LEADS_FROM_EMAIL: 'b', LEADS_TO_EMAIL: 'c', NEXT_PUBLIC_SITE_URL: 'd' }), []);
  });

  it('fails closed in production without a sender or a lead inbox (no fallback)', () => {
    assert.deepEqual(emailRoute({ NODE_ENV: 'production', LEADS_FROM_EMAIL: 'A <a@x.test>' }, dev), { ok: false, reason: 'LEADS_TO_EMAIL not set' });
    assert.deepEqual(emailRoute({ NODE_ENV: 'production' }, dev), { ok: false, reason: 'LEADS_FROM_EMAIL and LEADS_TO_EMAIL not set' });
    assert.deepEqual(emailRoute({ NODE_ENV: 'production', LEADS_FROM_EMAIL: 'f', LEADS_TO_EMAIL: 't' }, dev), { ok: true, from: 'f', to: 't' });
  });

  it('uses development defaults outside production', () => {
    assert.deepEqual(emailRoute({ NODE_ENV: 'development' }, dev), { ok: true, ...dev });
  });
});
