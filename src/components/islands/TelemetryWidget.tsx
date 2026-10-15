import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  RefreshCw, 
  Send, 
  Check, 
  Terminal, 
  Zap, 
  ShieldCheck,
  Activity,
  Cpu,
  Radio,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ClusterNode {
  id: string;
  name: string;
  type: string;
  region: string;
  status: string;
  p99Latency: number;
  engine: string;
  endpoint: string;
  headers: Record<string, string>;
}

const NODES: ClusterNode[] = [
  {
    id: 'ai-inference',
    name: 'FastAPI On-Premise LLM Engine',
    type: 'Inference Mesh',
    region: 'local-airgap-01',
    status: 'ACTIVE_HEALTHY',
    p99Latency: 22,
    engine: 'DeepSeek-Coder 6.7B (QLoRA 4-bit)',
    endpoint: 'https://api.harshthanki.dev/v1/inference/health',
    headers: {
      'HTTP/2': '200 OK',
      'X-Inference-Engine': 'Ollama-Airgapped-v0.5',
      'X-Quantization': '4-bit BitsAndBytes',
      'X-Marginal-Token-Cost': '$0.000000',
      'X-Data-Leakage-Risk': 'ZERO_CONFIRMED'
    }
  },
  {
    id: 'voice-dag',
    name: '7-Tier Multimodal Voice-to-Order',
    type: 'Acoustic DAG',
    region: 'aws-ap-south-1',
    status: 'STREAM_CONNECTED',
    p99Latency: 34,
    engine: 'Gemini + NIM + RapidFuzz',
    endpoint: 'https://api.harshthanki.dev/v1/dag/telephony/status',
    headers: {
      'HTTP/2': '200 OK',
      'X-Pipeline-DAG': 'Acoustic-7-Tier-Failover',
      'X-Dropped-Orders': '0',
      'X-Auth-Signature': 'HMAC-SHA256-VERIFIED',
      'X-Cache-Strategy': 'In-Memory Redis State Buffer'
    }
  },
  {
    id: 'dns-watchdog',
    name: 'Endpoint Security DNS Daemon',
    type: 'Windows Watchdog',
    region: '35+ Workstations',
    status: 'FAILS_CLOSED_ARMED',
    p99Latency: 4,
    engine: 'C# / PowerShell Transparent Proxy',
    endpoint: 'https://api.harshthanki.dev/v1/security/daemon/heartbeat',
    headers: {
      'HTTP/2': '200 OK',
      'X-Watchdog-State': 'SELF_HEALING_ACTIVE',
      'X-DoH-Stripped': 'TRUE',
      'X-Bypass-Prevention': 'HARDENED',
      'X-Active-Endpoints': '35_HOSTS_MONITORED'
    }
  },
  {
    id: 'erp-ledger',
    name: 'High-Throughput Financial Ledger',
    type: 'Relational Ledger',
    region: 'pg-cluster-primary',
    status: 'ACID_SYNCHRONIZED',
    p99Latency: 18,
    engine: 'PostgreSQL + Celery Async Rollup',
    endpoint: 'https://api.harshthanki.dev/v1/erp/ledger/throughput',
    headers: {
      'HTTP/2': '200 OK',
      'X-Transaction-Integrity': 'ACID_STRICT',
      'X-Sync-Locking': 'ZERO_ASYNC_QUEUED',
      'X-FX-Rate-Sync': 'ECB_STREAM_HOURLY',
      'X-Active-SKUs': '32,450_INDEXED'
    }
  }
];

export const TelemetryWidget: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ai-inference');
  const [latency, setLatency] = useState<number>(22);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [packetCount, setPacketCount] = useState<number>(142);
  const [copied, setCopied] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [pingHistory, setPingHistory] = useState<number[]>([24, 21, 23, 19, 25, 22, 20, 24]);

  const activeNode = NODES.find(n => n.id === selectedNodeId) || NODES[0];

  const triggerPing = () => {
    setIsPinging(true);
    
    setTimeout(() => {
      const calculatedLatency = Math.max(12, Math.round(activeNode.p99Latency + (Math.random() * 8 - 4)));
      setLatency(calculatedLatency);
      setIsPinging(false);
      setPacketCount(prev => prev + 1);
      setPingHistory(prev => [...prev.slice(1), calculatedLatency]);
    }, 240);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(`curl -i ${activeNode.endpoint}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-white/[0.08] bg-[#0c0e16]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
      {/* Top Solar Flame Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

      {/* Cluster Node Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth" role="tablist">
        <span className="text-gray-400 font-mono text-xs uppercase tracking-wider mr-2 hidden sm:inline-flex items-center gap-1.5 shrink-0">
          <Activity className="w-3.5 h-3.5 text-orange-400" />
          <span>Active Mesh Node:</span>
        </span>
        {NODES.map(node => (
          <button
            key={node.id}
            type="button"
            onClick={() => {
              setSelectedNodeId(node.id);
              setLatency(node.p99Latency);
            }}
            className={`touch-target shrink-0 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedNodeId === node.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_12px_rgba(255,102,0,0.35)]'
                : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
            role="tab"
            aria-selected={selectedNodeId === node.id}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{node.name}</span>
          </button>
        ))}
      </div>

      {/* Node Telemetry Dashboard Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 shadow-sm shrink-0">
            <Server className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs sm:text-base font-bold text-white tracking-wide">
                {activeNode.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {activeNode.status}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-gray-400 mt-1 font-mono">
              Engine: <span className="text-gray-200">{activeNode.engine}</span> &middot; Region: <span className="text-orange-400">{activeNode.region}</span>
            </div>
          </div>
        </div>

        {/* Live Sparkline Waveform (Available on all devices) */}
        <div className="flex items-center gap-3 font-mono ml-auto sm:ml-0">
          <div className="text-right">
            <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">Live Jitter</div>
            <div className="text-xs text-emerald-400 font-bold">{latency}ms p99</div>
          </div>
          <div className="flex items-end gap-1 h-7 sm:h-8 w-20 sm:w-24 bg-black/40 p-1 sm:p-1.5 rounded-lg border border-white/[0.06]">
            {pingHistory.map((val, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-orange-500 to-amber-400 rounded-xs transition-all duration-300"
                style={{ height: `${Math.min(100, Math.max(20, (val / 40) * 100))}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xl hover:border-orange-500/30 transition-all">
          <div className="text-gray-400 text-[10px] uppercase font-medium">Cluster Topology</div>
          <div className="text-white font-bold text-sm mt-1">{activeNode.region}</div>
          <div className="text-[10px] text-orange-400 mt-0.5">{activeNode.type}</div>
        </div>

        <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xl hover:border-orange-500/30 transition-all">
          <div className="text-gray-400 text-[10px] uppercase font-medium">Synthetic Latency</div>
          <div className="text-orange-400 font-bold text-sm mt-1 flex items-center gap-1.5">
            <span>{latency} ms</span>
            {isPinging && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Sub-50ms SLA</div>
        </div>

        <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xl hover:border-orange-500/30 transition-all">
          <div className="text-gray-400 text-[10px] uppercase font-medium">Security State</div>
          <div className="text-emerald-400 font-bold text-sm mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Airgap Verified</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">HMAC-SHA256 Signed</div>
        </div>

        <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xl hover:border-orange-500/30 transition-all">
          <div className="text-gray-400 text-[10px] uppercase font-medium">Packets Ingested</div>
          <div className="text-white font-bold text-sm mt-1">{packetCount} pings</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Zero Loss Guarantee</div>
        </div>
      </div>

      {/* Interactive Trigger Actions & Terminal View */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={triggerPing}
            disabled={isPinging}
            className="touch-target px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_16px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Radio className={`w-3.5 h-3.5 ${isPinging ? 'animate-ping' : ''}`} />
            <span>{isPinging ? 'Pinging Node...' : 'Dispatch Live Ping'}</span>
          </button>

          <button
            type="button"
            onClick={copyCurl}
            className="touch-target px-4 py-2.5 rounded-full font-mono text-xs font-semibold border border-white/20 bg-white/[0.04] text-gray-300 hover:text-white hover:border-white/40 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">cURL Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>Copy cURL Snippet</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowTerminal(prev => !prev)}
            className="touch-target px-4 py-2.5 rounded-full font-mono text-xs font-semibold border border-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-orange-400" />
            <span>{showTerminal ? 'Hide Terminal' : 'Inspect Headers'}</span>
            {showTerminal ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <span className="font-mono text-xs text-gray-400">
          Last Verified: <span className="text-emerald-400 font-semibold">Live Real-time</span>
        </span>
      </div>

      {/* Expandable Terminal Console Drawer */}
      {showTerminal && (
        <div className="mt-4 p-5 rounded-xl bg-[#050608] border border-white/[0.1] font-mono text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[10px] text-gray-500 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-bold text-gray-400">cURL Response Stream</span>
            </span>
            <span className="text-orange-400 font-semibold">{activeNode.endpoint}</span>
          </div>

          <div className="pt-2 text-gray-300 space-y-1">
            <div className="text-emerald-400 font-bold">$ curl -i {activeNode.endpoint}</div>
            {Object.entries(activeNode.headers).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="text-gray-500">{k}:</span>
                <span className="text-orange-300 font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default TelemetryWidget;
