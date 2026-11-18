'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface ProofItem {
  id: string;
  targetNumber: number;
  prefix?: string;
  suffix: string;
  displayValue: string;
  sentence: string;
  methodPlaceholder: string;
}

const PROOF_ITEMS: ProofItem[] = [
  {
    id: 'proof-1',
    targetNumber: 8.7,
    suffix: '/10',
    displayValue: '8.7/10',
    sentence:
      '8.7/10 on my ERP coding test. The frontier model scores 10/10 and costs $14.20 per 1K queries. Mine costs $0.',
    methodPlaceholder: '[dataset · grader · hardware · date]',
  },
  {
    id: 'proof-2',
    targetNumber: 96.8,
    suffix: '%',
    displayValue: '96.8%',
    sentence:
      '96.8% of spoken order items matched to the right product. Plain Whisper gets 82.1%.',
    methodPlaceholder: '[dataset · grader · hardware · date]',
  },
  {
    id: 'proof-3',
    targetNumber: 140,
    prefix: '<',
    suffix: ' ms',
    displayValue: '<140 ms',
    sentence:
      '<140 ms for my watchdog to revive a killed DNS filter on 35+ workstations.',
    methodPlaceholder: '[dataset · grader · hardware · date]',
  },
];

export const ProofStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([8.7, 96.8, 140]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 900;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts([
              Number((8.7 * ease).toFixed(1)),
              Number((96.8 * ease).toFixed(1)),
              Math.round(140 * ease),
            ]);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts([8.7, 96.8, 140]);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <Section
      tone="ink"
      className="py-16 sm:py-24 border-b border-[#2D2D38] bg-[#16161D]"
      aria-label="Verified Proof Points"
    >
      <Container>
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2D2D38]"
        >
          {PROOF_ITEMS.map((item, idx) => {
            const currentNum = hasAnimated ? counts[idx] : item.targetNumber;
            const formatted =
              idx === 0
                ? `${currentNum.toFixed(1)}${item.suffix}`
                : idx === 1
                ? `${currentNum.toFixed(1)}${item.suffix}`
                : `${item.prefix || ''}${currentNum}${item.suffix}`;

            return (
              <div
                key={item.id}
                className="pt-8 md:pt-0 md:px-8 first:pt-0 first:pl-0 last:pr-0 space-y-4"
              >
                {/* Giant Coral Number: clamp(3.5rem, 8vw, 7rem) */}
                <div
                  aria-label={item.displayValue}
                  className="font-display font-extrabold text-[clamp(3.5rem,8vw,7rem)] text-[#FF5A36] leading-[0.92] tracking-[-0.04em] select-none"
                >
                  {formatted}
                </div>

                {/* One Paper Sentence */}
                <p className="font-body text-base text-[#F7F5F2] leading-[1.6] max-w-[42ch]">
                  {item.sentence}
                </p>

                {/* Mono Method line in muted-ink with Coral Outline on placeholder */}
                <div className="font-mono text-xs text-[#B9B9C4] pt-2 border-t border-[#2D2D38]/60">
                  <span>Method: </span>
                  <span className="inline-block border border-[#FF5A36] px-1.5 py-0.5 text-[#F7F5F2] tracking-normal font-mono text-[11px]">
                    {item.methodPlaceholder}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
