import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { matchLogLine, matchLogSchema } from '../src/lib/match/log.ts';

const valid = {
  answers: { zip: '78701', birthMonth: '1961-12', work: 'none', doctors: 'skip', drugs: 'skip', budget: 'predictable', travel: 'often' },
  result: { type: 'medigap', reasons: ['a', 'b', 'c'] },
};

describe('plan match log', () => {
  it('accepts the questionnaire answers and result', () => assert.ok(matchLogSchema.safeParse(valid).success));

  it('rejects free text and extra personal fields', () => {
    assert.ok(!matchLogSchema.safeParse({ ...valid, answers: { ...valid.answers, work: 'my boss is Bob' } }).success);
    const parsed = matchLogSchema.parse({ ...valid, name: 'Pat', phone: '555' }) as Record<string, unknown>;
    assert.equal(parsed.name, undefined);
  });

  it('keeps only the ZIP prefix and birth year', () => {
    const line = matchLogLine(matchLogSchema.parse(valid), new Date('2026-11-17T00:00:00Z'));
    assert.equal(line.zip3, '787');
    assert.equal(line.birthYear, '1961');
    assert.doesNotMatch(JSON.stringify(line), /78701|1961-12/);
  });
});
