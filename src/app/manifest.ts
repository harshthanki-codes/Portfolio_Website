import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harsh Thanki — AI Solutions Engineer',
    short_name: 'Harsh Thanki',
    description: 'Deterministic LLM Backends & Fault-Tolerant AI Pipelines',
    start_url: '/',
    display: 'standalone',
    background_color: '#090b0e',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
