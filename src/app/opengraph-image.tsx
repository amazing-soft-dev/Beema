import { ImageResponse } from 'next/og';
import { site } from '@/content/site';
import { BrandMark, brandColors, brandFonts } from '@/lib/brand';

export const alt = `${site.name}: plain-English Medicare help for people turning 65`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Required for the static export: render once at build time.
export const dynamic = 'force-static';

/** Default share image for every page; pages can add their own opengraph-image later. */
export default async function OpengraphImage() {
  const fonts = await brandFonts();
  const display = fonts.length ? 'Switzer' : undefined;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: brandColors.ink,
          color: brandColors.white,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <BrandMark size={72} tile={brandColors.green} />
          <div style={{ fontSize: 34, fontFamily: display }}>{site.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontFamily: display, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>Medicare made simple for people turning 65</div>
          <div style={{ fontSize: 32, color: brandColors.sand }}>Free, licensed help comparing Medigap and Medicare Advantage.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <div style={{ display: 'flex', background: brandColors.lime, color: brandColors.ink, padding: '12px 28px', borderRadius: 999, fontFamily: display }}>
            Call {site.phone.display}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
