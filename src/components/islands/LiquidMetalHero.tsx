import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  Zap, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  ArrowUpRight,
  Database,
  Lock,
  Activity
} from 'lucide-react';

export default function LiquidMetalHero() {
  const [activeTab, setActiveTab] = useState<'ai' | 'backend' | 'systems'>('ai');

  return (
    <div className="relative w-full min-h-[calc(100svh-4rem)] bg-transparent overflow-hidden flex flex-col font-sans pt-2 sm:pt-4">
      
      {/* Subtle background vignette for maximum contrast and typography brilliance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 z-0 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex-grow flex flex-col justify-center items-center text-center py-4 sm:py-8">
        
        {/* Availability Badge & Status indicator */}
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0e16]/80 border border-white/15 backdrop-blur-xl shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-medium text-gray-200 tracking-wide uppercase">
            Available for Architecture Scoping
          </span>
          <span className="hidden xs:inline-block w-1 h-1 rounded-full bg-white/30"></span>
          <span className="hidden xs:inline-block text-[10px] font-mono text-orange-400/90 font-semibold">Q4 2026</span>
        </div>

        {/* Primary Executive Headline */}
        <h1 
          className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-[1.18] sm:leading-[1.12]" 
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.85)' }}
        >
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-amber-600 font-serif italic">custom AI systems</span> &amp; enterprise pipelines.
        </h1>
        
        {/* Crisp Sub-Narrative with Key Technical Highlights */}
        <p 
          className="text-xs sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 max-w-2xl leading-relaxed font-sans px-1"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
        >
          I design &amp; deploy <strong className="text-white font-semibold">custom LLM automation pipelines</strong>, mission-critical ERP &amp; CRM infrastructures, and resilient Python microservices. Engineered for founders &amp; CTOs requiring airgapped privacy, zero data-leakage, and verifiable ROI.
        </p>

        {/* Interactive Domain Switcher Pill for Mobile & Desktop - Fills the empty middle space */}
        <div className="w-full max-w-lg mb-5 sm:mb-7">
          <div className="bg-[#0b0d14]/85 border border-white/15 backdrop-blur-xl rounded-2xl p-1.5 flex items-center justify-between gap-1 shadow-xl">
            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'ai' 
                  ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/15 border border-orange-500/50 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span>AI &amp; LLM</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('backend')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'backend' 
                  ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/15 border border-orange-500/50 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-orange-400" />
              <span>Python Backend</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('systems')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'systems' 
                  ? 'bg-gradient-to-r from-orange-500/25 to-amber-500/15 border border-orange-500/50 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>ERP &amp; Systems</span>
            </button>
          </div>

          {/* Quick Context Snippet per Domain */}
          <div className="mt-2 text-[11px] sm:text-xs font-mono text-gray-400/90 flex items-center justify-center gap-2">
            {activeTab === 'ai' && (
              <>
                <span className="text-emerald-400 font-bold">●</span>
                <span>Fine-tuned QLoRA, Agentic DAGs, Zero Marginal Token Cost</span>
              </>
            )}
            {activeTab === 'backend' && (
              <>
                <span className="text-orange-400 font-bold">●</span>
                <span>FastAPI, Celery Distributed Mesh, Sub-50ms p99 Postgres</span>
              </>
            )}
            {activeTab === 'systems' && (
              <>
                <span className="text-amber-400 font-bold">●</span>
                <span>Self-hosted CRM/ERP architectures, Audit ledgers &amp; Zero Leakage</span>
              </>
            )}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
          <a 
            href="#solutions" 
            className="touch-target w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-wide hover:bg-gray-100 transition-all active:scale-95 shadow-[0_0_24px_rgba(255,102,0,0.35)] flex items-center justify-center gap-2"
          >
            <span>Explore 4 Client Solutions</span>
            <span>&rarr;</span>
          </a>
          <a 
            href="#scoper" 
            className="touch-target w-full sm:w-auto px-7 py-3 rounded-full bg-[#0c0e16]/85 backdrop-blur-xl text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-orange-500/50 hover:bg-[#141824] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Scope Your Architecture</span>
          </a>
        </div>

      </div>

      {/* Feature bottom bar - Responsive 3-Column Micro-HUD with safe padding */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-6 pb-6 sm:pb-8 mt-auto">
        <div className="bg-[#0b0d14]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 sm:p-4 grid grid-cols-3 divide-x divide-white/10 items-center text-center shadow-2xl">
          
          <div className="flex flex-col items-center justify-center gap-1 px-1 sm:px-3">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden xs:inline">Fallback</span>
            </div>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">
              Live 7-Tier Fallback
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-1 sm:px-3">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden xs:inline">Airgapped</span>
            </div>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">
              Zero Data Leakage
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-1 sm:px-3">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider hidden xs:inline">Audit</span>
            </div>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">
              Production Benchmarks
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
