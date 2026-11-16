// Static export build: `NEXT_OUTPUT=export next build`, then verify `out/`.
// Runs the Next CLI through Node directly, so it behaves the same on Windows, macOS and Linux CI.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const env = { ...process.env, NEXT_OUTPUT: 'export' };

const run = (args) => {
  const res = spawnSync(process.execPath, args, { stdio: 'inherit', env });
  if (res.status !== 0) process.exit(res.status ?? 1);
};

run(['scripts/fetch-fonts.mjs']);
run(['scripts/images/build.mjs']);
run([nextBin, 'build']);
run(['scripts/check-export.mjs']);
