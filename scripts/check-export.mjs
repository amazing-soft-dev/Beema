// Verify the static export in `out/`, derived from the route tree so it passes at
// every stage of the build-out:
// - every static `src/app/**/page.tsx` has `out/<route>/index.html`
//   (skips dynamic segments, route groups are flattened, `api` and `print` are skipped)
// - sitemap.xml / robots.txt / icons exist when their route files exist
// - every pre-built image in public/images was copied to out/images
// - `out/api` must not exist
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const APP = 'src/app';
const OUT = 'out';
const problems = [];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const appFiles = existsSync(APP) ? walk(APP) : [];

// 1. Pages
for (const file of appFiles.filter((f) => /[\\/]page\.(tsx|ts|jsx|js|mdx)$/.test(f))) {
  const segments = relative(APP, file).split(sep).slice(0, -1);
  if (segments.some((s) => s.startsWith('[') || s === 'api' || s === 'print' || s.startsWith('_'))) continue;
  const route = segments.filter((s) => !(s.startsWith('(') && s.endsWith(')')));
  const html = join(OUT, ...route, 'index.html');
  if (!existsSync(html)) problems.push(`missing ${html} for /${route.join('/')}`);
}

// 2. Metadata routes
const rootFiles = appFiles.map((f) => relative(APP, f)).filter((f) => !f.includes(sep));
const has = (base) => rootFiles.some((f) => f.startsWith(`${base}.`));
const outRoot = existsSync(OUT) ? readdirSync(OUT) : [];
const expectFile = (cond, name) => {
  if (cond && !existsSync(join(OUT, name))) problems.push(`missing ${join(OUT, name)}`);
};
expectFile(has('sitemap'), 'sitemap.xml');
expectFile(has('robots'), 'robots.txt');
expectFile(has('manifest'), 'manifest.webmanifest');
expectFile(existsSync(join(APP, 'llms.txt')), 'llms.txt');
// Icons may be emitted as icon.png, icon.svg or icon (generated), so match the prefix.
for (const base of ['icon', 'apple-icon']) {
  if (has(base) && !outRoot.some((f) => f === base || f.startsWith(`${base}.`))) problems.push(`missing ${OUT}/${base}.*`);
}

// 3. Pre-built images
if (existsSync('public/images')) {
  for (const img of readdirSync('public/images')) {
    if (!existsSync(join(OUT, 'images', img))) problems.push(`missing out/images/${img}`);
  }
}

// 4. No API in a static export
if (existsSync(join(OUT, 'api'))) problems.push('out/api must not exist in a static export');

if (problems.length) {
  console.error(`check-export failed (${problems.length}):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('check-export: ok');
