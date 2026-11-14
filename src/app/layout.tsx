import type { Metadata } from 'next';
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';

// Editorial Serif for Headlines (Max 2 weights: 400, 600)
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600'],
  variable: '--font-serif',
  display: 'swap',
});

// Clean Sans for Body (Max 2 weights: 400, 500)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

// Monospace ONLY for small labels and numbers (Max 2 weights: 400, 500)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harshthanki-codes.github.io/Portfolio_Website'),
  title: {
    default: 'Harsh Thanki — AI Systems Architect',
    template: '%s | Harsh Thanki',
  },
  description:
    'AI Systems Architect engineering deterministic LLM backends, fault-tolerant inference DAGs, and local open-weights engines with zero marginal token cost.',
  authors: [{ name: 'Harsh Thanki', url: 'https://github.com/harshthanki-codes' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshthanki-codes.github.io/Portfolio_Website/',
    title: 'Harsh Thanki — AI Systems Architect',
    description:
      'Deterministic LLM backends, failover inference DAGs, and on-premise fine-tuning at zero marginal token cost.',
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
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--accent)] text-white font-mono text-xs font-medium rounded-sm shadow-md"
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
