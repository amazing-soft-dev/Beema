import { notices } from '../../content/site.ts';

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
