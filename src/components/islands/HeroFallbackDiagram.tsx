import React, { useState } from 'react';
import { CheckCircle2, Zap, Terminal, ArrowRight } from 'lucide-react';

interface TierNode {
  id: string;
  name: string;
  provider: string;
  latency: string;
  cost: string;
  status: 'idle' | 'active' | 'failed' | 'routed';
}

export const HeroFallbackDiagram: React.FC = () => {
  const [simulationState, setSimulationState] = useState<'normal' | 'rate-limit' | 'latency-spike'>('normal');
  const [activeTier, setActiveTier] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [logMessage, setLogMessage] = useState<string>('System nominal. Routing primary traffic through Tier 1 (Multimodal Ingestion).');

  const tiers: TierNode[] = [
    { 
      id: 't1', 
      name: 'Tier 1: Multimodal Ingestion', 
      provider: 'Primary Acoustic & Vision Stream', 
      latency: '210ms', 
      cost: '$0.0003/req', 
      status: simulationState === 'normal' ? 'active' : 'failed' 
    },
    { 
      id: 't2', 
      name: 'Tier 2: Distributed Transformer', 
      provider: 'High-Throughput Inference Cluster', 
      latency: '95ms', 
      cost: '$0.0002/req', 
      status: simulationState === 'rate-limit' ? 'active' : simulationState === 'latency-spike' ? 'failed' : 'idle' 
    },
    { 
      id: 't3', 
      name: 'Tier 3: Edge LPU Engine', 
      provider: 'Hardware-Optimized Edge Core', 
      latency: '42ms', 
      cost: '$0.0001/req', 
      status: simulationState === 'latency-spike' ? 'active' : 'idle' 
    },
    { 
      id: 't4', 
      name: 'Tier 4: High-Context Reasoning', 
      provider: 'Multi-Region Fallback Mesh', 
      latency: '280ms', 
      cost: '$0.0004/req', 
      status: 'idle' 
    }
  ];

  const runSimulation = (mode: 'normal' | 'rate-limit' | 'latency-spike') => {
    setIsSimulating(true);
    setSimulationState(mode);

    if (mode === 'normal') {
      setActiveTier(1);
      setLogMessage('Inbound request: HMAC signature verified -> Tier 1 resolved in 210ms (HTTP 200).');
    } else if (mode === 'rate-limit') {
      setActiveTier(2);
      setLogMessage('Inbound request: Tier 1 rate-limit detected -> Circuit breaker engaged -> Tier 2 resolved in 95ms.');
    } else if (mode === 'latency-spike') {
      setActiveTier(3);
      setLogMessage('Inbound request: Tier 1 & 2 latency >1500ms -> Instant bypass to Tier 3 Edge Accelerator in 42ms.');
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6 rounded-[var(--radius-lg)] shadow-lg backdrop-blur-md relative overflow-hidden">
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)]"></div>

      {/* Header Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"></span>
          </div>
          <span className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-primary)] font-bold">
            Live 7-Tier Fallback Mesh
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.1)] text-[var(--status-complete)] border border-[rgba(16,185,129,0.25)] font-semibold whitespace-nowrap">
            SLA: 99.98%
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] whitespace-nowrap">
            Failover &lt;50ms
          </span>
        </div>
      </div>

      {/* Interactive Simulation Trigger Matrix (Calm, Professional Telemetry) */}
      <div className="my-4">
        <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <span className="font-medium">Interactive Chaos Simulation:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Button 1 */}
          <button
            type="button"
            onClick={() => runSimulation('normal')}
            className={`touch-target p-2.5 text-left border rounded-[var(--radius-sm)] transition-all flex flex-col justify-between gap-1 ${
              simulationState === 'normal'
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_12px_var(--accent-glow)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 w-full">
              <span className={`font-mono text-xs font-bold ${simulationState === 'normal' ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                1. Nominal
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0"></span>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] leading-tight whitespace-nowrap">
              Tier 1 Stream
            </span>
          </button>

          {/* Button 2 */}
          <button
            type="button"
            onClick={() => runSimulation('rate-limit')}
            className={`touch-target p-2.5 text-left border rounded-[var(--radius-sm)] transition-all flex flex-col justify-between gap-1 ${
              simulationState === 'rate-limit'
                ? 'border-[var(--status-testing)] bg-[rgba(245,158,11,0.12)] shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 w-full">
              <span className={`font-mono text-xs font-bold ${simulationState === 'rate-limit' ? 'text-[var(--status-testing)]' : 'text-[var(--text-primary)]'}`}>
                2. Rate Limit
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--status-testing)] shrink-0"></span>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] leading-tight whitespace-nowrap">
              Tier 2 Failover
            </span>
          </button>

          {/* Button 3 (Warm Amber Accent, No Red) */}
          <button
            type="button"
            onClick={() => runSimulation('latency-spike')}
            className={`touch-target p-2.5 text-left border rounded-[var(--radius-sm)] transition-all flex flex-col justify-between gap-1 ${
              simulationState === 'latency-spike'
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_12px_var(--accent-glow)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 w-full">
              <span className={`font-mono text-xs font-bold ${simulationState === 'latency-spike' ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                3. Latency Spike
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0"></span>
            </div>
            <span className="text-[10px] text-[var(--text-secondary)] leading-tight whitespace-nowrap">
              Tier 3 Edge LPU
            </span>
          </button>
        </div>
      </div>

      {/* Node Topology List (Clean, Positive Telemetry — Zero Red) */}
      <div className="space-y-2.5">
        {tiers.map((tier, idx) => {
          const isNodeActive = tier.status === 'active';
          const isNodeRerouted = tier.status === 'failed';

          return (
            <div
              key={tier.id}
              className={`p-3 border rounded-[var(--radius-sm)] transition-all flex items-center justify-between gap-3 ${
                isNodeActive
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] shadow-[0_0_16px_var(--accent-glow)]'
                  : isNodeRerouted
                  ? 'border-white/10 bg-white/[0.02] opacity-60'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] hover:border-[var(--border-strong)]'
              }`}
            >
              {/* Left Column: Number + Name + Subtitle */}
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] font-mono text-[10px] font-bold shrink-0 ${
                  isNodeActive 
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-xs' 
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-tertiary)]'
                }`}>
                  0{idx + 1}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-sans font-semibold text-xs sm:text-sm text-[var(--text-primary)] leading-tight whitespace-nowrap">
                      {tier.name}
                    </span>

                    {isNodeActive && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono rounded-full bg-[var(--accent)] text-[var(--accent-text)] font-bold tracking-wider shrink-0">
                        RESOLVING
                      </span>
                    )}
                    {isNodeRerouted && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono rounded-full bg-white/10 text-white/60 border border-white/10 font-semibold tracking-wider shrink-0">
                        REROUTED
                      </span>
                    )}
                  </div>
                  
                  <div className="text-[11px] text-[var(--text-tertiary)] font-sans mt-0.5 leading-snug">
                    {tier.provider}
                  </div>
                </div>
              </div>

              {/* Right Column: Latency + Cost + Status Icon */}
              <div className="flex items-center gap-2.5 text-right shrink-0">
                <div className="font-mono">
                  <div className={`text-xs font-bold leading-tight ${isNodeActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                    {tier.latency}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] leading-tight mt-0.5">
                    {tier.cost}
                  </div>
                </div>

                {isNodeActive ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                ) : isNodeRerouted ? (
                  <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[var(--border-strong)] shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Log Output Window */}
      <div className="mt-3.5 p-3 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] font-mono text-[11px] text-[var(--text-secondary)] flex items-start gap-2.5">
        <Terminal className={`w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 ${isSimulating ? 'animate-spin' : ''}`} />
        <div className="leading-relaxed min-w-0">
          <span className="text-[var(--accent)] font-bold">&gt; ROUTE_TRACE: </span>
          <span className="text-[var(--text-primary)] break-words">{logMessage}</span>
        </div>
      </div>
    </div>
  );
};
