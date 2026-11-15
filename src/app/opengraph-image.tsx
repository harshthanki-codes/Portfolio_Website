import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Harsh Thanki — AI Systems Architect';
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
          backgroundColor: '#0e0f12',
          padding: '64px',
          border: '12px solid #14161b',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#d97746',
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                fontSize: '22px',
                fontFamily: 'monospace',
                fontWeight: 600,
                color: '#d97746',
                letterSpacing: '0.1em',
              }}
            >
              HARSH THANKI // AI.SYS
            </span>
          </div>
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#9c9c94',
              letterSpacing: '0.05em',
            }}
          >
            AHMEDABAD, IN • OPEN-WEIGHTS INFERENCE
          </span>
        </div>

        {/* Center Content: Headline & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: 400,
              color: '#f5f5f0',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Engineering deterministic backends for enterprise LLM systems.
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#a3a39c',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            On-premise fine-tuning (PEFT/QLoRA), 7-tier failover DAGs, and zero marginal token cost runtimes.
          </p>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            fontFamily: 'monospace',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', color: '#9c9c94', textTransform: 'uppercase' }}>
                Benchmark Score
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#f5f5f0', marginTop: '4px' }}>
                8.7 / 10 Parity
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', color: '#9c9c94', textTransform: 'uppercase' }}>
                Order Preservation
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#f5f5f0', marginTop: '4px' }}>
                99.98% Under Jitter
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', color: '#9c9c94', textTransform: 'uppercase' }}>
                Marginal Token Cost
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#d97746', marginTop: '4px' }}>
                $0.00 / Query
              </div>
            </div>
          </div>
          <span style={{ fontSize: '14px', color: '#d97746' }}>
            harshthanki-codes.github.io/Portfolio_Website/
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
