import type { z } from 'zod';
import { fieldErrors } from './schemas.ts';

/**
 * Server helpers for the form API routes (Node runtime).
 *
 * Rate limiting is best-effort and in memory: each serverless instance keeps its own
 * counts, so it slows down floods from one address but is not a hard global limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_KEYS = 5000;
const hits = new Map<string, number[]>();

/**
 * True once `key` has made more than `limit` requests in the last 10 minutes. Keys are per
 * endpoint and address (see endpointKey), so one form never uses up another's allowance.
 */
export function rateLimited(key: string, now = Date.now(), limit = MAX_PER_WINDOW): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.delete(key);
  hits.set(key, recent); // re-insert, so the Map stays ordered from least to most recently seen
  // Keep memory bounded by dropping the least recently seen addresses, never everyone at once.
  for (const oldest of hits.keys()) {
    if (hits.size <= MAX_KEYS) break;
    hits.delete(oldest);
  }
  return recent.length > limit;
}

export function clientKey(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/** Rate-limit key for one endpoint and one address, such as "/api/contact 203.0.113.7". */
export function endpointKey(request: Request): string {
  return `${new URL(request.url).pathname} ${clientKey(request)}`;
}

export type FormResult = { ok: true } | { ok: false; errors: Record<string, string> };

const json = (body: FormResult, status: number) => Response.json(body, { status });

/**
 * Parse JSON or form data, apply the honeypot and rate limit, and validate with `schema`.
 * Bots that fill the honeypot get a fake success so they learn nothing.
 */
export async function readForm<S extends z.ZodType>(request: Request, schema: S): Promise<{ data: z.output<S> } | { response: Response }> {
  if (rateLimited(endpointKey(request))) {
    return { response: json({ ok: false, errors: { form: 'Too many requests. Please wait a few minutes or call us instead.' } }, 429) };
  }
  let raw: Record<string, unknown>;
  try {
    raw = request.headers.get('content-type')?.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return { response: json({ ok: false, errors: { form: 'We could not read your form. Please try again.' } }, 400) };
  }
  // A JSON body of null, a number or a list is not a form.
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { response: json({ ok: false, errors: { form: 'We could not read your form. Please try again.' } }, 400) };
  }
  if (typeof raw.website === 'string' && raw.website.length > 0) return { response: json({ ok: true }, 200) };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { response: json({ ok: false, errors: fieldErrors(parsed.error) }, 422) };
  return { data: parsed.data };
}

export const ok = () => json({ ok: true }, 200);
export const failed = (message = 'Something went wrong on our side. Please call us instead.') => json({ ok: false, errors: { form: message } }, 502);
