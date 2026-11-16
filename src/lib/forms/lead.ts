import { CONSENT_TEXT } from '@/components/compliance/ConsentCheckbox';
import { sendLead } from '@/lib/email';
import type { z } from 'zod';
import type { contactSchema } from './schemas';
import { failed, ok, readForm } from './server';
import { contactSchema as schema } from './schemas';

const BEST_TIME: Record<string, string> = { morning: 'Morning (8 a.m. to noon)', afternoon: 'Afternoon (noon to 4 p.m.)', evening: 'Evening (4 to 6 p.m.)', anytime: 'Any time' };

/** Shared handler for the contact and callback routes: validate, email the lead, answer. */
export async function handleLead(request: Request, subject: string) {
  const parsed = await readForm(request, schema);
  if ('response' in parsed) return parsed.response;
  const d: z.output<typeof contactSchema> = parsed.data;
  const sent = await sendLead(subject, {
    Name: d.name,
    Phone: d.phone,
    'ZIP code': d.zip,
    'Best time to call': BEST_TIME[d.bestTime] ?? d.bestTime,
    // The exact wording the visitor agreed to, with the time, for the consent record.
    'Consent to contact': `Yes, checked at ${new Date().toISOString()}: "${CONSENT_TEXT}"`,
  });
  if (!sent.ok) {
    console.error(`[lead] ${subject} email failed: ${sent.reason}`);
    return failed();
  }
  return ok();
}
