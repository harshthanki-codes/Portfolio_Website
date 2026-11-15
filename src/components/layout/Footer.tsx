import React from 'react';
import NextLink from 'next/link';
import { Mail, ShieldCheck, Terminal, Globe, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-raised)] py-12 px-4 sm:px-6 font-mono text-xs text-[var(--text-secondary)]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
          {/* System Status Indicator */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM_STATUS // OPERATIONAL</span>
            </div>
            <p className="text-[var(--text-tertiary)] text-[11px]">
              Deterministic LLM Runtimes, Ingestion DAGs & Speculative Decoders online.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/harshthanki-codes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/harsh-thanki"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:harsh.h.thanki@gmail.com"
              aria-label="Email Contact"
              className="p-2 border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Harsh Thanki.</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline">// MIT License</span>
          </div>

          <div className="flex items-center gap-4">
            <NextLink href="/design" className="hover:text-[var(--accent)] transition-colors">
              Design System
            </NextLink>
            <NextLink href="/eval" className="hover:text-[var(--accent)] transition-colors">
              Eval Dashboard
            </NextLink>
            <NextLink href="/#contact" className="hover:text-[var(--accent)] transition-colors">
              Secure Contact
            </NextLink>
            <span>Stack: Next.js + Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
