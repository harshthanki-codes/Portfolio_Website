import React, { useState } from 'react';
import { 
  Building2, 
  Terminal, 
  Briefcase, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Cpu 
} from 'lucide-react';

export type PersonaMode = 'all' | 'founders' | 'clients' | 'techleads';

interface PersonaData {
  id: PersonaMode;
  label: string;
  badge: string;
  icon: typeof Globe2;
  highlightText: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
}

const PERSONAS: PersonaData[] = [
  {
    id: 'all',
    label: 'Overview',
    badge: 'Universal Focus',
    icon: Globe2,
    highlightText: 'Engineering production-grade AI systems, mission-critical ERP & CRM platforms, and resilient backend architectures with verifiable business ROI.',
    metrics: [
      { label: 'Fine-Tuned Eval', value: '8.7 / 10', sub: '$0 Marginal Token Cost' },
      { label: 'Failover Resilience', value: '7-Tier Mesh', sub: '0% Transaction Loss' },
      { label: 'Error Reduction', value: '97.6% Drop', sub: '32K+ SKU Operations' }
    ]
  },
  {
    id: 'founders',
    label: 'Founders & CEOs',
    badge: 'ROI & Velocity',
    icon: Building2,
    highlightText: 'We cut operational burn and eliminate recurring cloud token overhead with local open-weights LLMs, shipping production pilots in 2–4 weeks with zero technical debt.',
    metrics: [
      { label: 'Cloud API Cost', value: '$0.00 / Mo', sub: '100% Offline GGUF Inference' },
      { label: 'Delivery Velocity', value: '2–4 Weeks', sub: 'From Scope to Live Pilot' },
      { label: 'Operational Gain', value: '27 Tasks/Day', sub: 'Eliminated Manual Fixes' }
    ]
  },
  {
    id: 'clients',
    label: 'Enterprise Clients',
    badge: 'Security & ERP/CRM',
    icon: Briefcase,
    highlightText: 'We build tailor-made enterprise software built strictly around your workflows—including custom Odoo & ERPNext modules, 10K+ SKU bulk imports, and zero cloud data leaks.',
    metrics: [
      { label: 'Data Security', value: '100% Airgapped', sub: 'Zero Cloud Data-Leakage' },
      { label: 'Catalog Speedup', value: '85% Faster', sub: '8 hr ➔ 72 min Onboarding' },
      { label: 'Batch Reliability', value: '99.8% Success', sub: 'Distributed Validation & Rollback' }
    ]
  },
  {
    id: 'techleads',
    label: 'Tech Leads & Tier-1',
    badge: 'Systems Architecture',
    icon: Terminal,
    highlightText: 'First-principles systems engineering: QLoRA 4-bit domain adaptation, 7-tier chaos-resistant failover DAGs, sub-50ms query SLAs, and +12.6 pts F1-score gains.',
    metrics: [
      { label: 'Eval Benchmark', value: '8.7 / 10', sub: 'vs Claude 3.5 Sonnet' },
      { label: 'Pipeline F1 Gain', value: '+12.6 pts', sub: '84.2% ➔ 96.8% via 5-Fold CV' },
      { label: 'Query SLA', value: '< 50ms p99', sub: 'FastAPI + Redis In-Memory' }
    ]
  }
];

export const HeroInteractiveView: React.FC = () => {
  const [activePersona, setActivePersona] = useState<PersonaMode>('all');
  const current = PERSONAS.find(p => p.id === activePersona) || PERSONAS[0];

  return (
    <div className="space-y-4">
      {/* Persona Selection Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-full max-w-fit overflow-x-auto no-scrollbar shadow-xs">
        <span className="text-[10px] font-mono text-[var(--text-tertiary)] px-2 uppercase tracking-wider hidden sm:inline-block font-semibold">
          Tailor View:
        </span>
        {PERSONAS.map(p => {
          const Icon = p.icon;
          const isSelected = activePersona === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePersona(p.id)}
              className={`touch-target px-3 py-1.5 rounded-full font-mono text-[11px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected 
                  ? 'bg-[var(--accent-gradient)] text-[var(--accent-text)] shadow-xs' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
              aria-pressed={isSelected}
            >
              <Icon className="w-3 h-3" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Narrative Callout */}
      <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-subtle)] transition-all flex items-start gap-2.5">
        <Zap className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--accent-text)] font-bold">
              {current.badge}
            </span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)]">Verified Value Proposition</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[var(--text-primary)] font-sans leading-relaxed">
            {current.highlightText}
          </p>
        </div>
      </div>

      {/* Dynamic Metrics Array */}
      <div className="grid grid-cols-3 gap-2.5 py-2 font-mono text-[var(--text-xs)]">
        {current.metrics.map((m, idx) => (
          <div 
            key={idx}
            className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-colors shadow-xs"
          >
            <div className="text-[var(--text-tertiary)] text-[9px] sm:text-[10px] uppercase tracking-wider truncate font-semibold">
              {m.label}
            </div>
            <div className="text-[var(--text-primary)] font-bold text-sm sm:text-[var(--text-base)] mt-0.5">
              {m.value}
            </div>
            <div className="text-[9px] sm:text-[10px] text-[var(--accent)] font-medium truncate mt-0.5">
              {m.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
