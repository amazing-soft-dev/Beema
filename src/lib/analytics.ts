/**
 * Typed analytics events. No analytics product runs today: the site moved to Netlify and the
 * Vercel packages were removed, so `track` is a typed no-op. Call sites keep their events,
 * ready for a privacy-reviewed tool later. No personal data in properties: never names, phone
 * numbers, emails or ZIP codes.
 */
export type AnalyticsEvent =
  | { name: 'call_click'; props: { location: string } }
  | { name: 'book_call_click'; props: { location: string } }
  | { name: 'guide_download'; props: { guide: string; format: 'page-pdf' | 'library-pdf' } }
  | { name: 'guide_print'; props: { guide: string } }
  | { name: 'form_submit'; props: { form: 'contact' | 'callback' | 'final-expense' | 'plan-intake' | 'guide-email' | 'newsletter' } }
  | { name: 'tool_result'; props: { tool: 'enrollment-calculator' | 'irmaa-calculator' | 'plan-comparison' | 'plan-match' } }
  | { name: 'chat_open'; props: { location: string } };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function track<E extends AnalyticsEvent>(name: E['name'], props: E['props']): void {}
