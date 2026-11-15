import type { Metadata } from 'next';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { QuietSignalBackground } from '@/components/motion/QuietSignalBackground';

// Display Serif Face (Instrument Serif)
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Sans Body Face (Geist)
const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist',
  display: 'swap',
});

// Monospace Face (Geist Mono - numbers & tiny labels only)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harshthanki-codes.github.io/Portfolio_Website'),
  title: {
    default: 'Harsh Thanki — AI engineer',
    template: '%s | Harsh Thanki',
  },
  description:
    'AI engineer in Ahmedabad building deterministic open-weights AI systems, failover pipelines, and local inference runtimes.',
  authors: [{ name: 'Harsh Thanki', url: 'https://github.com/harshthanki-codes' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshthanki-codes.github.io/Portfolio_Website/',
    title: 'Harsh Thanki — AI engineer',
    description:
      'AI systems that run on your own hardware. On-premise fine-tuning, failover inference DAGs, and local open-weights engines with zero marginal token cost.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable} dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-text)] relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-xs font-medium rounded-[var(--radius)] shadow-md"
        >
          Skip to main content
        </a>

        {/* Quiet Signal Living Background */}
        <QuietSignalBackground />

        <SmoothScroll>
          <CommandPalette />
          <Navbar />
          <main id="main-content" className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
