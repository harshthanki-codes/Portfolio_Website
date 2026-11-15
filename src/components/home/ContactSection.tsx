'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Copy, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '',
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

      // Static fallback for GitHub Pages
      if (res.status === 404 || res.status === 405) {
        window.location.href = `mailto:harsh.h.thanki@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(
          formData.name
        )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        setStatus('success');
        return;
      }

      const data = await res.json();
      throw new Error(data.error || 'Failed to dispatch inquiry.');
    } catch {
      window.location.href = `mailto:harsh.h.thanki@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      setStatus('success');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('harsh.h.thanki@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="space-y-2 pb-6 border-b border-[var(--border)]">
          <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
            06 / CONTACT & INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
            Direct Engineering Inquiry
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] leading-relaxed">
              Available for full-time senior engineering roles, technical advisory, and on-premise LLM infrastructure consulting.
            </p>

            <div className="space-y-3 pt-4 border-t border-[var(--border)]">
              <div className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                Direct Email Channel
              </div>
              <div className="flex items-center justify-between gap-3 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                <span className="font-mono text-xs text-[var(--text-primary)] font-medium truncate">
                  harsh.h.thanki@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors rounded-sm shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="font-mono text-[11px] text-[var(--text-tertiary)] space-y-1">
                <div>Location: Ahmedabad, Gujarat, India (UTC +05:30)</div>
                <div>Typical Response SLA: &lt; 24 hours</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot trap */}
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)] block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-transparent border-b border-[var(--border-strong)] focus:border-[var(--accent)] py-2 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--text-secondary)] block">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@company.com"
                    className="w-full bg-transparent border-b border-[var(--border-strong)] focus:border-[var(--accent)] py-2 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-mono text-xs text-[var(--text-secondary)] block">
                  Project Brief or Inquiry
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your architecture scope, timeline, or engineering role..."
                  className="w-full bg-transparent border-b border-[var(--border-strong)] focus:border-[var(--accent)] py-2 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors resize-y"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-950/20 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message dispatched. I will review and reply within 24 business hours.</span>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  isLoading={status === 'loading'}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
