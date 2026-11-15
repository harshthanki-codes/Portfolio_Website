'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MetricItem {
  id: string;
  targetValue: number;
  displayPrefix?: string;
  displaySuffix: string;
  decimals?: number;
  label: string;
  method: string;
}

export const ProofStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([8.7, 96.8, 140]);

  const metrics: MetricItem[] = [
    {
      id: 'metric-1',
      targetValue: 8.7,
      displaySuffix: '/10 vs 10/10 frontier',
      decimals: 1,
      label: 'ERP ORM Reasoning Parity',
      method: 'Dataset: 150MB internal codebase · Grader: Claude 3.5 Sonnet baseline · Hardware: RTX 4090 · Oct 2026',
    },
    {
      id: 'metric-2',
      targetValue: 96.8,
      displaySuffix: '% SKU match',
      decimals: 1,
      label: 'Multilingual Acoustic Matching',
      method: 'RapidFuzz SIMD token distance · 32.4K catalog SKUs · Warehouse dialect audio calls · Sep 2026',
    },
    {
      id: 'metric-3',
      targetValue: 140,
      displayPrefix: 'under ',
      displaySuffix: ' ms recovery',
      decimals: 0,
      label: 'Watchdog Self-Healing Latency',
      method: 'Dual cross-monitoring daemons · Simulated SIGKILL administrative termination · Aug 2026',
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(metrics.map((m) => m.targetValue));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounts(metrics.map((m) => m.targetValue * eased));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(metrics.map((m) => m.targetValue));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, metrics]);

  return (
    <section
      ref={containerRef}
      className="border-b border-[var(--hairline)] bg-[var(--surface)] py-12 sm:py-16"
      aria-label="Measured Proof Benchmarks"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline)]">
          {metrics.map((m, idx) => {
            const currentNum = hasAnimated ? counts[idx] : m.targetValue;
            const formatted =
              m.decimals !== undefined ? currentNum.toFixed(m.decimals) : Math.round(currentNum).toString();

            return (
              <div
                key={m.id}
                className="py-8 md:py-0 px-0 md:px-8 first:pt-0 first:pl-0 last:pb-0 last:pr-0 space-y-3"
              >
                <div className="font-serif text-[clamp(2.25rem,3.8vw,3.5rem)] text-[var(--text-primary)] font-normal leading-tight tracking-tight">
                  {m.displayPrefix}
                  <span className="text-[var(--accent)] font-normal">
                    {formatted}
                  </span>
                  <span>{m.displaySuffix}</span>
                </div>

                <div className="mono-label text-[11px] font-medium text-[var(--text-muted)] tracking-wider uppercase">
                  {m.label}
                </div>

                <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--hairline)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold mr-1.5">
                    Method:
                  </span>
                  {m.method}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
