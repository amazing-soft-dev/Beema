import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

// Tailwind orders breakpoint variants only when they share a unit. A rem default left next to
// the px md/lg made sm: rules come after md:/lg: and override them (#343), so every breakpoint
// the theme uses is declared here, in px, in width order.
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const theme = /@theme\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? '';
const breakpoints = [...theme.matchAll(/--breakpoint-([\w-]+):\s*([^;]+);/g)].map((m) => ({ name: m[1]!, value: m[2]!.trim() }));

describe('breakpoints', () => {
  it('declares all five Tailwind breakpoints in the theme', () => {
    assert.deepEqual(
      breakpoints.map((b) => b.name),
      ['sm', 'md', 'lg', 'xl', '2xl'],
    );
  });

  it('uses px for every breakpoint, so Tailwind can sort them', () => {
    for (const b of breakpoints) assert.match(b.value, /^\d+px$/, `--breakpoint-${b.name}: ${b.value}`);
  });

  it('keeps the Beema widths in increasing order', () => {
    const widths = breakpoints.map((b) => parseInt(b.value, 10));
    assert.deepEqual(widths, [640, 810, 1200, 1280, 1536]);
  });
});
