import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { articles } from '../src/content/blog/index.ts';
import { noindexRoutes, sitemapEntries } from '../src/lib/sitemap-entries.ts';

describe('sitemap entries', () => {
  const entries = sitemapEntries(['/', '/medigap', '/family-dashboard', '/legal/terms', '/blog']);
  const paths = entries.map((e) => e.path);

  it('leaves out noindex placeholder pages', () => {
    for (const r of noindexRoutes) assert.ok(!paths.includes(r));
  });

  it('lists every blog article with its date', () => {
    for (const a of articles) {
      const e = entries.find((x) => x.path === `/blog/${a.slug}`);
      assert.ok(e, a.slug);
      assert.equal(e.lastModified, a.updated ?? a.published);
    }
  });

  it('ranks home first and the guides above legal pages', () => {
    const p = (path: string) => entries.find((e) => e.path === path)!.priority;
    assert.equal(p('/'), 1);
    assert.ok(p('/medigap') > p('/legal/terms'));
  });
});
