import { site } from '@/content/site';

/**
 * Visible on every page while `site.placeholder` is true, so sample business details
 * (phone, NPN, licensed states) can never pass for real ones. Removed in #57.
 */
export function PlaceholderRibbon() {
  if (!site.placeholder) return null;
  return (
    <div role="note" className="bg-[#171818] px-4 py-2 text-center text-base text-white">
      <strong>Sample content.</strong> Business details on this site are placeholders and not yet real.
    </div>
  );
}
