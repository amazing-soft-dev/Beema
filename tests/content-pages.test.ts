import { strict as assert } from 'node:assert';
import { readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { findGuide } from '../src/content/guides-library.ts';
import { contentPages } from '../src/content/pages/index.ts';
import { listStaticRoutes } from '../src/lib/routes.ts';

const routes = new Set(listStaticRoutes());

describe('content pages', () => {
  for (const page of contentPages) {
    describe(page.path, () => {
      it('has a route', () => assert.ok(routes.has(page.path), `no page.tsx for ${page.path}`));

      it('ends its breadcrumb on itself', () => assert.equal(page.crumbs.at(-1)?.href, page.path));

      it('uses unique section ids', () => {
        const ids = page.sections.map((s) => s.id);
        assert.equal(new Set(ids).size, ids.length);
      });

      it('links its PDF only if the library has it', () => {
        if (page.pdf) assert.ok(findGuide(page.pdf), `unknown guide ${page.pdf}`);
      });

      it('keeps the meta description under 170 characters', () => assert.ok(page.meta.description.length <= 170, `${page.meta.description.length} chars`));
    });
  }
});

describe('$0 premium statements', () => {
  it('always say the Part B premium still has to be paid (review INS-16)', () => {
    for (const dir of ['../src/content/', '../src/content/pages/', '../src/content/guides/', '../src/content/blog/']) {
      const url = new URL(dir, import.meta.url);
      for (const file of readdirSync(url).filter((n) => n.endsWith('.ts'))) {
        for (const line of readFileSync(new URL(file, url), 'utf8').split(/\r?\n/)) {
          if (/\$0\b/.test(line) && !line.includes('${')) assert.match(line, /Part B premium/, `${dir}${file}: ${line.trim().slice(0, 80)}`);
        }
      }
    }
  });
});
