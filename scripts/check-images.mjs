// Each photo is used exactly once.
// - every manifest entry has its file in public/photos and a known license
// - no unlisted files sit in public/photos
// - src/ references each photo exactly once, as photo('<id>')
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { LICENSES, PHOTOS_DIR, photoFile, readManifest } from './images/lib.mjs';

const photos = readManifest();
const problems = [];

const ids = new Set();
for (const p of photos) {
  if (ids.has(p.id)) problems.push(`duplicate manifest id "${p.id}"`);
  ids.add(p.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) problems.push(`id "${p.id}" must be kebab-case`);
  if (!LICENSES[p.source]) problems.push(`${p.id}: unknown source "${p.source}"`);
  if (!p.alt?.trim()) problems.push(`${p.id}: alt text is required`);
  if (!p.photographer || !p.sourceUrl) problems.push(`${p.id}: photographer and sourceUrl are required for credits`);
  if (!existsSync(photoFile(p.id))) problems.push(`${p.id}: ${photoFile(p.id)} is missing (npm run images:fetch)`);
}

if (existsSync(PHOTOS_DIR)) {
  for (const f of readdirSync(PHOTOS_DIR)) {
    if (!ids.has(f.replace(/\.jpg$/, ''))) problems.push(`${PHOTOS_DIR}/${f} is not in the manifest`);
  }
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mdx?)$/.test(name) ? [p] : [];
  });
const source = walk('src').map((f) => readFileSync(f, 'utf8')).join('\n');
for (const id of ids) {
  const uses = source.match(new RegExp(`photo\\(\\s*['"\`]${id}['"\`]\\s*\\)`, 'g'))?.length ?? 0;
  if (uses !== 1) problems.push(`${id} is used ${uses} times in src/ (must be exactly once)`);
}

if (problems.length) {
  console.error(`check-images failed (${problems.length}):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`check-images: ok (${photos.length} photos, each used once)`);
