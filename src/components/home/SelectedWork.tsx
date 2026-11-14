import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';

export const SelectedWork: React.FC = () => {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              01 / SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Production Systems & Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-sm leading-relaxed">
            Detailed breakdowns of on-premise fine-tuning pipelines, multimodal failover DAGs, and high-throughput financial engines.
          </p>
        </div>

        {/* Clean Editorial List with Hairline Separators */}
        <div className="divide-y divide-[var(--border)]">
          {projects.map((project, idx) => (
            <article
              key={project.slug}
              className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group"
            >
              {/* Left Column: Number & Domain (3 cols) */}
              <div className="lg:col-span-3 space-y-2 font-mono text-xs text-[var(--text-tertiary)]">
                <div className="text-xs font-semibold text-[var(--accent)]">
                  0{idx + 1} // CASE STUDY
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] tracking-wider uppercase">
                  {project.categories.join(' • ')}
                </div>
              </div>

              {/* Center Column: Title, Tagline & Result (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <NextLink href={`/work/${project.slug}`}>
                    {project.title}
                  </NextLink>
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {project.tagline}
                </p>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-mono">
                  <span className="text-[var(--accent)] font-medium">Benchmark Result:</span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {project.evaluation[0]?.ours || project.resultHeadline}
                  </span>
                </div>
              </div>

              {/* Right Column: Deep-Dive Link (2 cols) */}
              <div className="lg:col-span-2 flex lg:justify-end pt-1">
                <NextLink
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors"
                >
                  <span>Read Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
