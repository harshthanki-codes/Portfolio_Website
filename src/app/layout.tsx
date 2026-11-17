import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SmoothScroll } from '@/components/motion/SmoothScroll';

// Bricolage Grotesque 800/700 for headlines (tight tracking -0.035em, line-height .96)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

// Hanken Grotesk for body
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken',
  display: 'swap',
});

// JetBrains Mono only for small labels and method lines
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harshthanki-codes.github.io/Portfolio_Website'),
  title: {
    default: 'Harsh Thanki — AI engineer',
    template: '%s | Harsh Thanki',
  },
  description:
    'AI engineer in Ahmedabad building deterministic open-weights AI systems, 7-tier failover DAGs, and local inference runtimes.',
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
      className={`${bricolage.variable} ${hanken.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#1237D1] text-white font-body antialiased selection:bg-[#FFE45C] selection:text-[#0A1450] relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#FFE45C] text-[#0A1450] font-mono text-xs font-bold border border-[#0A1450]"
        >
          Skip to main content
        </a>

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
