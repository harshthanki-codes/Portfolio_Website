'use client';

import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { getAssetPath } from '@/lib/paths';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[var(--hairline)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Main Editorial Masthead (8 cols) */}
          <div className="lg:col-span-8 space-y-7">
            {/* Understated Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              <span>AI engineer, Ahmedabad</span>
            </div>

            {/* Line-by-Line Headline Reveal (8 words total, reveals in ~600ms, tight leading) */}
            <h1 className="font-serif text-[clamp(2.75rem,7vw+1rem,5.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--text-primary)] font-normal">
              <span className="block overflow-hidden">
                <span className="inline-block animate-slideUp" style={{ animationDuration: '600ms' }}>
                  AI systems that run
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="inline-block animate-slideUp"
                  style={{ animationDuration: '640ms', animationDelay: '80ms' }}
                >
                  on your own hardware.
                </span>
              </span>
            </h1>

            {/* Subhead: Exactly 17 words, one idea, plain verbs */}
            <p className="text-base sm:text-lg font-sans text-[var(--text-muted)] max-w-xl leading-[1.65] font-normal">
              I fine-tune open models, build the pipelines around them, and test them until they stop failing.
            </p>

            {/* Two Action Buttons: See the work & Email me */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius)] bg-[var(--accent)] text-[var(--accent-text)] font-sans text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <span>See the work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:harsh.h.thanki@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-[var(--text-primary)] font-sans text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <Mail className="w-4 h-4" />
                <span>Email me</span>
              </a>
            </div>
          </div>

          {/* Small Portrait with Hairline Frame (4 cols) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="relative w-44 h-52 sm:w-52 sm:h-64 rounded-[var(--radius)] overflow-hidden border border-[var(--hairline)] bg-[var(--surface)] shadow-sm group">
              <picture className="w-full h-full block">
                <source srcSet={getAssetPath('/harsh-thanki-transparent.webp')} type="image/webp" />
                <img
                  src={getAssetPath('/harsh-thanki-transparent.png')}
                  alt="Harsh Thanki — AI engineer"
                  width={208}
                  height={256}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetPath('/images/harsh-thanki-transparent.png');
                  }}
                />
              </picture>
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-[var(--background)]/90 backdrop-blur-sm border-t border-[var(--hairline)] font-mono text-[10px] text-[var(--text-muted)] flex items-center justify-between">
                <span>HARSH THANKI</span>
                <span>AHMEDABAD, IN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
