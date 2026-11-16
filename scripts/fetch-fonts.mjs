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

const target = (weight) => join(OUT_DIR, `switzer-${weight}.woff2`);

async function main() {
  if (WEIGHTS.every((w) => existsSync(target(w)))) {
    console.log('fetch-fonts: Switzer already present');
    return;
  }
  mkdirSync(OUT_DIR, { recursive: true });
  const css = await (await fetch(CSS_URL, { signal: AbortSignal.timeout(15_000) })).text();

  // Each @font-face block lists the woff2 URL first, then its font-weight.
  for (const block of css.split('@font-face').slice(1)) {
    const url = /url\('([^']+\.woff2)'\)/.exec(block)?.[1];
    const weight = Number(/font-weight:\s*(\d+)/.exec(block)?.[1]);
    if (!url || !WEIGHTS.includes(weight)) continue;
    const res = await fetch(url.startsWith('//') ? `https:${url}` : url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} for weight ${weight}`);
    writeFileSync(target(weight), Buffer.from(await res.arrayBuffer()));
    console.log(`fetch-fonts: saved ${target(weight)}`);
  }

  const missing = WEIGHTS.filter((w) => !existsSync(target(w)));
  if (missing.length) throw new Error(`weights not found in Fontshare CSS: ${missing.join(', ')}`);
}

main().catch((err) => {
  console.warn(`fetch-fonts: could not download Switzer (${err.message}); headings will use the Geist fallback.`);
});
