import { findGuide, guideHref } from '@/content/guides-library';
import { site } from '@/content/site';
import { licenseLine, licenseLineHtml, sendEmail } from '@/lib/email';
import { guideEmailSchema } from '@/lib/forms/schemas';
import { failed, ok, readForm } from '@/lib/forms/server';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/guide-email: "Email me a copy". Sends the visitor a link to one guide. The
 * address is used for this email only; nobody is added to a mailing list.
 */
export async function POST(request: Request) {
  const parsed = await readForm(request, guideEmailSchema);
  if ('response' in parsed) return parsed.response;
  // The name is not put into the email: this form can send to any address, so nothing a visitor
  // types may reach someone else's inbox (stops the form being used to send spam).
  const { email, guide: slug } = parsed.data;
  const guide = findGuide(slug);
  if (!guide) return Response.json({ ok: false, errors: { guide: 'Please choose a guide from the list.' } }, { status: 422 });

  const link = new URL(guideHref(guide.slug), site.url).toString();
  const privacy = new URL('/legal/privacy', site.url).toString();
  const text = [
    'Hello,',
    '',
    `Here is the guide you asked for: ${guide.title} (${guide.planYear}).`,
    link,
    '',
    `Questions? Call ${site.phone.display} (${site.tty.display}).`,
    '',
    `You received this one email because you asked for it on our website. We have not added you to any mailing list. Privacy policy: ${privacy}`,
    licenseLine,
  ].join('\n');
  const html = `<div style="font:18px/1.6 Arial,sans-serif;color:#0b2545"><p>Hello,</p><p>Here is the guide you asked for: <strong>${guide.title}</strong> (${guide.planYear}).</p><p><a href="${link}" style="display:inline-block;background:#f5c451;color:#0b2545;padding:14px 28px;border-radius:999px;font-weight:bold;text-decoration:none">Download the PDF</a></p><p>Questions? Call ${site.phone.display} (${site.tty.display}).</p><p style="font-size:16px">You received this one email because you asked for it on our website. We have not added you to any mailing list. <a href="${privacy}">Privacy policy</a>.<br>${licenseLineHtml}</p></div>`;

  const sent = await sendEmail({ to: email, subject: `Your guide: ${guide.title}`, text, html, replyTo: process.env.LEADS_TO_EMAIL ?? site.email });
  if (!sent.ok) {
    console.error(`[guide-email] failed: ${sent.reason}`);
    return failed('We could not send the email. You can download the guide on this page instead.');
  }
  return ok();
}
