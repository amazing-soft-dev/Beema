import Link from 'next/link';
import { site } from '@/content/site';

/** Brand mark (same drawing as the generated icons in src/lib/brand.tsx). */
export function LogoMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <rect width="40" height="40" rx="9" fill="#0f3d2e" />
      <g transform="translate(6.8 6.8) scale(0.4125)">
        <path d="M8 52 C 24 52, 26 32, 40 28 S 54 16, 55 12" stroke="#c8f04d" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="55" cy="12" r="6" fill="#ffffff" />
      </g>
    </svg>
  );
}

/** Home link with mark and business name. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <Link href="/" className={`inline-flex min-h-12 items-center gap-3 ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
      <LogoMark />
      {/* Short name on phones so the phone and Menu buttons keep their full size. */}
      <span className="font-display text-xl leading-tight font-semibold">
        <span className="md:hidden">{site.shortName}</span>
        <span className="max-md:hidden">{site.name}</span>
      </span>
      <span className="sr-only">, home page</span>
    </Link>
  );
}
