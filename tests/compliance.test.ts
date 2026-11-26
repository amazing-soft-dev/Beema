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

  it('call-recording notice asks for consent and states the 6-year minimum', () => {
    assert.match(notices.callRecording, /recorded/);
    assert.match(notices.callRecording, /you agree to the recording/);
    assert.match(notices.callRecording, /at least 6 years/);
  });

  it('Scope of Appointment note carries the model-form statements and no 48-hour wait', () => {
    for (const phrase of ['before we meet', 'valid for 12 months', 'may be paid based on your enrollment', 'does not oblige you to enroll', 'does not affect your current or future Medicare enrollment']) {
      assert.ok(notices.scopeOfAppointment.includes(phrase), phrase);
    }
    assert.doesNotMatch(notices.scopeOfAppointment, /48/);
  });

  it('phone consent names the business', () => {
    assert.ok(notices.phoneConsent.includes(site.legalName));
  });

  it('phone consent covers every product line we call about, and prerecorded or artificial voices', () => {
    for (const product of ['Medicare Advantage', 'Medigap', 'Part D', 'dental, vision and hearing', 'hospital indemnity', 'final expense']) {
      assert.ok(notices.phoneConsent.includes(product), product);
    }
    assert.match(notices.phoneConsent, /artificial or prerecorded voice/);
    assert.match(notices.phoneConsent, /not a condition of any purchase/);
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

  it('is optional (a callback works without automated-contact consent)', () => {
    assert.doesNotMatch(source, /\brequired\b/);
  });
});
