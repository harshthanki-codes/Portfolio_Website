import React, { useState, useMemo } from 'react';
import { 
  PROJECTS_DATA, 
  type ProjectData, 
  type ProjectCategory, 
  type ProjectStatus 
} from '../../data/projects';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  GitBranch,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'AI/ML',
  'ERP',
  'Automation',
  'Security',
  'Mobile',
  'DevTools',
  'LegalTech'
];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [sortBy, setSortBy] = useState<'status' | 'category'>('status');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('odoo-foundation-ai');

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...PROJECTS_DATA];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.categories.includes(selectedCategory));
    }

    if (sortBy === 'status') {
      result.sort((a, b) => a.statusWeight - b.statusWeight);
    } else {
      result.sort((a, b) => a.categories[0].localeCompare(b.categories[0]));
    }

    return result;
  }, [selectedCategory, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  const getStatusBadgeStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)] shadow-[0_0_10px_var(--accent-glow)] font-bold';
      case 'Field Testing':
        return 'bg-[rgba(245,158,11,0.12)] text-[var(--status-testing)] border-[rgba(245,158,11,0.3)] font-bold';
      case 'Complete':
        return 'bg-[rgba(16,185,129,0.12)] text-[var(--status-complete)] border-[rgba(16,185,129,0.3)] font-bold';
      default:
        return 'bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] border-[var(--border-subtle)]';
    }
  };

  return (
    <section id="projects" className="py-[var(--space-section-y)] border-t border-[var(--border-subtle)] relative" aria-labelledby="projects-heading">
      <div className="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)]">
        
        {/* Section Header with Solar Glow Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-[var(--text-xs)] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]"></span>
              <span className="font-semibold">02 // Technical Case Studies</span>
            </div>
            <h2 id="projects-heading" className="text-[var(--text-xl)] font-serif font-normal tracking-tight text-[var(--text-primary)]">
              Production Architecture &amp; <span class="gradient-text-solar font-serif italic">Case Studies</span>
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1.5 max-w-2xl font-sans">
              Real problem statements, strict operational constraints, verified failover DAGs, and empirical performance benchmarks.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] shrink-0">
            <span className="text-[var(--text-tertiary)]">Sort by:</span>
            <div className="inline-flex border border-[var(--border-subtle)] p-1 bg-[var(--bg-surface-raised)] rounded-full shadow-xs">
              <button
                type="button"
                onClick={() => setSortBy('status')}
                className={`touch-target px-3.5 py-1 text-[var(--text-xs)] rounded-full transition-all ${
                  sortBy === 'status'
                    ? 'bg-[var(--accent-gradient)] text-[var(--accent-text)] font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={sortBy === 'status'}
              >
                Status Weight
              </button>
              <button
                type="button"
                onClick={() => setSortBy('category')}
                className={`touch-target px-3.5 py-1 text-[var(--text-xs)] rounded-full transition-all ${
                  sortBy === 'category'
                    ? 'bg-[var(--accent-gradient)] text-[var(--accent-text)] font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={sortBy === 'category'}
              >
                Category
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar with Smooth Rounded Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar" role="toolbar" aria-label="Project category filters">
          <Filter className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0 mr-1" aria-hidden="true" />
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`touch-target whitespace-nowrap px-4 py-1.5 font-mono text-[var(--text-xs)] rounded-full border transition-all ${
                selectedCategory === category
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Cards Stream */}
        <div className="space-y-6">
          {filteredAndSortedProjects.map((project, idx) => {
            const isExpanded = expandedProjectId === project.id;

            return (
              <article
                key={project.id}
                className={`border rounded-[var(--radius-lg)] transition-all duration-300 bg-[var(--bg-surface)] overflow-hidden ${
                  isExpanded
                    ? 'border-[var(--accent)] shadow-[0_8px_32px_-4px_var(--accent-glow)] ring-1 ring-[var(--accent-border)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-xs'
                }`}
              >
                {/* Header Row (Clickable) */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(project.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`case-study-${project.id}`}
                  className="p-6 sm:p-7 cursor-pointer select-none focus-visible:outline-none flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div className="space-y-2.5 min-w-0 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[var(--text-xs)] text-[var(--text-tertiary)] font-bold">
                        [0{idx + 1}]
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-mono text-[10px] tracking-wide uppercase ${getStatusBadgeStyle(project.status)}`}>
                        {project.statusDetail}
                      </span>
                      {project.categories.map(cat => (
                        <span key={cat} className="font-mono text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-surface-raised)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-[var(--text-lg)] font-serif font-medium text-[var(--text-primary)] leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-[var(--text-sm)] text-[var(--text-secondary)] line-clamp-2 font-sans">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Right Action / Stack Chips */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--border-subtle)]">
                    <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-end">
                      {project.primaryTech.map(tech => (
                        <span key={tech} className="font-mono text-[10px] text-[var(--text-secondary)] bg-[var(--bg-surface-raised)] px-2.5 py-0.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`touch-target px-3.5 py-1.5 rounded-full font-mono text-[var(--text-xs)] font-bold flex items-center gap-1.5 transition-all ${
                      isExpanded 
                        ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-xs' 
                        : 'border border-[var(--border-subtle)] text-[var(--accent)] hover:border-[var(--accent)]'
                    }`}>
                      <span>{isExpanded ? 'Collapse' : 'Deep Dive'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded 4-Part Narrative Case Study */}
                {isExpanded && (
                  <div
                    id={`case-study-${project.id}`}
                    className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] p-6 sm:p-8 space-y-8 animate-in fade-in duration-300"
                  >
                    {/* The 4-Part Story Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* 1. THE PROBLEM */}
                      <div className="p-6 border border-red-500/20 bg-[var(--bg-surface)] rounded-[var(--radius-md)] space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-red-500 font-bold">
                          <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_red]"></span>
                          <span>Phase 01 // The Problem</span>
                        </div>
                        <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed font-sans">
                          {project.problem}
                        </p>
                      </div>

                      {/* 2. THE CONSTRAINT */}
                      <div className="p-6 border border-[var(--accent-border)] bg-[var(--bg-surface)] rounded-[var(--radius-md)] space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-bold">
                          <span className="w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_6px_var(--accent)]"></span>
                          <span>Phase 02 // Technical Constraint</span>
                        </div>
                        <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed font-sans">
                          {project.constraint}
                        </p>
                      </div>
                    </div>

                    {/* Sub-Tracks (Specifically for Project 5) */}
                    {project.subTracks && (
                      <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 rounded-[var(--radius-md)] space-y-4 shadow-xs">
                        <div className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-bold flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-[var(--accent)]" />
                          <span>Dual-Track Execution Matrix</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.subTracks.map(track => (
                            <div key={track.name} className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] rounded-[var(--radius-sm)] space-y-2.5">
                              <div className="font-serif font-medium text-[var(--text-primary)] text-[var(--text-base)]">
                                {track.name}
                              </div>
                              <div className="text-[var(--text-xs)] text-[var(--text-secondary)]">
                                <strong className="text-[var(--text-primary)] font-semibold">Goal:</strong> {track.focus}
                              </div>
                              <p className="text-[var(--text-xs)] text-[var(--text-secondary)] leading-relaxed font-sans">
                                {track.approach}
                              </p>
                              <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--accent)] font-semibold">
                                &rarr; {track.benchmark}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. THE ARCHITECTURE (Visual Flow Diagram) */}
                    <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7 rounded-[var(--radius-md)] space-y-4 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-bold">
                          <Cpu className="w-4 h-4 text-[var(--accent)]" />
                          <span>Phase 03 // {project.architecture.flowTitle}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--accent)] bg-[var(--accent-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--accent-border)] font-semibold">
                          Verified Topology
                        </span>
                      </div>

                      <p className="text-[var(--text-xs)] text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--bg-surface-raised)] p-3.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
                        {project.architecture.description}
                      </p>

                      {/* SVG Visual Flow Diagram */}
                      <div className="pt-2 overflow-x-auto pb-2">
                        <div className="min-w-[640px] flex items-center justify-between gap-3 p-5 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] font-mono text-[var(--text-xs)]">
                          {project.architecture.nodes.map((node, i) => (
                            <React.Fragment key={node.id}>
                              <div className={`p-3.5 border text-center shrink-0 min-w-[130px] rounded-[var(--radius-sm)] ${
                                node.type === 'fallback' 
                                  ? 'border-[var(--status-testing)] bg-[rgba(245,158,11,0.08)] shadow-xs' 
                                  : node.type === 'output'
                                  ? 'border-[var(--status-complete)] bg-[rgba(16,185,129,0.08)] shadow-xs'
                                  : 'border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-xs'
                              }`}>
                                <div className="font-bold text-[var(--text-primary)] text-[11px] truncate">
                                  {node.label}
                                </div>
                                {node.sub && (
                                  <div className="text-[9px] text-[var(--text-tertiary)] mt-0.5 truncate">
                                    {node.sub}
                                  </div>
                                )}
                              </div>

                              {i < project.architecture.nodes.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-[var(--accent)] shrink-0 opacity-80" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. THE RESULT (High-Impact Metrics) */}
                    <div className="p-6 sm:p-7 border border-[var(--status-complete)] bg-[rgba(16,185,129,0.04)] rounded-[var(--radius-md)] space-y-4 shadow-xs">
                      <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--status-complete)] font-bold">
                        <CheckCircle2 className="w-4 h-4 text-[var(--status-complete)]" />
                        <span>Phase 04 // Verified Empirical Outcomes</span>
                      </div>

                      {/* Metric Counters Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        {project.result.metrics.map(metric => (
                          <div key={metric.label} className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] text-center shadow-xs">
                            <div className="text-[var(--text-base)] font-bold text-[var(--text-primary)]">
                              {metric.value}
                            </div>
                            <div className="text-[10px] text-[var(--text-tertiary)] uppercase mt-0.5 font-medium">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[var(--text-sm)] text-[var(--text-secondary)] font-sans leading-relaxed">
                        {project.result.summary}
                      </p>
                    </div>

                    {/* Complete Tech Stack Footnote */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      <span className="text-[var(--text-tertiary)] uppercase font-semibold">Complete Stack:</span>
                      {project.stack.map(tech => (
                        <span key={tech} className="bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
