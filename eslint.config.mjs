import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** ESLint 10 flat config. CI runs with `--max-warnings 0`. */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'audit/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Type-only imports must be marked so Node's type stripping (unit tests) can erase them.
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
    },
  },
];

export default config;
