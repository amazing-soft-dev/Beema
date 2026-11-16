import { CONSENT_TEXT } from '@/components/compliance/ConsentCheckbox';
import { sendLead } from '@/lib/email';
import { planIntakeSchema } from '@/lib/forms/schemas';
import { failed, ok, readForm } from '@/lib/forms/server';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

const list = (rows: string[]) => (rows.length ? rows.map((r, i) => `${i + 1}. ${r}`).join('\n') : 'None listed');

/** POST /api/plan-intake: ZIP, medicines, doctors and contact details from the plan tool. */
export async function POST(request: Request) {
  const parsed = await readForm(request, planIntakeSchema);
  if ('response' in parsed) return parsed.response;
  const d = parsed.data;
  const sent = await sendLead('Plan comparison request', {
    Name: d.name,
    Phone: d.phone,
    'ZIP code': d.zip,
    'Best time to call': d.bestTime,
    Medicines: list(d.drugs.map((x) => [x.name, x.dose, x.frequency].filter(Boolean).join(', '))),
    Doctors: list(d.doctors.map((x) => [x.name, x.specialty, x.city].filter(Boolean).join(', '))),
    'Consent to contact': `Yes, checked at ${new Date().toISOString()}: "${CONSENT_TEXT}"`,
  });
  if (!sent.ok) {
    console.error(`[plan-intake] email failed: ${sent.reason}`);
    return failed();
  }
  return ok();
}
