import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Vercel Web Analytics and Speed Insights. Outside Vercel production these imports resolve
 * to no-op stubs (next.config.ts → src/lib/analytics-stub.tsx), so previews, local builds
 * and the static export render nothing and ship none of the client code.
 */
export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
