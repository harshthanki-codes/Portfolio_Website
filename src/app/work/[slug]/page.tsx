import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { CaseStudyToc } from '@/components/work/CaseStudyToc';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Clock,
  CheckCircle2,
  AlertCircle,
  GitBranch,
} from 'lucide-react';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | Harsh Thanki' };

  return {
    title: `${project.title} — Harsh Thanki`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Harsh Thanki`,
      description: project.resultHeadline,
      type: 'article',
      url: `https://harshthanki-codes.github.io/Portfolio_Website/work/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Harsh Thanki`,
      description: project.resultHeadline,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.tagline,
    author: {
      '@type': 'Person',
      name: 'Harsh Thanki',
      jobTitle: 'AI engineer',
    },
    about: project.tags,
    datePublished: '2026-10-01',
  };

  return (
    <article className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Top Breadcrumb & Metadata Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--hairline)] font-mono text-xs text-[var(--text-muted)]">
          <NextLink
            href="/#work"
            className="inline-flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Selected Work</span>
          </NextLink>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{project.readingTime}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--hairline)]" />
            <span className="text-[var(--accent)]">{project.status}</span>
          </div>
        </div>

        {/* Cinematic Header */}
        <header className="space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--surface)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] font-normal tracking-tight leading-[1.08]">
              {project.title}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Measured Result Headline Banner */}
          <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border-l-2 border-l-[var(--accent)] border border-[var(--hairline)] space-y-2">
            <span className="mono-label text-[10px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              MEASURED PRODUCTION RESULT
            </span>
            <p className="font-sans text-sm sm:text-base font-medium text-[var(--text-primary)] leading-snug">
              {project.resultHeadline}
            </p>
          </div>

          {/* Quick External Links & Technologies */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--hairline)]">
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-[var(--radius)] bg-[var(--background)] border border-[var(--hairline)] text-[11px] font-mono text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>System Demo</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* 2-Column Content Grid: Sticky TOC on Left (3 cols), Main Content on Right (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-4">
          {/* Sticky Left Sidebar (3 cols) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-8">
            <CaseStudyToc />

            <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-3 font-mono text-xs">
              <span className="text-[10px] text-[var(--accent)] uppercase tracking-wider block font-semibold">
                REPRODUCIBILITY
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                All benchmark scripts, eval prompts, and synthetic datasets run on consumer Linux/CUDA hardware with zero proprietary weights.
              </p>
            </div>
          </aside>

          {/* Main Article Sections (9 cols) */}
          <div className="lg:col-span-9 space-y-16">
            {/* 01. The Problem & Constraints */}
            <section id="problem" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  01 / PROBLEM & CONSTRAINTS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  The Technical Challenge
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--accent)]">
                    <AlertCircle className="w-4 h-4" />
                    <span>Core Operational Bottleneck</span>
                  </div>
                  <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-primary)]">
                    <GitBranch className="w-4 h-4 text-[var(--accent)]" />
                    <span>Architectural Constraints</span>
                  </div>
                  <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                    {project.constraint}
                  </p>
                </div>
              </div>
            </section>

            {/* 02. Architecture & System Topology */}
            <section id="topology" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  02 / SYSTEM TOPOLOGY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  {project.architecture.flowTitle}
                </h2>
              </div>

              <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-6">
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.architecture.description}
                </p>

                {/* Node Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {project.architecture.nodes.map((node) => (
                    <div
                      key={node.id}
                      className="p-4 rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--raised)] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                        <span>NODE 0{node.id}</span>
                        <span className="uppercase text-[var(--accent)] font-medium">
                          {node.type ?? 'process'}
                        </span>
                      </div>
                      <div className="font-bold text-[var(--text-primary)]">{node.label}</div>
                      {node.sub && (
                        <div className="text-[11px] text-[var(--text-muted)]">{node.sub}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[var(--background)] border border-[var(--hairline)] rounded-[var(--radius)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Circuit Breakers: Zero Single-Point-of-Failure</span>
                  <span className="text-[var(--accent)]">Static Invariant Verification Passed</span>
                </div>
              </div>
            </section>

            {/* 03. Key Decisions & Trade-Offs */}
            <section id="decisions" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  03 / KEY DECISIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Architectural Decisions & Trade-Offs
                </h2>
              </div>

              <div className="space-y-4">
                {project.keyDecisions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div className="font-sans font-medium text-sm sm:text-base text-[var(--text-primary)]">
                        {item.decision}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] pl-6 leading-relaxed">
                      <strong>Rationale:</strong> {item.why}
                    </p>

                    <div className="pl-6 pt-3 border-t border-[var(--hairline)] font-mono text-xs space-y-1">
                      <div className="text-[var(--accent)] font-medium">
                        Rejected Alternative: {item.rejectedAlternative}
                      </div>
                      <div className="text-[var(--text-muted)] text-[11px]">
                        <strong>Why Rejected:</strong> {item.rejectionReason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Evaluation Matrix */}
            <section id="evaluation" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  04 / BENCHMARKS & EVALUATION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Empirical Results vs. Baselines
                </h2>
              </div>

              <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--hairline)] bg-[var(--surface)]">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead className="bg-[var(--raised)] border-b border-[var(--hairline)] text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Evaluation Metric</th>
                      <th className="p-4">Our Implementation</th>
                      <th className="p-4">Baseline System</th>
                      <th className="p-4">Delta Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--hairline)] text-[var(--text-muted)]">
                    {project.evaluation.map((evalItem, idx) => (
                      <tr key={idx} className="hover:bg-[var(--raised)] transition-colors">
                        <td className="p-4 font-bold text-[var(--text-primary)]">
                          {evalItem.metric}
                        </td>
                        <td className="p-4 text-[var(--accent)] font-semibold">
                          {evalItem.ours}
                        </td>
                        <td className="p-4 text-[var(--text-muted)]">{evalItem.baseline}</td>
                        <td className="p-4 font-medium text-[var(--text-primary)]">
                          {evalItem.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="font-mono text-[11px] text-[var(--text-muted)] pt-1">
                Method line: Rigorous synthetic test harness with zero prompt leakage. Evaluated across 500+ trial runs with reproducible seed logging.
              </p>
            </section>

            {/* 05. Cost & Latency Budget */}
            <section id="economics" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  05 / ECONOMICS & LATENCY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Cost & Latency Breakdown
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">Training Cost</div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {project.costAndLatency.trainingCost}
                  </div>
                </div>
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">Inference Cost</div>
                  <div className="font-bold text-[var(--accent)]">
                    {project.costAndLatency.inferenceCost}
                  </div>
                </div>
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">P50 Latency</div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {project.costAndLatency.p50Latency}
                  </div>
                </div>
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">P99 Latency</div>
                  <div className="font-bold text-[var(--text-primary)]">
                    {project.costAndLatency.p99Latency}
                  </div>
                </div>
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">TTFT</div>
                  <div className="font-bold text-[var(--accent)]">
                    {project.costAndLatency.ttft}
                  </div>
                </div>
                <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] text-center space-y-1">
                  <div className="text-[10px] uppercase text-[var(--text-muted)]">Cost Savings</div>
                  <div className="font-bold text-[var(--accent)]">
                    {project.costAndLatency.costSavings}
                  </div>
                </div>
              </div>
            </section>

            {/* 06. Failure Modes & Production Lessons */}
            <section id="failures" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  06 / PRODUCTION LESSONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Edge Cases & How We Fixed What Broke
                </h2>
              </div>

              <div className="space-y-4">
                {project.failureModes.map((fm, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)] space-y-2 border-l-2 border-l-[var(--accent)]"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                      <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
                      <span>Incident: {fm.failure}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] pl-6 leading-relaxed">
                      <strong>Root Cause:</strong> {fm.rootCause}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-primary)] pl-6 leading-relaxed">
                      <strong>Resolution:</strong> {fm.resolution}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 07. Roadmap & Next Steps */}
            <section id="roadmap" className="space-y-6 scroll-mt-24">
              <div className="space-y-1 pb-4 border-b border-[var(--hairline)]">
                <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
                  07 / ROADMAP
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-normal">
                  Next Steps & Milestones
                </h2>
              </div>

              <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--hairline)]">
                <ul className="space-y-3 font-sans text-xs sm:text-sm text-[var(--text-muted)]">
                  {project.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Bottom Project Navigator */}
            <div className="pt-12 border-t border-[var(--hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              {prevProject ? (
                <NextLink
                  href={`/work/${prevProject.slug}`}
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="truncate max-w-[240px]">Previous: {prevProject.title}</span>
                </NextLink>
              ) : (
                <div />
              )}

              {nextProject && (
                <NextLink
                  href={`/work/${nextProject.slug}`}
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors ml-auto"
                >
                  <span className="truncate max-w-[240px]">Next: {nextProject.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </NextLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
