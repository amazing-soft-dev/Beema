import { Resend } from 'resend';
import { site } from '@/content/site';
import { emailRoute } from './env';
import { licenseLine, licenseLineHtml } from './license-line';

export { licenseLine, licenseLineHtml };

/**
 * Lead and guide emails through Resend (server only).
 * Env: RESEND_API_KEY, LEADS_TO_EMAIL (where leads go), LEADS_FROM_EMAIL (a verified sender).
 * Without a key, development logs the email and succeeds; production reports failure so
 * the visitor is told to call instead of believing the message was sent.
 */
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export type EmailResult = { ok: true } | { ok: false; reason: string };

export function renderFields(fields: Record<string, string>) {
  const rows = Object.entries(fields);
  return {
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `<table cellpadding="6" style="border-collapse:collapse;font:16px/1.5 Arial,sans-serif">${rows
      .map(([k, v]) => `<tr><th align="left" style="vertical-align:top;padding-right:16px">${escapeHtml(k)}</th><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')}</table>`,
  };
}

export async function sendEmail({ to, subject, text, html, replyTo }: { to: string; subject: string; text: string; html: string; replyTo?: string }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const route = leadRoute();
  if (!route.ok) return { ok: false, reason: route.reason };
  const { from } = route;
  if (!key) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[email:dev] to=${to} subject=${subject}\n${text}`);
      return { ok: true };
    }
    return { ok: false, reason: 'RESEND_API_KEY is not set' };
  }
  try {
    const { error } = await new Resend(key).emails.send({ from, to, subject, text, html, replyTo });
    return error ? { ok: false, reason: error.message } : { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'unknown error' };
  }
}

/** Sender and lead inbox from the environment; development falls back to safe defaults. */
const leadRoute = () => emailRoute(process.env, { from: `${site.name} <onboarding@resend.dev>`, to: site.email });

/** Sends a new lead to the agency inbox (LEADS_TO_EMAIL; required in production). */
export function sendLead(subject: string, fields: Record<string, string>) {
  const route = leadRoute();
  if (!route.ok) return Promise.resolve<EmailResult>({ ok: false, reason: route.reason });
  const body = renderFields(fields);
  return sendEmail({
    to: route.to,
    subject: `${subject} | ${site.shortName} website`,
    text: `${body.text}\n\n${licenseLine}`,
    html: `${body.html}<p style="font:14px/1.5 Arial,sans-serif">${licenseLineHtml}</p>`,
  });
}
