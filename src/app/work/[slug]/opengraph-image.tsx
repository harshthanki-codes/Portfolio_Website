import { ImageResponse } from 'next/og';
import { getProjectBySlug, getAllProjects } from '@/data/projects';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const projects = getAllProjects();
  const params: { slug: string }[] = [];
  projects.forEach((p) => {
    params.push({ slug: p.slug });
    if (p.aliases) {
      p.aliases.forEach((alias) => params.push({ slug: alias }));
    }
  });
  return params;
}

export const alt = 'Harsh Thanki | Case Study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title || 'Production AI Case Study';
  const tagline = project?.tagline || 'AI engineering systems and local inference.';
  const tag = project?.tag || 'AI/ML Engineering';
  const metric = project?.keyMetric || 'Production Benchmark';

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
            <span style={{ color: '#F7F5F2', fontWeight: 'bold' }}>HARSH THANKI // CASE STUDY</span>
          </div>
          <span style={{ color: '#FF5A36' }}>{tag}</span>
        </div>

        {/* Center: Paper Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#F7F5F2',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontFamily: 'sans-serif',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#B9B9C4',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
              maxWidth: '900px',
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom Metric */}
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <span>KEY RESULT:</span>
            <span style={{ color: '#FF5A36', fontWeight: 'bold' }}>{metric}</span>
          </div>
          <div>HARSH THANKI · AI ENGINEER</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
