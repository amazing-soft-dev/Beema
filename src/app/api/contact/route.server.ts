import { handleLead } from '@/lib/forms/lead';

// Server build only: the ".server.ts" extension is not a page extension in the static export.
export const runtime = 'nodejs';

/** POST /api/contact: the Contact page form (name, ZIP, phone, best time, consent). */
export function POST(request: Request) {
  return handleLead(request, 'New contact request');
}
