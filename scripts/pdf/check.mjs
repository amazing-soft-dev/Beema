// pdf:check (CI): fails when the guide content changed but `npm run pdf` was not re-run,
// or when a PDF listed in the manifest is missing. Needs no browser.
import { existsSync, readFileSync } from 'node:fs';
import { PAGE_PDFS, PAGE_PDF_DIR, PDF_SOURCES } from './config.mjs';
import { sourcesHash } from './hash.mjs';

const manifestPath = `${PAGE_PDF_DIR}/manifest.json`;
if (!existsSync(manifestPath)) {
  console.error(`pdf:check: ${manifestPath} is missing. Run npm run pdf.`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const problems = [];
if (manifest.hash !== sourcesHash(PDF_SOURCES)) problems.push('guide content changed since the PDFs were generated. Run npm run pdf and commit public/pdf.');
for (const p of PAGE_PDFS) if (!existsSync(`${PAGE_PDF_DIR}/${p.slug}.pdf`)) problems.push(`${PAGE_PDF_DIR}/${p.slug}.pdf is missing`);

if (problems.length) {
  console.error(`pdf:check failed:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`pdf:check: ok (${PAGE_PDFS.length} PDFs match the content)`);
