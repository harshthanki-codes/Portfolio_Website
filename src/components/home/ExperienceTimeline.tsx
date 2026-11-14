import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import { Calendar, Building, GraduationCap, CheckCircle2 } from 'lucide-react';

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
      organization: 'Synapse-AI & Enterprise Contract Work',
      period: '2025 — Present',
      location: 'Ahmedabad / Remote',
      type: 'work',
      highlights: [
        'Fine-tuned DeepSeek Coder 7B and Qwen 2.5 on on-premise ERP codebases using QLoRA with Unsloth, achieving 8.7/10 benchmark parity at zero marginal token cost.',
        'Architected a 7-tier fault-tolerant voice ingestion DAG processing multilingual order calls into ERP databases with 0% drop rate.',
        'Engineered fails-closed DNS proxy systems and Windows watchdog daemons across 35+ workstations.',
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
        'Capstone research on speculative decoding and localized inference parameter pruning for small language models.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 border-b border-[var(--border)] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          number="02"
          tag="CAREER & CREDENTIALS"
          title="Engineering Experience & Track Record"
          subtitle="Verifiable production deployments, systems architecture roles, and academic foundation in distributed computing."
        />

        <div className="relative border-l-2 border-[var(--border)] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
          {experiences.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Anchor */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] group-hover:scale-125 transition-transform" />

              <Card variant="raised" className="p-5 sm:p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)]">
                      {item.type === 'work' ? (
                        <Building className="w-3.5 h-3.5" />
                      ) : (
                        <GraduationCap className="w-3.5 h-3.5" />
                      )}
                      <span>{item.organization}</span>
                      <span className="text-[var(--text-tertiary)]">• {item.location}</span>
                    </div>
                  </div>
                  <Tag variant="default" size="sm">
                    {item.period}
                  </Tag>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
