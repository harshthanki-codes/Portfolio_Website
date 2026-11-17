'use client';

import React from 'react';

interface MetricItem {
  id: string;
  value: string;
  suffix: string;
  label: string;
  method: string;
}

export const ProofStrip: React.FC = () => {
  const metrics: MetricItem[] = [
    {
      id: 'metric-1',
      value: '8.7/10',
      suffix: ' vs 10/10 frontier',
      label: 'ERP ORM Reasoning Parity',
      method: 'Dataset: 150MB internal codebase · Grader: Claude 3.5 Sonnet baseline · Hardware: RTX 4090 · Oct 2026',
    },
    {
      id: 'metric-2',
      value: '96.8%',
      suffix: ' SKU match',
      label: 'Multilingual Acoustic Matching',
      method: 'RapidFuzz SIMD token distance · 32.4K catalog SKUs · Warehouse dialect audio calls · Sep 2026',
    },
    {
      id: 'metric-3',
      value: 'under 140 ms',
      suffix: ' recovery',
      label: 'Watchdog Self-Healing Latency',
      method: 'Dual cross-monitoring daemons · Simulated SIGKILL administrative termination · Aug 2026',
    },
  ];

  return (
    <section
      className="border-b border-[#2D2D38] bg-[#16161D] py-12 sm:py-16 bg-ink-deep"
      aria-label="Measured Proof Benchmarks"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2D2D38]">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="py-8 md:py-0 px-0 md:px-8 first:pt-0 first:pl-0 last:pb-0 last:pr-0 space-y-3"
            >
              <div className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F7F5F2] tracking-[-0.035em] leading-[0.96]">
                <span>{m.value}</span>
                <span className="text-[#FF5A36] text-2xl sm:text-3xl font-bold">{m.suffix}</span>
              </div>

              <div className="font-mono text-xs font-semibold text-[#F7F5F2] uppercase tracking-wider">
                {m.label}
              </div>

              <p className="text-xs font-mono text-[#A3A1B0] leading-relaxed pt-2 border-t border-[#2D2D38]">
                <span className="text-[#FF5A36] font-bold mr-1.5">[METHOD]</span>
                {m.method}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
