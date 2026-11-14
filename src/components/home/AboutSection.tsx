import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Section Masthead */}
        <div className="space-y-2 pb-6 border-b border-[var(--border)]">
          <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
            02 / ABOUT & CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
            Engineering Principles & Credentials
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-lg sm:text-xl font-serif text-[var(--text-primary)] italic">
              "Deterministic architecture over probabilistic guesswork."
            </h3>
            <p className="text-xs font-mono text-[var(--accent)]">
              Alliance University — Master of Computer Applications (2024–2026)
            </p>
          </div>

          <div className="lg:col-span-8 space-y-5 text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
            <p>
              I build software where language models operate reliably within strict enterprise constraints. Rather than tethering production architectures to volatile cloud API quotas, I engineer air-gapped open-weights runtimes (Ollama, vLLM, QLoRA) with localized parameter tuning, speculative draft evaluation, and fault-tolerant ingestion DAGs.
            </p>
            <p>
              My expertise spans database concurrency (PostgreSQL transaction isolation, lock contention tuning, N+1 query elimination), low-level systems programming, and production inference optimization. Every system I deliver is measured against rigorous benchmarks for zero UI-blocking latency and complete data sovereignty.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[var(--border)] font-mono text-xs">
              <div>
                <span className="text-[var(--text-primary)] block font-medium mb-1">Core Competencies</span>
                <span className="text-[var(--text-tertiary)] block text-[11px]">
                  Speculative Decoding • Fine-Tuning (PEFT/QLoRA) • DAG Circuit Breakers • Distributed PostgreSQL
                </span>
              </div>
              <div>
                <span className="text-[var(--text-primary)] block font-medium mb-1">Availability</span>
                <span className="text-[var(--text-tertiary)] block text-[11px]">
                  Ahmedabad, India • Available for Senior Systems & AI Engineering Roles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
