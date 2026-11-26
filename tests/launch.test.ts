import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { site } from '../src/content/site.ts';

/**
 * Launch guard: once placeholder mode is off the site is indexed, so no stand-in business
 * detail may remain. The advisors' TODO(#57) markers are allowed (owner's decision,
 * 2026-11-25: real profiles follow).
 */
describe('launch guard', () => {
  const source = readFileSync(new URL('../src/content/site.ts', import.meta.url), 'utf8');

  it('is live only with real business details', { skip: site.placeholder }, () => {
    assert.doesNotMatch(source, /TODO\(#57\)/, 'site.ts still has TODO(#57) values');
    assert.doesNotMatch(source, /example\.(com|org|net)/, 'example domain in site.ts');
    assert.doesNotMatch(site.phone.tel, /^\+1555/, 'fictional 555 phone number');
    assert.notEqual(site.npn.replace(/0/g, ''), '', 'NPN is all zeros');
    for (const s of site.licensedStates) assert.notEqual(s.license.replace(/[0W]/g, ''), '', `${s.code} license looks like a stand-in`);
    assert.match(site.url, /^https:\/\//);
    assert.doesNotMatch(site.url, /example\./);
    assert.doesNotMatch(site.email, /example\./);
  });
});
