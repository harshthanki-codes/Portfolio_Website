import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Cpu, Database, Shield, Zap, GitBranch } from 'lucide-react';

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
      icon: <Zap className="w-4 h-4 text-amber-400" />,
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
      icon: <Database className="w-4 h-4 text-emerald-400" />,
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
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
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
    <section id="skills" className="py-20 border-b border-[var(--border)] scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          number="03"
          tag="CORE STACK"
          title="Skills Grouped by What I Have Shipped In Production"
          subtitle="A concrete inventory of production-tested frameworks, runtimes, and engineering patterns I use to deliver reliable systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <Card key={group.id} variant="default" className="p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-subtle)]">
                {group.icon}
                <h3 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {group.category}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {group.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2.5 bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-xs)] flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs"
                  >
                    <span className="font-semibold text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                    <span className="text-[11px] text-[var(--text-tertiary)]">
                      {skill.context}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
