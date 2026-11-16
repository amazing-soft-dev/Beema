// Downloads Switzer (ITF Free Font License) from Fontshare into public/fonts/.
//
// Why not commit the files? The FFL allows self-hosting on our own website but forbids
// distributing the font through a repository or publicly accessible server, and this
// repository is public. So the files are fetched at build time and git-ignored.
//
// Never fails the build: if Fontshare is unreachable, headings fall back to Geist.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const WEIGHTS = [600, 700];
const OUT_DIR = 'public/fonts';
const CSS_URL = `https://api.fontshare.com/v2/css?f[]=switzer@${WEIGHTS.join(',')}&display=swap`;

// WOFF2 for the browser; TTF of the heading weight for build-time images (Satori can't read WOFF2).
const FILES = [
  ...WEIGHTS.map((weight) => ({ weight, format: 'woff2' })),
  { weight: 600, format: 'ttf' },
];
const target = ({ weight, format }) => join(OUT_DIR, `switzer-${weight}.${format}`);

async function main() {
  const missing = FILES.filter((f) => !existsSync(target(f)));
  if (!missing.length) {
    console.log('fetch-fonts: Switzer already present');
    return;
  }
  mkdirSync(OUT_DIR, { recursive: true });
  const css = await (await fetch(CSS_URL, { signal: AbortSignal.timeout(15_000) })).text();

  // Each @font-face block lists woff2, woff and ttf URLs, then its font-weight.
  const blocks = css.split('@font-face').slice(1);
  for (const file of missing) {
    const block = blocks.find((b) => Number(/font-weight:\s*(\d+)/.exec(b)?.[1]) === file.weight);
    const url = block && new RegExp(`url\\('([^']+\\.${file.format})'\\)`).exec(block)?.[1];
    if (!url) throw new Error(`no ${file.format} for weight ${file.weight} in Fontshare CSS`);
    const res = await fetch(url.startsWith('//') ? `https:${url}` : url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${target(file)}`);
    writeFileSync(target(file), Buffer.from(await res.arrayBuffer()));
    console.log(`fetch-fonts: saved ${target(file)}`);
  }
}

main().catch((err) => {
  console.warn(`fetch-fonts: could not download Switzer (${err.message}); headings will use the Geist fallback.`);
});
