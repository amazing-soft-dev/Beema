import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Brand values for generated images (Open Graph). Rendered by next/og (Satori), so pages
 * use inline styles and plain flexbox only. Colors match the tokens in globals.css.
 */
export const brandColors = { ink: '#0b2545', navy: '#154a8a', gold: '#f5c451', sand: '#fbf5e9', white: '#ffffff' } as const;

/** Trimmed width ÷ height of the uploaded logos (same as src/components/brand/Logo.tsx). */
export const logoRatio = 0.855;

/**
 * The trimmed 192px logo (scripts/brand/build-logos.mjs) as a data URL for Satori: `light` (navy and gold) for light
 * backgrounds, `dark` (white and teal) for dark ones.
 */
export async function brandLogo(tone: 'light' | 'dark') {
  const data = await readFile(join(process.cwd(), `public/brand/logo-${tone}-192.png`));
  return `data:image/png;base64,${data.toString('base64')}`;
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
