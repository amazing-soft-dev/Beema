import { sendLead } from '@/lib/email';
import type { z } from 'zod';
import type { contactSchema } from './schemas';
import { consentRecord } from './consent';
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
    // The exact wording the visitor agreed to (or that they did not), with the time.
    'Consent to contact': consentRecord(d.consent),
  });
  if (!sent.ok) {
    console.error(`[lead] ${subject} email failed: ${sent.reason}`);
    return failed();
  }
  return ok();
}
