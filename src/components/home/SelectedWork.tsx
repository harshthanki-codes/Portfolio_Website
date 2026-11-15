'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';

export const SelectedWork: React.FC = () => {
  const projects = getFeaturedProjects();
  const featured = projects[0];
  const companions = projects.slice(1, 4);

  return (
    <section id="work" className="py-20 sm:py-28 border-b border-[var(--hairline)] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--hairline)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              01 / SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Production AI Systems & Backends
            </h2>
          </div>
          <p className="text-sm font-sans text-[var(--text-muted)] max-w-md leading-relaxed">
            One featured enterprise inference engine and three fault-tolerant systems, evaluated against measured baselines.
          </p>
        </div>

        {/* Bento Grid: 1 Featured 2x2 Tile + 3 Companion Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Tile (2x2) */}
          {featured && (
            <div className="md:col-span-2 md:row-span-2 group relative p-6 sm:p-8 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] hover:border-[var(--accent)] transition-all duration-320 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 font-mono text-xs">
                  <span className="text-[var(--accent)] font-semibold tracking-wider uppercase">
                    FEATURED 01 // LOCAL INFERENCE
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {featured.categories.slice(0, 2).join(' · ')}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                    <NextLink href={`/work/${featured.slug}`} className="focus:outline-none">
                      Autonomous Enterprise ERP Local Intelligence Engine
                    </NextLink>
                  </h3>
                  <p className="text-sm font-sans text-[var(--text-muted)] leading-relaxed max-w-xl">
                    Air-gapped coding intelligence trained on enterprise schema corpora, matching commercial frontier reasoning at zero marginal token cost.
                  </p>
                </div>

                {/* Thin-Line Vector Architecture Diagram */}
                <div className="pt-3 pb-2 transition-transform duration-320 group-hover:-translate-y-1">
                  <div className="p-4 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)]">
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      SYSTEM TOPOLOGY // ON-PREMISE STREAM
                    </div>
                    <svg
                      viewBox="0 0 600 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto text-[var(--hairline)]"
                    >
                      {/* Connecting Stream Lines */}
                      <path
                        d="M 90 40 L 170 40 M 270 40 L 350 40 M 450 40 L 520 40"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeDasharray="3 3"
                      />
                      {/* Node 1: Corpus */}
                      <rect x="10" y="20" width="80" height="40" rx="4" fill="var(--surface)" stroke="currentColor" strokeWidth="1.25" />
                      <text x="50" y="44" fill="var(--text-primary)" fontSize="10" fontFamily="monospace" textAnchor="middle">150MB Corpus</text>
                      {/* Node 2: QLoRA */}
                      <rect x="170" y="20" width="100" height="40" rx="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.25" />
                      <text x="220" y="44" fill="var(--accent)" fontSize="10" fontFamily="monospace" textAnchor="middle">QLoRA 4-bit</text>
                      {/* Node 3: Ollama */}
                      <rect x="350" y="20" width="100" height="40" rx="4" fill="var(--surface)" stroke="currentColor" strokeWidth="1.25" />
                      <text x="400" y="44" fill="var(--text-primary)" fontSize="10" fontFamily="monospace" textAnchor="middle">Air-Gapped GGUF</text>
                      {/* Node 4: $0 Token */}
                      <rect x="520" y="20" width="70" height="40" rx="4" fill="var(--accent-subtle)" stroke="var(--accent)" strokeWidth="1.25" />
                      <text x="555" y="44" fill="var(--accent)" fontSize="10" fontFamily="monospace" textAnchor="middle">$0 Token</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics & Deep Dive Link */}
              <div className="pt-4 border-t border-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] font-semibold">8.7 / 10 benchmark score</span>
                    <span className="text-[var(--text-muted)]">(vs 10/10 Claude Sonnet)</span>
                  </div>
                  <p className="text-[11px] font-sans text-[var(--text-tertiary)]">
                    Method: QLoRA 4-bit with Unsloth on single RTX 4090 · Oct 2026
                  </p>
                </div>

                <NextLink
                  href={`/work/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors shrink-0"
                >
                  <span>Read case study</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-320 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </NextLink>
              </div>
            </div>
          )}

          {/* Three Companion Tiles */}
          {companions.map((project, idx) => (
            <div
              key={project.slug}
              className="md:col-span-1 group relative p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] hover:border-[var(--accent)] transition-all duration-320 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--accent)] font-semibold tracking-wider">
                    0{idx + 2} // SYSTEM
                  </span>
                  <span className="text-[var(--text-muted)] text-[11px]">
                    {project.categories[0]}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <NextLink href={`/work/${project.slug}`} className="focus:outline-none">
                    {project.title.split('—')[0].trim()}
                  </NextLink>
                </h3>

                <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
                  {project.tagline}
                </p>

                {/* Companion Mini Thin-Line Diagram */}
                <div className="pt-2 transition-transform duration-320 group-hover:-translate-y-1">
                  <div className="p-3 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)]">
                    <svg
                      viewBox="0 0 260 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto text-[var(--hairline)]"
                    >
                      <path d="M 65 25 L 115 25 M 175 25 L 205 25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                      <rect x="5" y="10" width="60" height="30" rx="3" fill="var(--surface)" stroke="currentColor" strokeWidth="1" />
                      <text x="35" y="28" fill="var(--text-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">Ingest</text>
                      <rect x="115" y="10" width="60" height="30" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
                      <text x="145" y="28" fill="var(--accent)" fontSize="8" fontFamily="monospace" textAnchor="middle">Circuit</text>
                      <rect x="205" y="10" width="50" height="30" rx="3" fill="var(--surface)" stroke="currentColor" strokeWidth="1" />
                      <text x="230" y="28" fill="var(--text-primary)" fontSize="8" fontFamily="monospace" textAnchor="middle">ERP</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Metric & Link */}
              <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--accent)] font-medium">
                  {project.evaluation[0]?.ours || 'Measured Metric'}
                </span>
                <NextLink
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
                >
                  <span>Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-320 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </NextLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
