'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Mail, RotateCcw } from 'lucide-react';
import { getAssetPath } from '@/lib/paths';

interface TokenItem {
  text: string;
  state: 'verified' | 'draft' | 'rejected';
}

interface DecodingFrame {
  tokens: TokenItem[];
  statusText: string;
}

const FRAMES: DecodingFrame[] = [
  // Frame 0: [] (Buffer empty)
  {
    tokens: [],
    statusText: '[SPECULATIVE_DECODER] Prompt loaded. Initializing KV cache. Draft buffer: []',
  },
  // Frame 1: 4 draft words "AI systems that ride"
  {
    tokens: [
      { text: 'AI', state: 'draft' },
      { text: 'systems', state: 'draft' },
      { text: 'that', state: 'draft' },
      { text: 'ride', state: 'draft' },
    ],
    statusText: '[SPECULATIVE_DECODER] Draft model generated 4 speculative tokens: [AI, systems, that, ride]',
  },
  // Frame 2: first 3 verified, "ride" rejected
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'ride', state: 'rejected' },
    ],
    statusText: '[SPECULATIVE_DECODER] Target model verification: 3 accepted, 1 rejected ("ride" ✗)',
  },
  // Frame 3: "run" verified + 4 new drafts "on your own servers."
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'run', state: 'verified' },
      { text: 'on', state: 'draft' },
      { text: 'your', state: 'draft' },
      { text: 'own', state: 'draft' },
      { text: 'servers.', state: 'draft' },
    ],
    statusText: '[SPECULATIVE_DECODER] Fallback token "run" verified. Speculating suffix: [on, your, own, servers.]',
  },
  // Frame 4: 3 verified, "servers." rejected
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'run', state: 'verified' },
      { text: 'on', state: 'verified' },
      { text: 'your', state: 'verified' },
      { text: 'own', state: 'verified' },
      { text: 'servers.', state: 'rejected' },
    ],
    statusText: '[SPECULATIVE_DECODER] Target model verification: 3 accepted, 1 rejected ("servers." ✗)',
  },
  // Frame 5: all 8 verified with "hardware."
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'run', state: 'verified' },
      { text: 'on', state: 'verified' },
      { text: 'your', state: 'verified' },
      { text: 'own', state: 'verified' },
      { text: 'hardware.', state: 'verified' },
    ],
    statusText: '[SPECULATIVE_DECODER] Speculative decoding complete. 8/8 tokens verified without API latency.',
  },
];

export const Hero: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoop = useCallback((startFrame = 0) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    let current = startFrame;
    setFrameIndex(current);

    const step = () => {
      // Determine duration of current frame
      // Frame 5 holds ~4600 ms, others hold 1150 ms
      const duration = current === 5 ? 4600 : 1150;

      timerRef.current = setTimeout(() => {
        current = (current + 1) % FRAMES.length;
        setFrameIndex(current);
        step();
      }, duration);
    };

    step();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setFrameIndex(5);
      return;
    }

    startLoop(0);

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReducedMotion(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        setFrameIndex(5);
      } else {
        setReducedMotion(false);
        startLoop(0);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [startLoop]);

  const handleReplay = () => {
    if (reducedMotion) return;
    startLoop(0);
  };

  const currentFrame = reducedMotion ? FRAMES[5] : FRAMES[frameIndex];

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#6C84EE] bg-blueprint-grid overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Column: Decoding Terminal & Speculative Masthead (8 cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Live Indicator (One Yellow Usage Rule) */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#FFE45C] animate-pulse" />
                <span className="text-[#BCC5F7] tracking-wider uppercase">
                  AI ENGINEER // AHMEDABAD, INDIA
                </span>
              </div>

              {/* Speculative Decoding Legend & Replay */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="border-b border-dashed border-[#BCC5F7] text-[#BCC5F7] px-1">
                    Draft
                  </span>
                  <span className="text-white px-1">
                    Verified
                  </span>
                  <span className="bg-[#FFE45C] text-[#0A1450] line-through px-1 font-bold">
                    Rejected
                  </span>
                </div>

                <button
                  onClick={handleReplay}
                  aria-label="Replay Speculative Decoding Sequence"
                  className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#6C84EE] text-[#BCC5F7] hover:text-white hover:border-[#FFE45C] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              </div>
            </div>

            {/* Speculative Decoding Headline */}
            <div className="space-y-4">
              <div className="p-5 sm:p-6 bg-[#0C2699] border border-[#6C84EE] space-y-4">
                <div className="flex items-center justify-between border-b border-[#6C84EE]/60 pb-2 font-mono text-[11px] text-[#BCC5F7]">
                  <span>SPECULATIVE_STREAM // FRAME 0{frameIndex}/05</span>
                  <span className="text-[#FFE45C]">1150ms / step</span>
                </div>

                {/* Real h1 with Accessible Aria Label */}
                <h1
                  aria-label="AI systems that run on your own hardware."
                  className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] tracking-[-0.035em] leading-[0.96] text-white min-h-[96px] sm:min-h-[140px] flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5"
                >
                  {currentFrame.tokens.length === 0 ? (
                    <span className="text-[#BCC5F7]/40 font-mono text-2xl sm:text-4xl">[]</span>
                  ) : (
                    currentFrame.tokens.map((tok, idx) => {
                      if (tok.state === 'rejected') {
                        return (
                          <span
                            key={idx}
                            className="bg-[#FFE45C] text-[#0A1450] line-through font-bold px-1.5 py-0.5 inline-block"
                          >
                            {tok.text}
                          </span>
                        );
                      }
                      if (tok.state === 'draft') {
                        return (
                          <span
                            key={idx}
                            className="border-b-2 border-dashed border-[#BCC5F7] text-[#BCC5F7] inline-block"
                          >
                            {tok.text}
                          </span>
                        );
                      }
                      return (
                        <span key={idx} className="text-white inline-block">
                          {tok.text}
                        </span>
                      );
                    })
                  )}

                  {/* Blinking Yellow Caret */}
                  <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-9 bg-[#FFE45C] animate-caret align-baseline ml-1" />
                </h1>

                {/* One-Line Technical Status Text */}
                <div className="pt-2 border-t border-[#6C84EE]/40 font-mono text-[11px] text-[#BCC5F7] truncate">
                  {currentFrame.statusText}
                </div>
              </div>
            </div>

            {/* Subhead: ~18 words, plain verbs, no banned buzzwords */}
            <p className="text-base sm:text-lg font-body text-[#BCC5F7] max-w-2xl leading-relaxed">
              I fine-tune open models, build the pipelines around them, and test them until they stop failing.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-1">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F3F5FF] text-[#0A1450] font-headline font-bold text-sm hover:bg-white transition-colors border border-transparent"
              >
                <span>See the work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0C2699] border border-[#6C84EE] text-white font-body text-sm hover:border-[#FFE45C] hover:text-[#FFE45C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Right Column: Technical Blueprint Portrait Card (4 cols) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-full max-w-xs bg-[#0C2699] border border-[#6C84EE] p-3 space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#BCC5F7] border-b border-[#6C84EE] pb-2">
                <span>SYSTEM OPERATOR // SPEC-01</span>
                <span>AHMEDABAD, IN</span>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#6C84EE] bg-[#1237D1]">
                <picture className="w-full h-full block">
                  <source srcSet={getAssetPath('/harsh-thanki-transparent.webp')} type="image/webp" />
                  <img
                    src={getAssetPath('/harsh-thanki-transparent.png')}
                    alt="Harsh Thanki — AI engineer"
                    width={280}
                    height={350}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getAssetPath('/images/harsh-thanki-transparent.png');
                    }}
                  />
                </picture>
              </div>

              <div className="font-mono text-[11px] text-[#BCC5F7] space-y-1 pt-1">
                <div className="text-white font-bold">Harsh Thanki</div>
                <div>AI engineer · Local Inference Architecture</div>
                <div className="text-[10px] text-[#BCC5F7]/70">Alliance University · MCA (2024–2026)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
