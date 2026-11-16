// Each photo is used exactly once. The image manifest arrives in issue #3;
// until then there is nothing to check.
import { existsSync } from 'node:fs';

if (!existsSync('scripts/images/manifest.json')) {
  console.log('check-images: no image manifest yet, nothing to check');
  process.exit(0);
}
