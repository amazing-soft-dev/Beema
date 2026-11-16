import type { NextConfig } from 'next';

/**
 * Two build targets:
 * - server (default `next build`): what Vercel runs. `/api` routes and Resend work,
 *   and images go through Next's optimizer (AVIF, then WebP).
 * - static (`NEXT_OUTPUT=export`): plain HTML in `out/`, no server, no `/api`.
 *   `npm run images` pre-builds WebP variants and a custom loader serves them.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  images: isStaticExport
    ? { loader: 'custom', loaderFile: './src/lib/image-loader.ts' }
    : { formats: ['image/avif', 'image/webp'] },
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
};

export default nextConfig;
