/**
 * Module resolve hooks for the test runner only: map Next's "@/…" alias to src/ and let
 * extensionless relative imports (as Next allows) find their .ts file, so route handlers can
 * be imported and tested directly. Registered by tests/setup/alias.mjs.
 */
const SRC = new URL('../../src/', import.meta.url);
const EXTENSIONS = ['', '.ts', '.tsx', '/index.ts'];

export async function resolve(specifier, context, next) {
  const isAlias = specifier.startsWith('@/');
  const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
  if (!isAlias && !isRelative) return next(specifier, context);
  const base = isAlias ? new URL(specifier.slice(2), SRC).href : new URL(specifier, context.parentURL).href;
  let lastError;
  for (const ext of EXTENSIONS) {
    try {
      return await next(base + ext, context);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
