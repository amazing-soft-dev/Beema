// Builds the small logo files the site serves from the uploaded 1024px originals
// (public/brand/senior_ai_plans_{light,dark}.png, about 380 KB each).
// Run after replacing an original: node scripts/brand/build-logos.mjs
import sharp from 'sharp';

const HEIGHTS = [48, 96, 192]; // 1x, 2x and print / Open Graph sizes

for (const tone of ['light', 'dark']) {
  const src = `public/brand/senior_ai_plans_${tone}.png`;
  // Trim the transparent padding so the mark sits flush with the brand name.
  const trimmed = await sharp(src).trim({ threshold: 1 }).png().toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  for (const h of HEIGHTS) {
    const out = `public/brand/logo-${tone}-${h}.webp`;
    await sharp(trimmed).resize({ height: h }).webp({ quality: 90, alphaQuality: 100 }).toFile(out);
  }
  await sharp(trimmed).resize({ height: 192 }).png({ compressionLevel: 9 }).toFile(`public/brand/logo-${tone}-192.png`);
  console.log(`${tone}: trimmed ${width}x${height}, ratio ${(width / height).toFixed(3)}`);
}
