import { createHash } from 'node:crypto';
import { notices } from '../../content/site.ts';

/** Bump when a lead form's fields or wording change, so each record names the form it came from. */
export const FORM_VERSION = '2026-11-26';

/** Short fingerprint of the exact consent wording, so a record shows which text was agreed to. */
export const consentTextVersion = createHash('sha256').update(notices.phoneConsent).digest('hex').slice(0, 12);

/**
 * The consent line copied into every lead email. The consent box is optional (review
 * 2026-11-25, INS-11): without it we may still return the call the visitor asked for,
 * dialled by hand, but never by autodialer, text or a prerecorded or artificial voice.
 */
export function consentRecord(consent: 'yes' | undefined, at = new Date()): string {
  const time = at.toISOString();
  return consent === 'yes'
    ? `Yes, checked at ${time}: "${notices.phoneConsent}"`
    : `No, not checked (${time}). Manual calls only about this request: no autodialer, texts, or prerecorded or artificial voice.`;
}

/**
 * Where and how the request was made, kept with the consent line as proof of consent
 * (review INS-12): page, form version, consent text version, IP address and browser.
 */
export function consentContext(request: Request, page: string | undefined): Record<string, string> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return {
    'Submitted from page': page || 'unknown',
    'Form version': FORM_VERSION,
    'Consent text version': consentTextVersion,
    'IP address': ip,
    Browser: (request.headers.get('user-agent') ?? 'unknown').slice(0, 200),
  };
}
