'use client';

import React from 'react';
import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';
import { getAllProjects } from '@/data/projects';

export const SelectedWork: React.FC = () => {
  const projects = getAllProjects();

  return (
    <Section
      id="work"
      tone="paper"
      className="py-16 sm:py-24 border-b border-[#E8E3DC] bg-[#F7F5F2] scroll-mt-20"
      aria-label="Selected Production AI Systems"
    >
      <Container className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E3DC]">
          <div className="space-y-3 max-w-2xl">
            <Label tone="muted">Selected Work · 03</Label>
            <h2 className="type-h2 text-[#16161D] reveal-heading">
              Production AI Systems & Backends.
            </h2>
            <p className="type-body text-[#55555F]">
              Four production systems built for enterprise constraints, evaluated against empirical baselines.
            </p>
          </div>
        </div>

        {/* 6-Column Grid: Card 1 spans 4, Card 2 spans 2; Card 3 spans 2, Card 4 spans 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {projects.map((proj, idx) => {
            const isWide = idx === 0 || idx === 3;
            const spanClass = isWide ? 'lg:col-span-4' : 'lg:col-span-2';

            return (
              <NextLink
                key={proj.slug}
                href={`/work/${proj.slug}`}
                className={`group block ${spanClass} bg-[#E8E3DC] border border-[#16161D] p-6 sm:p-8 transition-colors duration-200 hover:bg-[#FF5A36] focus-visible:outline-3 focus-visible:outline-[#FF5A36]`}
              >
                <div className="flex flex-col justify-between h-full min-h-[260px] space-y-6">
                  {/* Top Row: Mono Tag + Shifting Arrow */}
                  <div className="flex items-center justify-between font-mono text-xs text-[#16161D] border-b border-[#16161D]/20 pb-3">
                    <span className="font-bold uppercase tracking-wider">{proj.tag}</span>
                    <span
                      aria-hidden="true"
                      className="font-bold text-base transition-transform duration-200 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </div>

                  {/* Middle: Display Title + One Sentence */}
                  <div className="space-y-3">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#16161D] leading-tight tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="font-body text-base text-[#16161D]/85 leading-relaxed">
                      {proj.oneSentence}
                    </p>
                  </div>

                  {/* Bottom: One Real Number */}
                  <div className="pt-4 border-t border-[#16161D]/20 flex items-center justify-between font-mono text-xs text-[#16161D]">
                    <span className="font-bold text-lg sm:text-xl font-display">
                      {proj.keyMetric}
                    </span>
                    <span className="underline decoration-1 underline-offset-4 font-mono text-[11px] uppercase tracking-wider">
                      Read Case Study
                    </span>
                  </div>
                </div>
              </NextLink>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
