import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { disclosures } from '../src/content/disclosures.ts';

describe('non-Medicare product disclosures', () => {
  for (const [kind, d] of Object.entries(disclosures)) {
    it(`${kind} says it is not Medicare and names the underwriting company`, () => {
      assert.match(d.text, /not Medicare/);
      assert.match(d.text, /underwritten by/i);
      assert.match(d.text, /var(y|ies) by state/);
    });
  }

  it('says final expense is life insurance and needs its own appointment', () => {
    assert.match(disclosures.life.text, /life insurance/);
    assert.match(disclosures.life.text, /separate appointment/);
  });

  it('flags hospital indemnity as limited benefit with duplication', () => {
    assert.match(disclosures['limited-benefit'].text, /limited-benefit/);
    assert.match(disclosures['limited-benefit'].text, /duplicat/);
  });
});
