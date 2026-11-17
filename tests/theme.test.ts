import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { runInNewContext } from 'node:vm';
import { THEME_KEY, themeScript } from '../src/lib/theme.ts';

/** Runs the head script against a fake document and storage. */
const run = (stored: string | null, throws = false) => {
  const dataset: Record<string, string> = {};
  const localStorage = {
    getItem: (key: string) => {
      if (throws) throw new Error('blocked');
      return key === THEME_KEY ? stored : null;
    },
  };
  runInNewContext(themeScript, { document: { documentElement: { dataset } }, localStorage });
  return dataset.theme;
};

describe('theme head script', () => {
  it('applies a saved light or dark choice', () => {
    assert.equal(run('dark'), 'dark');
    assert.equal(run('light'), 'light');
  });

  it('leaves the system setting alone when nothing valid is saved', () => {
    assert.equal(run(null), undefined);
    assert.equal(run('purple'), undefined);
  });

  it('does not throw when storage is blocked', () => {
    assert.equal(run(null, true), undefined);
  });
});
