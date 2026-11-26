import { endpointKey, rateLimited } from '@/lib/forms/server';
import { createPortalSession } from '@/lib/stripe';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/billing-portal { sessionId }: after checkout, opens the Stripe Customer Portal for
 * that subscriber so they can update their card or cancel at any time.
 */
export async function POST(request: Request) {
  if (rateLimited(endpointKey(request))) return Response.json({ ok: false }, { status: 429 });
  const body = (await request.json().catch(() => null)) as { sessionId?: unknown } | null;
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId : '';
  const portal = await createPortalSession(sessionId);
  if (!portal.ok) {
    console.error(`[billing-portal] ${portal.reason}`);
    return Response.json({ ok: false, errors: { form: 'We could not open your billing page. Please call us, or use the link in your receipt email.' } }, { status: 502 });
  }
  return Response.json({ ok: true, url: portal.data.url });
}
