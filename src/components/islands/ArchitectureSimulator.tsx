import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sliders, 
  Activity,
  Server,
  Layers,
  Database
} from 'lucide-react';

type TabMode = 'chaos' | 'roi';
type ChaosScenario = 'normal' | 'rate_limit' | 'latency_spike' | 'node_crash';

interface StepState {
  name: string;
  sub: string;
  status: 'idle' | 'active' | 'passed' | 'failed' | 'fallback';
  latency: string;
}

export const ArchitectureSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('chaos');

  // Chaos Lab State
  const [scenario, setScenario] = useState<ChaosScenario>('rate_limit');
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<{
    totalLatency: number;
    successRate: string;
    resolvedTier: string;
    marginalCost: string;
    logs: string[];
  } | null>({
    totalLatency: 28,
    successRate: '100% (Zero Drop)',
    resolvedTier: 'Tier 1 Local vLLM (GGUF QLoRA 4-bit)',
    marginalCost: '$0.000000',
    logs: [
      '[00.0ms] Incoming prompt stream: 1,420 tokens received at FastAPI Edge Gateway',
      '[08.2ms] Tier-1 In-Memory Semantic Cache check (vector distance: 0.12)',
      '[28.4ms] Local vLLM Engine executed 142 tok/sec without external network egress',
      '[28.4ms] Transaction completed with zero cloud API token cost and zero data leakage'
    ]
  });

  // ROI Calculator State
  const [dailyRequests, setDailyRequests] = useState<number>(25000);
  const [avgTokens, setAvgTokens] = useState<number>(1800);
  const [cacheHitRate, setCacheHitRate] = useState<number>(45);

  // Dynamic calculations for ROI
  const monthlyRequests = dailyRequests * 30;
  const effectiveRequestsToLLM = monthlyRequests * (1 - cacheHitRate / 100);
  const monthlyTokensMillion = (effectiveRequestsToLLM * avgTokens) / 1_000_000;
  
  // Blended Cloud API rate (~$5.00/M tokens for GPT-4o / Claude 3.5 Sonnet class)
  const cloudCostMonthly = Math.round(monthlyTokensMillion * 5.50);
  // On-prem local model infrastructure cost (fixed dedicated GPU server or workstation amortized)
  const onPremCostMonthly = 160;
  const monthlySavings = Math.max(0, cloudCostMonthly - onPremCostMonthly);
  const annualSavings = monthlySavings * 12;
  const savingsPercent = cloudCostMonthly > 0 ? Math.round((monthlySavings / cloudCostMonthly) * 100) : 0;

  const runChaosSimulation = () => {
    setIsRunningSim(true);
    setSimResults(null);

    setTimeout(() => {
      let resolvedTier = 'Tier 1 Local vLLM (GGUF QLoRA 4-bit)';
      let totalLatency = 24;
      let logs: string[] = [];

      if (scenario === 'normal') {
        resolvedTier = 'Tier 1 Local vLLM (GGUF QLoRA 4-bit)';
        totalLatency = 22;
        logs = [
          '[00.0ms] Synthetic ingress batch dispatched to FastAPI Router',
          '[04.1ms] Redis semantic cache check: MISS (novel domain prompt)',
          '[22.0ms] Local QLoRA 4-bit adapter evaluated prompt in-memory',
          '[22.0ms] Response validated against JSON Schema · 0% packet loss'
        ];
      } else if (scenario === 'rate_limit') {
        resolvedTier = 'Tier 2 Semantic Redis Vector Cache + Tier 3 Fallback DAG';
        totalLatency = 38;
        logs = [
          '[00.0ms] Upstream synthetic probe received: HTTP 429 Too Many Requests (Rate Limit Quota)',
          '[02.4ms] Circuit Breaker TRIPPED: Instant failover executed in 2.4ms',
          '[14.2ms] Tier 2 Semantic Cache queried: Cosine match 0.96 &rarr; cached response served',
          '[38.0ms] Zero transactions dropped · Fallback latency 38ms vs Cloud Timeout 30,000ms'
        ];
      } else if (scenario === 'latency_spike') {
        resolvedTier = 'Tier 1 Airgapped Edge Worker Pool';
        totalLatency = 45;
        logs = [
          '[00.0ms] Upstream WAN round-trip latency exceeded 950ms SLA budget',
          '[06.8ms] Latency watchdog redirected traffic to on-premise Celery worker queue',
          '[45.0ms] Local GPU worker executed batched inference with strict SLA bounds',
          '[45.0ms] Customer checkout payload locked & verified in PostgreSQL'
        ];
      } else {
        resolvedTier = 'Tier 4 Deterministic Rule Engine & Static Heuristics';
        totalLatency = 12;
        logs = [
          '[00.0ms] Primary daemon shutdown simulated (Chaos Monkey assertion)',
          '[01.8ms] Watchdog self-healing triggered restart protocol',
          '[12.0ms] Deterministic business logic executed static safety validations',
          '[12.0ms] System maintained 100% uptime with zero data corruption'
        ];
      }

      setSimResults({
        totalLatency,
        successRate: '100% (Zero Drop)',
        resolvedTier,
        marginalCost: '$0.000000',
        logs
      });
      setIsRunningSim(false);
    }, 450);
  };

  return (
    <div className="border border-white/[0.1] bg-[#090b12]/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>Interactive Systems Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Live Architecture &amp; <span className="gradient-text-solar italic">Unit Economics Simulator</span>
          </h3>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-full shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('chaos')}
            className={`touch-target px-4 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'chaos'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Chaos Failover Lab</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roi')}
            className={`touch-target px-4 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'roi'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Token ROI Calculator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CHAOS FAILOVER LAB */}
      {activeTab === 'chaos' && (
        <div className="space-y-6">
          <div className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Test how this architecture dynamically responds to upstream API disruptions, rate limits, and network latency surges with zero transaction loss:
          </div>

          {/* Scenario Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setScenario('rate_limit')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                scenario === 'rate_limit'
                  ? 'border-orange-500/80 bg-orange-500/15 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-400">01 // Chaos</span>
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="font-bold text-white text-xs mt-1">Cloud 429 Rate Limit</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Upstream API quotas exhausted</div>
            </button>

            <button
              type="button"
              onClick={() => setScenario('latency_spike')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                scenario === 'latency_spike'
                  ? 'border-orange-500/80 bg-orange-500/15 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-400">02 // Chaos</span>
                <Activity className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="font-bold text-white text-xs mt-1">WAN Latency Spike</div>
              <div className="text-[10px] text-gray-400 mt-0.5">WAN round-trip &gt; 950ms SLA</div>
            </button>

            <button
              type="button"
              onClick={() => setScenario('normal')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                scenario === 'normal'
                  ? 'border-orange-500/80 bg-orange-500/15 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">03 // Baseline</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="font-bold text-white text-xs mt-1">Standard High-Load</div>
              <div className="text-[10px] text-gray-400 mt-0.5">In-memory local QLoRA inference</div>
            </button>

            <button
              type="button"
              onClick={() => setScenario('node_crash')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                scenario === 'node_crash'
                  ? 'border-orange-500/80 bg-orange-500/15 text-white shadow-[0_0_15px_rgba(255,102,0,0.2)]'
                  : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-400">04 // Extreme</span>
                <Server className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="font-bold text-white text-xs mt-1">Node Disconnect</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Watchdog self-healing switch</div>
            </button>
          </div>

          {/* Trigger Action */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={runChaosSimulation}
              disabled={isRunningSim}
              className="touch-target px-6 py-2.5 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_20px_rgba(255,102,0,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningSim ? 'animate-spin' : ''}`} />
              <span>{isRunningSim ? 'Simulating Fault Mesh...' : 'Inject Fault & Run Pipeline'}</span>
            </button>
            <span className="text-[11px] font-mono text-gray-400">
              Evaluated on: <span className="text-emerald-400 font-semibold">FastAPI + Redis + vLLM Local Mesh</span>
            </span>
          </div>

          {/* Live Execution Output Stream */}
          {simResults && (
            <div className="p-5 rounded-xl bg-black/60 border border-white/[0.1] space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="text-[10px] text-gray-400 uppercase">Execution SLA</div>
                  <div className="text-base font-bold text-orange-400 mt-0.5">{simResults.totalLatency} ms</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="text-[10px] text-gray-400 uppercase">Packet Integrity</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">{simResults.successRate}</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="text-[10px] text-gray-400 uppercase">Resolved Tier</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">{simResults.resolvedTier}</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                  <div className="text-[10px] text-gray-400 uppercase">Marginal Token Cost</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">{simResults.marginalCost}</div>
                </div>
              </div>

              {/* Console Log Lines */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-[11px] text-gray-300">
                {simResults.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">&gt;</span>
                    <span className="leading-snug">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TOKEN ROI CALCULATOR */}
      {activeTab === 'roi' && (
        <div className="space-y-6">
          <div className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Estimate your enterprise annual cost savings by migrating high-volume pipelines from cloud tokens (OpenAI / Anthropic) to Harsh Thanki's fine-tuned on-premise open-weights stack:
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls Sliders */}
            <div className="lg:col-span-7 space-y-5 font-mono text-xs">
              {/* Slider 1 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-semibold">Daily Inference Queries:</span>
                  <span className="text-orange-400 font-bold text-sm">{dailyRequests.toLocaleString()} reqs / day</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="150000"
                  step="1000"
                  value={dailyRequests}
                  onChange={(e) => setDailyRequests(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>2k/day (Pilot)</span>
                  <span>50k/day (Mid-Market)</span>
                  <span>150k/day (Enterprise)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-semibold">Avg Tokens per Request:</span>
                  <span className="text-orange-400 font-bold text-sm">{avgTokens.toLocaleString()} tokens</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="6000"
                  step="100"
                  value={avgTokens}
                  onChange={(e) => setAvgTokens(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>400 (Short classification)</span>
                  <span>2,000 (RAG Context)</span>
                  <span>6,000 (Full Dossier)</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-semibold">Semantic Redis Cache Hit Rate:</span>
                  <span className="text-emerald-400 font-bold text-sm">{cacheHitRate}% (Sub-5ms)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={cacheHitRate}
                  onChange={(e) => setCacheHitRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>0% (Raw Compute)</span>
                  <span>45% (Typical Production)</span>
                  <span>90% (High Repeat FAQ/Catalog)</span>
                </div>
              </div>
            </div>

            {/* Right Comparison Card */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/30 space-y-4 shadow-xl">
              <div className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Financial Impact Analysis</span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                  <div className="text-[10px] text-gray-400 uppercase">Cloud API Est. Monthly Bill</div>
                  <div className="text-lg font-bold text-red-400 mt-0.5 line-through decoration-red-500/60">
                    ${cloudCostMonthly.toLocaleString()} / mo
                  </div>
                  <div className="text-[10px] text-gray-500">Volatile recurring vendor expense</div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-400 uppercase font-semibold">Harsh Thanki's On-Prem Stack</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    ${onPremCostMonthly} / mo <span className="text-xs font-normal text-emerald-300/80">(Fixed Server Energy)</span>
                  </div>
                  <div className="text-[10px] text-emerald-300/80">$0.00 marginal token fees · Owned IP asset</div>
                </div>

                <div className="p-3.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-center space-y-1">
                  <div className="text-[10px] text-orange-300 uppercase tracking-wider font-semibold">
                    Net Projected Annual Savings
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    ${annualSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-orange-200 font-bold">
                    {savingsPercent}% Cost Reduction Guaranteed
                  </div>
                </div>
              </div>

              <a
                href="#scoper"
                className="touch-target w-full py-2.5 px-4 rounded-xl bg-white text-black font-bold font-mono text-xs text-center block hover:bg-gray-200 transition-all shadow-md"
              >
                Scope This Architecture for Your Team &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ArchitectureSimulator;
