'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EMAIL } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface TokenItem {
  text: string;
  state: 'verified' | 'draft' | 'rejected';
  justVerified?: boolean; // triggers 250ms mint flash
}

interface DecodingFrame {
  tokens: TokenItem[];
  statusText: string;
}

const FRAMES: DecodingFrame[] = [
  // Frame 0: Initial buffer
  {
    tokens: [],
    statusText: 'INITIALIZING SPECULATIVE STREAM // DRAFT BUFFER [ ]',
  },
  // Frame 1: 1.5B draft tokens
  {
    tokens: [
      { text: 'AI', state: 'draft' },
      { text: 'systems', state: 'draft' },
      { text: 'that', state: 'draft' },
      { text: 'ride', state: 'draft' },
    ],
    statusText: '1.5B DRAFT MODEL GENERATED 4 SPECULATIVE TOKENS',
  },
  // Frame 2: 7B target verification - "ride" rejected, 3 verified
  {
    tokens: [
      { text: 'AI', state: 'verified', justVerified: true },
      { text: 'systems', state: 'verified', justVerified: true },
      { text: 'that', state: 'verified', justVerified: true },
      { text: 'ride', state: 'rejected' },
    ],
    statusText: '7B VERIFIER: 3 ACCEPTED, 1 REJECTED ("ride" ✗)',
  },
  // Frame 3: corrected token + new draft tokens
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'run', state: 'verified', justVerified: true },
      { text: 'on', state: 'draft' },
      { text: 'your', state: 'draft' },
      { text: 'own', state: 'draft' },
      { text: 'servers.', state: 'draft' },
    ],
    statusText: 'FALLBACK VERIFIED "run". SPECULATING REMAINING SUFFIX...',
  },
  // Frame 4: 7B verification - "servers." rejected
  {
    tokens: [
      { text: 'AI', state: 'verified' },
      { text: 'systems', state: 'verified' },
      { text: 'that', state: 'verified' },
      { text: 'run', state: 'verified' },
      { text: 'on', state: 'verified', justVerified: true },
      { text: 'your', state: 'verified', justVerified: true },
      { text: 'own', state: 'verified', justVerified: true },
      { text: 'servers.', state: 'rejected' },
    ],
    statusText: '7B VERIFIER: 3 ACCEPTED, 1 REJECTED ("servers." ✗)',
  },
  // Frame 5: complete verified headline with "own hardware." on sun highlighter
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
    statusText: 'SPECULATIVE DECODING COMPLETE. 8/8 TOKENS VERIFIED ON LOCAL HARDWARE.',
  },
];

export const Hero: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [flashingMint, setFlashingMint] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startPlayback = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);

    let current = 0;
    setFrameIndex(current);
    setFlashingMint(false);

    const durations = [750, 1150, 1250, 1150, 1250];

    const step = (idx: number) => {
      if (idx >= FRAMES.length - 1) {
        setFrameIndex(FRAMES.length - 1);
        setFlashingMint(false);
        return; // Plays once, holds final headline
      }

      timerRef.current = setTimeout(() => {
        const next = idx + 1;
        setFrameIndex(next);

        // Check if frame has newly verified tokens to flash mint for 250ms
        const hasNewlyVerified = FRAMES[next].tokens.some((t) => t.justVerified);
        if (hasNewlyVerified) {
          setFlashingMint(true);
          flashTimerRef.current = setTimeout(() => {
            setFlashingMint(false);
          }, 250);
        }

        step(next);
      }, durations[idx] || 1150);
    };

    step(0);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setFrameIndex(5);
      return;
    }

    startPlayback();

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReducedMotion(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        setFrameIndex(5);
      } else {
        setReducedMotion(false);
        startPlayback();
      }
    };

    mq.addEventListener('change', handler);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      mq.removeEventListener('change', handler);
    };
  }, [startPlayback]);

  const handleReplay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (reducedMotion) return;
    startPlayback();
  };

  const currentFrame = reducedMotion ? FRAMES[5] : FRAMES[frameIndex];
  const isFinalFrame = reducedMotion || frameIndex === 5;

  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#2D2D38]/60 relative z-10">
      <Container>
        <div className="max-w-4xl space-y-8 sm:space-y-10">
          {/* Top Label & Replay Control */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF5A36]" aria-hidden="true" />
              <span className="text-[#F7F5F2] font-medium">AI engineer · Ahmedabad</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] lowercase text-[#B9B9C4]">
              <span className="hidden sm:inline">
                <span className="text-[#FF5A36] underline decoration-1 underline-offset-4">coral</span> = drafted by a 1.5B model · <span className="text-[#2EE6A6] font-bold">mint</span> = verified by a 7B model
              </span>
              <button
                type="button"
                onClick={handleReplay}
                className="font-mono text-xs uppercase tracking-wider text-[#B9B9C4] hover:text-[#F7F5F2] active:text-[#FF5A36] underline decoration-1 underline-offset-4 cursor-pointer"
                aria-label="Replay speculative decoding animation"
              >
                Replay
              </button>
            </div>
          </div>

          {/* Reserved Height Speculative Headline Container (Zero Layout Shift) */}
          <div className="min-h-[160px] sm:min-h-[220px] lg:min-h-[280px] flex items-start">
            <h1
              aria-label="AI systems that run on your own hardware."
              className="type-hero text-[#F7F5F2] flex flex-wrap items-baseline gap-x-3 gap-y-2 select-none"
            >
              {/* Visually hidden text for semantic and search indexing */}
              <span className="sr-only">AI systems that run on your own hardware.</span>

              {isFinalFrame ? (
                // Final verified state: "AI systems that run on your " in paper-white + "own hardware." on sun highlighter fill
                <span>
                  AI systems that run on your{' '}
                  <mark className="bg-[#FFD23F] text-[#2B2200] px-2 py-0.5 inline-block font-extrabold not-italic">
                    own hardware.
                  </mark>
                </span>
              ) : currentFrame.tokens.length === 0 ? (
                <span className="text-[#B9B9C4]/40 font-mono text-3xl sm:text-5xl">[]</span>
              ) : (
                currentFrame.tokens.map((tok, idx) => {
                  if (tok.state === 'rejected') {
                    // Struck through in coral, text on coral is ink
                    return (
                      <span
                        key={idx}
                        className="bg-[#FF5A36] text-[#16161D] line-through px-1.5 inline-block font-extrabold"
                      >
                        {tok.text}
                      </span>
                    );
                  }
                  if (tok.state === 'draft') {
                    // Drafted in coral with thin coral underline
                    return (
                      <span
                        key={idx}
                        className="text-[#FF5A36] underline decoration-1 underline-offset-8 inline-block"
                      >
                        {tok.text}
                      </span>
                    );
                  }
                  // Verified: flashes mint for 250ms with a small mint dot, then settles to paper-white
                  const isFlashing = tok.justVerified && flashingMint;
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center transition-colors duration-250 ${
                        isFlashing ? 'text-[#2EE6A6]' : 'text-[#F7F5F2]'
                      }`}
                    >
                      {tok.text}
                      {isFlashing && (
                        <span
                          className="inline-block w-1.5 h-1.5 bg-[#2EE6A6] ml-1.5 align-middle"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  );
                })
              )}

              {/* Blinking Caret (hidden if motion reduced or finished) */}
              {!reducedMotion && frameIndex < 5 && (
                <span className="inline-block w-2.5 sm:w-3.5 h-[0.8em] bg-[#FF5A36] animate-caret align-baseline ml-1" />
              )}
            </h1>
          </div>

          {/* Subheading: muted-ink, 20px, max 62ch */}
          <p className="font-body text-lg sm:text-[20px] text-[#B9B9C4] leading-[1.6] max-w-[62ch]">
            I fine-tune open models, build the pipelines around them, and test them until they stop failing.
          </p>

          {/* Action Buttons: coral "See the work", outline "Email me" */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Button
              variant="coral"
              href="#work"
              className="text-base font-bold min-h-[48px]"
            >
              See the work
            </Button>

            <Button
              variant="outline"
              href={`mailto:${EMAIL}`}
              className="text-base font-bold min-h-[48px] text-[#F7F5F2] border-[#F7F5F2]"
            >
              Email me
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
