import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ArticleItem {
  id: string;
  date: string;
  title: string;
  tagline: string;
  category: string;
  href: string;
}

export const WritingSection: React.FC = () => {
  const articles: ArticleItem[] = [
    {
      id: 'art-01',
      date: 'OCT 2026',
      title: 'Deterministic Speculative Decoding: Cutting Local LLM TTFT on Consumer Silicon',
      tagline: 'An architectural exploration of pairing 1.5B draft models with 7B target evaluators for zero-regression token streaming.',
      category: 'Inference Architecture',
      href: '/eval',
    },
    {
      id: 'art-02',
      date: 'SEP 2026',
      title: 'Designing 7-Tier Failover DAGs for Multimodal Voice-to-Order Systems',
      tagline: 'How circuit-breaker fallbacks and acoustic tokenizers eliminate order loss across noisy multilingual industrial environments.',
      category: 'Distributed Systems',
      href: '/work/multimodal-voice-failover-dag',
    },
    {
      id: 'art-03',
      date: 'AUG 2026',
      title: 'Eliminating N+1 Relational Query Cascades in High-Throughput ERP Ledgers',
      tagline: 'Solving volatile FX rate conversion bottlenecks and transaction commit latency across 50K+ ledger entries.',
      category: 'Database Engineering',
      href: '/work/financial-ledger-multi-currency',
    },
  ];

  return (
    <section id="writing" className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              05 / TECHNICAL WRITING & NOTES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Architecture Essays & Benchmark Logs
            </h2>
          </div>
          <NextLink
            href="/eval"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
          >
            <span>Benchmark Dashboard (/eval)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {/* Articles List */}
        <div className="divide-y divide-[var(--border)]">
          {articles.map((art) => (
            <article
              key={art.id}
              className="py-8 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
            >
              <div className="lg:col-span-3 font-mono text-xs text-[var(--text-tertiary)] space-y-1">
                <div>{art.date}</div>
                <div className="text-[var(--accent)] uppercase text-[10px] tracking-wider">{art.category}</div>
              </div>

              <div className="lg:col-span-8 space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <NextLink href={art.href}>
                    {art.title}
                  </NextLink>
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {art.tagline}
                </p>
              </div>

              <div className="lg:col-span-1 flex lg:justify-end pt-1">
                <NextLink
                  href={art.href}
                  className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors"
                  aria-label={`Read article: ${art.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
