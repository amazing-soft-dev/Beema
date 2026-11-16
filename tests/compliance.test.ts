import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { notices, site } from '../src/content/site.ts';

describe('required notices', () => {
  it('CMS disclaimer keeps the required wording with the current counts', () => {
    assert.equal(
      notices.cmsDisclaimer,
      `We do not offer every plan available in your area. Currently we represent ${site.cms.organizations} organizations which offer ${site.cms.products} products in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.`,
    );
  });

  it('government disclaimer is verbatim', () => {
    assert.equal(notices.govDisclaimer, 'This website is not connected with or endorsed by the U.S. government or the federal Medicare program.');
  });

  it('phone consent names the business', () => {
    assert.ok(notices.phoneConsent.includes(site.legalName));
  });
});

describe('ConsentCheckbox', () => {
  const source = readFileSync(new URL('../src/components/compliance/ConsentCheckbox.tsx', import.meta.url), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  it('is never pre-checked', () => {
    // Matches both `checked={...}` and a bare boolean `defaultChecked` prop.
    assert.doesNotMatch(source, /\b(defaultChecked|checked)\b/);
  });

  it('is required', () => {
    assert.match(source, /\brequired\b/);
  });
});
