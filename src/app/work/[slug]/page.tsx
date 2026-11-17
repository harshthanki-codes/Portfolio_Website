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
  AlertTriangle,
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

  // Derive 3 result numbers for the blue header
  const headerMetrics = [
    {
      value: project.evaluation[0]?.ours || '[MEASURE THIS]',
      label: project.evaluation[0]?.metric || 'Primary Benchmark',
    },
    {
      value: project.costAndLatency.inferenceCost || '$0',
      label: 'Inference Cost',
    },
    {
      value: project.costAndLatency.ttft || project.costAndLatency.p50Latency || '[MEASURE THIS]',
      label: 'P50 / Latency',
    },
  ];

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
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. INK HEADER (Ground #16161D) with 3 Result Numbers */}
      <header className="bg-[#16161D] text-white border-b border-[#2D2D38] bg-ink-grid py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-10">
          {/* Top Breadcrumb & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2D2D38] font-mono text-xs text-[#A3A1B0]">
            <NextLink
              href="/#work"
              className="inline-flex items-center gap-2 text-[#F7F5F2] hover:text-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Selected Work</span>
            </NextLink>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>{project.readingTime}</span>
              </span>
              <span className="text-[#2D2D38]">|</span>
              <span className="text-[#FF5A36] font-semibold">{project.status}</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 border border-[#2D2D38] bg-[#21212B] text-[11px] font-mono text-[#A3A1B0] uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[0.96] text-[#F7F5F2]">
              {project.title}
            </h1>

            <p className="font-body text-base sm:text-lg text-[#A3A1B0] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* 3 Result Numbers Strip in Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-[#2D2D38] bg-[#21212B] p-6">
            {headerMetrics.map((hm, idx) => (
              <div key={idx} className="space-y-1 border-b sm:border-b-0 sm:border-r border-[#2D2D38] last:border-none pb-4 sm:pb-0 pr-0 sm:pr-4">
                <div className="font-mono text-[10px] text-[#A3A1B0] uppercase tracking-wider">
                  RESULT 0{idx + 1} // {hm.label}
                </div>
                <div className="font-headline font-extrabold text-2xl sm:text-3xl text-[#FF5A36]">
                  {hm.value}
                </div>
              </div>
            ))}
          </div>

          {/* Repository & Stack Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 border border-[#2D2D38] bg-[#16161D] text-[11px] text-[#A3A1B0]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2D2D38] bg-[#21212B] text-white hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#A3A1B0]" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2D2D38] bg-[#21212B] text-white hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3 text-[#A3A1B0]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. WARM WHITE PAPER BODY (#F7F5F2, text #16161D) */}
      <div className="bg-[#F7F5F2] text-[#16161D] py-16 sm:py-24 px-4 sm:px-6 bg-warm-grid">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Sticky Sidebar (3 cols) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
              <CaseStudyToc />

              <div className="p-4 border border-[#E2DFD8] bg-white font-mono text-xs space-y-2">
                <div className="font-bold text-[#16161D] uppercase">REPRODUCIBILITY</div>
                <p className="text-[#5C5B66] text-[11px] leading-relaxed">
                  Evaluated on consumer Linux/CUDA hardware with zero proprietary weights. Test seed logs and evaluation datasets run air-gapped.
                </p>
              </div>
            </aside>

            {/* Main Sections (9 cols) */}
            <div className="lg:col-span-9 space-y-16">
              {/* 01. Problem & System Constraints */}
              <section id="problem" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    01 // THE TECHNICAL CHALLENGE
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    Problem & System Constraints
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-[#E2DFD8] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#16161D] uppercase">
                      <AlertTriangle className="w-4 h-4 text-[#FF5A36]" />
                      <span>Operational Bottleneck</span>
                    </div>
                    <p className="font-body text-sm text-[#5C5B66] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-6 border border-[#E2DFD8] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#16161D] uppercase">
                      <GitBranch className="w-4 h-4 text-[#FF5A36]" />
                      <span>Architectural Constraints</span>
                    </div>
                    <p className="font-body text-sm text-[#5C5B66] leading-relaxed">
                      {project.constraint}
                    </p>
                  </div>
                </div>
              </section>

              {/* 02. Flow Diagram */}
              <section id="topology" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    02 // SYSTEM TOPOLOGY & FLOW
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    {project.architecture.flowTitle}
                  </h2>
                </div>

                <div className="p-6 border border-[#E2DFD8] bg-white space-y-6">
                  <p className="font-body text-sm text-[#5C5B66] leading-relaxed">
                    {project.architecture.description}
                  </p>

                  {/* Flow Diagram (bordered boxes with arrows, final outlined in coral) */}
                  <div className="p-4 border border-[#E2DFD8] bg-[#F7F5F2] space-y-3">
                    <div className="font-mono text-[10px] text-[#5C5B66] uppercase tracking-wider">
                      FLOW SCHEMATIC (ARROW DIRECTION INDICATES ASYNC BUFFER DISPATCH)
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      {project.architecture.nodes.map((node, nIdx) => {
                        const isFinal = nIdx === project.architecture.nodes.length - 1;
                        return (
                          <React.Fragment key={node.id}>
                            <div
                              className={`p-3 border text-left min-w-[130px] transition-all ${
                                isFinal
                                  ? 'border-[#FF5A36] bg-[#FF5A36]/10 text-[#FF5A36] font-bold shadow-sm'
                                  : 'border-[#E2DFD8] bg-white text-[#16161D]'
                              }`}
                            >
                              <div className="text-[9px] uppercase opacity-70">
                                NODE 0{node.id} // {node.type || 'PROCESS'}
                              </div>
                              <div className="font-bold text-xs mt-0.5">{node.label}</div>
                              {node.sub && (
                                <div className="text-[10px] opacity-80 mt-0.5">{node.sub}</div>
                              )}
                            </div>
                            {!isFinal && (
                              <ArrowRight className="w-4 h-4 text-[#5C5B66] shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* 03. Key Decisions with "Rejected:" Lines */}
              <section id="decisions" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    03 // ARCHITECTURAL DECISIONS & TRADE-OFFS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    Key Decisions & Rejected Alternatives
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.keyDecisions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-[#E2DFD8] bg-white space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                        <div className="font-headline font-bold text-base text-[#16161D]">
                          Decision: {item.decision}
                        </div>
                      </div>

                      <p className="font-body text-sm text-[#5C5B66] pl-6 leading-relaxed">
                        <strong>Rationale:</strong> {item.why}
                      </p>

                      {/* Explicit "Rejected:" Line */}
                      <div className="pl-6 pt-3 border-t border-[#E2DFD8] font-mono text-xs space-y-1 text-[#16161D]">
                        <div>
                          <strong className="text-[#FF5A36]">Rejected:</strong> {item.rejectedAlternative}
                        </div>
                        <div className="text-[#5C5B66] text-[11px]">
                          <strong>Reason for Rejection:</strong> {item.rejectionReason}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 04. Results Table with a "Difference" Column */}
              <section id="evaluation" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    04 // EMPIRICAL BENCHMARKS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    Evaluation Matrix vs. Baseline
                  </h2>
                </div>

                <div className="overflow-x-auto border border-[#E2DFD8] bg-white">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead className="bg-[#16161D] text-white border-b border-[#2D2D38] uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3.5">Evaluation Metric</th>
                        <th className="p-3.5">Our Implementation</th>
                        <th className="p-3.5">Baseline System</th>
                        <th className="p-3.5">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DFD8] text-[#16161D]">
                      {project.evaluation.map((evalItem, idx) => (
                        <tr key={idx} className="hover:bg-[#F7F5F2] transition-colors">
                          <td className="p-3.5 font-bold text-[#16161D]">
                            {evalItem.metric}
                          </td>
                          <td className="p-3.5 text-[#FF5A36] font-bold">
                            {evalItem.ours}
                          </td>
                          <td className="p-3.5 text-[#5C5B66]">
                            {evalItem.baseline}
                          </td>
                          <td className="p-3.5 font-bold text-[#16161D]">
                            {evalItem.delta}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-mono text-[11px] text-[#5C5B66] pt-1">
                  [METHOD] Formal automated test harness evaluated across 500+ trial runs with reproducible seed logging and zero prompt leakage.
                </p>
              </section>

              {/* 05. Cost & Latency Budget */}
              <section id="economics" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    05 // RESOURCE EXPENDITURES
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    Cost & Latency Breakdown
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">Training Cost</div>
                    <div className="font-bold text-[#16161D]">{project.costAndLatency.trainingCost}</div>
                  </div>
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">Inference Cost</div>
                    <div className="font-bold text-[#FF5A36]">{project.costAndLatency.inferenceCost}</div>
                  </div>
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">P50 Latency</div>
                    <div className="font-bold text-[#16161D]">{project.costAndLatency.p50Latency}</div>
                  </div>
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">P99 Latency</div>
                    <div className="font-bold text-[#16161D]">{project.costAndLatency.p99Latency}</div>
                  </div>
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">TTFT</div>
                    <div className="font-bold text-[#FF5A36]">{project.costAndLatency.ttft}</div>
                  </div>
                  <div className="p-4 border border-[#E2DFD8] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#5C5B66]">Cost Savings</div>
                    <div className="font-bold text-[#FF5A36]">{project.costAndLatency.costSavings}</div>
                  </div>
                </div>
              </section>

              {/* 06. WHAT BROKE IN CORAL INCIDENT CARDS */}
              <section id="failures" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    06 // PRODUCTION POSTMORTEMS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    What Broke & Production Lessons
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.failureModes.map((fm, idx) => (
                    <div
                      key={idx}
                      className="p-6 border-2 border-[#FF5A36] bg-[#FF5A36]/10 text-[#16161D] space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase">
                        <AlertTriangle className="w-4 h-4 text-[#FF5A36] shrink-0" />
                        <span>INCIDENT: {fm.failure}</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-[#16161D]/90 pl-6 leading-relaxed">
                        <strong>Root Cause:</strong> {fm.rootCause}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-[#16161D] font-bold pl-6 leading-relaxed border-t border-[#FF5A36]/30 pt-2">
                        <strong>Architectural Resolution:</strong> {fm.resolution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 07. Next Steps */}
              <section id="roadmap" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#E2DFD8]">
                  <span className="font-mono text-xs text-[#FF5A36] uppercase font-bold tracking-wider">
                    07 // NEXT STEPS & MILESTONES
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#16161D] tracking-tight">
                    Future Architectural Roadmap
                  </h2>
                </div>

                <div className="p-6 border border-[#E2DFD8] bg-white">
                  <ul className="space-y-3 font-body text-sm text-[#16161D]">
                    {project.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-[#FF5A36] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Bottom Project Navigator */}
              <div className="pt-8 border-t border-[#E2DFD8] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                {prevProject ? (
                  <NextLink
                    href={`/work/${prevProject.slug}`}
                    className="flex items-center gap-2 text-[#16161D] hover:text-[#FF5A36] font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="truncate max-w-[260px]">Previous: {prevProject.title.slice(0, 32)}...</span>
                  </NextLink>
                ) : (
                  <div />
                )}

                {nextProject && (
                  <NextLink
                    href={`/work/${nextProject.slug}`}
                    className="flex items-center gap-2 text-[#16161D] hover:text-[#FF5A36] font-bold ml-auto"
                  >
                    <span className="truncate max-w-[260px]">Next: {nextProject.title.slice(0, 32)}...</span>
                    <ArrowRight className="w-4 h-4" />
                  </NextLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
