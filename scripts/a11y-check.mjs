// Accessibility check on the static export (CI static build job, after build:static).
// Serves out/ locally, opens every exported page in Chromium, runs axe (WCAG 2.x A/AA and
// best practices) and fails on serious or critical violations. Internal /print pages are
// skipped. Usage: node scripts/a11y-check.mjs [--all-impacts]
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, relative, sep } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const OUT = 'out';
const PORT = 4320;
const FAIL_ON = process.argv.includes('--all-impacts') ? ['minor', 'moderate', 'serious', 'critical'] : ['serious', 'critical'];
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain', '.xml': 'application/xml' };

const server = createServer((req, res) => {
  let path = join(OUT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
  if (!existsSync(path)) path = join(OUT, '404.html');
  res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' });
  createReadStream(path).pipe(res);
}).listen(PORT);

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const pages = walk(OUT)
  .filter((f) => f.endsWith('index.html'))
  .map((f) => `/${relative(OUT, f).split(sep).slice(0, -1).join('/')}`.replace(/\/$/, '') || '/')
  .filter((p) => !p.startsWith('/print'))
  .sort();

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
let failures = 0;
for (const path of pages) {
  const page = await context.newPage();
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  const bad = violations.filter((v) => FAIL_ON.includes(v.impact ?? ''));
  for (const v of bad) {
    failures += 1;
    console.error(`✖ ${path} [${v.impact}] ${v.id}: ${v.help}\n    ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join('\n    ')}`);
  }
  if (!bad.length) console.log(`✔ ${path}`);
  await page.close();
}
await browser.close();
server.close();
if (failures) {
  console.error(`\na11y: ${failures} serious or critical issue(s) on ${pages.length} pages`);
  process.exit(1);
}
console.log(`\na11y: ${pages.length} pages, no serious or critical issues`);
