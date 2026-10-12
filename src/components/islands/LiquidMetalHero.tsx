import React from 'react';

export default function LiquidMetalHero() {
  return (
    <div className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col font-sans pt-20">
      
      {/* Subtle radial gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0 pointer-events-none"></div>

      {/* Content overlay */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none pb-32 mt-10">
        
        {/* Availability Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 tracking-wide uppercase">Available for Scoping</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 font-serif italic">custom AI systems</span> &amp; pipelines.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          I build <strong className="text-white font-semibold">custom LLM automation pipelines</strong>, mission-critical ERP &amp; CRM architectures, and resilient Python backend systems. Engineered for founders and tier-1 teams requiring measurable ROI, zero data-leakage, and airgapped reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto mt-8">
          <a href="#solutions" className="px-8 py-3.5 rounded-full bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,100,0,0.4)]">
            Explore Solutions &rarr;
          </a>
          <a href="#scoper" className="px-8 py-3.5 rounded-full bg-black/60 backdrop-blur-xl text-white font-semibold border border-white/30 hover:bg-black/80 hover:border-white/50 transition-colors">
            Scope Project
          </a>
        </div>
      </div>

      {/* Feature bottom bar */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pb-12 pointer-events-none mt-auto">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center text-sm md:text-base text-gray-200 gap-4 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="font-semibold text-white flex items-center gap-3">
             <span className="text-orange-400 text-lg">⚡</span> Live 7-Tier Fallback
          </div>
          <div className="hidden sm:block text-gray-500">•</div>
          <div className="font-semibold text-white flex items-center gap-3">
             <span className="text-orange-400 text-lg">🔒</span> Zero Data Leakage
          </div>
          <div className="hidden sm:block text-gray-500">•</div>
          <div className="font-semibold text-white flex items-center gap-3">
             <span className="text-orange-400 text-lg">📈</span> Measurable ROI
          </div>
        </div>
      </div>

    </div>
  );
}
