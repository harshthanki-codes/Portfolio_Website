import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, Zap, ShieldAlert, Layers } from 'lucide-react';

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
    { id: 't1', name: 'Gemini 1.5 Multimodal', provider: 'Google AI Studio', latency: '210ms', cost: '$0.0003/req', status: simulationState === 'normal' ? 'active' : 'failed' },
    { id: 't2', name: 'NVIDIA NIM (Llama 3.3)', provider: 'NVIDIA Cloud', latency: '95ms', cost: '$0.0002/req', status: simulationState === 'rate-limit' ? 'active' : simulationState === 'latency-spike' ? 'failed' : 'idle' },
    { id: 't3', name: 'Groq LPUs (Llama 3.3 70B)', provider: 'Groq Cloud', latency: '42ms', cost: '$0.0001/req', status: simulationState === 'latency-spike' ? 'active' : 'idle' },
    { id: 't4', name: 'Mistral Large 2', provider: 'Mistral AI Edge', latency: '280ms', cost: '$0.0004/req', status: 'idle' },
    { id: 't5', name: 'OpenRouter Aggregator', provider: 'Multi-Model Fallback', latency: '350ms', cost: '$0.0005/req', status: 'idle' },
    { id: 't6', name: 'Local Ollama Airgap', provider: 'On-Prem DeepSeek 7B', latency: '120ms', cost: '$0.0000/req', status: 'idle' },
    { id: 't7', name: 'Deterministic Rule Engine', provider: 'Regex & In-Memory Cache', latency: '2ms', cost: '$0.0000/req', status: 'idle' }
  ];

  const runSimulation = (mode: 'normal' | 'rate-limit' | 'latency-spike') => {
    setIsSimulating(true);
    setSimulationState(mode);

    if (mode === 'normal') {
      setActiveTier(1);
      setLogMessage('Inbound request: Verified HMAC-SHA256 signature -> Tier 1 (Gemini) responded in 210ms (HTTP 200).');
    } else if (mode === 'rate-limit') {
      setActiveTier(2);
      setLogMessage('Inbound request: Tier 1 threw HTTP 429 (Rate Limit Exceeded) -> Instant failover to Tier 2 (NVIDIA NIM) in 95ms.');
    } else if (mode === 'latency-spike') {
      setActiveTier(3);
      setLogMessage('Inbound request: Tier 1 & 2 timed out (>1500ms SLA violation) -> Circuit breaker engaged -> Tier 3 (Groq LPU) resolved in 42ms.');
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6 rounded-[var(--radius-md)] shadow-sm">
      {/* Header telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]"></span>
          </span>
          <span className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-secondary)]">
            Live 7-Tier Fallback Mesh (Production Engine)
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] text-[var(--text-tertiary)]">
          <span className="bg-[var(--bg-surface-raised)] px-2 py-0.5 border border-[var(--border-subtle)]">SLA: 99.98%</span>
          <span className="bg-[var(--bg-surface-raised)] px-2 py-0.5 border border-[var(--border-subtle)]">Failover: &lt;50ms</span>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="my-4">
        <div className="text-[var(--text-xs)] font-mono text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Interactive Chaos Injection Test:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => runSimulation('normal')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border transition-all ${
              simulationState === 'normal'
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-medium">1. Nominal Route</div>
            <div className="text-[10px] opacity-75">Tier 1 Primary Stream</div>
          </button>

          <button
            type="button"
            onClick={() => runSimulation('rate-limit')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border transition-all ${
              simulationState === 'rate-limit'
                ? 'border-[var(--status-testing)] bg-[rgba(217,119,6,0.1)] text-[var(--status-testing)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-medium">2. Inject 429 Rate Limit</div>
            <div className="text-[10px] opacity-75">Instant Tier 2 Failover</div>
          </button>

          <button
            type="button"
            onClick={() => runSimulation('latency-spike')}
            className={`touch-target px-3 py-2 text-left font-mono text-[var(--text-xs)] border transition-all ${
              simulationState === 'latency-spike'
                ? 'border-[var(--status-active)] bg-[var(--accent-subtle)] text-[var(--status-active)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="font-medium">3. Latency Spike (&gt;1.5s)</div>
            <div className="text-[10px] opacity-75">Tier 3 Groq LPU Circuit</div>
          </button>
        </div>
      </div>

      {/* Node Topology List */}
      <div className="space-y-1.5 font-mono text-[var(--text-xs)]">
        {tiers.slice(0, 4).map((tier, idx) => {
          const isNodeActive = tier.status === 'active';
          const isNodeFailed = tier.status === 'failed';

          return (
            <div
              key={tier.id}
              className={`p-2.5 border transition-all flex items-center justify-between gap-2 ${
                isNodeActive
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)]'
                  : isNodeFailed
                  ? 'border-[var(--border-subtle)] bg-[rgba(220,38,38,0.05)] text-[var(--text-tertiary)] opacity-60'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-5 h-5 flex items-center justify-center border border-[var(--border-subtle)] text-[10px] shrink-0">
                  0{idx + 1}
                </span>
                <div className="truncate">
                  <div className="font-medium truncate flex items-center gap-1.5">
                    <span>{tier.name}</span>
                    {isNodeActive && (
                      <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] bg-[var(--accent)] text-[var(--accent-text)] font-semibold">
                        RESOLVING
                      </span>
                    )}
                    {isNodeFailed && (
                      <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] bg-red-600 text-white font-semibold">
                        BYPASSED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] truncate">{tier.provider}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right shrink-0">
                <div>
                  <div className="text-[11px] font-medium">{tier.latency}</div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">{tier.cost}</div>
                </div>
                {isNodeActive ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
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

      {/* Live System Log Output */}
      <div className="mt-4 p-3 bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-secondary)] flex items-start gap-2">
        <RefreshCw className={`w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5 ${isSimulating ? 'animate-spin' : ''}`} />
        <div className="leading-relaxed">
          <span className="text-[var(--accent)] font-semibold">&gt; SYSTEM LOG: </span>
          {logMessage}
        </div>
      </div>
    </div>
  );
};
