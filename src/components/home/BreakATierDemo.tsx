'use client';

import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TierDefinition {
  id: number;
  name: string;
  hardware: string;
  latencyTarget: string;
}

const TIERS: TierDefinition[] = [
  { id: 1, name: 'Local Whisper Large-v3', hardware: 'Edge RTX 4090 (On-Prem)', latencyTarget: '< 450ms' },
  { id: 2, name: 'Speculative 1.5B Fast-Path', hardware: 'Local FP16 Draft Node', latencyTarget: '< 180ms' },
  { id: 3, name: 'Internal Quantized GGUF Node', hardware: 'Air-Gapped Workstation', latencyTarget: '< 650ms' },
  { id: 4, name: 'Regional On-Premise Backup', hardware: 'Secondary Cluster LAN', latencyTarget: '< 920ms' },
  { id: 5, name: 'Air-Gapped HA Buffer Queue', hardware: 'Persisted SQLite Invariant', latencyTarget: '0ms drop' },
  { id: 6, name: 'Encrypted Cloud Private Gateway', hardware: 'Dedicated VPC Endpoint', latencyTarget: '< 1200ms' },
  { id: 7, name: 'Human Operator Intervention Buffer', hardware: 'Synchronous Warehouse Dispatch', latencyTarget: 'Fallback' },
];

export const BreakATierDemo: React.FC = () => {
  // Array tracking whether tier is down (true = down, false = healthy)
  const [downTiers, setDownTiers] = useState<boolean[]>([false, false, false, false, false, false, false]);

  const toggleTier = (index: number) => {
    setDownTiers((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const resetAll = () => {
    setDownTiers([false, false, false, false, false, false, false]);
  };

  // Find first tier that is not marked down
  const activeTierIndex = downTiers.findIndex((isDown) => !isDown);
  const allDown = activeTierIndex === -1;

  return (
    <section
      id="break-a-tier"
      className="py-16 sm:py-24 border-b border-[#E2DFD8] bg-[#F7F5F2] text-[#16161D] bg-warm-grid"
      aria-label="Failover DAG Simulation Demo"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2DFD8]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF5A36] uppercase tracking-wider">
              <span>02 // INTERACTIVE ARCHITECTURE SIMULATOR</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-[#16161D] tracking-[-0.035em]">
              Break a Tier: 7-Tier Multimodal Failover DAG
            </h2>
            <p className="font-body text-sm sm:text-base text-[#5C5B66] max-w-2xl">
              Click any tier button below to simulate an infrastructure failure. The deterministic state machine instantly routes the acoustic voice order to the next healthy layer without dropping packets.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#2D2D38] bg-white text-[#16161D] font-mono text-xs font-bold hover:bg-[#16161D] hover:text-[#F7F5F2] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiers</span>
            </button>
          </div>
        </div>

        {/* Live Status Banner */}
        <div
          className={`p-5 border transition-all ${
            allDown
              ? 'bg-[#FF5A36] border-[#16161D] text-white'
              : 'bg-[#16161D] border border-[#2D2D38] text-[#F7F5F2]'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-3">
              {allDown ? (
                <AlertTriangle className="w-5 h-5 text-white shrink-0" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-[#FF5A36] shrink-0" />
              )}
              <div className="font-headline font-bold text-base sm:text-lg tracking-tight">
                {allDown
                  ? 'All seven tiers are down. The order waits for a person. Nothing is dropped.'
                  : `Voice order handled by Tier ${activeTierIndex + 1}: ${TIERS[activeTierIndex].name}.`}
              </div>
            </div>

            <div className="font-mono text-xs font-semibold px-2.5 py-1 border border-current shrink-0">
              {allDown ? 'HUMAN QUEUE HOLD' : `STATUS: ACTIVE [T${activeTierIndex + 1}]`}
            </div>
          </div>
        </div>

        {/* 7 Tier Interactive Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {TIERS.map((tier, idx) => {
            const isDown = downTiers[idx];
            const isHandling = idx === activeTierIndex;

            return (
              <button
                key={tier.id}
                onClick={() => toggleTier(idx)}
                aria-pressed={isDown}
                aria-label={`Toggle Tier ${tier.id}: ${tier.name}`}
                className={`p-4 text-left border flex flex-col justify-between min-h-[140px] transition-all relative ${
                  isDown
                    ? 'border-dashed border-[#5C5B66]/40 bg-[#E2DFD8]/40 text-[#5C5B66]/60'
                    : isHandling
                    ? 'border-[#FF5A36] bg-[#16161D] text-[#F7F5F2] shadow-sm'
                    : 'border-[#E2DFD8] bg-white text-[#16161D] hover:border-[#16161D]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase font-bold">
                    <span>T0{tier.id}</span>
                    <span
                      className={`px-1 py-0.5 border text-[9px] ${
                        isDown
                          ? 'border-current opacity-60'
                          : isHandling
                          ? 'border-[#FF5A36] text-[#FF5A36]'
                          : 'border-[#E2DFD8] text-[#5C5B66]'
                      }`}
                    >
                      {isDown ? 'DOWN' : isHandling ? 'HANDLING' : 'STANDBY'}
                    </span>
                  </div>

                  <div
                    className={`font-headline font-bold text-sm leading-snug pt-1 ${
                      isDown ? 'line-through' : ''
                    }`}
                  >
                    {tier.name}
                  </div>
                </div>

                <div className="pt-3 border-t border-current/20 font-mono text-[10px] space-y-0.5">
                  <div className="truncate">{tier.hardware}</div>
                  <div className="text-[9px] opacity-80">{tier.latencyTarget}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Technical Caption */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[#5C5B66] pt-2 border-t border-[#E2DFD8]">
          <div>
            <span className="font-bold text-[#16161D]">CAPTION:</span> Simulation, not live traffic.
          </div>
          <div>Circuit-breaker DAG validated against 10,000 synthetic audio drop trials.</div>
        </div>
      </div>
    </section>
  );
};
