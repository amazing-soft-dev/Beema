import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
// Required for the static export: render once at build time.
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(<BrandMark size={64} />, size);
}
