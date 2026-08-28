import React, { useState, useMemo } from 'react';
import { 
  PROJECTS_DATA, 
  type ProjectData, 
  type ProjectCategory, 
  type ProjectStatus 
} from '../../data/projects';
import { 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Database, 
  ArrowRight,
  Sparkles,
  GitBranch,
  Terminal
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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('odoo-foundation-ai'); // default expand first

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
        return 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]';
      case 'Field Testing':
        return 'bg-[rgba(217,119,6,0.1)] text-[var(--status-testing)] border-[rgba(217,119,6,0.25)]';
      case 'Complete':
        return 'bg-[rgba(5,150,105,0.1)] text-[var(--status-complete)] border-[rgba(5,150,105,0.25)]';
      default:
        return 'bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] border-[var(--border-subtle)]';
    }
  };

  return (
    <section id="projects" className="py-[var(--space-section-y)] border-t border-[var(--border-subtle)] relative" aria-labelledby="projects-heading">
      <div className="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-[var(--text-xs)] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              <span>02 // Systems & Technical Case Studies</span>
            </div>
            <h2 id="projects-heading" className="text-[var(--text-xl)] font-serif font-medium tracking-tight text-[var(--text-primary)]">
              Production Architecture &amp; Case Studies
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1 max-w-2xl">
              Real problem statements, strict operational constraints, custom failover topologies, and verified empirical benchmarks.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] shrink-0">
            <span className="text-[var(--text-tertiary)]">Sort by:</span>
            <div className="inline-flex border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-surface)] rounded-[var(--radius-sm)]">
              <button
                type="button"
                onClick={() => setSortBy('status')}
                className={`touch-target px-3 py-1 text-[var(--text-xs)] transition-all ${
                  sortBy === 'status'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] font-medium shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={sortBy === 'status'}
              >
                Status Weight
              </button>
              <button
                type="button"
                onClick={() => setSortBy('category')}
                className={`touch-target px-3 py-1 text-[var(--text-xs)] transition-all ${
                  sortBy === 'category'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] font-medium shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-pressed={sortBy === 'category'}
              >
                Category
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar" role="toolbar" aria-label="Project category filters">
          <Filter className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0 mr-1" aria-hidden="true" />
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`touch-target whitespace-nowrap px-3 py-1 font-mono text-[var(--text-xs)] border transition-all ${
                selectedCategory === category
                  ? 'border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold'
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
                className={`border transition-all bg-[var(--bg-surface)] rounded-[var(--radius-md)] overflow-hidden ${
                  isExpanded
                    ? 'border-[var(--accent)] shadow-md'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                }`}
              >
                {/* Compact Header Summary Row (Clickable) */}
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
                  className="p-5 sm:p-6 cursor-pointer select-none focus-visible:outline-none flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 min-w-0 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[var(--text-xs)] text-[var(--text-tertiary)]">
                        [0{idx + 1}]
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 border font-mono text-[10px] font-medium tracking-wide uppercase ${getStatusBadgeStyle(project.status)}`}>
                        {project.statusDetail}
                      </span>
                      {project.categories.map(cat => (
                        <span key={cat} className="font-mono text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-surface-raised)] px-2 py-0.5 border border-[var(--border-subtle)]">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-[var(--text-lg)] font-serif font-medium text-[var(--text-primary)] leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-[var(--text-sm)] text-[var(--text-secondary)] line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Right Action / Stack Chips */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--border-subtle)]">
                    <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-end">
                      {project.primaryTech.map(tech => (
                        <span key={tech} className="font-mono text-[10px] text-[var(--text-secondary)] bg-[var(--bg-surface-raised)] px-2 py-0.5 border border-[var(--border-subtle)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] text-[var(--accent)] font-medium">
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
                    className="border-t border-[var(--border-subtle)] bg-[var(--bg-app)] p-5 sm:p-8 space-y-8 animate-in fade-in duration-200"
                  >
                    {/* The 4-Part Story Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      {/* 1. THE PROBLEM */}
                      <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-[var(--radius-sm)] space-y-2">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-red-500 font-semibold">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span>Phase 01 // The Problem</span>
                        </div>
                        <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* 2. THE CONSTRAINT */}
                      <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-[var(--radius-sm)] space-y-2">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--status-testing)] font-semibold">
                          <span className="w-1.5 h-1.5 bg-[var(--status-testing)] rounded-full"></span>
                          <span>Phase 02 // Technical Constraint</span>
                        </div>
                        <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed">
                          {project.constraint}
                        </p>
                      </div>
                    </div>

                    {/* Sub-Tracks (Specifically for Project 5) */}
                    {project.subTracks && (
                      <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 rounded-[var(--radius-sm)] space-y-4">
                        <div className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          <span>Dual-Track Execution Architecture</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.subTracks.map(track => (
                            <div key={track.name} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface-raised)] space-y-2">
                              <div className="font-serif font-medium text-[var(--text-primary)] text-[var(--text-base)]">
                                {track.name}
                              </div>
                              <div className="text-[var(--text-xs)] text-[var(--text-secondary)]">
                                <strong className="text-[var(--text-primary)]">Goal:</strong> {track.focus}
                              </div>
                              <p className="text-[var(--text-xs)] text-[var(--text-secondary)] leading-relaxed">
                                {track.approach}
                              </p>
                              <div className="pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--accent)]">
                                ↳ {track.benchmark}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. THE ARCHITECTURE (Interactive SVG / React Diagram) */}
                    <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 rounded-[var(--radius-sm)] space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-semibold">
                          <Cpu className="w-4 h-4" />
                          <span>Phase 03 // {project.architecture.flowTitle}</span>
                        </div>
                        <span className="font-mono text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-surface-raised)] px-2 py-0.5 border border-[var(--border-subtle)]">
                          Verified Topology
                        </span>
                      </div>

                      <p className="text-[var(--text-xs)] text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--bg-surface-raised)] p-3 border border-[var(--border-subtle)]">
                        {project.architecture.description}
                      </p>

                      {/* SVG Visual Flow Diagram */}
                      <div className="pt-2 overflow-x-auto pb-2">
                        <div className="min-w-[640px] flex items-center justify-between gap-3 p-4 bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[var(--text-xs)]">
                          {project.architecture.nodes.map((node, i) => (
                            <React.Fragment key={node.id}>
                              <div className={`p-3 border text-center shrink-0 min-w-[130px] rounded-[var(--radius-sm)] ${
                                node.type === 'fallback' 
                                  ? 'border-[var(--status-testing)] bg-[rgba(217,119,6,0.08)]' 
                                  : node.type === 'output'
                                  ? 'border-[var(--status-complete)] bg-[rgba(5,150,105,0.08)]'
                                  : 'border-[var(--border-strong)] bg-[var(--bg-surface)]'
                              }`}>
                                <div className="font-medium text-[var(--text-primary)] text-[11px] truncate">
                                  {node.label}
                                </div>
                                {node.sub && (
                                  <div className="text-[9px] text-[var(--text-tertiary)] mt-0.5 truncate">
                                    {node.sub}
                                  </div>
                                )}
                              </div>

                              {i < project.architecture.nodes.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-[var(--accent)] shrink-0 opacity-75" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. THE RESULT */}
                    <div className="p-5 sm:p-6 border border-[var(--status-complete)] bg-[rgba(5,150,105,0.04)] rounded-[var(--radius-sm)] space-y-4">
                      <div className="flex items-center gap-2 font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--status-complete)] font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Phase 04 // Verified Empirical Result</span>
                      </div>

                      {/* Metric Counters */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        {project.result.metrics.map(metric => (
                          <div key={metric.label} className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                            <div className="text-[var(--text-base)] font-bold text-[var(--text-primary)]">
                              {metric.value}
                            </div>
                            <div className="text-[10px] text-[var(--text-tertiary)] uppercase mt-0.5">
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
                      <span className="text-[var(--text-tertiary)] uppercase">Complete Stack:</span>
                      {project.stack.map(tech => (
                        <span key={tech} className="bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2 py-0.5 border border-[var(--border-subtle)]">
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
