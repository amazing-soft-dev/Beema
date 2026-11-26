import { sendLead } from '@/lib/email';
import { type StripeEvent, subscriptionNotice, verifyStripeSignature } from '@/lib/stripe';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/stripe-webhook: Stripe's notice of new, changed and cancelled subscriptions. The
 * signature is checked against STRIPE_WEBHOOK_SECRET on the raw body; each event the agency
 * needs becomes an email to the leads inbox. Point the Stripe webhook endpoint here.
 */
export async function POST(request: Request) {
  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const notice = subscriptionNotice(event);
  if (notice) {
    const sent = await sendLead(notice.subject, notice.fields);
    // A 500 makes Stripe retry later, so a failed email is not silently lost.
    if (!sent.ok) {
      console.error(`[stripe-webhook] ${event.type} email failed: ${sent.reason}`);
      return Response.json({ ok: false }, { status: 500 });
    }
  }
  return Response.json({ ok: true });
}
