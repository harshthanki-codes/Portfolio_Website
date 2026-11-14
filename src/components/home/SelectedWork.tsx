import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const SelectedWork: React.FC = () => {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="py-20 border-b border-[var(--border)] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          number="01"
          tag="CASE STUDIES"
          title="Engineered Systems & Production Architecture"
          subtitle="Deep-dive architectural breakdowns of on-premise fine-tuning pipelines, fault-tolerant ingestion DAGs, and high-throughput financial cores."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.slug}
              variant="default"
              showCrosshairs
              className="flex flex-col justify-between p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] transition-all group"
            >
              <div className="space-y-4">
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((cat) => (
                      <Tag key={cat} variant="default" size="sm">
                        {cat}
                      </Tag>
                    ))}
                  </div>
                  <Tag variant="accent" size="sm">
                    {project.status}
                  </Tag>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    <NextLink href={`/work/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </NextLink>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Architecture Invariant / Problem */}
                <div className="p-3 bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-xs)] font-mono text-xs space-y-1.5">
                  <div className="text-[10px] uppercase text-[var(--text-tertiary)] tracking-wider">
                    Core Architectural Challenge
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2">
                    {project.problem}
                  </p>
                </div>

                {/* Verified Metric Highlight */}
                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--text-tertiary)] text-[11px]">Primary Result:</span>
                  <span className="font-semibold text-emerald-400">
                    {project.evaluation[0]?.ours || project.resultHeadline}
                  </span>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-6 mt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[var(--text-tertiary)]">
                  {project.readingTime}
                </span>
                <NextLink href={`/work/${project.slug}`}>
                  <Button size="sm" variant="outline" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    Read Case Study
                  </Button>
                </NextLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
