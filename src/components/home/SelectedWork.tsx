'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ProjectTile {
  slug: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
  method: string;
  flowSteps: { label: string; isFinal?: boolean }[];
  isWide: boolean;
}

export const SelectedWork: React.FC = () => {
  const projects: ProjectTile[] = [
    {
      slug: 'erp-llm-foundation',
      tag: '01 // LOCAL INFERENCE ENGINE',
      title: 'Autonomous Enterprise ERP Local Intelligence Engine',
      description: 'Locally deployed open-weights coding intelligence matching frontier reasoning at zero marginal token cost.',
      metric: '8.7 / 10 benchmark parity',
      method: 'Dataset: 150MB internal codebase · Grader: Claude 3.5 Sonnet baseline · Hardware: RTX 4090 · Oct 2026',
      flowSteps: [
        { label: '150MB Corpus' },
        { label: 'QLoRA 4-bit' },
        { label: 'Air-Gapped GGUF' },
        { label: '$0 Token Cost', isFinal: true },
      ],
      isWide: true,
    },
    {
      slug: 'multimodal-voice-failover-dag',
      tag: '02 // FAILOVER DAG',
      title: 'Multimodal Voice-to-Order 7-Tier Failover DAG',
      description: 'Converts complex warehouse dialect voice orders into verified transactions without dropped requests.',
      metric: '96.8% SKU acoustic match',
      method: 'RapidFuzz SIMD token distance · 32.4K catalog SKUs · Warehouse dialect audio calls · Sep 2026',
      flowSteps: [
        { label: 'Voice Audio' },
        { label: 'SIMD Match' },
        { label: '99.98% Orders', isFinal: true },
      ],
      isWide: false,
    },
    {
      slug: 'financial-ledger-multi-currency',
      tag: '03 // FINANCIAL LEDGER',
      title: 'High-Throughput Multi-Currency Financial Ledger Engine',
      description: 'Eliminates UI query locks across 50K+ entries with asynchronous ECB FX caching.',
      metric: '12ms write commit latency',
      method: 'PostgreSQL compound index with Redis write-through · 50K ledger benchmark · Aug 2026',
      flowSteps: [
        { label: 'Batch Tx' },
        { label: 'Isolated Core' },
        { label: '12ms Commit', isFinal: true },
      ],
      isWide: false,
    },
    {
      slug: 'fails-closed-dns-watchdog',
      tag: '04 // ANTI-TAMPER SECURITY',
      title: 'Fails-Closed Enterprise DNS Proxy & Self-Healing Watchdogs',
      description: 'Zero-license endpoint DNS filtering and dual self-healing watchdogs deployed across 35+ workstations.',
      metric: 'under 140 ms recovery',
      method: 'Dual cross-monitoring daemons · Simulated SIGKILL termination · Aug 2026',
      flowSteps: [
        { label: 'Inbound DNS' },
        { label: 'Kernel Filter' },
        { label: 'Dual Watchdogs' },
        { label: '0% Leakage', isFinal: true },
      ],
      isWide: true,
    },
  ];

  return (
    <section
      id="work"
      className="py-16 sm:py-24 border-b border-[#E2DFD8] bg-[#F7F5F2] bg-warm-grid scroll-mt-20"
      aria-label="Selected Production AI Work"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2DFD8]">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#FF5A36] tracking-wider uppercase">
              03 // SELECTED WORK
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-[#16161D] tracking-[-0.035em]">
              Production AI Systems & Backends
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#5C5B66] max-w-md">
            Four production systems built for enterprise constraints, evaluated against empirical baselines.
          </p>
        </div>

        {/* 6-Column Blueprint Grid: Row 1 = 4 cols + 2 cols, Row 2 = 2 cols + 4 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {projects.map((proj) => {
            const colSpanClass = proj.isWide ? 'lg:col-span-4' : 'lg:col-span-2';

            return (
              <article
                key={proj.slug}
                className={`${colSpanClass} p-6 sm:p-8 border border-[#E2DFD8] bg-white flex flex-col justify-between space-y-6 hover:border-[#FF5A36] transition-colors group`}
              >
                <div className="space-y-4">
                  {/* Mono Tag */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#5C5B66] border-b border-[#E2DFD8] pb-2.5">
                    <span className="text-[#16161D] font-bold">{proj.tag}</span>
                    <NextLink
                      href={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-1 text-[#5C5B66] group-hover:text-[#FF5A36] transition-colors"
                      aria-label={`View case study for ${proj.title}`}
                    >
                      <span>Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </NextLink>
                  </div>

                  {/* Title (8 words max) */}
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight leading-snug group-hover:text-[#FF5A36] transition-colors">
                    <NextLink href={`/work/${proj.slug}`}>
                      {proj.title}
                    </NextLink>
                  </h3>

                  {/* One-Sentence Description */}
                  <p className="font-body text-sm text-[#5C5B66] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tiny Flow Diagram (bordered boxes with arrows, final outlined in coral) */}
                  <div className="pt-2">
                    <div className="font-mono text-[10px] text-[#5C5B66] uppercase tracking-wider mb-2">
                      SYSTEM DATAFLOW:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                      {proj.flowSteps.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <div
                            className={`px-2.5 py-1.5 border text-center transition-all ${
                              step.isFinal
                                ? 'border-[#FF5A36] text-[#FF5A36] bg-[#FF5A36]/10 font-bold'
                                : 'border-[#E2DFD8] text-[#16161D] bg-[#F7F5F2]'
                            }`}
                          >
                            {step.label}
                          </div>
                          {sIdx < proj.flowSteps.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-[#5C5B66] shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Metric & Method Line */}
                <div className="pt-4 border-t border-[#E2DFD8] space-y-1.5">
                  <div className="font-headline font-bold text-lg sm:text-xl text-[#16161D]">
                    {proj.metric}
                  </div>
                  <p className="font-mono text-[11px] text-[#5C5B66] leading-tight">
                    <span className="text-[#FF5A36] font-semibold mr-1">[METHOD]</span>
                    {proj.method}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
