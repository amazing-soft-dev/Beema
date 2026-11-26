import { handleLead } from '@/lib/forms/lead';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/**
 * POST /api/final-expense: a request for a final expense (life insurance) call. It has its own
 * form and route so it never becomes part of a Medicare appointment or its booking note
 * (review 2026-11-25, INS-09).
 */
export function POST(request: Request) {
  return handleLead(request, 'Final expense (life insurance) call requested, separate from Medicare');
}
