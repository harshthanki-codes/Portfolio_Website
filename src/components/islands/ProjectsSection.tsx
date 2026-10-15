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
  BarChart3,
  AlertTriangle,
  Lock,
  Workflow,
  Eye,
  Check
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

type PhaseTab = 'problem' | 'constraint' | 'architecture' | 'outcomes' | 'all';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [sortBy, setSortBy] = useState<'status' | 'category'>('status');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('erp-llm-foundation');
  
  // Independent active phase state per project for clean tabbed navigation
  const [activePhases, setActivePhases] = useState<Record<string, PhaseTab>>({
    'erp-llm-foundation': 'architecture'
  });

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
    setExpandedProjectId(prev => {
      const next = prev === id ? null : id;
      if (next && !activePhases[id]) {
        setActivePhases(curr => ({ ...curr, [id]: 'problem' }));
      }
      return next;
    });
  };

  const setPhaseForProject = (projectId: string, phase: PhaseTab) => {
    setActivePhases(prev => ({
      ...prev,
      [projectId]: phase
    }));
  };

  const getStatusBadgeStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30 shadow-[0_0_12px_rgba(255,102,0,0.25)] font-bold';
      case 'Field Testing':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-bold';
      case 'Complete':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-bold';
      default:
        return 'bg-white/[0.05] text-gray-400 border-white/[0.08]';
    }
  };

  return (
    <section id="projects" className="py-[var(--space-section-y)] border-t border-white/[0.08] relative bg-transparent" aria-labelledby="projects-heading">
      <div className="max-w-[var(--container-max-w)] mx-auto px-[var(--space-gutter)]">
        
        {/* Section Header with Solar Glow Accent & Telemetry Hub */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_#ff6600]" />
              <span className="font-semibold">02 // Architectural Dossier</span>
            </div>
            <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white">
              Production Architecture &amp; <span className="gradient-text-solar font-serif italic">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl font-sans">
              Real problem statements, strict operational constraints, verified failover DAGs, and empirical performance benchmarks.
            </p>
          </div>

          {/* Right Side: Architectural Telemetry Metrics & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5 lg:justify-end shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-[#0c0e16]/70 backdrop-blur-xl border border-white/[0.08] font-mono shadow-sm">
              <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Systems Delivered</div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>7 Core Architectures</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#0c0e16]/70 backdrop-blur-xl border border-white/[0.08] font-mono shadow-sm">
              <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Resilience SLA</div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className="text-orange-400 font-bold">0%</span>
                <span className="text-gray-300">Transaction Loss</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0 ml-1">
              <div className="inline-flex border border-white/[0.08] p-1 bg-[#0c0e16]/70 backdrop-blur-xl rounded-full shadow-sm">
                <button
                  type="button"
                  onClick={() => setSortBy('status')}
                  className={`touch-target px-3 py-1 text-xs rounded-full transition-all font-semibold ${
                    sortBy === 'status' 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-pressed={sortBy === 'status'}
                >
                  Status
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('category')}
                  className={`touch-target px-3 py-1 text-xs rounded-full transition-all font-semibold ${
                    sortBy === 'category' 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-pressed={sortBy === 'category'}
                >
                  Category
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth" role="toolbar" aria-label="Project category filters">
          <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0 mr-1" aria-hidden="true" />
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`touch-target shrink-0 whitespace-nowrap px-4 py-1.5 font-mono text-xs rounded-full border transition-all ${
                selectedCategory === category
                  ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold shadow-[0_0_12px_rgba(255,102,0,0.3)]'
                  : 'border-white/[0.08] bg-[#0c0e16]/60 text-gray-400 hover:border-white/20 hover:text-white backdrop-blur-md'
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
            const currentPhase = activePhases[project.id] || 'problem';

            return (
              <article
                key={project.id}
                className={`border rounded-2xl transition-all duration-300 bg-[#0c0e16]/70 backdrop-blur-xl overflow-hidden ${
                  isExpanded
                    ? 'border-orange-500/60 shadow-[0_12px_40px_rgba(255,102,0,0.15)] ring-1 ring-orange-500/30'
                    : 'border-white/[0.08] hover:border-white/20 shadow-sm hover:bg-[#101320]/80'
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
                  className="p-6 sm:p-7 cursor-pointer select-none focus-visible:outline-none flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                >
                  <div className="space-y-2.5 min-w-0 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-orange-400/80 font-bold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                        [0{idx + 1}]
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-mono text-[10px] tracking-wide uppercase ${getStatusBadgeStyle(project.status)}`}>
                        {project.statusDetail}
                      </span>
                      {project.categories.map(cat => (
                        <span key={cat} className="font-mono text-[10px] text-gray-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-medium text-white group-hover:text-orange-400 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-300 line-clamp-2 font-sans leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Right Action / Stack Chips */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                    <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-end">
                      {project.primaryTech.map(tech => (
                        <span key={tech} className="font-mono text-[10px] text-gray-300 bg-white/[0.05] px-2.5 py-0.5 rounded-md border border-white/[0.08]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`touch-target px-4 py-2 rounded-full font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                      isExpanded 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
                        : 'border border-white/20 text-orange-400 hover:border-orange-400 group-hover:bg-orange-500/10'
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

                {/* Expanded Interactive Narrative Dossier */}
                {isExpanded && (
                  <div
                    id={`case-study-${project.id}`}
                    className="border-t border-white/[0.08] bg-[#080a10]/80 p-6 sm:p-8 space-y-6 animate-in fade-in duration-300"
                  >
                    {/* Interactive Phase Navigation Rail */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5 font-mono text-xs overflow-x-auto no-scrollbar pb-1.5 -mx-2 px-2 sm:mx-0 sm:px-0 scroll-smooth">
                        <span className="text-gray-500 uppercase tracking-wider text-[10px] mr-2 flex items-center gap-1 shrink-0">
                          <Eye className="w-3.5 h-3.5 text-orange-400" />
                          <span>Phase:</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setPhaseForProject(project.id, 'problem')}
                          className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                            currentPhase === 'problem'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-xs'
                              : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
                          }`}
                        >
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                          <span>01 Problem</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPhaseForProject(project.id, 'constraint')}
                          className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                            currentPhase === 'constraint'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-xs'
                              : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
                          }`}
                        >
                          <Lock className="w-3 h-3 text-amber-400" />
                          <span>02 Constraint</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPhaseForProject(project.id, 'architecture')}
                          className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                            currentPhase === 'architecture'
                              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-xs'
                              : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
                          }`}
                        >
                          <Workflow className="w-3 h-3 text-orange-400" />
                          <span>03 Architecture</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPhaseForProject(project.id, 'outcomes')}
                          className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                            currentPhase === 'outcomes'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xs'
                              : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>04 Outcomes &amp; ROI</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPhaseForProject(project.id, 'all')}
                          className={`shrink-0 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                            currentPhase === 'all'
                              ? 'bg-white/20 text-white border border-white/30'
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          View Full Dossier
                        </button>
                      </div>
                    </div>

                    {/* Phase 01: The Problem View */}
                    {(currentPhase === 'problem' || currentPhase === 'all') && (
                      <div className="p-6 border border-red-500/25 bg-red-950/15 backdrop-blur-md rounded-xl space-y-3 shadow-sm animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-red-400 font-bold">
                          <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                          <span>Phase 01 // The Problem Statement</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {/* Phase 02: Technical Constraint View */}
                    {(currentPhase === 'constraint' || currentPhase === 'all') && (
                      <div className="p-6 border border-amber-500/25 bg-amber-950/15 backdrop-blur-md rounded-xl space-y-3 shadow-sm animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                          <span className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
                          <span>Phase 02 // Hard Operational &amp; Engineering Constraints</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
                          {project.constraint}
                        </p>
                      </div>
                    )}

                    {/* Sub-Tracks (Specifically for Project 5) */}
                    {project.subTracks && (currentPhase === 'constraint' || currentPhase === 'architecture' || currentPhase === 'all') && (
                      <div className="border border-white/[0.08] bg-white/[0.02] p-6 rounded-xl space-y-4">
                        <div className="font-mono text-xs uppercase tracking-wider text-orange-400 font-bold flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-orange-400" />
                          <span>Dual-Track Execution Matrix</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.subTracks.map(track => (
                            <div key={track.name} className="p-5 border border-white/[0.08] bg-white/[0.03] rounded-lg space-y-2">
                              <div className="font-serif font-medium text-white text-base">
                                {track.name}
                              </div>
                              <div className="text-xs text-gray-300">
                                <strong className="text-white font-semibold">Goal:</strong> {track.focus}
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                                {track.approach}
                              </p>
                              <div className="pt-2 border-t border-white/[0.06] font-mono text-xs text-orange-400 font-semibold">
                                &rarr; {track.benchmark}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Phase 03: Architecture DAG Flow */}
                    {(currentPhase === 'architecture' || currentPhase === 'all') && (
                      <div className="border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 rounded-xl space-y-4 shadow-sm animate-in fade-in duration-200">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-orange-400 font-bold">
                            <Cpu className="w-4 h-4 text-orange-400" />
                            <span>Phase 03 // {project.architecture.flowTitle}</span>
                          </div>
                          <span className="font-mono text-[10px] text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 font-semibold">
                            Verified Production Topology
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed bg-black/40 p-4 rounded-lg border border-white/[0.06]">
                          {project.architecture.description}
                        </p>

                        {/* Interactive Node Flow Diagram (Mobile Vertical Flow + Desktop Horizontal Flow) */}
                        <div className="pt-2">
                          {/* Mobile Vertical Flow (< sm) */}
                          <div className="sm:hidden space-y-2 p-3.5 bg-black/60 border border-white/[0.08] rounded-xl font-mono text-xs">
                            {project.architecture.nodes.map((node, i) => (
                              <div key={node.id} className="flex items-start gap-3">
                                <div className="flex flex-col items-center pt-1 shrink-0">
                                  <span className={`w-3 h-3 rounded-full flex items-center justify-center ${
                                    node.type === 'fallback'
                                      ? 'bg-amber-400 ring-2 ring-amber-400/30'
                                      : node.type === 'output'
                                      ? 'bg-emerald-400 ring-2 ring-emerald-400/30'
                                      : 'bg-orange-500 ring-2 ring-orange-500/30'
                                  }`} />
                                  {i < project.architecture.nodes.length - 1 && (
                                    <span className="w-0.5 h-7 bg-white/15 my-0.5" />
                                  )}
                                </div>
                                <div className={`flex-1 p-2.5 rounded-lg border text-xs ${
                                  node.type === 'fallback' 
                                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' 
                                    : node.type === 'output'
                                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                    : 'border-white/10 bg-white/[0.04] text-white'
                                }`}>
                                  <div className="font-bold text-xs">{node.label}</div>
                                  {node.sub && (
                                    <div className="text-[10px] text-gray-400 mt-0.5">{node.sub}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Desktop Horizontal Flow (>= sm) */}
                          <div className="hidden sm:block overflow-x-auto pb-2 no-scrollbar">
                            <div className="min-w-[620px] flex items-center justify-between gap-3 p-5 bg-black/50 border border-white/[0.08] rounded-xl font-mono text-xs">
                              {project.architecture.nodes.map((node, i) => (
                                <React.Fragment key={node.id}>
                                  <div className={`p-3.5 border text-center shrink-0 min-w-[130px] rounded-lg transition-transform hover:scale-105 ${
                                    node.type === 'fallback' 
                                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' 
                                      : node.type === 'output'
                                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                      : 'border-white/20 bg-white/[0.05] text-white'
                                  }`}>
                                    <div className="font-bold text-xs truncate">
                                      {node.label}
                                    </div>
                                    {node.sub && (
                                      <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                                        {node.sub}
                                      </div>
                                    )}
                                  </div>

                                  {i < project.architecture.nodes.length - 1 && (
                                    <ArrowRight className="w-4 h-4 text-orange-400 shrink-0 opacity-80" />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Phase 04: Verified Empirical Outcomes */}
                    {(currentPhase === 'outcomes' || currentPhase === 'all') && (
                      <div className="p-6 sm:p-7 border border-emerald-500/30 bg-emerald-950/15 backdrop-blur-md rounded-xl space-y-4 shadow-sm animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Phase 04 // Verified Empirical Outcomes &amp; ROI</span>
                        </div>

                        {/* High-Impact Metric Counters Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                          {project.result.metrics.map(metric => (
                            <div key={metric.label} className="p-4 bg-black/40 border border-emerald-500/20 rounded-lg text-center shadow-xs">
                              <div className="text-lg sm:text-xl font-bold text-white">
                                {metric.value}
                              </div>
                              <div className="text-[10px] text-emerald-300/80 uppercase mt-1 font-semibold">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="text-sm text-gray-200 font-sans leading-relaxed">
                          {project.result.summary}
                        </p>
                      </div>
                    )}

                    {/* Complete Tech Stack Footnote */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-gray-400 uppercase font-semibold">Verified Tech Stack:</span>
                      {project.stack.map(tech => (
                        <span key={tech} className="bg-white/[0.04] text-gray-300 px-2.5 py-1 rounded-md border border-white/[0.08]">
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

export default ProjectsSection;
