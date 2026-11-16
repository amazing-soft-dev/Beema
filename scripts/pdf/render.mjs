// Renders PDFs with headless Chromium from a production build (`next build` runs first).
//   npm run pdf          guide pages → public/pdf/<slug>.pdf + manifest (hash for pdf:check)
//   npm run pdf:library  ready-made library → public/guides/<slug>.pdf (opt-in: those files may
//                        be replaced by uploaded designs, so the default run never overwrites them)
import { spawn } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { LIBRARY, LIBRARY_DIR, PAGE_PDFS, PAGE_PDF_DIR, PDF_SOURCES } from './config.mjs';
import { addCheckboxes } from './fillable.mjs';
import { sourcesHash } from './hash.mjs';
import sharp from 'sharp';

const PORT = 4310;
const BASE = `http://localhost:${PORT}`;
const require = createRequire(import.meta.url);
const library = process.argv.includes('--library');

async function waitForServer(url, ms = 60_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server at ${url} did not start`);
}

/** Print one URL to a tagged, bookmarked Letter-size PDF; returns its size in bytes. */
async function printTo(page, url, out) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  const bytes = statSync(out).size;
  console.log(`pdf: ${out} (${Math.round(bytes / 1024)} KB)`);
  return bytes;
}

const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', String(PORT)], { stdio: 'ignore' });
try {
  await waitForServer(BASE);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });

  if (library) {
    mkdirSync(LIBRARY_DIR, { recursive: true });
    for (const g of LIBRARY) {
      const out = `${LIBRARY_DIR}/${g.slug}.pdf`;
      await printTo(page, `${BASE}/print/library/${g.slug}`, out);
      // Cover thumbnail for the Resources library: the first page, 360px wide.
      const box = (await page.locator('article').first().boundingBox()) ?? { x: 0, y: 0, width: 816 };
      const shot = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.width, height: Math.round(box.width * (11 / 8.5)) } });
      await sharp(shot).resize({ width: 360 }).webp({ quality: 80 }).toFile(`${LIBRARY_DIR}/${g.slug}-cover.webp`);
      // Checklists: measure each printed box on its fixed-size page, then add a fillable field.
      const boxes = await page.evaluate(() =>
        [...document.querySelectorAll('[data-pdf-page]')].flatMap((pg, pageIndex) => {
          const p = pg.getBoundingClientRect();
          return [...pg.querySelectorAll('[data-checkbox-box]')].map((el) => {
            const r = el.getBoundingClientRect();
            return { pageIndex, x: r.left - p.left, y: r.top - p.top, w: r.width, h: r.height, label: el.getAttribute('data-checkbox-box') ?? '' };
          });
        }),
      );
      if (boxes.length) console.log(`pdf: ${out}: ${await addCheckboxes(out, boxes)} fillable checkboxes`);
    }
  } else {
    mkdirSync(PAGE_PDF_DIR, { recursive: true });
    const files = {};
    for (const p of PAGE_PDFS) {
      const bytes = await printTo(page, `${BASE}${p.path}`, `${PAGE_PDF_DIR}/${p.slug}.pdf`);
      files[p.slug] = { path: `/pdf/${p.slug}.pdf`, title: p.title, bytes };
    }
    const manifest = { hash: sourcesHash(PDF_SOURCES), generatedAt: new Date().toISOString(), files };
    writeFileSync(`${PAGE_PDF_DIR}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  await browser.close();
} finally {
  server.kill();
}
