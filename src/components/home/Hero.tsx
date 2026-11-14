'use client';

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getAssetPath } from '@/lib/paths';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Editorial Masthead (8 cols) */}
          <div className="lg:col-span-8 space-y-7">
            {/* Small Monospace Masthead Label */}
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              <span>AI Systems Architect // Local Inference</span>
            </div>

            {/* Short Headline: Exactly 7 words (<= 8 words), with text-balance */}
            <h1 className="text-[2.35rem] sm:text-5xl lg:text-6xl font-serif font-normal text-[var(--text-primary)] leading-[1.08] tracking-tight [text-wrap:balance]">
              Engineering deterministic backends for enterprise LLM systems.
            </h1>

            {/* One Supporting Sentence */}
            <p className="text-base sm:text-lg font-sans text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
              Specializing in on-premise fine-tuning, failover inference DAGs, and local open-weights engines with zero marginal token cost.
            </p>

            {/* One Real Proof Point (Zero placeholders, zero fake verification tags) */}
            <div className="pt-3 border-t border-[var(--border)] flex items-baseline gap-3 text-xs font-mono text-[var(--text-secondary)]">
              <span className="text-[var(--accent)] font-semibold shrink-0">01 / PROOF</span>
              <p className="text-[var(--text-primary)] font-normal">
                Trained local 7B models achieving 8.7/10 on ERP ORM evaluation benchmarks.
              </p>
            </div>

            {/* Two Action Buttons & Resume Link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-3">
              <a href="#work" className="w-full sm:w-auto">
                <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
                  View Case Studies
                </Button>
              </a>

              <a href="#contact" className="w-full sm:w-auto">
                <Button size="md" variant="outline" className="w-full sm:w-auto justify-center">
                  Get in Touch
                </Button>
              </a>

              <a
                href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] py-2 sm:px-2 transition-colors"
              >
                <span>Read Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Portrait Column (4 cols) — Perfectly framed */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="relative w-44 h-52 sm:w-56 sm:h-68 rounded-sm overflow-hidden border border-[var(--border-strong)] bg-[var(--surface)] shadow-md group">
              <img
                src={getAssetPath('/harsh-thanki-transparent.png')}
                alt="Harsh Thanki — AI Systems Architect"
                width={224}
                height={272}
                className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetPath('/images/harsh-thanki-transparent.png');
                }}
              />
              <div className="absolute bottom-0 inset-x-0 p-2 bg-[var(--background)]/90 backdrop-blur-sm border-t border-[var(--border)] font-mono text-[10px] text-[var(--text-tertiary)] flex items-center justify-between">
                <span>HARSH THANKI</span>
                <span>AHMEDABAD, IN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
