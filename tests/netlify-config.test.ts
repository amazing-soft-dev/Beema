import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const toml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
const value = (key: string) => toml.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, 'm'))?.[1];

describe('netlify.toml', () => {
  it('lets the secrets scan skip only the public mailbox addresses', () => {
    const omitted = (value('SECRETS_SCAN_OMIT_KEYS') ?? '').split(',').map((k) => k.trim()).filter(Boolean).sort();
    assert.deepEqual(omitted, ['LEADS_FROM_EMAIL', 'LEADS_TO_EMAIL']);
  });

  it('never skips a real credential', () => {
    const omitted = value('SECRETS_SCAN_OMIT_KEYS') ?? '';
    for (const secret of ['RESEND_API_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET']) assert.doesNotMatch(omitted, new RegExp(secret));
    assert.doesNotMatch(toml, /SECRETS_SCAN_ENABLED\s*=\s*"?false/);
    assert.doesNotMatch(toml, /SECRETS_SCAN_OMIT_PATHS/);
  });

  it('builds the server app with the Next.js runtime on the same Node major as .nvmrc and CI', () => {
    assert.equal(value('command'), 'npm run build');
    assert.equal(value('publish'), '.next');
    assert.match(toml, /package\s*=\s*"@netlify\/plugin-nextjs"/);
    assert.equal(value('NODE_VERSION'), readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim());
  });
});
