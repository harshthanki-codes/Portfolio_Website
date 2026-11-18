'use client';

import React, { useState } from 'react';
import { EMAIL, SITE } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = EMAIL;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Section
      id="contact"
      tone="coral"
      className="py-20 sm:py-28 bg-[#FF5A36] text-[#16161D] border-b border-[#16161D] scroll-mt-20"
      aria-label="Contact Harsh Thanki"
    >
      <Container className="space-y-10 sm:space-y-12">
        {/* Label in Ink text */}
        <div className="border-b border-[#16161D]/20 pb-3">
          <Label tone="default" className="text-[#16161D]">
            05 // DIRECT INQUIRIES
          </Label>
        </div>

        {/* Enormous Display: "Let's talk." */}
        <h2 className="type-hero text-[#16161D] select-none">
          Let's talk.
        </h2>

        {/* Body Text */}
        <p className="type-body text-[#16161D] font-medium leading-relaxed max-w-[62ch]">
          Open to AI engineer roles and a few freelance projects. Tell me what you're building.
        </p>

        {/* Email as selectable mono text with Copy button */}
        <div className="pt-2 max-w-xl">
          <div className="p-5 bg-white border-2 border-[#16161D] space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#16161D]/70 font-bold">
              EMAIL CHANNEL
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="font-mono text-base sm:text-lg font-bold text-[#16161D] select-all break-all">
                {EMAIL}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center min-h-[48px] px-6 bg-[#16161D] text-[#F7F5F2] font-mono text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#16161D] hover:bg-[#252530] active:bg-[#0E0E12] transition-colors shrink-0"
                aria-label="Copy email address to clipboard"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* External Links: GitHub & LinkedIn (No contact form as instructed) */}
        <div className="pt-6 border-t border-[#16161D]/20 flex flex-wrap items-center gap-8 font-mono text-xs font-bold text-[#16161D]">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>GITHUB ↗</span>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>LINKEDIN ↗</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="hover:underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>DIRECT MAILTO ↗</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};
