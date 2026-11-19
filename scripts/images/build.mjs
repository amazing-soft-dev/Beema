// npm run images: pre-build responsive WebP variants for the static export.
// public/photos/<id>.jpg → public/images/<id>-<w>.webp for each width the loader asks for.
// Server builds don't need this: Next's optimizer resizes on demand.
import { existsSync, mkdirSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { VARIANTS_DIR, WEBP_QUALITY, WIDTHS, photoFile, readManifest } from './lib.mjs';

mkdirSync(VARIANTS_DIR, { recursive: true });
let built = 0;
for (const p of readManifest()) {
  const src = photoFile(p.id);
  if (!existsSync(src)) throw new Error(`${src} is missing: run npm run images:fetch`);
  const srcTime = statSync(src).mtimeMs;
  for (const w of WIDTHS) {
    const out = `${VARIANTS_DIR}/${p.id}-${w}.webp`;
    if (existsSync(out) && statSync(out).mtimeMs >= srcTime) continue;
    // Never upscale: a 1600px original still gets a "-2400" file so the loader's URL resolves.
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: WEBP_QUALITY }).toFile(out);
    built += 1;
  }
}
console.log(`images: ${built} WebP variants written`);
