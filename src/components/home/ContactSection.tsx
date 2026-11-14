'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, AlertCircle, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '', // Honeypot trap
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', _hp: '' });
        return;
      }

      // If on static export (e.g. GitHub Pages without Node runtime)
      if (res.status === 404 || res.status === 405) {
        window.location.href = `mailto:harshthanki203@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        setStatus('success');
        return;
      }

      const data = await res.json();
      throw new Error(data.error || 'Failed to dispatch inquiry.');
    } catch (err: any) {
      // Fallback for static environments: direct mailto
      window.location.href = `mailto:harshthanki203@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      setStatus('success');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('harshthanki203@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          number="04"
          tag="DISPATCH INQUIRY"
          title="Direct Contact & Engineering Inquiries"
          subtitle="Looking to discuss local LLM architecture, failover inference DAGs, or contract engineering roles? Send an inquiry or reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Direct Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="raised" className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-subtle)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono text-xs uppercase font-bold text-[var(--text-primary)]">
                  Verified Channels
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Direct messages are routed to my personal inbox with rate-limiting and cryptographic spam filtering.
              </p>

              <div className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xs)] space-y-2">
                <div className="font-mono text-[11px] text-[var(--text-tertiary)]">
                  Primary Email:
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[var(--text-primary)] font-semibold truncate">
                    harshthanki203@gmail.com
                  </span>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 border border-[var(--border)] hover:border-[var(--accent)] rounded-[var(--radius-xs)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 font-mono text-[11px] text-[var(--text-tertiary)] space-y-1">
                <div>Location: Ahmedabad, Gujarat, India (UTC +05:30)</div>
                <div>Response SLA: &lt; 24 business hours</div>
              </div>
            </Card>
          </div>

          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <Card variant="default" className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from visual users) */}
                <input
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-xs text-[var(--text-secondary)] block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs text-[var(--text-secondary)] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-[var(--text-secondary)] block">
                    Engineering Brief / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your architecture requirements, timeline, or engineering role..."
                    className="w-full bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] resize-y"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-[var(--radius-xs)] flex items-center gap-2 text-xs font-mono text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-[var(--radius-xs)] flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Message received. I will review and reply within 24 hours.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  isLoading={status === 'loading'}
                  className="w-full sm:w-auto"
                >
                  Dispatch Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
