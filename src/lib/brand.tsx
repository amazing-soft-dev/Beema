import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Brand mark for generated images (icons, Open Graph). Rendered by next/og (Satori),
 * so it uses inline styles and plain flexbox only.
 * The mark: a lime path rising across a deep-green tile, echoing "Silver Path".
 */
export const brandColors = { ink: '#0f3d2e', green: '#1a5c44', lime: '#c8f04d', sand: '#f5efe6', white: '#ffffff' } as const;

export function BrandMark({ size, tile = brandColors.ink }: { size: number; tile?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: tile,
        borderRadius: Math.round(size * 0.22),
      }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 64 64" fill="none">
        <path d="M8 52 C 24 52, 26 32, 40 28 S 54 16, 55 12" stroke={brandColors.lime} strokeWidth={7} strokeLinecap="round" />
        <circle cx="55" cy="12" r="6" fill={brandColors.white} />
      </svg>
    </div>
  );
}

/**
 * Switzer 600 as TTF for Satori (it cannot read WOFF2). Fetched at build time by
 * scripts/fetch-fonts.mjs; returns no fonts (default face) if the file is missing.
 */
export async function brandFonts() {
  try {
    const data = await readFile(join(process.cwd(), 'public/fonts/switzer-600.ttf'));
    return [{ name: 'Switzer', data, weight: 600 as const, style: 'normal' as const }];
  } catch {
    return [];
  }
}
