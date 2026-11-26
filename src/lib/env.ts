/**
 * Settings production needs for leads to reach the agency (see .env.example). Missing ones
 * make the forms fail closed, telling visitors to call instead of pretending a lead was sent,
 * and are logged at server start (src/instrumentation.ts).
 */
type Env = Record<string, string | undefined>;

export const REQUIRED_PRODUCTION_ENV = ['RESEND_API_KEY', 'LEADS_FROM_EMAIL', 'LEADS_TO_EMAIL', 'NEXT_PUBLIC_SITE_URL'] as const;

export function missingProductionEnv(env: Env = process.env): string[] {
  return REQUIRED_PRODUCTION_ENV.filter((k) => !env[k]?.trim());
}

export type EmailRoute = { ok: true; from: string; to: string } | { ok: false; reason: string };

/**
 * Sender and lead inbox. In production both must be set: there is no fallback to Resend's test
 * sender (it cannot reach visitors) or to a guessed inbox (leads would be lost silently).
 * Outside production, development defaults keep local forms working.
 */
export function emailRoute(env: Env = process.env, devDefaults: { from: string; to: string }): EmailRoute {
  const from = env.LEADS_FROM_EMAIL?.trim();
  const to = env.LEADS_TO_EMAIL?.trim();
  if (env.NODE_ENV === 'production') {
    const missing = [!from && 'LEADS_FROM_EMAIL', !to && 'LEADS_TO_EMAIL'].filter(Boolean);
    if (missing.length) return { ok: false, reason: `${missing.join(' and ')} not set` };
    return { ok: true, from: from!, to: to! };
  }
  return { ok: true, from: from || devDefaults.from, to: to || devDefaults.to };
}
