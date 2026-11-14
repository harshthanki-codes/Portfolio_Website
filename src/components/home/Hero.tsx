import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowDown, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { LlmPipelineDiagram } from '@/components/home/LlmPipelineDiagram';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status & Focus Area */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="accent" size="md">
                Systems Engineer
              </Tag>
              <Tag variant="default" size="md">
                LLM & GenAI Backends
              </Tag>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Engineering Roles
              </span>
            </div>

            {/* Core Headline & One-Sentence Positioning */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                Deterministic LLM Backends & Fault-Tolerant AI Pipelines.
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                I build on-premise open-weights inference systems, 7-tier failover DAGs, and high-throughput enterprise data engines with strict latency and zero marginal token cost.
              </p>
            </div>

            {/* Proof Metric Block */}
            <div className="p-4 bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-sm)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                  Verified Performance Benchmark
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>[METRIC] 8.7 / 10 benchmark score matching frontier commercial APIs</span>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--accent)] bg-[var(--accent-subtle)] px-2.5 py-1 rounded-[var(--radius-xs)] border border-[var(--accent-border)] font-semibold shrink-0">
                $0 Marginal Token Cost
              </span>
            </div>

            {/* CTAs & Resume Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <NextLink href="#work">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View Case Studies
                </Button>
              </NextLink>
              <NextLink href="#contact">
                <Button size="lg" variant="secondary">
                  Get in Touch
                </Button>
              </NextLink>
              <a
                href="/Harsh_Thanki_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Headshot Portrait & Specification Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start lg:items-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-raised)] overflow-hidden shadow-[var(--shadow-md)]">
              <Image
                src="/harsh-thanki-transparent.png"
                alt="Harsh Thanki — AI Solutions Engineer"
                width={224}
                height={224}
                priority
                className="object-cover w-full h-full filter contrast-105"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[var(--surface-overlay)] backdrop-blur-sm border border-[var(--border)] px-2 py-1 rounded-[var(--radius-xs)] text-center font-mono text-[10px] text-[var(--text-secondary)]">
                HARSH THANKI // AHMEDABAD, IN
              </div>
            </div>
          </div>
        </div>

        {/* Signature Interactive Diagram */}
        <div className="pt-6">
          <LlmPipelineDiagram />
        </div>
      </div>
    </section>
  );
};
