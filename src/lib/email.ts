import { Resend } from 'resend';
import { site } from '@/content/site';

/**
 * Lead and guide emails through Resend (server only).
 * Env: RESEND_API_KEY, LEADS_TO_EMAIL (where leads go), LEADS_FROM_EMAIL (a verified sender).
 * Without a key, development logs the email and succeeds; production reports failure so
 * the visitor is told to call instead of believing the message was sent.
 */
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export type EmailResult = { ok: true } | { ok: false; reason: string };

export function renderFields(fields: Record<string, string>) {
  const rows = Object.entries(fields);
  return {
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `<table cellpadding="6" style="border-collapse:collapse;font:16px/1.5 Arial,sans-serif">${rows
      .map(([k, v]) => `<tr><th align="left" style="vertical-align:top;padding-right:16px">${escape(k)}</th><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')}</table>`,
  };
}

export async function sendEmail({ to, subject, text, html, replyTo }: { to: string; subject: string; text: string; html: string; replyTo?: string }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEADS_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;
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

/** Sends a new lead to the agency inbox (LEADS_TO_EMAIL, falling back to site.email). */
export function sendLead(subject: string, fields: Record<string, string>) {
  const body = renderFields(fields);
  return sendEmail({ to: process.env.LEADS_TO_EMAIL ?? site.email, subject: `${subject} | ${site.shortName} website`, ...body });
}
