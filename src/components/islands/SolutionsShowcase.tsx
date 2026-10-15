import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Workflow, 
  Database, 
  Layers, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

interface Solution {
  id: string;
  categoryNumber: string;
  categoryTag: string;
  headlineMetric: string;
  title: string;
  description: string;
  pipeline: string[];
  capabilities: string[];
  benchmark: string;
  benchmarkScore: string;
  icon: React.ReactNode;
  accentColor: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: 'ai-llms',
    categoryNumber: '01',
    categoryTag: 'AI Systems & LLMs',
    headlineMetric: '$0 Marginal Token Cost',
    title: 'Custom AI Solutions & Private LLM Architecture',
    description: 'Eliminate recurring third-party API bills and confidential corporate data leakage. We fine-tune open-weights models (DeepSeek, Qwen, Mistral) on your specific domain data, compiling them into high-speed, local air-gapped runtimes.',
    pipeline: ['Domain Corpora', 'QLoRA 4-bit Quant', 'Airgapped Ollama', 'Private Weights'],
    capabilities: [
      'Domain-Specific QLoRA 4-bit Quantized Fine-Tuning',
      'Air-Gapped On-Premise Runtimes (Ollama / vLLM / GGUF)',
      'Autonomous Agent Tool-Calling (MCP Protocol & APIs)',
      'Private Enterprise RAG & Vector Search Repositories'
    ],
    benchmark: 'Benchmark:',
    benchmarkScore: '8.7/10 Score vs Claude 3.5',
    icon: <Bot className="w-5 h-5 text-orange-400" />,
    accentColor: 'from-orange-500/20 via-amber-500/10 to-transparent'
  },
  {
    id: 'automations',
    categoryNumber: '02',
    categoryTag: 'Intelligent Automations',
    headlineMetric: '97.6% Error Reduction',
    title: 'Enterprise Automations & Operations Pipelines',
    description: 'Eliminate repetitive operational friction, manual data-entry bottlenecks, and human transcription errors. We engineer autonomous background pipelines connecting phone calls, documents, and external web portals directly to your databases.',
    pipeline: ['Telephony Stream', 'Acoustic Model', '7-Tier Failover', 'ACID Rollup'],
    capabilities: [
      'Mobile Telephony Call-to-Order Pipeline (Zero Data Loss)',
      'Automated Legal Scraping & OCR CAPTCHA Decoders',
      'Indic Multilingual Voice Synthesis & Dubbing Studio',
      '7-Tier Chaos-Resistant Distributed Failover Mesh'
    ],
    benchmark: 'Impact:',
    benchmarkScore: '27 Manual Fixes Saved/Day',
    icon: <Workflow className="w-5 h-5 text-amber-400" />,
    accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'erp-crm',
    categoryNumber: '03',
    categoryTag: 'Enterprise ERP & CRM',
    headlineMetric: '85% Catalog Speedup',
    title: 'Custom ERP & CRM Architecture & Integration',
    description: 'Software built strictly around how your business operates—not the other way around. We engineer high-throughput inventory engines, custom modules, ledger architectures, and seamless bi-directional ERP integrations.',
    pipeline: ['Relational Ledger', 'Bulk Ingest DAG', 'Dynamic Schema', 'Live FX Buffer'],
    capabilities: [
      'Odoo 18/19 & ERPNext / Frappe Custom Business Logic',
      'Dynamic-Schema Bulk-Import Pipeline (10K+ SKUs/batch)',
      'High-Throughput Multi-Currency Relational Ledgers',
      'AI Conversational Quotation & Price-Anomaly Guardrails'
    ],
    benchmark: 'Scale:',
    benchmarkScore: '32,000+ SKU Catalog Handling',
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'scalable-backends',
    categoryNumber: '04',
    categoryTag: 'Products & Scalable Backends',
    headlineMetric: '<50ms Response SLA',
    title: 'Full-Stack Web, Mobile & High-Throughput APIs',
    description: 'From consumer-facing web platforms to sub-second API microservices and secure endpoint daemons. We build production-ready software systems with strict test coverage, typed schemas, and zero unhandled failure states.',
    pipeline: ['Async FastAPI', 'Celery / Redis', 'Postgres Pool', 'Tamper Watchdog'],
    capabilities: [
      'FastAPI Asynchronous Microservices & Streaming APIs',
      'Astro + React High-Performance Reactive Web Dashboards',
      'Cross-Platform Flutter & Native Android Telephony Bridges',
      'Tamper-Proof Windows Endpoint Watchdog & DNS Proxy'
    ],
    benchmark: 'Concurrency:',
    benchmarkScore: '50+ Req/s Load-Tested',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    accentColor: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  }
];

export const SolutionsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'ai-llms': true // Keep first card open by default for immediate context
  });

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredSolutions = activeTab === 'all' 
    ? SOLUTIONS 
    : SOLUTIONS.filter(s => s.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Interactive Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`touch-target px-4 py-2 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_16px_rgba(255,102,0,0.4)]'
              : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
          }`}
          role="tab"
          aria-selected={activeTab === 'all'}
        >
          ✦ All Disciplines (4)
        </button>
        {SOLUTIONS.map(sol => (
          <button
            key={sol.id}
            type="button"
            onClick={() => setActiveTab(sol.id)}
            className={`touch-target px-4 py-2 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === sol.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_16px_rgba(255,102,0,0.4)]'
                : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
            role="tab"
            aria-selected={activeTab === sol.id}
          >
            <span>{sol.categoryNumber}</span>
            <span>{sol.categoryTag}</span>
          </button>
        ))}
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredSolutions.map(sol => {
          const isExpanded = !!expandedCards[sol.id];

          return (
            <div
              key={sol.id}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#0c0e16]/65 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#111420]/80 hover:shadow-[0_12px_40px_rgba(255,102,0,0.12)] flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div 
                className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${sol.accentColor} blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Card Top Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    {sol.icon}
                    <span className="font-mono text-[11px] font-bold text-gray-200 tracking-wider uppercase">
                      {sol.categoryNumber} // {sol.categoryTag}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {sol.headlineMetric}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                  {sol.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed font-sans">
                  {sol.description}
                </p>

                {/* Visual Pipeline Stream */}
                <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-orange-400" />
                    <span>Autonomous Topology Stream:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    {sol.pipeline.map((step, idx) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-gray-200 font-medium">
                          {step}
                        </span>
                        {idx < sol.pipeline.length - 1 && (
                          <span className="text-orange-400 font-bold">&rarr;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Expandable Technical Capabilities Drawer */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => toggleExpand(sol.id)}
                    className="w-full flex items-center justify-between py-2 text-xs font-mono font-semibold text-gray-400 hover:text-white transition-colors group/btn"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      <span>{isExpanded ? 'Hide Architecture Specs' : 'Inspect 4 Core Capabilities'}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-orange-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover/btn:text-white transition-colors" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 pt-3 border-t border-white/[0.06] space-y-2 animate-in fade-in duration-200">
                      <ul className="space-y-2 font-mono text-xs text-gray-300">
                        {sol.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2.5">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 text-[10px]">
                              ✓
                            </span>
                            <span className="leading-snug">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Bottom Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-gray-400">
                  <span>{sol.benchmark} </span>
                  <strong className="text-white font-semibold">{sol.benchmarkScore}</strong>
                </div>
                <a
                  href="#scoper"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors group/link"
                >
                  <span>Scope Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SolutionsShowcase;
