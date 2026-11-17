import { track as vercelTrack } from '@vercel/analytics';

/**
 * Typed analytics events. Production only: elsewhere `track` does nothing, so previews,
 * local development and the static export never send data.
 * No personal data in properties: never names, phone numbers, emails or ZIP codes.
 */
export type AnalyticsEvent =
  | { name: 'call_click'; props: { location: string } }
  | { name: 'book_call_click'; props: { location: string } }
  | { name: 'guide_download'; props: { guide: string; format: 'page-pdf' | 'library-pdf' } }
  | { name: 'guide_print'; props: { guide: string } }
  | { name: 'form_submit'; props: { form: 'contact' | 'callback' | 'plan-intake' | 'guide-email' | 'newsletter' } }
  | { name: 'tool_result'; props: { tool: 'enrollment-calculator' | 'irmaa-calculator' | 'plan-comparison' | 'plan-match' } }
  | { name: 'chat_open'; props: { location: string } };

export const analyticsEnabled = () => process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

export function track<E extends AnalyticsEvent>(name: E['name'], props: E['props']): void {
  if (!analyticsEnabled()) return;
  vercelTrack(name, props);
}
