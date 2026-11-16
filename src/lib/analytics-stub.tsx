/**
 * Stand-in for @vercel/analytics and @vercel/speed-insights in every build except Vercel
 * production (aliased in next.config.ts), so other builds ship none of their client code.
 */
export function Analytics() {
  return null;
}

export function SpeedInsights() {
  return null;
}

export function track(): void {}
