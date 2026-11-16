// Verify the static export in `out/`. Grows with the site (see issue #2):
// for now the home page must exist and `/api` must not.
import { existsSync } from 'node:fs';

const problems = [];
if (!existsSync('out/index.html')) problems.push('out/index.html is missing');
if (existsSync('out/api')) problems.push('out/api must not exist in a static export');

if (problems.length) {
  console.error(`check-export failed:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('check-export: ok');
