import { ImageResponse } from 'next/og';

// Site-wide default OG/Twitter image — Next.js picks this up for every route
// that doesn't define its own opengraph-image, so /tools (and every other
// page) gets a real social-preview image instead of none at all.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: '#141c1c',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#43c1c3',
              color: '#04201f',
              fontSize: 40,
              fontWeight: 700,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            T
          </div>
          <div style={{ fontSize: 64, fontWeight: 700 }}>Toolvya</div>
        </div>
        <div style={{ fontSize: 30, color: '#a9bcbc' }}>Free online tools for PDFs and everyday tasks</div>
      </div>
    ),
    { ...size }
  );
}
