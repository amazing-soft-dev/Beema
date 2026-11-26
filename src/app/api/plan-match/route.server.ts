import { endpointKey, rateLimited } from '@/lib/forms/server';
import { matchLogLine, matchLogSchema } from '@/lib/match/log';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/** POST /api/plan-match: one structured log line per match, for the human review of results (plan §6). */
export async function POST(request: Request) {
  // A visitor may run the match several times while trying answers, so allow more.
  if (rateLimited(endpointKey(request), Date.now(), 30)) return Response.json({ ok: false }, { status: 429 });
  const parsed = matchLogSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
  console.info(JSON.stringify(matchLogLine(parsed.data)));
  return Response.json({ ok: true });
}
