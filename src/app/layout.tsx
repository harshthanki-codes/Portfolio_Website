import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harshthanki-codes.github.io/Portfolio_Website'),
  title: {
    default: 'Harsh Thanki — AI Solutions Engineer & Systems Architect',
    template: '%s | Harsh Thanki',
  },
  description:
    'AI/ML Systems Engineer architecting deterministic LLM backends, fault-tolerant inference DAGs, and local open-weights engines with zero marginal token cost.',
  keywords: [
    'AI Systems Engineer',
    'LLM Fine-Tuning',
    'QLoRA',
    'Ollama',
    'Unsloth',
    'Inference DAG',
    'Enterprise Architecture',
    'Harsh Thanki',
  ],
  authors: [{ name: 'Harsh Thanki', url: 'https://github.com/harshthanki-codes' }],
  creator: 'Harsh Thanki',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshthanki-codes.github.io/Portfolio_Website',
    title: 'Harsh Thanki — AI Solutions Engineer & Systems Architect',
    description:
      'Deterministic LLM Backends, Fault-Tolerant Multimodal Ingestion DAGs, and Zero-Marginal-Cost Open-Weights Systems.',
    siteName: 'Harsh Thanki Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Thanki — AI Solutions Engineer & Systems Architect',
    description:
      'Deterministic LLM Backends, Fault-Tolerant Multimodal Ingestion DAGs, and Zero-Marginal-Cost Open-Weights Systems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://harshthanki-codes.github.io/Portfolio_Website/#person',
        name: 'Harsh Thanki',
        jobTitle: 'AI Solutions Engineer & Systems Architect',
        url: 'https://harshthanki-codes.github.io/Portfolio_Website',
        sameAs: [
          'https://github.com/harshthanki-codes',
          'https://linkedin.com/in/harsh-thanki',
        ],
        knowsAbout: [
          'Large Language Models',
          'PEFT/QLoRA Fine-Tuning',
          'Fault-Tolerant DAG Architectures',
          'High-Throughput Financial Ledgers',
          'Local Air-Gapped Inference',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://harshthanki-codes.github.io/Portfolio_Website/#website',
        url: 'https://harshthanki-codes.github.io/Portfolio_Website',
        name: 'Harsh Thanki Engineering Portfolio',
        publisher: {
          '@id': 'https://harshthanki-codes.github.io/Portfolio_Website/#person',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-text)]">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-xs font-bold rounded-[var(--radius-xs)] shadow-lg"
        >
          Skip to main content
        </a>

        <SmoothScroll>
          <CustomCursor />
          <CommandPalette />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
