// npm run images:fetch: download every manifest photo that is not in public/photos yet.
// Originals are resized to at most 2400px wide, stripped of metadata and saved as JPEG
// so the repository stays small; WebP variants are built separately (build.mjs).
import { existsSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { LICENSES, PHOTOS_DIR, photoFile, readManifest } from './lib.mjs';

const photos = readManifest();
mkdirSync(PHOTOS_DIR, { recursive: true });

let fetched = 0;
for (const p of photos) {
  if (!LICENSES[p.source]) throw new Error(`${p.id}: unknown source "${p.source}" (use unsplash or pexels)`);
  if (existsSync(photoFile(p.id))) continue;

  const res = await fetch(p.downloadUrl, { redirect: 'follow', signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`${p.id}: HTTP ${res.status} from ${p.downloadUrl}`);
  const input = Buffer.from(await res.arrayBuffer());

  await sharp(input)
    .rotate() // honor EXIF orientation before metadata is stripped
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(photoFile(p.id));
  fetched += 1;
  console.log(`images:fetch: ${p.id} ← ${p.source} (${p.photographer})`);
}
console.log(`images:fetch: ${fetched} downloaded, ${photos.length - fetched} already present`);
