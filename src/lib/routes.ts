import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * Every static page route under src/app, read from the file system at build time, so the
 * sitemap never lists a page that does not exist. Mirrors scripts/check-export.mjs:
 * route groups are flattened; dynamic, api, print and private (_) segments are skipped.
 */
export function listStaticRoutes(appDir = join(process.cwd(), 'src/app')): string[] {
  const routes: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/^page\.(tsx|ts|jsx|js|mdx)$/.test(name)) {
        const segments = relative(appDir, dir).split(sep).filter(Boolean);
        if (segments.some((s) => s.startsWith('[') || s === 'api' || s === 'print' || s.startsWith('_'))) continue;
        const route = segments.filter((s) => !(s.startsWith('(') && s.endsWith(')')));
        routes.push(`/${route.join('/')}`);
      }
    }
  };
  walk(appDir);
  return routes.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}
