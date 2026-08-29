import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, Zap, ShieldCheck, Cpu, Terminal } from 'lucide-react';

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
  const [logMessage, setLogMessage] = useState<string>('System nominal. Routing primary traffic through Tier 1 (Gemini Multimodal).');

  const tiers: TierNode[] = [
    { id: 't1', name: 'Tier 1: Gemini 1.5 Multimodal', provider: 'Google AI Studio', latency: '210ms', cost: '$0.0003/req', status: simulationState === 'normal' ? 'active' : 'failed' },
    { id: 't2', name: 'Tier 2: NVIDIA NIM (Llama 3.3)', provider: 'NVIDIA Cloud', latency: '95ms', cost: '$0.0002/req', status: simulationState === 'rate-limit' ? 'active' : simulationState === 'latency-spike' ? 'failed' : 'idle' },
    { id: 't3', name: 'Tier 3: Groq LPUs (Llama 3.3 70B)', provider: 'Groq Cloud Edge', latency: '42ms', cost: '$0.0001/req', status: simulationState === 'latency-spike' ? 'active' : 'idle' },
    { id: 't4', name: 'Tier 4: Mistral Large 2', provider: 'Mistral AI API', latency: '280ms', cost: '$0.0004/req', status: 'idle' },
    { id: 't5', name: 'Tier 5: OpenRouter Aggregator', provider: 'Multi-Model Fallback', latency: '350ms', cost: '$0.0005/req', status: 'idle' },
    { id: 't6', name: 'Tier 6: Local Ollama Airgap', provider: 'On-Prem DeepSeek 7B', latency: '120ms', cost: '$0.0000/req', status: 'idle' },
    { id: 't7', name: 'Tier 7: Deterministic Rule Engine', provider: 'In-Memory Cache & Regex', latency: '2ms', cost: '$0.0000/req', status: 'idle' }
  ];

  const runSimulation = (mode: 'normal' | 'rate-limit' | 'latency-spike') => {
    setIsSimulating(true);
    setSimulationState(mode);

    if (mode === 'normal') {
      setActiveTier(1);
      setLogMessage('Inbound request: HMAC signature valid -> Tier 1 (Gemini) resolved in 210ms (HTTP 200).');
    } else if (mode === 'rate-limit') {
      setActiveTier(2);
      setLogMessage('Inbound request: Tier 1 threw HTTP 429 -> Circuit breaker engaged -> Tier 2 (NVIDIA NIM) resolved in 95ms.');
    } else if (mode === 'latency-spike') {
      setActiveTier(3);
      setLogMessage('Inbound request: Tier 1 & 2 latency >1500ms -> Instant fallback to Tier 3 (Groq LPU) in 42ms.');
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-7 rounded-[var(--radius-lg)] shadow-lg backdrop-blur-md relative overflow-hidden">
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)]"></div>

      {/* Header Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"></span>
          </div>
          <span className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-primary)] font-bold">
            Live 7-Tier Fallback Mesh
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.1)] text-[var(--status-complete)] border border-[rgba(16,185,129,0.25)] font-semibold">
            SLA: 99.98%
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] text-[var(--text-tertiary)]">
            Failover &lt;50ms
          </span>
        </div>
      </div>

      {/* Interactive Simulation Trigger Matrix */}
      <div className="my-4">
        <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="font-medium">Interactive Chaos Simulation:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => runSimulation('normal')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border rounded-[var(--radius-sm)] transition-all ${
              simulationState === 'normal'
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] font-semibold'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-semibold flex items-center justify-between">
              <span>1. Nominal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">Tier 1 Primary Stream</div>
          </button>

          <button
            type="button"
            onClick={() => runSimulation('rate-limit')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border rounded-[var(--radius-sm)] transition-all ${
              simulationState === 'rate-limit'
                ? 'border-[var(--status-testing)] bg-[rgba(245,158,11,0.12)] text-[var(--status-testing)] shadow-[0_0_12px_rgba(245,158,11,0.25)] font-semibold'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-semibold flex items-center justify-between">
              <span>2. 429 Rate Limit</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-testing)]"></span>
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">Tier 2 Auto-Failover</div>
          </button>

          <button
            type="button"
            onClick={() => runSimulation('latency-spike')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border rounded-[var(--radius-sm)] transition-all ${
              simulationState === 'latency-spike'
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] font-semibold'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-semibold flex items-center justify-between">
              <span>3. Latency &gt;1.5s</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">Tier 3 Groq Circuit</div>
          </button>
        </div>
      </div>

      {/* Node Topology List with Glowing Borders */}
      <div className="space-y-2 font-mono text-[var(--text-xs)]">
        {tiers.slice(0, 4).map((tier, idx) => {
          const isNodeActive = tier.status === 'active';
          const isNodeFailed = tier.status === 'failed';

          return (
            <div
              key={tier.id}
              className={`p-3 border rounded-[var(--radius-sm)] transition-all flex items-center justify-between gap-3 ${
                isNodeActive
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)] shadow-[0_0_16px_var(--accent-glow)]'
                  : isNodeFailed
                  ? 'border-red-500/30 bg-red-500/5 text-[var(--text-tertiary)] opacity-60'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] text-[10px] font-bold shrink-0 ${
                  isNodeActive 
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-xs' 
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-tertiary)]'
                }`}>
                  0{idx + 1}
                </span>

                <div className="truncate">
                  <div className="font-semibold truncate flex items-center gap-2">
                    <span className="text-[var(--text-primary)]">{tier.name}</span>
                    {isNodeActive && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] rounded-full bg-[var(--accent)] text-[var(--accent-text)] font-bold animate-pulse">
                        RESOLVING
                      </span>
                    )}
                    {isNodeFailed && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[9px] rounded-full bg-red-500/80 text-white font-bold">
                        BYPASSED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] truncate mt-0.5">{tier.provider}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right shrink-0">
                <div>
                  <div className={`text-[11px] font-bold ${isNodeActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                    {tier.latency}
                  </div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">{tier.cost}</div>
                </div>

                {isNodeActive ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 animate-bounce" />
                ) : isNodeFailed ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[var(--border-strong)] shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Log Output Window */}
      <div className="mt-4 p-3 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] font-mono text-[11px] text-[var(--text-secondary)] flex items-start gap-2.5">
        <Terminal className={`w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 ${isSimulating ? 'animate-spin' : ''}`} />
        <div className="leading-relaxed">
          <span className="text-[var(--accent)] font-bold">&gt; ROUTE_TRACE: </span>
          <span className="text-[var(--text-primary)]">{logMessage}</span>
        </div>
      </div>
    </div>
  );
};
