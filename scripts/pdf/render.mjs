// Renders PDFs with headless Chromium from a production build (`next build` runs first).
//   npm run pdf          guide pages → public/pdf/<slug>.pdf + manifest (hash for pdf:check)
//   npm run pdf:library  ready-made library → public/guides/<slug>.pdf (opt-in: those files may
//                        be replaced by uploaded designs, so the default run never overwrites them)
import { spawn } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { LIBRARY, LIBRARY_DIR, PAGE_PDFS, PAGE_PDF_DIR, PDF_SOURCES } from './config.mjs';
import { sourcesHash } from './hash.mjs';

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
    for (const g of LIBRARY) await printTo(page, `${BASE}/print/library/${g.slug}`, `${LIBRARY_DIR}/${g.slug}.pdf`);
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
