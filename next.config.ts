import type { NextConfig } from 'next';

/**
 * Two build targets:
 * - server (default `next build`): what Vercel runs; `/api` routes and Resend work.
 * - static (`NEXT_OUTPUT=export`): plain HTML in `out/`, no server, no `/api`.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
};

export default nextConfig;
