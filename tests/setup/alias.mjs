import { register } from 'node:module';

// Resolve Next's @/ alias and extensionless imports in tests (see alias-hooks.mjs).
register('./alias-hooks.mjs', import.meta.url);
