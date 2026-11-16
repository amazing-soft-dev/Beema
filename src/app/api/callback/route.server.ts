import { handleLead } from '@/lib/forms/lead';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/** POST /api/callback: the "Request a callback" panel. */
export function POST(request: Request) {
  return handleLead(request, 'Callback requested');
}
