import React from 'react';
import { Cpu, Database, Shield, Zap } from 'lucide-react';

interface SkillGroup {
  id: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; context: string }[];
}

export const SkillsSection: React.FC = () => {
  const skillGroups: SkillGroup[] = [
    {
      id: 'inference',
      category: 'Inference Runtimes & Local Execution',
      icon: <Cpu className="w-4 h-4 text-[var(--accent)]" />,
      description: 'Zero marginal cost execution on air-gapped consumer and server hardware.',
      skills: [
        { name: 'Ollama & llama.cpp', context: 'Air-gapped GGUF runtime orchestration' },
        { name: 'vLLM', context: 'PagedAttention & continuous batching' },
        { name: 'Speculative Decoding', context: 'Draft-model latency reduction (k=5)' },
        { name: 'Triton Inference Server', context: 'Multi-model parallel serving' },
      ],
    },
    {
      id: 'finetuning',
      category: 'Fine-Tuning & Quantization',
      icon: <Zap className="w-4 h-4 text-[var(--accent)]" />,
      description: 'Domain adaptation of open-weights models under consumer VRAM constraints.',
      skills: [
        { name: 'QLoRA & PEFT', context: '4-bit BitsAndBytes parameter-efficient tuning' },
        { name: 'Unsloth FastLoRA', context: '2.2x faster training kernels & memory reduction' },
        { name: 'HuggingFace Transformers', context: 'Custom tokenizers & dataset formatting' },
        { name: 'PyTorch', context: 'Custom loss metrics & gradient checkpointing' },
      ],
    },
    {
      id: 'backend',
      category: 'Backend & High-Throughput Engines',
      icon: <Database className="w-4 h-4 text-[var(--accent)]" />,
      description: 'Relational data modeling, asynchronous queuing, and transactional integrity.',
      skills: [
        { name: 'Python & FastAPI', context: 'High-concurrency async endpoints & streaming' },
        { name: 'PostgreSQL', context: 'Compound indexing, transaction isolation & lock tuning' },
        { name: 'Redis', context: 'In-memory rate cache & asynchronous job DAG queues' },
        { name: 'Enterprise ORM', context: 'Zero N+1 query cascades on 50K+ row rollups' },
      ],
    },
    {
      id: 'guardrails',
      category: 'Evaluation & Security Guardrails',
      icon: <Shield className="w-4 h-4 text-[var(--accent)]" />,
      description: 'Formal verification, AST parsing, and zero-trust perimeter enforcement.',
      skills: [
        { name: 'AST Syntax Validation', context: 'Pre-execution schema and code interception' },
        { name: 'DeepEval & Ragas', context: 'Synthetic test generation & faithfulness eval' },
        { name: 'HMAC-SHA256 Webhooks', context: 'Tamper-proof payload authentication' },
        { name: 'DNS & Systems Watchdog', context: 'Bi-directional process self-healing daemons' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 space-y-14">
        {/* Editorial Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2">
            <span className="mono-label text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
              03 / PRODUCTION TOOLING
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] font-normal tracking-tight">
              Skills Grouped by Shipped Production Code
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-sm leading-relaxed">
            Concrete inventory of battle-tested frameworks, runtimes, and engineering patterns used in deployed production systems.
          </p>
        </div>

        {/* Editorial Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillGroups.map((group) => (
            <div key={group.id} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                {group.icon}
                <h3 className="font-serif text-lg font-normal text-[var(--text-primary)]">
                  {group.category}
                </h3>
              </div>
              <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                {group.description}
              </p>

              <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                  >
                    <span className="font-mono font-medium text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                    <span className="font-sans text-[11px] text-[var(--text-tertiary)]">
                      {skill.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
