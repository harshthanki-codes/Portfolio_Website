import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getProjectBySlug, getAllProjects, ProjectData } from '@/data/projects';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Clock,
  Cpu,
  Layers,
  ShieldAlert,
  CheckCircle2,
  DollarSign,
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
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Harsh Thanki`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.resultHeadline,
      type: 'article',
      url: `https://harshthanki-codes.github.io/Portfolio_Website/work/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
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
      jobTitle: 'AI Solutions Engineer & Systems Architect',
    },
    about: project.tags,
    datePublished: '2026-10-01',
  };

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border)] font-mono text-xs text-[var(--text-tertiary)]">
        <NextLink
          href="/#work"
          className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case Studies</span>
        </NextLink>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.readingTime}</span>
        </div>
      </div>

      {/* Case Study Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((cat) => (
            <Tag key={cat} variant="default" size="sm">
              {cat}
            </Tag>
          ))}
          <Tag variant="accent" size="sm">
            {project.status}
          </Tag>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        {/* Result Headline Banner */}
        <div className="p-5 bg-[var(--surface-raised)] border-l-4 border-l-[var(--accent)] border border-[var(--border)] rounded-[var(--radius-xs)] space-y-1">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Verified Result Headline
          </div>
          <div className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            {project.resultHeadline}
          </div>
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <Tag key={tech} variant="default" size="sm">
              {tech}
            </Tag>
          ))}
        </div>
      </header>

      {/* 01. The Problem & System Constraints */}
      <section className="space-y-6">
        <SectionHeading
          number="01"
          tag="PROBLEM & CONSTRAINTS"
          title="The Technical Challenge"
          subtitle="Real enterprise limitations, legacy constraints, and boundary conditions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="raised" className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent)]">
              <AlertCircle className="w-4 h-4" />
              <span>Core Operational Bottleneck</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </Card>

          <Card variant="raised" className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Architectural Constraints</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.constraint}
            </p>
          </Card>
        </div>
      </section>

      {/* 02. Architecture Diagram (SVG Component + Static Fallback) */}
      <section className="space-y-6">
        <SectionHeading
          number="02"
          tag="SYSTEM TOPOLOGY"
          title={project.architecture.flowTitle}
          subtitle="End-to-end data flow, ingestion queues, model routing, and verification stages."
        />

        <Card variant="default" showCrosshairs className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.architecture.description}
          </p>

          {/* Structured Node Topology Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {project.architecture.nodes.map((node) => (
              <div
                key={node.id}
                className={`p-3.5 rounded-[var(--radius-xs)] border ${
                  node.type === 'fallback'
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : node.type === 'output'
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-[var(--border)] bg-[var(--surface-raised)]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
                  <span>NODE 0{node.id}</span>
                  <span className="uppercase text-[var(--accent)] font-semibold">{node.type}</span>
                </div>
                <div className="font-bold text-[var(--text-primary)]">{node.label}</div>
                {node.sub && (
                  <div className="text-[11px] text-[var(--text-secondary)] mt-1">{node.sub}</div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-xs)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
            <span>Circuit Breakers: Zero Single-Point-of-Failure</span>
            <span>Static Invariant Verification Passed</span>
          </div>
        </Card>
      </section>

      {/* 03. Key Decisions & Rejected Alternatives */}
      <section className="space-y-6">
        <SectionHeading
          number="03"
          tag="ENGINEERING DECISIONS"
          title="Key Architectural Decisions & Trade-Offs"
          subtitle="Why specific choices were made and why common alternatives were rejected."
        />

        <div className="space-y-4">
          {project.keyDecisions.map((item, idx) => (
            <Card key={idx} variant="raised" className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Decision: {item.decision}</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] pl-6">
                <strong>Rationale:</strong> {item.why}
              </p>

              <div className="pl-6 pt-2 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--text-tertiary)] space-y-1">
                <div className="text-amber-400 font-semibold">
                  Rejected Alternative: {item.rejectedAlternative}
                </div>
                <div>
                  <strong>Reason for Rejection:</strong> {item.rejectionReason}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 04. Evaluation Matrix vs Baseline */}
      <section className="space-y-6">
        <SectionHeading
          number="04"
          tag="BENCHMARKS & EVALUATION"
          title="Empirical Evaluation vs. Frontier Baseline"
          subtitle="Formal testing on ground truth datasets with exact deltas."
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border border-[var(--border)] rounded-[var(--radius-sm)] overflow-hidden">
            <thead className="bg-[var(--surface-raised)] border-b border-[var(--border)] text-[var(--text-tertiary)] uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Evaluation Metric</th>
                <th className="p-3.5">Our Implementation</th>
                <th className="p-3.5">Baseline Model / System</th>
                <th className="p-3.5">Delta Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]">
              {project.evaluation.map((evalItem, idx) => (
                <tr key={idx} className="hover:bg-[var(--surface-raised)] transition-colors">
                  <td className="p-3.5 font-bold text-[var(--text-primary)]">
                    {evalItem.metric}
                  </td>
                  <td className="p-3.5 text-emerald-400 font-semibold">{evalItem.ours}</td>
                  <td className="p-3.5 text-[var(--text-tertiary)]">{evalItem.baseline}</td>
                  <td className="p-3.5 text-[var(--accent)] font-semibold">{evalItem.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05. Cost and Latency Budget Breakdown */}
      <section className="space-y-6">
        <SectionHeading
          number="05"
          tag="ECONOMICS & LATENCY"
          title="Cost & Latency Budget"
          subtitle="Quantified resource expenditures, time-to-first-token (TTFT), and cloud cost avoidance."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">Training Cost</div>
            <div className="font-bold text-[var(--text-primary)]">{project.costAndLatency.trainingCost}</div>
          </Card>
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">Inference Cost</div>
            <div className="font-bold text-emerald-400">{project.costAndLatency.inferenceCost}</div>
          </Card>
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">P50 Latency</div>
            <div className="font-bold text-[var(--accent)]">{project.costAndLatency.p50Latency}</div>
          </Card>
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">P99 Latency</div>
            <div className="font-bold text-[var(--text-primary)]">{project.costAndLatency.p99Latency}</div>
          </Card>
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">TTFT</div>
            <div className="font-bold text-[var(--accent)]">{project.costAndLatency.ttft}</div>
          </Card>
          <Card variant="raised" className="p-4 space-y-1 text-center">
            <div className="text-[10px] uppercase text-[var(--text-tertiary)]">Cost Savings</div>
            <div className="font-bold text-emerald-400">{project.costAndLatency.costSavings}</div>
          </Card>
        </div>
      </section>

      {/* 06. Failure Modes and Production Lessons Learned */}
      <section className="space-y-6">
        <SectionHeading
          number="06"
          tag="FAILURE MODES"
          title="Edge Cases & Production Lessons"
          subtitle="Real failure modes encountered during load testing and how they were remediated."
        />

        <div className="space-y-4">
          {project.failureModes.map((fm, idx) => (
            <Card key={idx} variant="default" className="p-6 space-y-2 border-l-4 border-l-red-500/70">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Incident / Failure: {fm.failure}</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] pl-6">
                <strong>Root Cause:</strong> {fm.rootCause}
              </p>
              <p className="text-xs sm:text-sm text-emerald-400 pl-6">
                <strong>Architectural Resolution:</strong> {fm.resolution}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 07. Next Steps & Roadmap */}
      <section className="space-y-6">
        <SectionHeading
          number="07"
          tag="NEXT STEPS"
          title="Future Architectural Roadmap"
          subtitle="Planned optimizations and next development milestones."
        />

        <Card variant="raised" className="p-6">
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
            {project.nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Bottom Project Navigator */}
      <div className="pt-12 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        {prevProject ? (
          <NextLink
            href={`/work/${prevProject.slug}`}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: {prevProject.title.slice(0, 30)}...</span>
          </NextLink>
        ) : (
          <div />
        )}

        {nextProject && (
          <NextLink
            href={`/work/${nextProject.slug}`}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] ml-auto"
          >
            <span>Next: {nextProject.title.slice(0, 30)}...</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        )}
      </div>
    </article>
  );
}
