// Content hash of the PDF sources. Line endings are normalized so Windows and Linux agree.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (p) => (statSync(p).isDirectory() ? readdirSync(p).sort().flatMap((n) => walk(join(p, n))) : [p]);

export function sourcesHash(sources) {
  const hash = createHash('sha256');
  for (const file of sources.filter(existsSync).flatMap(walk).map((f) => f.replaceAll('\\', '/')).sort()) {
    hash.update(file);
    hash.update(readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  }
  return hash.digest('hex');
}
