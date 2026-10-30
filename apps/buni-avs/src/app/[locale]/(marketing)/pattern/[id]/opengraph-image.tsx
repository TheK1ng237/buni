import { ImageResponse } from 'next/og';
import { getSharePattern } from './share-data';

export const runtime = 'nodejs';
export const alt = 'Aperçu du motif partagé sur Buni';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OpenGraphImageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { id, locale } = await params;
  const pattern = await getSharePattern(id);
  if (!pattern) throw new Error(`Cannot generate a share image for unknown pattern "${id}"`);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
  const previewResponse = await fetch(
    `${apiUrl.replace(/\/$/, '')}/patterns/${encodeURIComponent(pattern.slug)}/preview`,
    { next: { revalidate: 3600 } },
  );
  if (!previewResponse.ok) {
    throw new Error(`Pattern preview request failed with status ${previewResponse.status}`);
  }

  const svg = await previewResponse.text();
  const patternImage = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  const colors = pattern.colors.slice(0, 4).map((color) => color.hex);
  const isFrench = locale !== 'en';
  const origin = [pattern.origin.country, pattern.origin.people].filter(Boolean).join(' · ');

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#f5ebe0',
        color: '#1d1d1b',
      }}
    >
      <img
        src={patternImage}
        width={720}
        height={630}
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 480,
          padding: '56px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#a54e37',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          {isFrench ? 'BUNI · PATRIMOINE AFRICAIN' : 'BUNI · AFRICAN HERITAGE'}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 46,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          {pattern.name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            color: '#68584d',
            fontSize: 22,
          }}
        >
          {origin}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 36 }}>
          {colors.map((color, index) => (
            <div
              key={`${color}-${index}`}
              style={{
                display: 'flex',
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: color,
                border: '2px solid #ffffff',
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 38,
            color: '#68584d',
            fontSize: 16,
          }}
        >
          {pattern.summary.length > 78 ? `${pattern.summary.slice(0, 75)}…` : pattern.summary}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
