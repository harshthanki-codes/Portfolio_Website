import React from 'react';
import { Building, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'work' | 'education';
  highlights: string[];
}

export const ExperienceTimeline: React.FC = () => {
  const experiences: TimelineItem[] = [
    {
      id: 'ai-eng-lead',
      role: 'AI Solutions Engineer & Systems Architect',
      organization: 'Synapse-AI & Enterprise Contract Deployments',
      period: '2025 — Present',
      location: 'Ahmedabad / Remote',
      type: 'work',
      highlights: [
        'Fine-tuned DeepSeek Coder 7B and Qwen 2.5 on internal enterprise codebases using QLoRA with Unsloth, achieving 8.7/10 benchmark parity at zero marginal token cost.',
        'Architected a 7-tier fault-tolerant voice ingestion DAG processing multilingual order calls into ERP databases with 99.98% order preservation.',
        'Engineered fails-closed DNS proxy systems and Windows watchdog daemons across 35+ workstations with automated route withdrawal under 15ms.',
      ],
    },
    {
      id: 'fullstack-dev',
      role: 'Full-Stack Developer & ERP Automation Engineer',
      organization: 'Enterprise Solutions Practice',
      period: '2023 — 2024',
      location: 'Gujarat, India',
      type: 'work',
      highlights: [
        'Built high-throughput multi-currency ledger modules in Python and PostgreSQL, eliminating UI-blocking locks across 32K+ line-item batch rollups.',
        'Integrated automated European Central Bank FX caches with compound database indexing, reducing write latency from 4.2s to under 12ms.',
        'Shipped Flutter mobile client applications communicating via HMAC-SHA256 authenticated webhooks.',
      ],
    },
    {
      id: 'mca-degree',
      role: 'Master of Computer Applications (MCA)',
      organization: 'Alliance University',
      period: '2024 — 2026',
      location: 'Bengaluru / Hybrid',
      type: 'education',
      highlights: [
        'Specialization in Distributed Systems, Neural Network Quantization, and Enterprise Software Architecture.',
        'Research on speculative decoding latency and localized inference parameter pruning for small language models.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              02 / CAREER & TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Engineering Experience & Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-sm leading-relaxed">
            Verifiable production deployments, systems architecture roles, and academic foundation in distributed systems.
          </p>
        </div>

        {/* Editorial Timeline with Hairline Spine */}
        <div className="relative border-l border-[var(--border)] ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
          {experiences.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors" />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-[var(--text-primary)] font-normal">
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
                  <span className="font-mono text-xs text-[var(--text-tertiary)] shrink-0 px-2 py-0.5 border border-[var(--border)] rounded-sm">
                    {item.period}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
