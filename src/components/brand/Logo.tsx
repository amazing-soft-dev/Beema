import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

/** Trimmed width ÷ height of the uploaded logos (scripts/brand/build-logos.mjs). */
const RATIO = 0.855;

export type LogoTone = 'auto' | 'light' | 'dark';

/**
 * The Senior AI Plans monogram. Both versions are in the markup and CSS shows one:
 * - `light` (navy and gold) for light surfaces,
 * - `dark` (white and teal) for dark surfaces and the dark theme.
 * Files are pre-sized (2x) by scripts/brand/build-logos.mjs, so next/image is left unoptimized.
 * `auto` follows the surface: `.on-dark` sections and `[data-theme="dark"]` get the dark logo
 * (globals.css, `.logo-mark`). Decorative: the link or text next to it names the brand.
 */
export function LogoMark({ size = 40, tone = 'auto', className = '' }: { size?: number; tone?: LogoTone; className?: string }) {
  const width = Math.round(size * RATIO);
  const img = (t: 'light' | 'dark') => (
    <Image
      src={`/brand/logo-${t}-${size > 48 ? 192 : 96}.webp`}
      width={width}
      height={size}
      alt=""
      unoptimized
      data-logo={t}
    />
  );
  return (
    <span className={`logo-mark inline-flex shrink-0 ${className}`} data-tone={tone} aria-hidden="true">
      {img('light')}
      {img('dark')}
    </span>
  );
}

/** Home link with mark and business name. */
export function Logo({ tone = 'auto', nameClassName = '' }: { tone?: LogoTone; nameClassName?: string }) {
  return (
    <Link href="/" className="inline-flex min-h-12 items-center gap-3 text-current">
      <LogoMark tone={tone} />
      <span className={`font-display text-xl leading-tight font-semibold ${nameClassName}`}>{site.name}</span>
      <span className="sr-only">, home page</span>
    </Link>
  );
}
