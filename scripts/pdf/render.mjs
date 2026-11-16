// npm run pdf: render the guide pages to tagged, bookmarked PDFs with headless Chromium.
// Expects a production build (npm run pdf runs `next build` first), starts `next start` on a
// spare port, prints each page with the print stylesheet, writes the files and a manifest
// with the content hash that pdf:check compares in CI.
import { spawn } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { PAGE_PDFS, PAGE_PDF_DIR, PDF_SOURCES } from './config.mjs';
import { sourcesHash } from './hash.mjs';

const PORT = 4310;
const BASE = `http://localhost:${PORT}`;
const require = createRequire(import.meta.url);

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

const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', String(PORT)], { stdio: 'ignore' });
try {
  await waitForServer(BASE);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
  mkdirSync(PAGE_PDF_DIR, { recursive: true });
  const files = {};
  for (const p of PAGE_PDFS) {
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = `${PAGE_PDF_DIR}/${p.slug}.pdf`;
    await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
    files[p.slug] = { path: `/pdf/${p.slug}.pdf`, title: p.title, bytes: statSync(out).size };
    console.log(`pdf: ${out} (${Math.round(files[p.slug].bytes / 1024)} KB)`);
  }
  await browser.close();
  writeFileSync(`${PAGE_PDF_DIR}/manifest.json`, `${JSON.stringify({ hash: sourcesHash(PDF_SOURCES), generatedAt: new Date().toISOString(), files }, null, 2)}\n`);
} finally {
  server.kill();
}
