'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface NoteItem {
  id: string;
  date: string;
  title: string;
  tagline: string;
  category: string;
  href: string;
}

export const WritingSection: React.FC = () => {
  const notes: NoteItem[] = [
    {
      id: 'note-01',
      date: 'OCT 2026',
      title: 'Deterministic Speculative Decoding: Cutting Local LLM TTFT on Consumer Silicon',
      tagline: 'An architectural exploration of pairing 1.5B draft models with 7B target evaluators for zero-regression token streaming.',
      category: 'Inference Architecture',
      href: '/eval',
    },
    {
      id: 'note-02',
      date: 'SEP 2026',
      title: 'Designing 7-Tier Failover DAGs for Multimodal Voice-to-Order Systems',
      tagline: 'How circuit-breaker fallbacks and acoustic tokenizers eliminate order loss across noisy multilingual industrial environments.',
      category: 'Distributed Systems',
      href: '/work/multimodal-voice-failover-dag',
    },
    {
      id: 'note-03',
      date: 'AUG 2026',
      title: 'Eliminating N+1 Relational Query Cascades in High-Throughput ERP Ledgers',
      tagline: 'Solving volatile FX rate conversion bottlenecks and transaction commit latency across 50K+ ledger entries.',
      category: 'Database Engineering',
      href: '/work/financial-ledger-multi-currency',
    },
  ];

  return (
    <section id="notes" className="py-20 sm:py-28 border-b border-[var(--hairline)] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--hairline)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              03 / TECHNICAL NOTES & ESSAYS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Architecture Essays & Benchmark Logs
            </h2>
          </div>
          <NextLink
            href="/eval"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
          >
            <span>Live Benchmark Dashboard (/eval)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {/* Clean Editorial Notes List with Hairline Separators */}
        <div className="divide-y divide-[var(--hairline)]">
          {notes.map((note) => (
            <article
              key={note.id}
              className="py-8 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group"
            >
              {/* Left Column: Date & Category (3 cols) */}
              <div className="md:col-span-3 space-y-1 font-mono text-xs">
                <span className="text-[var(--text-muted)] block tracking-wider">
                  {note.date}
                </span>
                <span className="text-[11px] text-[var(--accent)] block">
                  {note.category}
                </span>
              </div>

              {/* Center Column: Title & Excerpt (7 cols) */}
              <div className="md:col-span-7 space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <NextLink href={note.href}>
                    {note.title}
                  </NextLink>
                </h3>
                <p className="text-sm font-sans text-[var(--text-muted)] leading-relaxed">
                  {note.tagline}
                </p>
              </div>

              {/* Right Column: Link Arrow (2 cols) */}
              <div className="md:col-span-2 flex md:justify-end pt-1">
                <NextLink
                  href={note.href}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
                >
                  <span>Read note</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-320 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
