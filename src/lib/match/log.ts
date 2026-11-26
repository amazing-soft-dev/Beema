import { z } from 'zod';
import { matchTypes } from './engine.ts';

/**
 * What a plan match log may contain: the ZIP code and birth month (cut down below) and the
 * result. The other answers (coverage, doctors, drugs, budget, travel) never reach the server,
 * and any extra field is dropped (review 2026-11-25, INS-32).
 */
export const matchLogSchema = z.object({
  answers: z.object({
    zip: z.string().regex(/^\d{5}$/),
    birthMonth: z.string().regex(/^\d{4}-\d{2}$/),
  }),
  result: z.object({ type: z.enum(matchTypes as [string, ...string[]]), reasons: z.array(z.string().max(300)).length(3) }),
});

/** The log line: ZIP cut to 3 digits and birth month to the year, so no one is identified. */
export function matchLogLine(input: z.output<typeof matchLogSchema>, at = new Date()) {
  const { answers: a, result } = input;
  return {
    event: 'plan_match',
    at: at.toISOString(),
    zip3: a.zip.slice(0, 3),
    birthYear: a.birthMonth.slice(0, 4),
    result: result.type,
    reasons: result.reasons,
  };
}
