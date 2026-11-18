'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';

interface TimelineEntry {
  id: string;
  period: string;
  isNewest?: boolean;
  role: string;
  organization: string;
  location: string;
  details?: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    id: 'arihant',
    period: 'Mar — Sep 2026',
    isNewest: true,
    role: 'AI/ML engineering intern',
    organization: 'Arihant AI',
    location: 'onsite, Ahmedabad',
    details: 'Fine-tuned open models, built local inference runtimes, and tested until failure modes stopped.',
  },
  {
    id: 'pratinik',
    period: 'Jan — Mar 2026',
    role: 'Data science and ML intern',
    organization: 'Pratinik Infotech',
    location: 'remote',
    details: 'Engineered data transformation pipelines, model evaluation harnesses, and structured prediction benchmarks.',
  },
  {
    id: 'alliance',
    period: '2024 — 2026',
    role: 'MCA',
    organization: 'Alliance University',
    location: 'Bengaluru / Hybrid',
    details: 'Master of Computer Applications specializing in neural quantization, local inference latency, and concurrency.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <Section
      id="about"
      tone="ink"
      className="py-16 sm:py-24 border-b border-[#2D2D38] bg-[#16161D] scroll-mt-20"
      aria-label="About Harsh Thanki"
    >
      <Container className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-[62ch]">
          <Label tone="coral">How I work · 04</Label>
          <h2 className="type-h2 text-[#F7F5F2] reveal-heading">
            I like systems that behave the same way every time.
          </h2>
          <p className="font-body text-lg text-[#B9B9C4] leading-[1.6]">
            Language models are great until the API goes down, the bill arrives, or the answer is wrong. So I build around that.
          </p>
        </div>

        {/* Timeline with 2px Coral Left Rule */}
        <div className="pt-6">
          <div className="border-l-2 border-[#FF5A36] pl-6 sm:pl-10 space-y-10 max-w-[62ch]">
            {TIMELINE.map((item) => (
              <div key={item.id} className="relative space-y-2">
                {/* Period Badge */}
                <div
                  className={`font-mono text-xs uppercase tracking-wider font-bold ${
                    item.isNewest ? 'text-[#FF5A36]' : 'text-[#B9B9C4]'
                  }`}
                >
                  {item.period}
                </div>

                {/* Role & Org */}
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F7F5F2]">
                    {item.role}
                  </h3>
                  <div className="font-mono text-xs text-[#B9B9C4]">
                    {item.organization} · {item.location}
                  </div>
                </div>

                {item.details && (
                  <p className="font-body text-sm text-[#B9B9C4]/80 leading-relaxed pt-1">
                    {item.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
