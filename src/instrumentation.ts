import { missingProductionEnv } from './lib/env';

/**
 * Runs once when the server starts. In production, logs any setting the lead forms need, so a
 * missing one shows up in the host's logs at deploy time instead of as silently lost leads.
 * The forms themselves fail closed and tell visitors to call (src/lib/email.ts).
 */
export function register() {
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_RUNTIME !== 'nodejs') return;
  const missing = missingProductionEnv();
  if (missing.length) console.error(`[env] Missing production settings: ${missing.join(', ')}. Lead forms will ask visitors to call instead.`);
}
