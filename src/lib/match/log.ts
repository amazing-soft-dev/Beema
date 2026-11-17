import { z } from 'zod';
import { matchTypes } from './engine.ts';

/** What a plan match log may contain: the multiple-choice answers and the result, nothing else. */
export const matchLogSchema = z.object({
  answers: z.object({
    zip: z.string().regex(/^\d{5}$/),
    birthMonth: z.string().regex(/^\d{4}-\d{2}$/),
    work: z.enum(['none', 'employer-large', 'employer-small', 'retiree', 'cobra']),
    doctors: z.enum(['keep-specific', 'flexible', 'skip']),
    drugs: z.enum(['none', 'few', 'several', 'skip']),
    budget: z.enum(['low-premium', 'predictable', 'unsure']),
    travel: z.enum(['often', 'sometimes', 'rarely']),
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
    work: a.work,
    doctors: a.doctors,
    drugs: a.drugs,
    budget: a.budget,
    travel: a.travel,
    result: result.type,
    reasons: result.reasons,
  };
}
