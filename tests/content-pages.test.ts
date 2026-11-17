import { strict as assert } from 'node:assert';
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
