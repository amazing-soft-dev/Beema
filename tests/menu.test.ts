import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { availableMenu, footerGroups, legalLinks, menu, plannedRoutes } from '../src/content/menu.ts';
import { listStaticRoutes } from '../src/lib/routes.ts';

const routes = new Set(listStaticRoutes());
const path = (href: string) => href.split('#')[0] || '/';
const allLinks = [...menu, ...menu.flatMap((i) => i.groups?.flatMap((g) => g.links) ?? []), ...legalLinks];

describe('menu', () => {
  it('has the five items from the plan, in order', () => {
    assert.deepEqual(
      menu.map((i) => i.label),
      ['Home', 'Services', 'Resources', 'About', 'Contact'],
    );
  });

  it('groups Services as AI Plan Match, Medicare and Beyond Medicare', () => {
    const services = menu.find((i) => i.label === 'Services');
    assert.deepEqual(
      services?.groups?.map((g) => g.heading),
      ['AI Plan Match', 'Medicare', 'Beyond Medicare'],
    );
  });

  it('links only to pages that exist or are planned', () => {
    const planned = new Set(plannedRoutes);
    for (const link of allLinks) {
      assert.ok(routes.has(path(link.href)) || planned.has(path(link.href)), `${link.label} → ${link.href} is neither a page nor planned`);
    }
  });

  it('lists eight footer pages', () => {
    assert.equal(legalLinks.length, 8);
  });

  it('shows only existing pages', () => {
    for (const item of availableMenu(routes)) {
      assert.ok(routes.has(path(item.href)), `${item.label} → ${item.href}`);
      for (const link of item.groups?.flatMap((g) => g.links) ?? []) assert.ok(routes.has(path(link.href)), link.href);
    }
  });

  it('points an item at its first page while its landing page is missing', () => {
    const items = availableMenu(new Set(['/', '/turning-65', '/resources']));
    assert.deepEqual(
      items.map((i) => `${i.label} ${i.href}`),
      ['Home /', 'Services /turning-65', 'Resources /resources'],
    );
  });

  it('shows the full menu when routes are unknown', () => {
    assert.equal(availableMenu(null).length, menu.length);
    assert.equal(footerGroups(availableMenu(null), null).at(-1)?.links.length, legalLinks.length);
  });
});
