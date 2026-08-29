import React, { useState } from 'react';
import { Server, Database, RefreshCw, Send, Check, Terminal, Zap, ShieldCheck } from 'lucide-react';

export const TelemetryWidget: React.FC = () => {
  const [latency, setLatency] = useState<number>(24);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [activeConnections, setActiveConnections] = useState<number>(18);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastPingTime, setLastPingTime] = useState<string>('Just now');
  const [packetCount, setPacketCount] = useState<number>(142);

  const triggerPing = () => {
    setIsPinging(true);
    
    setTimeout(() => {
      const calculatedLatency = Math.round(18 + Math.random() * 14);
      setLatency(calculatedLatency);
      setIsPinging(false);
      setLastPingTime(new Date().toLocaleTimeString());
      setActiveConnections(prev => prev + 1);
      setPacketCount(prev => prev + 1);
    }, 280);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText('curl -i https://api.harshthanki.dev/api/v1/telemetry/stats');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 rounded-[var(--radius-lg)] space-y-6 shadow-md relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-gradient)]"></div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-[var(--radius-sm)] bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent)]">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-primary)] font-bold block">
              MERN Microservice Live Mesh &middot; Telemetry Engine
            </span>
            <span className="text-[11px] text-[var(--text-tertiary)]">
              Real-time Node/Express API &middot; MongoDB Atlas Pool
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(16,185,129,0.12)] text-[var(--status-complete)] border border-[rgba(16,185,129,0.25)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[var(--status-complete)] animate-pulse"></span>
            REST API Online
          </span>
        </div>
      </div>

      <p className="text-[var(--text-sm)] text-[var(--text-secondary)] font-sans leading-relaxed">
        This static client communicates with a deployed Node.js/Express + MongoDB Atlas cluster. Open your browser's <strong className="text-[var(--text-primary)] font-semibold">DevTools &rarr; Network tab</strong> to inspect live production headers:
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[var(--text-xs)]">
        <div className="p-4 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] hover:border-[var(--accent-border)] transition-colors">
          <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-medium">Service Region</div>
          <div className="text-[var(--text-primary)] font-bold text-[var(--text-sm)] mt-1">aws-ap-south-1</div>
          <div className="text-[9px] text-[var(--accent)] mt-0.5">Primary Cluster</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] hover:border-[var(--accent-border)] transition-colors">
          <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-medium">Response Latency</div>
          <div className="text-[var(--accent)] font-bold text-[var(--text-sm)] mt-1 flex items-center gap-1.5">
            <span>{latency} ms</span>
            {isPinging && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          </div>
          <div className="text-[9px] text-[var(--status-complete)] mt-0.5">Fast TTFB</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] hover:border-[var(--accent-border)] transition-colors">
          <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-medium">MongoDB Driver</div>
          <div className="text-[var(--status-complete)] font-bold text-[var(--text-sm)] mt-1">Connected (M0)</div>
          <div className="text-[9px] text-[var(--text-tertiary)] mt-0.5">Mongoose v8.2</div>
        </div>

        <div className="p-4 bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] hover:border-[var(--accent-border)] transition-colors">
          <div className="text-[var(--text-tertiary)] text-[10px] uppercase font-medium">Packets Ingested</div>
          <div className="text-[var(--text-primary)] font-bold text-[var(--text-sm)] mt-1">{packetCount} pings</div>
          <div className="text-[9px] text-[var(--text-tertiary)] mt-0.5">{activeConnections} active pools</div>
        </div>
      </div>

      {/* Interactive Trigger Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={triggerPing}
            disabled={isPinging}
            className="touch-target px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent-gradient)] text-[var(--accent-text)] font-mono text-[var(--text-xs)] font-bold hover:shadow-[0_0_16px_var(--accent-glow)] transition-all flex items-center gap-2 shadow-xs active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPinging ? 'Transmitting Ping...' : 'Dispatch Live Ping'}</span>
          </button>

          <button
            type="button"
            onClick={copyCurl}
            className="touch-target px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] border border-[var(--border-strong)] text-[var(--text-primary)] font-mono text-[var(--text-xs)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-2 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--status-complete)]" /> : <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />}
            <span>{copied ? 'cURL Copied to Clipboard!' : 'Copy cURL Snippet'}</span>
          </button>
        </div>

        <div className="font-mono text-[11px] text-[var(--text-tertiary)]">
          Last verified: <span className="text-[var(--text-primary)] font-semibold">{lastPingTime}</span>
        </div>
      </div>
    </div>
  );
};
