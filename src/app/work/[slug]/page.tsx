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

      {/* 1. BLUE HEADER (Ground #1237D1) with 3 Result Numbers */}
      <header className="bg-[#1237D1] text-white border-b border-[#6C84EE] bg-blueprint-grid py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-10">
          {/* Top Breadcrumb & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#6C84EE]/60 font-mono text-xs text-[#BCC5F7]">
            <NextLink
              href="/#work"
              className="inline-flex items-center gap-2 text-white hover:text-[#FFE45C] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Selected Work</span>
            </NextLink>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFE45C]" />
                <span>{project.readingTime}</span>
              </span>
              <span className="text-[#6C84EE]">|</span>
              <span className="text-[#FFE45C] font-semibold">{project.status}</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 border border-[#6C84EE] bg-[#0C2699] text-[11px] font-mono text-[#BCC5F7] uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.035em] leading-[0.96] text-white">
              {project.title}
            </h1>

            <p className="font-body text-base sm:text-lg text-[#BCC5F7] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* 3 Result Numbers Strip in Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-[#6C84EE] bg-[#0C2699] p-6">
            {headerMetrics.map((hm, idx) => (
              <div key={idx} className="space-y-1 border-b sm:border-b-0 sm:border-r border-[#6C84EE]/50 last:border-none pb-4 sm:pb-0 pr-0 sm:pr-4">
                <div className="font-mono text-[10px] text-[#BCC5F7] uppercase tracking-wider">
                  RESULT 0{idx + 1} // {hm.label}
                </div>
                <div className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
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
                  className="px-2 py-0.5 border border-[#6C84EE]/60 bg-[#1237D1] text-[11px] text-[#BCC5F7]"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#6C84EE] bg-[#0C2699] text-white hover:border-[#FFE45C] hover:text-[#FFE45C] transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#BCC5F7]" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#6C84EE] bg-[#0C2699] text-white hover:border-[#FFE45C] hover:text-[#FFE45C] transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3 text-[#BCC5F7]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. PAPER BODY (#F3F5FF, text #0A1450) */}
      <div className="bg-[#F3F5FF] text-[#0A1450] py-16 sm:py-24 px-4 sm:px-6 bg-blueprint-paper">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Sticky Sidebar (3 cols) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
              <CaseStudyToc />

              <div className="p-4 border border-[#6C84EE] bg-white font-mono text-xs space-y-2">
                <div className="font-bold text-[#1237D1] uppercase">REPRODUCIBILITY</div>
                <p className="text-[#0A1450]/80 text-[11px] leading-relaxed">
                  Evaluated on consumer Linux/CUDA hardware with zero proprietary weights. Test seed logs and evaluation datasets run air-gapped.
                </p>
              </div>
            </aside>

            {/* Main Sections (9 cols) */}
            <div className="lg:col-span-9 space-y-16">
              {/* 01. Problem & System Constraints */}
              <section id="problem" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    01 // THE TECHNICAL CHALLENGE
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    Problem & System Constraints
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-[#6C84EE] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1237D1] uppercase">
                      <AlertTriangle className="w-4 h-4 text-[#1237D1]" />
                      <span>Operational Bottleneck</span>
                    </div>
                    <p className="font-body text-sm text-[#0A1450]/85 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-6 border border-[#6C84EE] bg-white space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1237D1] uppercase">
                      <GitBranch className="w-4 h-4 text-[#1237D1]" />
                      <span>Architectural Constraints</span>
                    </div>
                    <p className="font-body text-sm text-[#0A1450]/85 leading-relaxed">
                      {project.constraint}
                    </p>
                  </div>
                </div>
              </section>

              {/* 02. Flow Diagram */}
              <section id="topology" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    02 // SYSTEM TOPOLOGY & FLOW
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    {project.architecture.flowTitle}
                  </h2>
                </div>

                <div className="p-6 border border-[#6C84EE] bg-white space-y-6">
                  <p className="font-body text-sm text-[#0A1450]/85 leading-relaxed">
                    {project.architecture.description}
                  </p>

                  {/* Flow Diagram (bordered boxes with arrows, final outlined in yellow) */}
                  <div className="p-4 border border-[#6C84EE] bg-[#F3F5FF] space-y-3">
                    <div className="font-mono text-[10px] text-[#0A1450]/70 uppercase tracking-wider">
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
                                  ? 'border-[#0A1450] bg-[#FFE45C] text-[#0A1450] font-bold shadow-sm'
                                  : 'border-[#6C84EE] bg-white text-[#0A1450]'
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
                              <ArrowRight className="w-4 h-4 text-[#1237D1] shrink-0" />
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
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    03 // ARCHITECTURAL DECISIONS & TRADE-OFFS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    Key Decisions & Rejected Alternatives
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.keyDecisions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-[#6C84EE] bg-white space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1237D1] shrink-0 mt-0.5" />
                        <div className="font-headline font-bold text-base text-[#0A1450]">
                          Decision: {item.decision}
                        </div>
                      </div>

                      <p className="font-body text-sm text-[#0A1450]/85 pl-6 leading-relaxed">
                        <strong>Rationale:</strong> {item.why}
                      </p>

                      {/* Explicit "Rejected:" Line */}
                      <div className="pl-6 pt-3 border-t border-[#6C84EE]/30 font-mono text-xs space-y-1 text-[#0A1450]">
                        <div>
                          <strong className="text-[#1237D1]">Rejected:</strong> {item.rejectedAlternative}
                        </div>
                        <div className="text-[#0A1450]/80 text-[11px]">
                          <strong>Reason for Rejection:</strong> {item.rejectionReason}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 04. Results Table with a "Difference" Column */}
              <section id="evaluation" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    04 // EMPIRICAL BENCHMARKS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    Evaluation Matrix vs. Baseline
                  </h2>
                </div>

                <div className="overflow-x-auto border border-[#6C84EE] bg-white">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead className="bg-[#1237D1] text-white border-b border-[#6C84EE] uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3.5">Evaluation Metric</th>
                        <th className="p-3.5">Our Implementation</th>
                        <th className="p-3.5">Baseline System</th>
                        <th className="p-3.5">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6C84EE]/30 text-[#0A1450]">
                      {project.evaluation.map((evalItem, idx) => (
                        <tr key={idx} className="hover:bg-[#F3F5FF] transition-colors">
                          <td className="p-3.5 font-bold text-[#0A1450]">
                            {evalItem.metric}
                          </td>
                          <td className="p-3.5 text-[#1237D1] font-bold">
                            {evalItem.ours}
                          </td>
                          <td className="p-3.5 text-[#0A1450]/70">
                            {evalItem.baseline}
                          </td>
                          <td className="p-3.5 font-bold text-[#0A1450]">
                            {evalItem.delta}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-mono text-[11px] text-[#0A1450]/70 pt-1">
                  [METHOD] Formal automated test harness evaluated across 500+ trial runs with reproducible seed logging and zero prompt leakage.
                </p>
              </section>

              {/* 05. Cost & Latency Budget */}
              <section id="economics" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    05 // RESOURCE EXPENDITURES
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    Cost & Latency Breakdown
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">Training Cost</div>
                    <div className="font-bold text-[#0A1450]">{project.costAndLatency.trainingCost}</div>
                  </div>
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">Inference Cost</div>
                    <div className="font-bold text-[#1237D1]">{project.costAndLatency.inferenceCost}</div>
                  </div>
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">P50 Latency</div>
                    <div className="font-bold text-[#0A1450]">{project.costAndLatency.p50Latency}</div>
                  </div>
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">P99 Latency</div>
                    <div className="font-bold text-[#0A1450]">{project.costAndLatency.p99Latency}</div>
                  </div>
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">TTFT</div>
                    <div className="font-bold text-[#1237D1]">{project.costAndLatency.ttft}</div>
                  </div>
                  <div className="p-4 border border-[#6C84EE] bg-white text-center space-y-1">
                    <div className="text-[10px] uppercase text-[#0A1450]/70">Cost Savings</div>
                    <div className="font-bold text-[#1237D1]">{project.costAndLatency.costSavings}</div>
                  </div>
                </div>
              </section>

              {/* 06. WHAT BROKE IN YELLOW CARDS */}
              <section id="failures" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    06 // PRODUCTION POSTMORTEMS
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    What Broke & Production Lessons
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.failureModes.map((fm, idx) => (
                    <div
                      key={idx}
                      className="p-6 border-2 border-[#0A1450] bg-[#FFE45C] text-[#0A1450] space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase">
                        <AlertTriangle className="w-4 h-4 text-[#0A1450] shrink-0" />
                        <span>INCIDENT: {fm.failure}</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-[#0A1450]/90 pl-6 leading-relaxed">
                        <strong>Root Cause:</strong> {fm.rootCause}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-[#0A1450] font-bold pl-6 leading-relaxed border-t border-[#0A1450]/20 pt-2">
                        <strong>Architectural Resolution:</strong> {fm.resolution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 07. Next Steps */}
              <section id="roadmap" className="space-y-6 scroll-mt-24">
                <div className="space-y-1 pb-4 border-b border-[#6C84EE]/50">
                  <span className="font-mono text-xs text-[#1237D1] uppercase font-bold tracking-wider">
                    07 // NEXT STEPS & MILESTONES
                  </span>
                  <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#0A1450] tracking-tight">
                    Future Architectural Roadmap
                  </h2>
                </div>

                <div className="p-6 border border-[#6C84EE] bg-white">
                  <ul className="space-y-3 font-body text-sm text-[#0A1450]">
                    {project.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-[#1237D1] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Bottom Project Navigator */}
              <div className="pt-8 border-t border-[#6C84EE]/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                {prevProject ? (
                  <NextLink
                    href={`/work/${prevProject.slug}`}
                    className="flex items-center gap-2 text-[#0A1450] hover:text-[#1237D1] font-bold"
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
                    className="flex items-center gap-2 text-[#0A1450] hover:text-[#1237D1] font-bold ml-auto"
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
