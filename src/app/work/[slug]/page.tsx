import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const params: { slug: string }[] = [];
  projects.forEach((p) => {
    params.push({ slug: p.slug });
    if (p.aliases) {
      p.aliases.forEach((alias) => params.push({ slug: alias }));
    }
  });
  return params;
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | Harsh Thanki' };

  return {
    title: `${project.title} | Harsh Thanki`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex(
    (p) => p.slug === project.slug || (p.aliases && p.aliases.includes(project.slug))
  );
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="min-h-screen bg-[#F7F5F2] text-[#16161D]">
      {/* 1. INK HEADER: with 3 Headline Numbers */}
      <Section
        tone="ink"
        className="py-16 sm:py-24 border-b border-[#2D2D38] bg-[#16161D]"
      >
        <Container className="space-y-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between font-mono text-xs text-[#B9B9C4] border-b border-[#2D2D38] pb-4">
            <NextLink
              href="/#work"
              className="text-[#F7F5F2] hover:text-[#FF5A36] transition-colors inline-flex items-center gap-2"
            >
              <span>← Back to Work</span>
            </NextLink>
            <div className="flex items-center gap-4">
              <span>{project.readingTime}</span>
              <span>·</span>
              <span className="text-[#FF5A36] font-bold">{project.status}</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-4 max-w-[62ch]">
            <Label tone="coral">{project.tag}</Label>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F7F5F2] tracking-tight leading-[0.96]">
              {project.title}
            </h1>
            <p className="font-body text-lg sm:text-xl text-[#B9B9C4] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* 3 Headline Numbers Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#2D2D38]">
            {project.headlineNumbers.map((hn, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-wider text-[#B9B9C4]">
                  {hn.label}
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#FF5A36]">
                  {hn.value}
                </div>
              </div>
            ))}
          </div>

          {/* Stack Badges & GitHub Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2D2D38] font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#B9B9C4] mr-1">STACK:</span>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-[#16161D] border border-[#2D2D38] text-[#F7F5F2]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7F5F2] hover:text-[#FF5A36] underline decoration-1 underline-offset-4"
              >
                GitHub Repository ↗
              </a>
            )}
          </div>
        </Container>
      </Section>

      {/* 2. PAPER BODY: Editorial Narrative Max 62ch */}
      <Section tone="paper" className="py-16 sm:py-24 bg-[#F7F5F2]">
        <Container className="space-y-16 max-w-4xl">
          {/* Section: The Problem */}
          <section className="space-y-4">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">01 // THE PROBLEM</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                Problem Context & Hard Constraints
              </h2>
            </div>
            <p className="font-body text-lg text-[#16161D] leading-relaxed max-w-[62ch]">
              {project.problem}
            </p>
          </section>

          {/* Section: How It Works + Simple Inline SVG Diagram */}
          <section className="space-y-6">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">02 // ARCHITECTURE</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                How It Works
              </h2>
            </div>
            <p className="font-body text-base text-[#16161D] leading-relaxed max-w-[62ch]">
              {project.howItWorks.description}
            </p>

            {/* Simple Inline SVG Technical Diagram */}
            <div className="border border-[#16161D] p-6 bg-[#E8E3DC] overflow-x-auto">
              <div className="font-mono text-xs uppercase tracking-wider text-[#55555F] mb-4">
                SYSTEM TOPOLOGY SCHEMATIC
              </div>
              <svg
                viewBox="0 0 760 140"
                className="w-full min-w-[640px] h-auto font-mono text-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Node 1: Ingestion */}
                <rect x="10" y="35" width="160" height="70" fill="#F7F5F2" stroke="#16161D" strokeWidth="2" />
                <text x="90" y="65" textAnchor="middle" fill="#16161D" fontWeight="bold">RAW DATA / CORPUS</text>
                <text x="90" y="85" textAnchor="middle" fill="#55555F" fontSize="10">150 MB Ingestion</text>

                {/* Arrow 1 */}
                <line x1="170" y1="70" x2="215" y2="70" stroke="#16161D" strokeWidth="2" />
                <polygon points="215,66 225,70 215,74" fill="#16161D" />

                {/* Node 2: Pipeline */}
                <rect x="225" y="35" width="160" height="70" fill="#F7F5F2" stroke="#16161D" strokeWidth="2" />
                <text x="305" y="65" textAnchor="middle" fill="#16161D" fontWeight="bold">LOCAL FINE-TUNING</text>
                <text x="305" y="85" textAnchor="middle" fill="#55555F" fontSize="10">QLoRA 4-bit / GPU</text>

                {/* Arrow 2 */}
                <line x1="385" y1="70" x2="430" y2="70" stroke="#16161D" strokeWidth="2" />
                <polygon points="430,66 440,70 430,74" fill="#16161D" />

                {/* Node 3: Quantization */}
                <rect x="440" y="35" width="140" height="70" fill="#F7F5F2" stroke="#16161D" strokeWidth="2" />
                <text x="510" y="65" textAnchor="middle" fill="#16161D" fontWeight="bold">GGUF RUNTIME</text>
                <text x="510" y="85" textAnchor="middle" fill="#55555F" fontSize="10">Air-Gapped Node</text>

                {/* Arrow 3 */}
                <line x1="580" y1="70" x2="625" y2="70" stroke="#16161D" strokeWidth="2" />
                <polygon points="625,66 635,70 625,74" fill="#16161D" />

                {/* Node 4: Verified Output */}
                <rect x="635" y="35" width="115" height="70" fill="#FF5A36" stroke="#16161D" strokeWidth="2" />
                <text x="692" y="65" textAnchor="middle" fill="#16161D" fontWeight="bold">VERIFIED</text>
                <text x="692" y="85" textAnchor="middle" fill="#16161D" fontSize="10">$0 Marginal Cost</text>
              </svg>
            </div>
          </section>

          {/* Section: Decisions I Made (each with "Rejected:" line) */}
          <section className="space-y-6">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">03 // DECISIONS & REJECTIONS</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                Architectural Decisions
              </h2>
            </div>

            <div className="space-y-4">
              {project.decisions.map((d, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-[#16161D] bg-[#E8E3DC] space-y-3"
                >
                  <div className="font-display font-bold text-lg text-[#16161D]">
                    Decision 0{idx + 1}: {d.decision}
                  </div>
                  <p className="font-body text-sm text-[#16161D]/85 leading-relaxed max-w-[62ch]">
                    <strong>Rationale:</strong> {d.why}
                  </p>
                  <div className="pt-3 border-t border-[#16161D]/20 font-mono text-xs space-y-1">
                    <div className="text-[#16161D]">
                      <strong>Rejected:</strong> {d.rejectedAlternative}
                    </div>
                    <div className="text-[#55555F]">
                      <strong>Reason for Rejection:</strong> {d.rejectionReason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Results Table (Mine vs Baseline vs Delta) */}
          <section className="space-y-4">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">04 // RESULTS</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                Evaluation Benchmarks
              </h2>
            </div>

            <div className="overflow-x-auto border border-[#16161D]">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead className="bg-[#16161D] text-[#F7F5F2] uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="p-4">Evaluation Metric</th>
                    <th className="p-4">My Implementation</th>
                    <th className="p-4">Baseline Reference</th>
                    <th className="p-4">Honest Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DC] bg-white text-[#16161D]">
                  {project.results.map((r, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F5F2] transition-colors">
                      <td className="p-4 font-bold">{r.metric}</td>
                      <td className="p-4 font-bold text-[#16161D]">{r.mine}</td>
                      <td className="p-4 text-[#55555F]">{r.baseline}</td>
                      <td className="p-4 font-semibold text-[#16161D]">{r.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-mono text-xs text-[#55555F] pt-1">
              {project.resultsMethod}
            </p>
          </section>

          {/* Section: What Went Wrong */}
          <section className="space-y-4">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">05 // POSTMORTEMS</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                What Went Wrong
              </h2>
            </div>

            <div className="space-y-4">
              {project.whatWentWrong.map((f, idx) => (
                <div
                  key={idx}
                  className="p-6 border-2 border-[#16161D] bg-[#E8E3DC] text-[#16161D] space-y-2"
                >
                  <div className="font-mono text-xs font-bold uppercase tracking-wider">
                    INCIDENT 0{idx + 1}: {f.failure}
                  </div>
                  <p className="font-body text-sm leading-relaxed max-w-[62ch]">
                    <strong>Root Cause:</strong> {f.rootCause}
                  </p>
                  <p className="font-body text-sm font-bold pt-2 border-t border-[#16161D]/20 leading-relaxed max-w-[62ch]">
                    <strong>Resolution:</strong> {f.resolution}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: What I Would Do Next */}
          <section className="space-y-4">
            <div className="border-b border-[#E8E3DC] pb-3">
              <Label tone="muted">06 // ROADMAP</Label>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#16161D]">
                What I Would Do Next
              </h2>
            </div>

            <ul className="space-y-3 font-body text-base text-[#16161D]">
              {project.whatNext.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono font-bold text-[#FF5A36]">›</span>
                  <span className="leading-relaxed max-w-[62ch]">{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom Navigation */}
          <div className="pt-10 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <NextLink
              href="/#work"
              className="text-[#16161D] hover:text-[#55555F] font-bold"
            >
              ← Back to Selected Work
            </NextLink>

            <NextLink
              href={`/work/${nextProject.slug}`}
              className="text-[#16161D] hover:text-[#55555F] font-bold"
            >
              Next Project: {nextProject.title} →
            </NextLink>
          </div>
        </Container>
      </Section>
    </article>
  );
}
