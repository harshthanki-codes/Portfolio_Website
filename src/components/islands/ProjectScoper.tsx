import React, { useState } from 'react';
import { 
  Cpu, 
  Workflow, 
  Database, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DomainOption {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Cpu;
  defaultStack: string[];
  defaultTopology: string;
  timeline: string;
  sla: string;
}

const DOMAIN_OPTIONS: DomainOption[] = [
  {
    id: 'ai-llm',
    title: 'Custom AI & Private LLMs',
    subtitle: 'Domain fine-tuning, GGUF runtimes, airgapped intelligence, $0 token cost',
    icon: Cpu,
    defaultStack: ['Python', 'Unsloth', 'PEFT/LoRA', 'Ollama/vLLM', 'FastAPI', 'LangChain'],
    defaultTopology: 'Enterprise Corpora ➔ QLoRA 4-bit ➔ Local GGUF Engine ➔ Transparent API Proxy',
    timeline: '2 – 4 Weeks to Production Pilot',
    sla: '100% On-Premise Privacy · $0 Cloud Token Burn'
  },
  {
    id: 'automation',
    title: 'Intelligent Enterprise Automations',
    subtitle: 'Multimodal voice-to-order, OCR document extraction, 7-tier failover DAGs',
    icon: Workflow,
    defaultStack: ['Python', 'Whisper', 'RapidFuzz', 'Celery/Redis', 'Flutter/Kotlin', 'PostgreSQL'],
    defaultTopology: 'Audio/Document Ingestion ➔ Fuzzy Entity Matcher ➔ 7-Tier Failover DAG ➔ Live DB Sync',
    timeline: '1 – 3 Weeks to Deployment',
    sla: '0% Transaction Loss · 97.6% Error Reduction'
  },
  {
    id: 'erp-crm',
    title: 'Custom ERP & CRM Architectures',
    subtitle: 'ERPNext & Odoo modules, dynamic schema mappers, high-throughput ledgers',
    icon: Database,
    defaultStack: ['Python', 'ERPNext/Frappe', 'Odoo 18/19', 'PostgreSQL', 'Docker', 'XML-RPC'],
    defaultTopology: '10K+ SKU Ingestion ➔ Distributed Validator ➔ Auto-Rollback Engine ➔ Atomic Ledger',
    timeline: '3 – 6 Weeks to Production Launch',
    sla: '85% Onboarding Speedup · Sub-50ms Ledger Rollups'
  },
  {
    id: 'fullstack-backend',
    title: 'Full-Stack Products & Resilient Backends',
    subtitle: 'FastAPI async microservices, Astro/React dashboards, native mobile bridges',
    icon: Layers,
    defaultStack: ['FastAPI', 'Astro', 'React 19', 'PostgreSQL', 'Redis', 'TailwindCSS'],
    defaultTopology: 'Edge CDN ➔ Reactive Astro/React Frontend ➔ Async FastAPI ➔ In-Memory Cache ➔ ACID DB',
    timeline: '2 – 5 Weeks to MVP / Launch',
    sla: '<50ms Response SLA · 50+ Req/s Throughput'
  }
];

const INFRA_OPTIONS = [
  { id: 'airgapped', label: 'Air-Gapped / On-Premise', desc: 'Strict zero-cloud-leakage guarantee' },
  { id: 'cloud', label: 'Private Cloud (AWS / GCP)', desc: 'Scalable containerized microservices' },
  { id: 'hybrid', label: 'Hybrid / Serverless Mesh', desc: 'Local compute + high-availability cloud fallback' }
];

const OUTCOME_OPTIONS = [
  { id: 'cut-cost', label: 'Cut Operational Burn & Token Bills', metric: '$0 Token Cost' },
  { id: 'zero-error', label: 'Eliminate Manual Labor & Human Errors', metric: '97.6% Error Drop' },
  { id: 'speedup', label: 'Accelerate Core Data & Catalog Onboarding', metric: '85% Speedup' },
  { id: 'latency', label: 'Sub-100ms Latency & High Concurrency', metric: '<50ms Query SLA' }
];

export const ProjectScoper: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ai-llm');
  const [selectedInfra, setSelectedInfra] = useState<string>('airgapped');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('cut-cost');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeDomain = DOMAIN_OPTIONS.find(d => d.id === selectedDomain) || DOMAIN_OPTIONS[0];
  const activeInfra = INFRA_OPTIONS.find(i => i.id === selectedInfra) || INFRA_OPTIONS[0];
  const activeOutcome = OUTCOME_OPTIONS.find(o => o.id === selectedOutcome) || OUTCOME_OPTIONS[0];

  const generatedDossier = `PROJECT INQUIRY DOSSIER
Solution Area: ${activeDomain.title}
Deployment Target: ${activeInfra.label} (${activeInfra.desc})
Priority Metric: ${activeOutcome.label} [${activeOutcome.metric}]
Recommended Architecture Topology: ${activeDomain.defaultTopology}
Timeline Expectation: ${activeDomain.timeline}
Guaranteed SLA: ${activeDomain.sla}
Client Contact: ${clientEmail || 'Not specified'}
Specific Notes: ${clientNotes || 'Let us discuss our technical architecture and immediate business constraints.'}`;

  const handleCopyDispatch = () => {
    navigator.clipboard.writeText(generatedDossier);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleMailtoDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enterprise Solution Inquiry: ${activeDomain.title}`);
    const body = encodeURIComponent(generatedDossier);
    window.location.href = `mailto:harsh.h.thanki@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="scoper" className="py-[var(--space-section-y)] border-t border-[var(--border-subtle)] relative bg-[var(--bg-surface-raised)]" aria-labelledby="scoper-heading">
      <div className="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)]">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-[var(--text-xs)] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]"></span>
              <span className="font-semibold">Interactive Architecture Planner</span>
            </div>
            <h2 id="scoper-heading" className="text-[var(--text-xl)] font-serif font-normal tracking-tight text-[var(--text-primary)]">
              Scope Your Custom <span className="gradient-text-solar font-serif italic">Enterprise Solution</span>
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1.5 max-w-2xl font-sans leading-relaxed">
              Select your requirements below to immediately generate a tailored architectural topology, recommended tech stack, and estimated deployment timeline.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-tertiary)] bg-[var(--bg-surface)] px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Interactive Client &amp; Founder Scoper</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Domain Selection */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-bold">
                  Step 01 // Solution Domain
                </span>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Select 1 core focus</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOMAIN_OPTIONS.map(option => {
                  const Icon = option.icon;
                  const isSelected = selectedDomain === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedDomain(option.id)}
                      className={`p-3.5 text-left rounded-[var(--radius-sm)] border transition-all flex flex-col justify-between gap-2 touch-target ${
                        isSelected 
                          ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_16px_var(--accent-glow)]' 
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`} />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] leading-tight">
                          {option.title}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] font-sans mt-0.5 leading-snug line-clamp-2">
                          {option.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Infrastructure & Privacy */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-bold">
                  Step 02 // Deployment &amp; Security Boundary
                </span>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Infrastructure</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {INFRA_OPTIONS.map(infra => {
                  const isSelected = selectedInfra === infra.id;
                  return (
                    <button
                      key={infra.id}
                      type="button"
                      onClick={() => setSelectedInfra(infra.id)}
                      className={`p-3 text-left rounded-[var(--radius-sm)] border transition-all flex flex-col justify-between gap-1 touch-target ${
                        isSelected 
                          ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_12px_var(--accent-glow)]' 
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-[var(--text-primary)]">
                        {infra.label}
                      </div>
                      <div className="text-[10px] text-[var(--text-tertiary)] font-sans leading-tight">
                        {infra.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Priority Business Metric */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-bold">
                  Step 03 // Priority Business Metric
                </span>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">ROI Benchmark</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OUTCOME_OPTIONS.map(outcome => {
                  const isSelected = selectedOutcome === outcome.id;
                  return (
                    <button
                      key={outcome.id}
                      type="button"
                      onClick={() => setSelectedOutcome(outcome.id)}
                      className={`p-3 text-left rounded-[var(--radius-sm)] border transition-all flex items-center justify-between gap-2 touch-target ${
                        isSelected 
                          ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_12px_var(--accent-glow)]' 
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-xs text-[var(--text-primary)] font-semibold truncate">
                          {outcome.label}
                        </div>
                        <div className="text-[10px] text-[var(--accent)] font-mono font-medium">
                          {outcome.metric}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Blueprint & Dispatch Column (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            
            <div className="p-6 sm:p-7 rounded-[var(--radius-lg)] border border-[var(--accent-border)] bg-[var(--bg-surface)] space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--accent-gradient)]"></div>

              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                  <span>Architecture Recommendation</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] font-mono text-[9px] font-bold">
                  READY
                </span>
              </div>

              {/* Topology */}
              <div className="space-y-1.5 font-mono">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                  Recommended Data Pipeline Topology:
                </div>
                <div className="p-3 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {activeDomain.defaultTopology}
                </div>
              </div>

              {/* Core Stack */}
              <div className="space-y-1.5 font-mono">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                  Production Stack:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDomain.defaultStack.map(tech => (
                    <span key={tech} className="px-2 py-0.5 text-[10px] bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] text-[var(--text-primary)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* SLA & Timeline Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] border-t border-[var(--border-subtle)]">
                <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)]">
                  <div className="text-[9px] text-[var(--text-tertiary)] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--accent)]" />
                    <span>Timeline</span>
                  </div>
                  <div className="font-bold text-[var(--text-primary)] text-xs mt-1">
                    {activeDomain.timeline}
                  </div>
                </div>

                <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)]">
                  <div className="text-[9px] text-[var(--text-tertiary)] uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[var(--status-complete)]" />
                    <span>Target Metric</span>
                  </div>
                  <div className="font-bold text-[var(--text-primary)] text-xs mt-1">
                    {activeOutcome.metric}
                  </div>
                </div>
              </div>

              {/* Quick Dispatch Form */}
              <form onSubmit={handleMailtoDispatch} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label htmlFor="scoper-email" className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                    Your Work Email / WhatsApp / Contact:
                  </label>
                  <input
                    id="scoper-email"
                    type="text"
                    required
                    placeholder="founder@company.com or +1 / +91..."
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="scoper-notes" className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                    Operational Bottlenecks / Notes (Optional):
                  </label>
                  <textarea
                    id="scoper-notes"
                    rows={2}
                    placeholder="Tell us about your current stack, bottlenecks, or timeline..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1 font-mono text-xs">
                  <button
                    type="submit"
                    className="flex-1 touch-target px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--accent-gradient)] text-[var(--accent-text)] font-bold shadow-[0_4px_16px_var(--accent-glow)] hover:shadow-[0_8px_24px_var(--accent-glow)] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyDispatch}
                    className="touch-target px-3.5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isCopied ? '✓ Copied!' : 'Copy Dossier'}</span>
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
