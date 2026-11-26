import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { articles } from '../src/content/blog/index.ts';
import { disclosures, medigapAdNotice } from '../src/content/disclosures.ts';
import { medigapPage } from '../src/content/pages/medigap.ts';

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


describe('Medigap advertising notices (California)', () => {
  it('outline-of-coverage line is uppercase and the government notice is verbatim', () => {
    assert.equal(medigapAdNotice.outlineOfCoverage, medigapAdNotice.outlineOfCoverage.toUpperCase());
    assert.equal(medigapAdNotice.notConnected, 'Not connected with or endorsed by the U.S. Government or the federal Medicare program.');
  });

  it('appear on the Medigap page and the Plan G vs Plan N article', () => {
    const blog = articles.find((a) => a.slug === 'medigap-plan-g-vs-plan-n');
    for (const text of [JSON.stringify(medigapPage), JSON.stringify(blog)]) {
      assert.ok(text.includes(medigapAdNotice.outlineOfCoverage));
      assert.ok(text.includes(medigapAdNotice.notConnected));
    }
  });
});
