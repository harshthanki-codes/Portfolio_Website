'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Copy, ArrowRight, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Basic email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Bot trap check
    if (formData._hp) {
      setStatus('success');
      return;
    }

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
    <section id="contact" className="py-20 sm:py-28 border-b border-[var(--hairline)] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Huge Serif Section Heading */}
        <div className="space-y-3 pb-6 border-b border-[var(--hairline)]">
          <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
            04 / CONTACT & INQUIRIES
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
            Let's talk.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base font-sans text-[var(--text-muted)] leading-relaxed">
              Available for AI engineering contracts, local LLM fine-tuning pipelines, and distributed backend systems. Based in Ahmedabad, India — collaborating globally.
            </p>

            <div className="space-y-3 pt-4 border-t border-[var(--hairline)]">
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                Direct Email Channel
              </div>
              <div className="flex items-center justify-between gap-3 p-3.5 bg-[var(--surface)] border border-[var(--hairline)] rounded-[var(--radius)]">
                <span className="font-mono text-xs text-[var(--text-primary)] font-medium truncate">
                  harsh.h.thanki@gmail.com
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span className="text-[var(--accent)] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Current response window: &lt; 24 hours</span>
            </div>
          </div>

          {/* Right Column: Minimal Form with Clear Success & Error States (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)]">
            {status === 'success' ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-[var(--text-primary)] font-normal">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm font-sans text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I have received your message and will review your technical requirements within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    Send another inquiry &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot Field */}
                <input
                  type="text"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-[var(--radius)] bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)] text-sm text-[var(--text-primary)] font-sans placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)] text-sm text-[var(--text-primary)] font-sans placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider"
                  >
                    System Context / Project Scope
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Describe the model fine-tuning, latency target, or backend architecture you are building..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[var(--radius)] bg-[var(--surface-raised)] border border-[var(--hairline)] text-sm text-[var(--text-primary)] font-sans placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-text)] font-sans text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                >
                  {status === 'loading' ? (
                    <span>Transmitting inquiry...</span>
                  ) : (
                    <>
                      <span>Send inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
