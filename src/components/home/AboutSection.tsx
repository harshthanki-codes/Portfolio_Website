'use client';

import React from 'react';

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
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
      summary: 'Specialization in distributed computing, neural quantization, and localized inference latency.',
      highlights: [
        'Coursework in Advanced Database Concurrency, Neural Quantization, and Distributed Systems.',
        'Research on speculative draft-model decoding to accelerate local LLM time-to-first-token (TTFT).',
      ],
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 border-b border-[#E2DFD8] bg-[#F7F5F2] bg-warm-grid scroll-mt-20"
      aria-label="How I Work and Engineering Experience"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2DFD8]">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#FF5A36] tracking-wider uppercase">
              04 // HOW I WORK & TIMELINE
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#16161D] tracking-[-0.035em]">
              Engineering Principles & Track Record
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#5C5B66] max-w-md">
            Production deployments, academic research, and system invariants.
          </p>
        </div>

        {/* Two Columns: Large Pull Quote (Left) & Vertical Timeline (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (5 cols): Pull Quote & Core Stance */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 sm:p-8 border border-[#2D2D38] bg-[#16161D] space-y-5">
              <span className="font-mono text-[10px] text-[#A3A1B0] uppercase tracking-wider block">
                CORE STANCE // SPEC-02
              </span>

              <blockquote className="font-headline font-bold text-2xl sm:text-3xl text-[#F7F5F2] leading-tight border-l-4 border-[#FF5A36] pl-4">
                "Deterministic architecture over probabilistic guesswork."
              </blockquote>

              <p className="font-body text-sm text-[#A3A1B0] leading-relaxed">
                I build systems where open language models operate reliably inside real enterprise constraints. Rather than tethering business workflows to volatile cloud API rate limits, I fine-tune weights locally (QLoRA, Ollama) and isolate execution behind strict circuit-breaker DAGs.
              </p>

              <div className="pt-3 border-t border-[#2D2D38] font-mono text-xs text-[#F7F5F2]">
                <div>ALLIANCE UNIVERSITY // MCA (2024–2026)</div>
                <div className="text-[11px] text-[#A3A1B0] mt-0.5">Specialization in Neural Quantization & Concurrency</div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Quiet Vertical Timeline */}
          <div className="lg:col-span-7 relative border-l border-[#E2DFD8] ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
            {timeline.map((item) => (
              <div key={item.id} className="relative space-y-3">
                {/* Timeline Node Point */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 bg-[#16161D] border-2 border-[#FF5A36]" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E2DFD8] pb-2">
                  <h3 className="font-headline font-bold text-xl text-[#16161D]">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs text-[#FF5A36] font-semibold">
                    {item.period}
                  </span>
                </div>

                <div className="font-mono text-xs text-[#5C5B66]">
                  {item.organization} · {item.location}
                </div>

                <p className="font-body text-sm text-[#5C5B66] leading-relaxed">
                  {item.summary}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="font-body text-xs text-[#16161D] flex items-start gap-2">
                      <span className="font-mono text-[#FF5A36] font-bold">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
