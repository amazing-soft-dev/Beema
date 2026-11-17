import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { articles, topics } from '../src/content/blog/index.ts';
import { findGuide } from '../src/content/guides-library.ts';
import { medicareFigures } from '../src/content/medicare-figures.ts';

describe('blog articles', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = articles.map((a) => a.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  for (const a of articles) {
    it(`${a.slug}: known topic, author license, current plan year, valid PDF`, () => {
      assert.ok(a.topic in topics);
      assert.ok(a.author.license.includes('NPN'));
      assert.equal(a.planYear, medicareFigures.planYear);
      if (a.pdf) assert.ok(findGuide(a.pdf));
      assert.ok(a.description.length <= 170);
    });
  }

  it('includes a caregiver guide for the Family tier audience', () => {
    assert.ok(articles.some((a) => a.topic === 'caregivers'));
  });
});
