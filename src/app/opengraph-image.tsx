import { ImageResponse } from 'next/og';
import { site } from '@/content/site';
import { brandColors, brandFonts, brandLogo, logoRatio } from '@/lib/brand';

export const alt = `${site.name}: plain-English Medicare help for people turning 65`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Required for the static export: render once at build time.
export const dynamic = 'force-static';

/** Default share image for every page; pages can add their own opengraph-image later. */
export default async function OpengraphImage() {
  const [fonts, logo] = await Promise.all([brandFonts(), brandLogo('dark')]);
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
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
          <img src={logo} width={Math.round(84 * logoRatio)} height={84} alt="" />
          <div style={{ fontSize: 38, fontFamily: display }}>{site.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontFamily: display, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>Medicare made simple for people turning 65</div>
          <div style={{ fontSize: 32, color: brandColors.sand }}>A free plan match, plain-English guides and a licensed agent when you want one.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <div style={{ display: 'flex', background: brandColors.gold, color: brandColors.ink, padding: '12px 28px', borderRadius: 999, fontFamily: display }}>
            Call {site.phone.display}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
