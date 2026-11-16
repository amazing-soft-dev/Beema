import { site } from '@/content/site';
import { sendEmail, sendLead } from '@/lib/email';
import { newsletterSchema } from '@/lib/forms/schemas';
import { failed, ok, readForm } from '@/lib/forms/server';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/newsletter: records a signup with the agency and confirms it to the subscriber,
 * with how to unsubscribe and a link to the privacy policy.
 */
export async function POST(request: Request) {
  const parsed = await readForm(request, newsletterSchema);
  if ('response' in parsed) return parsed.response;
  const { email, name } = parsed.data;

  const notified = await sendLead('Newsletter signup', { Email: email, Name: name || '(not given)', 'Signed up at': new Date().toISOString() });
  if (!notified.ok) {
    console.error(`[newsletter] agency email failed: ${notified.reason}`);
    return failed('We could not sign you up just now. Please try again later.');
  }

  const unsubscribe = `mailto:${site.email}?subject=Unsubscribe`;
  const privacy = new URL('/legal/privacy', site.url).toString();
  await sendEmail({
    to: email,
    subject: `You are signed up for ${site.shortName} Medicare updates`,
    text: `Thank you for signing up. We send a short update a few times a year, mostly before Annual Enrollment each fall.\n\nTo unsubscribe at any time, reply to this email or write to ${site.email} with "Unsubscribe".\nPrivacy policy: ${privacy}\n${site.legalName}`,
    html: `<div style="font:18px/1.6 Arial,sans-serif;color:#0f3d2e"><p>Thank you for signing up. We send a short update a few times a year, mostly before Annual Enrollment each fall.</p><p style="font-size:16px">To unsubscribe at any time, reply to this email or <a href="${unsubscribe}">click here to email us</a>. <a href="${privacy}">Privacy policy</a>.<br>${site.legalName}</p></div>`,
    replyTo: process.env.LEADS_TO_EMAIL ?? site.email,
  });
  return ok();
}
