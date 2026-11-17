'use client';

import React, { useState } from 'react';
import { Copy, Check, Send, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '', // Honeypot
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText('harsh.h.thanki@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

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
      window.location.href = `mailto:harsh.h.thanki@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      setStatus('success');
    } catch {
      window.location.href = `mailto:harsh.h.thanki@gmail.com?subject=Engineering Inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      setStatus('success');
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#FF5A36] text-[#16161D] border-b border-[#16161D] scroll-mt-20"
      aria-label="Contact and Inquiries"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-14">
        {/* Masthead Tag */}
        <div className="flex items-center justify-between border-b border-[#16161D]/30 pb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#16161D]">
          <span>05 // DIRECT INQUIRIES & CONTRACTS</span>
          <span>RESPONSE WINDOW &lt; 24H</span>
        </div>

        {/* Huge 15vw Headline */}
        <h2 className="font-headline font-extrabold text-[15vw] leading-[0.88] tracking-[-0.04em] text-[#16161D] select-none">
          Let's talk.
        </h2>

        {/* Two-Column Inquiry Layout: Email Box on Left, Fast Inquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 cols): Direct Email & Copy Button */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-body text-base sm:text-lg text-[#16161D] leading-relaxed">
              Available for AI engineering engagements, local LLM fine-tuning pipelines, and distributed fault-tolerant backend architectures.
            </p>

            <div className="p-5 border-2 border-[#16161D] bg-white space-y-3">
              <span className="font-mono text-[10px] text-[#5C5B66] uppercase tracking-wider block font-bold">
                PRIMARY EMAIL CHANNEL
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-[#16161D] select-all break-all">
                  harsh.h.thanki@gmail.com
                </span>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#16161D] text-white font-mono text-xs font-bold hover:bg-[#2D2D38] transition-colors shrink-0 min-h-[44px]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#FF5A36]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="font-mono text-xs text-[#16161D]/80 space-y-1">
              <div>LOCATION: Ahmedabad, India · Remote Globally</div>
              <div>PGP / VERIFIED COMMS AVAILABLE ON REQUEST</div>
            </div>
          </div>

          {/* Right Column (7 cols): Minimal Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-2 border-[#16161D] bg-white text-[#16161D]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#16161D] border-b border-[#16161D]/20 pb-2">
                PROJECT CONTEXT DISPATCH
              </div>

              {/* Honeypot field for bot trapping */}
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="block font-mono text-xs text-[#16161D] font-bold">
                    NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full px-3.5 py-2.5 border border-[#16161D] bg-[#F7F5F2] text-[#16161D] font-body text-sm min-h-[44px]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block font-mono text-xs text-[#16161D] font-bold">
                    EMAIL *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 border border-[#16161D] bg-[#F7F5F2] text-[#16161D] font-body text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block font-mono text-xs text-[#16161D] font-bold">
                  SYSTEM CONTEXT / PROJECT SCOPE *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your model fine-tuning goals, latency requirements, or target infrastructure..."
                  className="w-full px-3.5 py-2.5 border border-[#16161D] bg-[#F7F5F2] text-[#16161D] font-body text-sm min-h-[44px] resize-y"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 border border-red-600 bg-red-100 text-red-900 font-mono text-xs">
                  {errorMessage || 'Failed to dispatch inquiry. Please use direct email.'}
                </div>
              )}

              {status === 'success' && (
                <div className="p-3 border border-[#16161D] bg-[#16161D] text-[#F7F5F2] font-mono text-xs font-bold">
                  Inquiry dispatched! Opening direct email client fallback.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16161D] text-white font-headline font-bold text-sm hover:bg-[#2D2D38] transition-colors min-h-[44px]"
              >
                <span>{status === 'loading' ? 'Dispatching...' : 'Dispatch Inquiry'}</span>
                <Send className="w-4 h-4 text-[#FF5A36]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
