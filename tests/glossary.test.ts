import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { glossary } from '../src/content/glossary.ts';

describe('glossary', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = glossary.map((t) => t.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/);
  });

  it('covers the terms the content plan names', () => {
    for (const aka of ['IEP', 'AEP', 'IRMAA', 'MOOP']) assert.ok(glossary.some((t) => t.aka === aka), `missing ${aka}`);
  });

  it('keeps every definition to one or two short sentences', () => {
    for (const t of glossary) assert.ok(t.definition.length <= 260, `${t.slug} is ${t.definition.length} characters`);
  });
});
