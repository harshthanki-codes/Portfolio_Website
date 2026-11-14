'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, Cpu, Shield, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

export const LlmPipelineDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasFallback, setHasFallback] = useState(false);

  const steps = [
    {
      id: 'input',
      label: 'Input Ingestion',
      sub: 'Multi-turn prompt',
      latency: '2ms',
      status: 'Ready',
    },
    {
      id: 'draft',
      label: 'Speculative Draft (1.5B)',
      sub: 'Token generation k=5',
      latency: '18ms',
      status: 'Generating',
    },
    {
      id: 'verify',
      label: 'Target Verification (70B)',
      sub: 'Parallel logit acceptance',
      latency: '24ms',
      status: 'Accepting',
    },
    {
      id: 'guardrail',
      label: 'Guardrail Watchdog',
      sub: 'AST & schema validation',
      latency: '4ms',
      status: hasFallback ? 'Fallback Triggered' : 'Passed',
    },
    {
      id: 'stream',
      label: 'Stream Output Chunk',
      sub: 'SSE stream buffer',
      latency: '1ms',
      status: 'Emitted',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <Card className="w-full bg-[var(--surface-raised)] border border-[var(--border-strong)] p-4 sm:p-6 space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Interactive Architecture // Speculative Inference Pipeline
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tag variant={hasFallback ? 'warning' : 'accent'} size="sm">
            {hasFallback ? 'Fault-Tolerant Fallback' : 'Zero-Overhead Speculation'}
          </Tag>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            className="p-1.5 border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-current text-[var(--accent)]' : ''}`} />
          </button>
          <button
            onClick={() => {
              setActiveStep(0);
              setHasFallback(false);
            }}
            aria-label="Reset simulation"
            className="p-1.5 border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Step Track */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 relative">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;
          return (
            <div
              key={step.id}
              onClick={() => {
                setActiveStep(idx);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-[var(--radius-xs)] border transition-all cursor-pointer font-mono select-none ${
                isActive
                  ? 'bg-[var(--surface)] border-[var(--accent)] shadow-sm'
                  : isPassed
                  ? 'bg-[var(--surface-raised)] border-emerald-500/30'
                  : 'bg-[var(--surface-raised)] border-[var(--border)] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
                <span>0{idx + 1}</span>
                <span className="text-[var(--accent)]">{step.latency}</span>
              </div>
              <div className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {step.label}
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] truncate">
                {step.sub}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px]">
                {isActive ? (
                  <span className="flex items-center gap-1 text-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                    Active
                  </span>
                ) : isPassed ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                ) : (
                  <span className="text-[var(--text-disabled)]">Queued</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Latency & Invariant Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-4">
          <span>End-to-End Latency: <strong className="text-[var(--text-primary)]">49ms P99</strong></span>
          <span>Draft Acceptance Rate: <strong className="text-emerald-400">81.4%</strong></span>
        </div>
        <button
          onClick={() => setHasFallback(!hasFallback)}
          className="text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1"
        >
          <Shield className="w-3.5 h-3.5" />
          {hasFallback ? 'Clear Chaos Test' : 'Simulate 429 API Exception'}
        </button>
      </div>

      {/* Static Fallback for Screen Readers & Print */}
      <noscript>
        <div className="p-3 text-xs font-mono text-[var(--text-secondary)]">
          Inference Topology: Ingestion (2ms) → Draft Model (18ms) → Target Verification (24ms) → Guardrail Watchdog (4ms) → Stream Chunk (1ms). Total P99: 49ms.
        </div>
      </noscript>
    </Card>
  );
};
