import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

// Reads the color tokens straight from globals.css so the theme is the single source of truth.
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const theme = /@theme\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? '';
const tokens = Object.fromEntries([...theme.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum ratio]. 4.5 = WCAG AA body text, 3 = UI components.
const pairs: Array<[string, string, number]> = [
  ['ink', 'white', 7],
  ['ink', 'surface', 7],
  ['ink', 'sand', 7],
  ['ink', 'lime', 7],
  ['ink', 'lime-hover', 7],
  ['muted', 'white', 7],
  ['muted', 'surface', 4.5],
  ['muted', 'sand', 4.5],
  ['green-700', 'white', 4.5],
  ['green-700', 'sand', 4.5],
  ['white', 'green-700', 4.5],
  ['white', 'ink', 7],
  ['white', 'night', 7],
  ['lime', 'ink', 7],
  ['error', 'white', 4.5],
  ['error', 'error-bg', 4.5],
  ['field', 'white', 3],
  ['focus', 'white', 3],
  ['focus-on-dark', 'ink', 3],
];

describe('theme contrast', () => {
  it('finds the color tokens in globals.css', () => {
    assert.ok(Object.keys(tokens).length >= 15, `only parsed ${Object.keys(tokens).length} tokens`);
  });

  for (const [fg, bg, min] of pairs) {
    it(`${fg} on ${bg} is at least ${min}:1`, () => {
      assert.ok(tokens[fg], `missing --color-${fg}`);
      assert.ok(tokens[bg], `missing --color-${bg}`);
      const r = ratio(tokens[fg]!, tokens[bg]!);
      assert.ok(r >= min, `${fg} ${tokens[fg]} on ${bg} ${tokens[bg]} is ${r.toFixed(2)}:1`);
    });
  }
});
