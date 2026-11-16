import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
// Required for the static export: render once at build time.
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} />, size);
}
