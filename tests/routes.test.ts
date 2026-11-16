import { strict as assert } from 'node:assert';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { listStaticRoutes } from '../src/lib/routes.ts';

describe('listStaticRoutes', () => {
  it('lists real pages, flattens groups and skips dynamic, api, print and private segments', () => {
    const app = mkdtempSync(join(tmpdir(), 'routes-'));
    const page = (...segments: string[]) => {
      mkdirSync(join(app, ...segments), { recursive: true });
      writeFileSync(join(app, ...segments, 'page.tsx'), 'export default function P() { return null; }');
    };
    page();
    page('about');
    page('about', 'team');
    page('(marketing)', 'reviews');
    page('blog', '[slug]');
    page('print', 'turning-65');
    page('_drafts');
    mkdirSync(join(app, 'api', 'contact'), { recursive: true });
    writeFileSync(join(app, 'api', 'contact', 'route.ts'), '');
    assert.deepEqual(listStaticRoutes(app), ['/', '/about', '/about/team', '/reviews']);
  });

  it('finds the home page in this repository', () => {
    assert.ok(listStaticRoutes().includes('/'));
  });
});
