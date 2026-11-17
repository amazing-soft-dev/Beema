import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

// Reads the color tokens straight from globals.css so the theme is the single source of truth.
const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const parse = (block: string): Record<string, string> =>
  Object.fromEntries([...block.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const block = (re: RegExp) => re.exec(css)?.[1] ?? '';

const tokens = parse(block(/@theme\s*\{([\s\S]*?)\n\}/));
// Dark theme: the [data-theme='dark'] block overrides the light tokens it lists.
const dark = { ...tokens, ...parse(block(/:root\[data-theme='dark'\]\s*\{([\s\S]*?)\}/)) };
// Dark sections (.on-dark) inside the dark theme swap ink and white back.
const darkSection = { ...dark, ...parse(block(/:root\[data-theme='dark'\] \.on-dark\s*\{([\s\S]*?)\}/)) };

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

type Pair = [string, string, number];

// [foreground, background, minimum ratio]. 4.5 = WCAG AA body text, 3 = UI components.
const pairs: Pair[] = [
  ['ink', 'white', 7],
  ['ink', 'surface', 7],
  ['ink', 'sand', 7],
  ['on-gold', 'gold', 7],
  ['on-gold', 'gold-hover', 7],
  ['muted', 'white', 7],
  ['muted', 'surface', 4.5],
  ['muted', 'sand', 4.5],
  ['navy-700', 'white', 4.5],
  ['navy-700', 'sand', 4.5],
  ['white', 'navy-700', 4.5],
  ['white', 'ink', 7],
  ['error', 'white', 4.5],
  ['error', 'error-bg', 4.5],
  ['field', 'white', 3],
  ['focus', 'white', 3],
];

// Light theme only: ink is dark there, so it can sit on gold, and gold on ink.
const lightOnly: Pair[] = [
  ['white', 'night', 7],
  ['ink', 'gold', 7],
  ['ink', 'gold-hover', 7],
  ['gold', 'ink', 7],
  ['focus-on-dark', 'ink', 3],
];

const check = (name: string, set: Record<string, string>, list: Pair[]) =>
  describe(name, () => {
    it('finds the color tokens', () => {
      assert.ok(Object.keys(set).length >= 15, `only parsed ${Object.keys(set).length} tokens`);
    });
    for (const [fg, bg, min] of list) {
      it(`${fg} on ${bg} is at least ${min}:1`, () => {
        assert.ok(set[fg], `missing --color-${fg}`);
        assert.ok(set[bg], `missing --color-${bg}`);
        const r = ratio(set[fg]!, set[bg]!);
        assert.ok(r >= min, `${fg} ${set[fg]} on ${bg} ${set[bg]} is ${r.toFixed(2)}:1`);
      });
    }
  });

check('theme contrast', tokens, [...pairs, ...lightOnly]);
check('dark theme contrast', dark, pairs);
check('dark sections in the dark theme', darkSection, [
  ['white', 'ink', 7],
  ['white', 'night', 7],
  ['gold', 'ink', 7],
  ['focus-on-dark', 'ink', 3],
]);
