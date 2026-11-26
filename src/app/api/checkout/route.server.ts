import { checkoutSchema } from '@/lib/forms/schemas';
import { readForm } from '@/lib/forms/server';
import { createCheckoutSession } from '@/lib/stripe';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/checkout: starts Stripe Checkout for Plus or Family. Needs a state where the
 * subscriptions are offered (never California) and the fee disclosure ticked. Answers with the
 * Checkout URL, or tells the visitor to call when Stripe is not set up.
 */
export async function POST(request: Request) {
  const parsed = await readForm(request, checkoutSchema);
  if ('response' in parsed) return parsed.response;
  const { tier, billing, state } = parsed.data;
  const session = await createCheckoutSession({ tier, billing, state });
  if (!session.ok) {
    console.error(`[checkout] ${tier} ${billing}: ${session.reason}`);
    return Response.json({ ok: false, errors: { form: 'Online sign-up is not available right now. Please call us to start your subscription.' } }, { status: 503 });
  }
  return Response.json({ ok: true, url: session.data.url });
}
