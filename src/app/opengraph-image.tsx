import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';
export const alt = 'Harsh Thanki | AI engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#16161D',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Top Coral Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            backgroundColor: '#FF5A36',
          }}
        />

        {/* Header: Label & Role */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: '18px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#B9B9C4',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#FF5A36' }} />
            <span style={{ color: '#F7F5F2', fontWeight: 'bold' }}>{SITE.name}</span>
          </div>
          <span>AI ENGINEER · AHMEDABAD</span>
        </div>

        {/* Center: Paper Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#F7F5F2',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontFamily: 'sans-serif',
            }}
          >
            AI systems that run on your own hardware.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#B9B9C4',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
              maxWidth: '900px',
            }}
          >
            I fine-tune open models, build the pipelines around them, and test them until they stop failing.
          </div>
        </div>

        {/* Bottom Proof Metrics */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #2D2D38',
            paddingTop: '24px',
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#B9B9C4',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: '#FF5A36', fontWeight: 'bold' }}>8.7/10</span>
            <span>ERP Coding Test</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: '#FF5A36', fontWeight: 'bold' }}>96.8%</span>
            <span>SKU Acoustic Match</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ color: '#FF5A36', fontWeight: 'bold' }}>&lt;140ms</span>
            <span>Watchdog Revival</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
