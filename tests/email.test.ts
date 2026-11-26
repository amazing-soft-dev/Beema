import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { licenseLine } from '../src/lib/license-line.ts';

describe('email sign-off', () => {
  it('names the agency, says Insurance and shows the California license number below it (Ins. Code 1725.5)', () => {
    const [name, second] = licenseLine.split('\n');
    assert.equal(name, 'Senior AI Plans, LLC');
    assert.match(second ?? '', /^Insurance · California license 0M84910 · NPN 42868828$/);
  });
});
