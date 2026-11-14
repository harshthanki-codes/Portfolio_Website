import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/data/projects';

export const alt = 'Harsh Thanki — Systems Architecture Case Study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title || 'Systems Architecture Case Study';
  const headline = project?.resultHeadline || 'AI & Enterprise Systems Engineering';
  const category = project?.categories[0] || 'AI/ML Engineering';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#090b0e',
          padding: '60px',
          fontFamily: 'monospace',
          border: '12px solid #161b22',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#f59e0b',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0f6fc' }}>
              HARSH THANKI // SYSTEMS ARCHITECTURE
            </span>
          </div>
          <span
            style={{
              fontSize: '18px',
              color: '#f59e0b',
              border: '1px solid #f59e0b',
              padding: '6px 14px',
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '44px',
              fontWeight: 'bold',
              color: '#ffffff',
              lineHeight: '1.2',
              maxHeight: '180px',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#8b949e',
              lineHeight: '1.4',
            }}
          >
            {headline}
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #21262d',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <span style={{ fontSize: '18px', color: '#10b981' }}>
              ● Zero Single Point of Failure
            </span>
            <span style={{ fontSize: '18px', color: '#f59e0b' }}>
              ● Formal Verification Passed
            </span>
          </div>
          <span style={{ fontSize: '18px', color: '#6e7681' }}>
            harshthanki-codes.github.io
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
