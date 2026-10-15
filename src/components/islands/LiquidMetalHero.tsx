import React from 'react';

export default function LiquidMetalHero() {
  return (
    <div className="relative w-full min-h-[calc(100dvh-4rem)] bg-transparent overflow-hidden flex flex-col font-sans pt-1 sm:pt-4">
      
      {/* Subtle radial gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0 pointer-events-none"></div>

      {/* Content overlay */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none pt-3 sm:pt-6 pb-6 sm:pb-8">
        
        {/* Availability Badge */}
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-gray-300 tracking-wide uppercase">Available for Scoping</span>
        </div>

        <h1 className="text-[1.85rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3 sm:mb-5 leading-[1.15]" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 font-serif italic">custom AI systems</span> &amp; pipelines.
        </h1>
        
        <p className="text-xs sm:text-base md:text-lg text-gray-300/95 mb-5 sm:mb-8 max-w-2xl leading-relaxed px-1 sm:px-0" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          I build <strong className="text-white font-semibold">custom LLM automation pipelines</strong>, mission-critical ERP &amp; CRM architectures, and resilient Python backend systems. Engineered for founders and tier-1 teams requiring measurable ROI, zero data-leakage, and airgapped reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none pointer-events-auto">
          <a href="#solutions" className="touch-target w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-wide hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_24px_rgba(255,102,0,0.4)] flex items-center justify-center gap-2">
            <span>Explore Solutions</span>
            <span>&rarr;</span>
          </a>
          <a href="#scoper" className="touch-target w-full sm:w-auto px-7 py-3 rounded-full bg-black/60 backdrop-blur-xl text-white font-semibold text-xs sm:text-sm border border-white/20 hover:bg-black/80 hover:border-white/40 transition-colors flex items-center justify-center">
            Scope Project
          </a>
        </div>
      </div>

      {/* Feature bottom bar - responsive 3-column micro-HUD */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-4 pb-6 sm:pb-10 pointer-events-none mt-auto">
        <div className="bg-[#0c0e16]/80 backdrop-blur-2xl border border-white/[0.12] rounded-xl sm:rounded-2xl p-2.5 sm:p-5 grid grid-cols-3 divide-x divide-white/10 items-center text-center shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 px-1 sm:px-4">
            <span className="text-orange-400 text-sm sm:text-lg">⚡</span>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">Live 7-Tier Fallback</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 px-1 sm:px-4">
            <span className="text-orange-400 text-sm sm:text-lg">🔒</span>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">Zero Data Leakage</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 px-1 sm:px-4">
            <span className="text-orange-400 text-sm sm:text-lg">📈</span>
            <span className="font-semibold text-white text-[10px] sm:text-sm tracking-tight leading-tight">Measurable ROI</span>
          </div>
        </div>
      </div>

    </div>
  );
}
