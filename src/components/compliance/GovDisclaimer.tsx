import { notices } from '@/content/site';

/** "Not connected with or endorsed by the U.S. government or the federal Medicare program." */
export function GovDisclaimer({ className = '' }: { className?: string }) {
  return <p className={`text-base ${className}`.trim()}>{notices.govDisclaimer}</p>;
}
