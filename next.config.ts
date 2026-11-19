import type { NextConfig } from 'next';

/**
 * Two build targets:
 * - server (default `next build`): what Vercel runs. `/api` routes and Resend work,
 *   and images go through Next's optimizer (AVIF, then WebP).
 * - static (`NEXT_OUTPUT=export`): plain HTML in `out/`, no server, no `/api`.
 *   `npm run images` pre-builds WebP variants and a custom loader serves them.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

// Analytics run in Vercel production only. Every other build swaps the Vercel packages
// for no-op stubs, so their client code is not shipped at all.
const analyticsStub = './src/lib/analytics-stub.tsx';
const analyticsAliases: Record<string, string> =
  process.env.VERCEL_ENV === 'production' && !isStaticExport
    ? {}
    : { '@vercel/analytics/next': analyticsStub, '@vercel/speed-insights/next': analyticsStub, '@vercel/analytics': analyticsStub };

const nextConfig: NextConfig = {
  // API routes are named route.server.ts. Only the server build treats "server.ts" as a
  // route extension, so the static export never sees POST handlers (it cannot run them).
  pageExtensions: isStaticExport ? ['tsx', 'ts'] : ['server.ts', 'tsx', 'ts'],
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  // Lets client code know there is no server (forms show a phone fallback instead).
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? '1' : '' },
  turbopack: {
    resolveAlias: analyticsAliases,
  },
  images: isStaticExport
    ? { loader: 'custom', loaderFile: './src/lib/image-loader.ts' }
    : // 85 is PHOTO_QUALITY (src/lib/image-widths.ts); Next only serves qualities listed here.
      { formats: ['image/avif', 'image/webp'], qualities: [85] },
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
};

export default nextConfig;
