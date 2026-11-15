'use client';

import React from 'react';
import { Building, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'work' | 'education';
  summary: string;
  highlights: string[];
}

export const AboutSection: React.FC = () => {
  const timeline: TimelineItem[] = [
    {
      id: 'time-1',
      role: 'AI engineer',
      organization: 'Synapse-AI & Enterprise Deployments',
      period: '2025 — Present',
      location: 'Ahmedabad / Remote',
      type: 'work',
      summary: 'Fine-tuning open models, orchestrating air-gapped runtimes, and engineering fault-tolerant backend DAGs.',
      highlights: [
        'Fine-tuned DeepSeek Coder 7B using QLoRA with Unsloth on consumer GPUs, reaching 8.7/10 benchmark parity at zero marginal token cost.',
        'Architected 7-tier multimodal failover DAG processing multilingual warehouse audio orders with 99.98% order preservation.',
        'Built kernel-level network watchdogs and self-healing daemons deployed across 35+ workstations.',
      ],
    },
    {
      id: 'time-2',
      role: 'Full-Stack Developer & ERP Engineer',
      organization: 'Enterprise Solutions Practice',
      period: '2023 — 2024',
      location: 'Gujarat, India',
      type: 'work',
      summary: 'Database transaction isolation, batch ledger rollups, and asynchronous mobile API pipelines.',
      highlights: [
        'Engineered high-throughput financial ledger cores in Python and PostgreSQL, eliminating UI-blocking query locks across 50K+ entries.',
        'Integrated European Central Bank automated FX caching with compound indexing, cutting write latency from 4.2s to 12ms.',
        'Shipped Flutter mobile client applications communicating via HMAC-SHA256 authenticated webhooks.',
      ],
    },
    {
      id: 'time-3',
      role: 'Master of Computer Applications (MCA)',
      organization: 'Alliance University',
      period: '2024 — 2026',
      location: 'Bengaluru / Hybrid',
      type: 'education',
      summary: 'Specialization in distributed computing, neural quantization, and localized inference latency.',
      highlights: [
        'Core coursework in Advanced Database Concurrency, Neural Network Quantization, and Distributed Systems.',
        'Capstone research on speculative draft-model decoding to accelerate local LLM time-to-first-token (TTFT).',
      ],
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[var(--hairline)] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--hairline)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              02 / HOW I WORK & BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Principles & Experience Timeline
            </h2>
          </div>
          <p className="text-sm font-sans text-[var(--text-muted)] max-w-md leading-relaxed">
            Engineering philosophy, production deployments, and academic foundation in distributed systems.
          </p>
        </div>

        {/* Two Columns: Large Serif Pull Quote (Left) & Quiet Vertical Timeline (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Large Serif Pull Quote */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <blockquote className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] italic leading-tight border-l-2 border-[var(--accent)] pl-6">
              "Deterministic architecture over probabilistic guesswork."
            </blockquote>

            <div className="space-y-3 font-sans text-sm text-[var(--text-muted)] leading-relaxed pl-6">
              <p>
                I build systems where open language models operate reliably inside real enterprise constraints. Rather than tethering business workflows to volatile third-party cloud API limits, I fine-tune weights locally (QLoRA, Ollama) and isolate execution behind strict circuit-breaker DAGs.
              </p>
              <div className="pt-2 font-mono text-xs text-[var(--accent)]">
                Alliance University · Master of Computer Applications (2024–2026)
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Quiet Vertical Timeline with Hairline Spine */}
          <div className="lg:col-span-7 relative border-l border-[var(--hairline)] ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
            {timeline.map((item) => (
              <div key={item.id} className="relative group">
                {/* Node Marker */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--background)] border-2 border-[var(--hairline)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-200" />

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--hairline)] pb-3">
                    <div>
                      <h3 className="text-xl font-serif text-[var(--text-primary)] font-normal">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 pt-1 text-xs font-mono text-[var(--accent)]">
                        {item.type === 'work' ? (
                          <Building className="w-3.5 h-3.5" />
                        ) : (
                          <GraduationCap className="w-3.5 h-3.5" />
                        )}
                        <span>{item.organization}</span>
                        <span className="text-[var(--text-tertiary)]">• {item.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)] shrink-0 px-2.5 py-1 rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--surface)]">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm font-sans text-[var(--text-muted)] leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="space-y-2 text-xs font-sans text-[var(--text-secondary)] leading-relaxed pt-1">
                    {item.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
