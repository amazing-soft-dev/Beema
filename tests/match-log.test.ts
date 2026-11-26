import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { matchLogLine, matchLogSchema } from '../src/lib/match/log.ts';

const valid = {
  answers: { zip: '78701', birthMonth: '1961-12' },
  result: { type: 'medigap', reasons: ['a', 'b', 'c'] },
};

describe('plan match log', () => {
  it('accepts the ZIP, birth month and result', () => assert.ok(matchLogSchema.safeParse(valid).success));

  it('rejects a malformed ZIP and drops extra personal or health fields', () => {
    assert.ok(!matchLogSchema.safeParse({ ...valid, answers: { ...valid.answers, zip: 'my house' } }).success);
    const parsed = matchLogSchema.parse({ ...valid, name: 'Pat', answers: { ...valid.answers, doctors: 'keep-specific', drugs: 'several', work: 'medicaid' } });
    assert.deepEqual(Object.keys(parsed.answers).sort(), ['birthMonth', 'zip']);
    assert.equal((parsed as Record<string, unknown>).name, undefined);
  });

  it('keeps only the ZIP prefix, birth year and result, as the AI notice says', () => {
    const line = matchLogLine(matchLogSchema.parse(valid), new Date('2026-11-17T00:00:00Z'));
    assert.deepEqual(Object.keys(line).sort(), ['at', 'birthYear', 'event', 'reasons', 'result', 'zip3']);
    assert.equal(line.zip3, '787');
    assert.equal(line.birthYear, '1961');
    assert.doesNotMatch(JSON.stringify(line), /78701|1961-12/);
  });
});
