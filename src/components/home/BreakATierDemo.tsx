'use client';

import React, { useState, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

interface Tier {
  id: number;
  name: string;
  hardware: string;
  latency: string;
  latencyPercent: number;
}

const TIERS: Tier[] = [
  { id: 1, name: 'Local Whisper Large-v3', hardware: 'Edge RTX 4090 (On-Prem)', latency: '<450ms', latencyPercent: 35 },
  { id: 2, name: 'Distil-Whisper / C++ ONNX', hardware: 'Local FP16 Draft Node', latency: '<180ms', latencyPercent: 18 },
  { id: 3, name: 'Flash-Lite Multilingual ASR', hardware: 'Air-Gapped Workstation', latency: '<650ms', latencyPercent: 50 },
  { id: 4, name: 'Streaming Chunked Kaldi', hardware: 'Secondary Cluster LAN', latency: '<920ms', latencyPercent: 70 },
  { id: 5, name: 'Cloud Gemini 1.5 Flash Audio', hardware: 'VPC Gateway Bridge', latency: '<1100ms', latencyPercent: 82 },
  { id: 6, name: 'Cloud Whisper API Backup', hardware: 'Encrypted Fallback Endpoint', latency: '<1400ms', latencyPercent: 92 },
  { id: 7, name: 'Human Operator Intervention', hardware: 'Synchronous Warehouse Dispatch', latency: 'Fallback', latencyPercent: 100 },
];

export const BreakATierDemo: React.FC = () => {
  const [killedTiers, setKilledTiers] = useState<boolean[]>([
    false, false, false, false, false, false, false
  ]);
  const [flashingKilledIndex, setFlashingKilledIndex] = useState<number | null>(null);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const liveIndex = killedTiers.findIndex((k) => !k);
  const allKilled = liveIndex === -1;

  const killCurrentLive = () => {
    if (liveIndex === -1) return;
    const targetIndex = liveIndex;

    // Flash coral for 300ms on the killed tier before turning ink
    setFlashingKilledIndex(targetIndex);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => {
      setFlashingKilledIndex(null);
    }, 300);

    setKilledTiers((prev) => {
      const next = [...prev];
      next[targetIndex] = true;
      return next;
    });
  };

  const resetTiers = () => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlashingKilledIndex(null);
    setKilledTiers([false, false, false, false, false, false, false]);
  };

  return (
    <Section
      tone="paper"
      className="py-16 sm:py-24 border-b border-[#E8E3DC] bg-[#F7F5F2]"
      aria-label="Break a Tier Simulation"
    >
      <Container className="space-y-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E3DC]">
          <div className="space-y-3 max-w-2xl">
            <Label tone="muted">Simulation</Label>
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
              Reset
            </Button>
          </div>
        </div>

        {/* Live Accessibility Status Banner */}
        <div
          aria-live="polite"
          className={`p-5 border transition-all duration-300 ${
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
              {allKilled ? '[ 0 ACTIVE / 7 DOWN ]' : `[ ACTIVE: T0${liveIndex + 1} ]`}
            </span>
          </div>
        </div>

        {/* Seven Rows by Priority */}
        <div className="divide-y divide-[#E8E3DC] border-y border-[#E8E3DC]">
          {TIERS.map((tier, idx) => {
            const isKilled = killedTiers[idx];
            const isLive = idx === liveIndex;
            const isFlashingCoral = flashingKilledIndex === idx;

            return (
              <div
                key={tier.id}
                className={`py-4 transition-all duration-400 ease-out ${
                  isFlashingCoral
                    ? 'bg-[#FF5A36] text-[#16161D]'
                    : isKilled
                    ? 'bg-[#16161D]/5 opacity-60'
                    : isLive
                    ? 'bg-white shadow-xs translate-x-1 sm:translate-x-2'
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
                        isFlashingCoral
                          ? 'text-[#16161D]'
                          : isKilled
                          ? 'line-through text-[#55555F]'
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
                          isFlashingCoral
                            ? 'bg-[#16161D]'
                            : isKilled
                            ? 'bg-[#55555F]/40'
                            : isLive
                            ? 'bg-[#2EE6A6]'
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
                        aria-label={`LIVE — CLICK TO KILL: Tier 0${tier.id} ${tier.name}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#2EE6A6] text-[#0B2A20] font-mono text-xs font-extrabold uppercase tracking-wider cursor-pointer border border-[#2EE6A6] hover:bg-[#25C78F] active:bg-[#1EAE7C] min-h-[44px] transition-colors"
                      >
                        <span className="w-2 h-2 bg-[#0B2A20]" aria-hidden="true" />
                        <span>LIVE — CLICK TO KILL</span>
                      </button>
                    ) : isFlashingCoral ? (
                      <span className="inline-flex items-center px-3 py-1.5 bg-[#FF5A36] text-[#16161D] font-mono text-xs font-bold uppercase">
                        KILLING...
                      </span>
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
