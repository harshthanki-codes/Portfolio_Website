'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

interface Tier {
  id: number;
  name: string;
  hardware: string;
  latency: string;
  latencyPercent: number; // 0-100 for latency bar
}

const TIERS: Tier[] = [
  { id: 1, name: 'Local Whisper Large-v3', hardware: 'Edge RTX 4090 (On-Prem)', latency: '<450ms', latencyPercent: 35 },
  { id: 2, name: 'Speculative 1.5B Fast-Path', hardware: 'Local FP16 Draft Node', latency: '<180ms', latencyPercent: 18 },
  { id: 3, name: 'Internal Quantized GGUF Node', hardware: 'Air-Gapped Workstation', latency: '<650ms', latencyPercent: 50 },
  { id: 4, name: 'Regional On-Premise Backup', hardware: 'Secondary Cluster LAN', latency: '<920ms', latencyPercent: 70 },
  { id: 5, name: 'Air-Gapped HA Buffer Queue', hardware: 'Persisted SQLite Invariant', latency: '0ms drop', latencyPercent: 10 },
  { id: 6, name: 'Encrypted Cloud Private Gateway', hardware: 'Dedicated VPC Endpoint', latency: '<1200ms', latencyPercent: 90 },
  { id: 7, name: 'Human Operator Intervention Buffer', hardware: 'Synchronous Warehouse Dispatch', latency: 'Fallback', latencyPercent: 100 },
];

export const BreakATierDemo: React.FC = () => {
  // Array tracking whether tier is down (true = killed, false = alive)
  const [killedTiers, setKilledTiers] = useState<boolean[]>([
    false, false, false, false, false, false, false
  ]);

  const liveIndex = killedTiers.findIndex((k) => !k);
  const allKilled = liveIndex === -1;

  const killCurrentLive = () => {
    if (liveIndex === -1) return;
    setKilledTiers((prev) => {
      const next = [...prev];
      next[liveIndex] = true;
      return next;
    });
  };

  const resetTiers = () => {
    setKilledTiers([false, false, false, false, false, false, false]);
  };

  return (
    <Section
      tone="paper"
      className="py-16 sm:py-24 border-b border-[#E8E3DC] bg-[#F7F5F2]"
      aria-label="Failover DAG Simulation"
    >
      <Container className="space-y-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E3DC]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Label tone="muted">Simulation · 02</Label>
            </div>
            <h2 className="type-h2 text-[#16161D] reveal-heading">
              Break a tier.
            </h2>
            <p className="type-body text-[#55555F]">
              My voice-order system has seven fallbacks. Kill one and watch the next take over.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="outline"
              onClick={resetTiers}
              className="text-xs uppercase font-mono tracking-wider min-h-[48px] px-5 text-[#16161D] border-[#16161D]"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Live Accessibility Status Banner */}
        <div
          aria-live="polite"
          className={`p-5 border transition-all ${
            allKilled
              ? 'bg-[#16161D] text-[#F7F5F2] border-[#16161D]'
              : 'bg-[#E8E3DC] text-[#16161D] border-[#E8E3DC]'
          }`}
        >
          <div className="flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
            <span className="font-bold">
              {allKilled
                ? 'Nothing left. This is why there are seven.'
                : `Voice traffic actively routed to Tier 0${liveIndex + 1}: ${TIERS[liveIndex].name} (${TIERS[liveIndex].hardware}).`}
            </span>
            <span className="shrink-0 font-bold uppercase tracking-wider text-[11px]">
              {allKilled ? '[ ALL FAILED ]' : `[ ACTIVE: T0${liveIndex + 1} ]`}
            </span>
          </div>
        </div>

        {/* Seven Rows by Priority */}
        <div className="divide-y divide-[#E8E3DC] border-y border-[#E8E3DC]">
          {TIERS.map((tier, idx) => {
            const isKilled = killedTiers[idx];
            const isLive = idx === liveIndex;

            return (
              <div
                key={tier.id}
                className={`py-4 transition-all duration-300 ${
                  isKilled
                    ? 'bg-[#16161D]/5 opacity-60'
                    : isLive
                    ? 'bg-white'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
                  {/* Left: Priority + Tier Name */}
                  <div className="flex items-center gap-3 min-w-[280px]">
                    <span className="font-mono text-xs font-bold text-[#55555F] w-8">
                      0{tier.id}
                    </span>
                    <span
                      className={`font-mono text-sm sm:text-base font-bold ${
                        isKilled
                          ? 'line-through text-[#55555F]'
                          : isLive
                          ? 'text-[#16161D]'
                          : 'text-[#16161D]'
                      }`}
                    >
                      {tier.name}
                    </span>
                  </div>

                  {/* Middle: Hardware & Thin Latency Bar */}
                  <div className="flex-1 max-w-md mx-0 sm:mx-6 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono text-[#55555F]">
                      <span className="truncate">{tier.hardware}</span>
                      <span>{tier.latency}</span>
                    </div>
                    {/* Thin Latency Bar */}
                    <div className="w-full h-1 bg-[#E8E3DC] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-400 ${
                          isKilled
                            ? 'bg-[#55555F]/40'
                            : isLive
                            ? 'bg-[#FF5A36]'
                            : 'bg-[#55555F]'
                        }`}
                        style={{ width: `${tier.latencyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Status Pill or Interactive Button */}
                  <div className="shrink-0 flex items-center justify-end">
                    {isLive ? (
                      <button
                        type="button"
                        onClick={killCurrentLive}
                        aria-label={`LIVE — CLICK TO KILL: Tier ${tier.id} ${tier.name}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5A36] text-[#16161D] font-mono text-xs font-extrabold uppercase tracking-wider cursor-pointer border border-[#FF5A36] hover:bg-[#e64e2c] active:bg-[#cc4222] min-h-[44px]"
                      >
                        <span className="w-2 h-2 bg-[#16161D]" aria-hidden="true" />
                        <span>LIVE — CLICK TO KILL</span>
                      </button>
                    ) : isKilled ? (
                      <span className="inline-flex items-center px-3 py-1.5 bg-[#16161D] text-[#F7F5F2] font-mono text-xs font-bold line-through">
                        KILLED
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 bg-[#E8E3DC] text-[#55555F] font-mono text-xs font-medium">
                        STANDBY
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#55555F] pt-2">
          Simulation of 7-tier circuit-breaker state machine. Click the live tier to simulate runtime network, hardware, or model failure.
        </div>
      </Container>
    </Section>
  );
};
