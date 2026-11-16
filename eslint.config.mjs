import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** ESLint 10 flat config. CI runs with `--max-warnings 0`. */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'audit/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
