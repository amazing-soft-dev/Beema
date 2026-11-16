import { z } from 'zod';

/**
 * Form schemas shared by the browser (inline errors) and the API routes (the real check).
 * Short forms, per the content plan: name, ZIP code, phone and best time to call.
 * Messages are plain sentences shown directly to visitors.
 */

const digits = (s: string) => s.replace(/\D/g, '');

export const nameField = z.string().trim().min(2, 'Please enter your name.').max(80, 'Please use 80 characters or fewer.');

export const zipField = z
  .string()
  .trim()
  .regex(/^\d{5}$/, 'Please enter a 5-digit ZIP code.');

/** US phone: 10 digits, or 11 starting with 1. Normalized to +1XXXXXXXXXX. */
export const phoneField = z
  .string()
  .trim()
  .transform(digits)
  .refine((d) => d.length === 10 || (d.length === 11 && d.startsWith('1')), 'Please enter a 10-digit phone number.')
  .transform((d) => `+1${d.slice(-10)}`);

export const emailField = z.string().trim().toLowerCase().pipe(z.email('Please enter an email address like name@example.com.'));

export const BEST_TIMES = ['morning', 'afternoon', 'evening', 'anytime'] as const;
export const bestTimeField = z.enum(BEST_TIMES, { error: 'Please choose the best time to call.' });

/** The phone-consent checkbox sends "yes" only when ticked. */
export const consentField = z.literal('yes', { error: 'Please check the box so we may call you. It is required to request a call.' });

/** Honeypot: hidden from people, so any value means a bot. */
export const honeypotField = z.string().max(0).optional().or(z.literal(''));

export const contactSchema = z.object({
  name: nameField,
  zip: zipField,
  phone: phoneField,
  bestTime: bestTimeField,
  consent: consentField,
  website: honeypotField,
});

export const callbackSchema = contactSchema;

export const guideEmailSchema = z.object({
  name: nameField,
  email: emailField,
  guide: z.string().trim().min(1).max(80),
  website: honeypotField,
});

export const newsletterSchema = z.object({
  email: emailField,
  name: z.string().trim().max(80).optional(),
  website: honeypotField,
});

export type FieldErrors = Record<string, string>;

/** First error message per field, keyed by field name. */
export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    out[key] ??= issue.message;
  }
  return out;
}
