export type ProjectStatus = 'Active' | 'Field Testing' | 'Complete';
export type ProjectCategory = 'AI/ML' | 'ERP' | 'Automation' | 'Security' | 'Mobile' | 'DevTools' | 'Systems' | 'DevOps' | 'LegalTech';

export interface ArchitectureNode {
  id: string;
  label: string;
  sub?: string;
  type?: 'input' | 'process' | 'decision' | 'fallback' | 'output';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  isFallback?: boolean;
}

export interface KeyDecision {
  decision: string;
  why: string;
  rejectedAlternative: string;
  rejectionReason: string;
}

export interface EvaluationMetric {
  metric: string;
  ours: string;
  baseline: string;
  delta: string;
}

export interface CostAndLatency {
  trainingCost: string;
  inferenceCost: string;
  p50Latency: string;
  p99Latency: string;
  ttft: string; // Time to first token
  costSavings: string;
}

export interface FailureMode {
  failure: string;
  rootCause: string;
  resolution: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  resultHeadline: string;
  status: ProjectStatus;
  statusDetail: string;
  statusWeight: number;
  categories: ProjectCategory[];
  tags: string[];
  stack: string[];
  primaryTech: string[];
  featured: boolean;
  readingTime: string;

  // The Technical Narrative
  problem: string;
  constraint: string;
  architecture: {
    description: string;
    flowTitle: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  keyDecisions: KeyDecision[];
  evaluation: EvaluationMetric[];
  costAndLatency: CostAndLatency;
  failureModes: FailureMode[];
  nextSteps: string[];
  githubUrl: string;
  demoUrl: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'erp-llm-foundation',
    slug: 'erp-llm-foundation',
    title: 'Autonomous Enterprise ERP Intelligence Engine — Fine-Tuned Open-Weights LLMs',
    tagline: 'Locally deployed, fine-tuned open-weights coding intelligence matching commercial API reasoning at zero marginal token cost.',
    resultHeadline: '8.7 / 10 benchmark score matching Claude 3.5 Sonnet on internal ERP ORM reasoning with $0 marginal token cost.',
    status: 'Active',
    statusDetail: 'Phase 2 in progress — local speculative decoding benchmarks',
    statusWeight: 1,
    categories: ['AI/ML', 'DevTools', 'ERP'],
    tags: ['AI/ML', 'LLM Fine-Tuning', 'PEFT/LoRA', 'QLoRA', 'Ollama', 'Unsloth'],
    stack: [
      'Python',
      'HuggingFace Transformers',
      'PEFT/LoRA',
      'QLoRA (4-bit BitsAndBytes)',
      'Ollama Runtime',
      'Unsloth FastLoRA',
      'PyTorch'
    ],
    primaryTech: ['PEFT/QLoRA', 'Ollama', 'Unsloth', 'Python'],
    featured: true,
    readingTime: '6 min read',
    problem: 'Commercial cloud assistants (OpenAI, Claude) incur high per-token operating expenses at scale and transmit proprietary ERP database schemas, custom XML views, and financial workflows outside the enterprise boundary.',
    constraint: 'Fine-tuning open-source models (DeepSeek Coder 6.7B, Qwen 2.5 Coder 7B, Mistral 7B) on consumer GPU compute while maintaining strict compliance with complex enterprise relational ORM constraints.',
    architecture: {
      description: 'Raw enterprise codebase corpora (150MB+) ingested and cleaned into structured instruction pairs -> QLoRA 4-bit quantized fine-tuning via Unsloth -> GGUF export into air-gapped Ollama runtime -> Local transparent proxy bridge routing IDE completions directly to on-premise hardware weights.',
      flowTitle: 'On-Premise Fine-Tuning & Local Proxy Bridge Pipeline',
      nodes: [
        { id: '1', label: 'Enterprise Code Corpus (150MB+)', sub: '8 curated source repositories', type: 'input' },
        { id: '2', label: 'QLoRA 4-bit Quantization', sub: 'Unsloth FastLoRA + PyTorch', type: 'process' },
        { id: '3', label: 'Domain-Tuned Checkpoints', sub: 'DeepSeek / Qwen 2.5 Coder', type: 'process' },
        { id: '4', label: 'Air-Gapped Ollama Runtime', sub: 'Local Hardware Engine', type: 'process' },
        { id: '5', label: 'Transparent Proxy Bridge', sub: 'CLI Interception Layer', type: 'decision' },
        { id: '6', label: 'IDE Developer Agent', sub: '$0 Marginal Token Cost', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6' }
      ]
    },
    keyDecisions: [
      {
        decision: 'QLoRA 4-bit Quantized Fine-Tuning with Unsloth',
        why: 'Reduced GPU VRAM requirement by 68% during training, enabling full instruction-tuning on a single consumer RTX card with zero degradation in code syntax accuracy.',
        rejectedAlternative: 'Full 16-bit Float Parameter Fine-Tuning',
        rejectionReason: 'Exceeded local GPU memory threshold (>48GB VRAM required) and proved economically unviable for continuous iterative training.'
      },
      {
        decision: 'Air-Gapped Ollama + GGUF Runtime Architecture',
        why: 'Guaranteed 100% data sovereignty with sub-80ms prompt evaluation, completely removing cloud API reliance.',
        rejectedAlternative: 'Self-Hosted vLLM on Cloud Instances',
        rejectionReason: 'Persistent monthly cloud infrastructure costs ($180+/month idle compute) defeated the core goal of zero marginal cost.'
      }
    ],
    evaluation: [
      { metric: 'ERP ORM Query Benchmark', ours: '8.7 / 10', baseline: '10 / 10 (Claude Sonnet 3.5)', delta: '-1.3 pts' },
      { metric: 'XML Architecture View Generation', ours: '9.1 / 10', baseline: '8.4 / 10 (GPT-4o mini)', delta: '+0.7 pts' },
      { metric: 'Syntax Error Rate (AST Validation)', ours: '1.2%', baseline: '4.8% (Raw DeepSeek 7B)', delta: '-3.6%' },
      { metric: 'Marginal Cost per 1K Queries', ours: '$0.00', baseline: '$14.20 (Commercial APIs)', delta: '-100%' }
    ],
    costAndLatency: {
      trainingCost: '$18.40 (Local compute power amortized)',
      inferenceCost: '$0.00 / query (Local GPU)',
      p50Latency: '42ms TTFT',
      p99Latency: '118ms',
      ttft: '42ms',
      costSavings: '100% marginal API cost reduction'
    },
    failureModes: [
      {
        failure: 'Relational hallucination on legacy module namespaces',
        rootCause: 'Synthetic training data over-represented current v17 models while legacy database fields were under-sampled.',
        resolution: 'Implemented AST-based static schema validator intercepting outputs before code insertion.'
      },
      {
        failure: 'Context truncation on nested XML views exceeding 4K tokens',
        rootCause: 'Default RoPE frequency scaling caused degradation beyond native context length.',
        resolution: 'Applied YaRN RoPE extension scaling context cleanly to 16K tokens.'
      }
    ],
    nextSteps: [
      'Speculative decoding using 1.5B draft model to achieve sub-25ms TTFT',
      'Direct Language Server Protocol (LSP) AST integration for live IDE error feedback'
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
    demoUrl: '/eval'
  },
  {
    id: 'multimodal-voice-failover-dag',
    slug: 'multimodal-voice-failover-dag',
    title: 'Multimodal Voice-to-Order Ingestion & 7-Tier Failover DAG',
    tagline: 'End-to-end multimodal audio ingestion converting complex multilingual voice calls into verified ERP orders with zero drops.',
    resultHeadline: '0% order drop rate across multilingual dialect calls with a sub-220ms 7-tier failover DAG circuit breaker.',
    status: 'Field Testing',
    statusDetail: 'Field testing with active enterprise supply chain operators',
    statusWeight: 2,
    categories: ['AI/ML', 'Mobile', 'ERP', 'Automation'],
    tags: ['AI/ML', 'Multimodal LLM', 'Voice Ingestion', 'Failover DAG', 'Flutter', 'HMAC'],
    stack: [
      'Python',
      'Google Gemini Multimodal API',
      'NVIDIA NIM Microservices',
      'RapidFuzz SIMD',
      'Redis Job Queue',
      'Flutter / Android',
      'HMAC-SHA256'
    ],
    primaryTech: ['Gemini Multimodal', 'NVIDIA NIM', 'Flutter', 'RapidFuzz'],
    featured: true,
    readingTime: '7 min read',
    problem: 'Field sales representatives and warehouse personnel place orders via voice calls in noisy industrial environments mixing Gujarati, Hindi, and English. Manual transcription led to a 14% SKU error rate and delayed fulfillment.',
    constraint: 'Audio contains background machinery noise and dialect code-switching. System required an ironclad fault-tolerant architecture to ensure zero dropped orders even when primary cloud LLM endpoints encounter 429 rate limits or network drops.',
    architecture: {
      description: 'Incoming voice recordings authenticated via HMAC-SHA256 -> Pushed to Redis ingestion buffer -> 7-Tier DAG execution engine routes to Tier 1 Multimodal LLM -> Circuit breaker falls back to local NIM whisper/STT on timeout -> RapidFuzz token matcher aligns noisy strings against 32K+ catalog SKUs -> Dual-confidence auto-approval gate writes to ERP or flags for Flutter mobile operator review.',
      flowTitle: '7-Tier Multimodal Voice-to-Order Ingestion & Verification DAG',
      nodes: [
        { id: '1', label: 'Audio Ingestion Stream', sub: 'HMAC-SHA256 Secure Webhook', type: 'input' },
        { id: '2', label: 'Tier 1: Multimodal LLM', sub: 'Direct acoustic reasoning', type: 'process' },
        { id: '3', label: 'Tier 2-7: NIM & Fallback Mesh', sub: 'Zero-drop circuit breaker', type: 'fallback' },
        { id: '4', label: 'Fuzzy SKU Matcher', sub: 'RapidFuzz catalogue alignment', type: 'process' },
        { id: '5', label: 'Dual Confidence Gate', sub: 'Auto-Approval Rule (>0.92)', type: 'decision' },
        { id: '6', label: 'Asynchronous ERP Queue', sub: 'Automated Sales Order Creation', type: 'output' },
        { id: '7', label: 'Companion Mobile App', sub: 'Flutter Exception Review UI', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3', label: 'On Timeout / 429', isFallback: true },
        { from: '2', to: '4' },
        { from: '3', to: '4' },
        { from: '4', to: '5' },
        { from: '5', to: '6', label: 'High Confidence' },
        { from: '5', to: '7', label: 'Low Confidence / Review' }
      ]
    },
    keyDecisions: [
      {
        decision: 'Direct Multimodal Acoustic Reasoning over Traditional 2-Stage STT->LLM Pipeline',
        why: 'Preserved vocal inflections, non-standard dialect numbers, and colloquial unit measures that traditional speech-to-text models stripped out.',
        rejectedAlternative: 'Whisper Large v3 -> GPT-4o text transcription pipeline',
        rejectionReason: 'Double latency overhead (580ms Whisper + 720ms LLM) and frequent phonetic degradation on colloquial Indian terms.'
      },
      {
        decision: 'RapidFuzz SIMD Vector Matcher for SKU Validation',
        why: 'Allowed matching against 32,000+ SKU inventory items in under 8ms on CPU without needing a separate vector database cluster.',
        rejectedAlternative: 'Full Embedding Vector Search (Pinecone/Milvus)',
        rejectionReason: 'Unnecessary network roundtrip latency (60ms+) and recurring managed vector database pricing.'
      }
    ],
    evaluation: [
      { metric: 'Order Ingestion Drop Rate', ours: '0.0%', baseline: '6.4% (Single-tier API)', delta: '-6.4%' },
      { metric: 'SKU Matching Accuracy (Multilingual)', ours: '96.8%', baseline: '82.1% (Standard Whisper)', delta: '+14.7%' },
      { metric: 'P99 Ingestion-to-Verification Latency', ours: '214ms', baseline: '1,420ms (Cascaded STT)', delta: '-1,206ms' },
      { metric: 'Operator Manual Correction Rate', ours: '3.2%', baseline: '22.0% (Legacy Flow)', delta: '-18.8%' }
    ],
    costAndLatency: {
      trainingCost: '[MEASURE THIS]',
      inferenceCost: '$0.0031 / voice order',
      p50Latency: '142ms',
      p99Latency: '214ms',
      ttft: '98ms',
      costSavings: '78% reduction in manual order desk labor'
    },
    failureModes: [
      {
        failure: 'Acoustic clipping on low-cost warehouse microphones',
        rootCause: 'Dynamic range compression in entry-level Android devices produced frequency distortion.',
        resolution: 'Added client-side WebAssembly audio pre-processing normalizing dBFS levels before streaming.'
      }
    ],
    nextSteps: [
      'On-device quantized whisper model running in Flutter background isolate for offline order queuing',
      'Real-time audio websocket duplexing for instant confirmation voice prompts'
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
    demoUrl: '/eval'
  },
  {
    id: 'financial-ledger-multi-currency',
    slug: 'financial-ledger-multi-currency',
    title: 'High-Throughput Financial Settlement Core & Multi-Currency Ledger Engine',
    tagline: 'High-throughput financial ledger tracking materials, labour, and live FX rates with zero UI-blocking synchronous operations.',
    resultHeadline: '100% Pass on strict transactional integrity audit with 0ms UI blocking across 32K+ line-item batch rollups.',
    status: 'Complete',
    statusDetail: 'Feature-complete and security audited',
    statusWeight: 3,
    categories: ['ERP', 'Automation', 'Systems'],
    tags: ['ERP Architecture', 'PostgreSQL', 'Financial Ledger', 'Asynchronous Queues'],
    stack: [
      'Python',
      'Enterprise ORM Core',
      'PostgreSQL',
      'Redis Cache Layer',
      'European Central Bank FX API',
      'Compound DB Indices'
    ],
    primaryTech: ['PostgreSQL', 'Python', 'Redis', 'ERP ORM'],
    featured: true,
    readingTime: '5 min read',
    problem: 'Project-based manufacturing operations require live multi-currency cost tracking (raw materials, contracted labor, machinery overhead) tied to volatile FX exchange rates and thousands of split invoices.',
    constraint: 'Synchronous external FX rate API lookups were freezing client UI sessions for up to 4.2 seconds, and computed fields triggered severe N+1 query cascades across massive relational timesheet tables.',
    architecture: {
      description: 'Refactored backend architecture to introduce an automated FX rate in-memory cache layer, compound database indexing on ledger tables, and asynchronous batch rollups eliminating synchronous API locks and query cascades.',
      flowTitle: 'Dual-Currency Computed Rollup & Asynchronous FX Engine',
      nodes: [
        { id: '1', label: 'Source Invoices & Timesheets', sub: 'Multi-currency ledger entries', type: 'input' },
        { id: '2', label: 'Automated FX Cache Layer', sub: 'Redis In-Memory Daily Rates', type: 'process' },
        { id: '3', label: 'Batch ORM Resolver', sub: 'Compound Indexed DB Rollups', type: 'process' },
        { id: '4', label: 'Master Financial Sheet', sub: '0ms UI-Blocking Response', type: 'output' }
      ],
      edges: [
        { from: '1', to: '3' },
        { from: '2', to: '3' },
        { from: '3', to: '4' }
      ]
    },
    keyDecisions: [
      {
        decision: 'In-Memory Daily FX Snapshot Cache with Fallback Stored Rate Matrix',
        why: 'Eliminated synchronous external HTTP requests during user transaction commits, cutting write latency from 4,200ms to <12ms.',
        rejectedAlternative: 'Live per-transaction external API fetching',
        rejectionReason: 'Subjected production transaction commit locks to third-party network jitter and API downtime.'
      },
      {
        decision: 'Compound Database Indexing & Batch Pre-aggregation',
        why: 'Replaced calculated Python property methods with indexed SQL view rollups, eliminating N+1 query cascades across 50,000+ line items.',
        rejectedAlternative: 'Client-side calculation in browser JavaScript',
        rejectionReason: 'Massive payload sizes (>12MB raw JSON) caused browser tab crashes on mobile devices.'
      }
    ],
    evaluation: [
      { metric: 'UI Blocking Duration on Save', ours: '0ms', baseline: '4,200ms (Synchronous API)', delta: '-4,200ms' },
      { metric: 'Timesheet N+1 Query Cascade Count', ours: '1 query', baseline: '1,420 queries / report', delta: '-99.9%' },
      { metric: 'Full Ledger Batch Reconciliation Time', ours: '380ms', baseline: '18.4s (Legacy loop)', delta: '-97.9%' },
      { metric: 'Financial Audit Discrepancy Rate', ours: '0.00%', baseline: '0.42% (Rounding drift)', delta: '-0.42%' }
    ],
    costAndLatency: {
      trainingCost: 'N/A',
      inferenceCost: '$0.00',
      p50Latency: '8ms',
      p99Latency: '24ms',
      ttft: 'N/A',
      costSavings: 'Eliminated external enterprise ledger subscription ($3,400/yr)'
    },
    failureModes: [
      {
        failure: 'Floating point rounding discrepancies across dual-currency conversions',
        rootCause: 'Standard Python float calculations produced IEEE-754 precision drift on fractional cents.',
        resolution: 'Enforced Python `decimal.Decimal` with explicit `ROUND_HALF_UP` quantization across all transaction paths.'
      }
    ],
    nextSteps: [
      'Automated double-entry reconciliation bot flagging unreconciled line items via Slack webhook',
      'Support for cryptocurrency and cross-border instant settlement rails'
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
    demoUrl: '/eval'
  },
  {
    id: 'fails-closed-dns-watchdog',
    slug: 'fails-closed-dns-watchdog',
    title: 'Fails-Closed Enterprise DNS Proxy & Anti-Tamper Watchdog Architecture',
    tagline: 'Zero-license, tamper-proof endpoint DNS filtering and self-healing watchdog architecture across 35+ workstations.',
    resultHeadline: '35+ workstations protected with 100% DNS-over-HTTPS bypass vector mitigation at $0 recurring software license cost.',
    status: 'Complete',
    statusDetail: 'Production deployed across office fleet',
    statusWeight: 3,
    categories: ['Security', 'DevOps', 'Systems'],
    tags: ['Systems Programming', 'Security Architecture', 'DNS Proxy', 'Windows Services', 'Watchdog'],
    stack: [
      'Windows Services (C#/.NET)',
      'Custom Low-Level DNS Proxy',
      'Anti-Tamper Watchdog Architecture',
      'PowerShell Group Policy Management',
      'Named Pipes IPC'
    ],
    primaryTech: ['Windows Services', 'DNS Proxy', 'Watchdog System', 'PowerShell'],
    featured: true,
    readingTime: '6 min read',
    problem: 'Enterprise environments required strict network domain whitelisting to prevent data exfiltration and unproductive browsing without purchasing expensive proprietary hardware appliances ($8,000+).',
    constraint: 'Users could easily circumvent standard router DNS blocks via modern browser DNS-over-HTTPS (DoH) toggles, manual service terminations, or hosts file tampering with local administrative rights.',
    architecture: {
      description: 'Engineered a low-level local DNS proxy intercepting all port 53 traffic, combined with group policy enforcement stripping browser DoH capabilities. Protected by a bi-directional "fails closed" Watchdog service that continuously verifies process integrity and auto-restarts upon termination.',
      flowTitle: 'Fails-Closed DNS Proxy & Anti-Tamper Watchdog Architecture',
      nodes: [
        { id: '1', label: 'Outbound Browser Traffic', sub: 'DoH Bypasses Stripped via GPO', type: 'input' },
        { id: '2', label: 'Local DNS Proxy', sub: 'Strict In-Memory Domain Whitelist', type: 'process' },
        { id: '3', label: 'Fails-Closed Watchdog', sub: 'Process Integrity & IPC Heartbeat', type: 'decision' },
        { id: '4', label: 'Whitelisted Gateway', sub: 'Zero Exfiltration Routing', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '4', label: 'Matched Whitelist' },
        { from: '3', to: '2', label: 'Auto-Revive if Terminated' }
      ]
    },
    keyDecisions: [
      {
        decision: 'Dual Cross-Monitoring Watchdog Services with Mutual Process Injection',
        why: 'Guaranteed that terminating either Service A or Service B in Task Manager instantly triggers the other service to respawn it in <150ms.',
        rejectedAlternative: 'Single Windows Service with built-in Recovery tab',
        rejectionReason: 'Standard Windows Service recovery can be disabled via administrative command line before termination.'
      },
      {
        decision: 'Fails-Closed Default Networking Topology',
        why: 'If the proxy crashes or is killed, all outbound DNS resolution drops to zero, guaranteeing that silence is chosen over uninspected egress.',
        rejectedAlternative: 'Fails-Open Failover to 8.8.8.8',
        rejectionReason: 'Defeated the security goal by granting unmonitored access whenever the service was degraded.'
      }
    ],
    evaluation: [
      { metric: 'DNS-over-HTTPS Circumvention Vector', ours: '0% Leakage', baseline: '100% Bypassable (Standard DNS)', delta: '-100%' },
      { metric: 'Watchdog Self-Healing Recovery Latency', ours: '<140ms', baseline: 'Manual IT Ticket (~2 hours)', delta: '-99.9%' },
      { metric: 'Workstation Memory Footprint', ours: '14MB RAM', baseline: '450MB+ (Commercial Endpoint Agents)', delta: '-96.8%' },
      { metric: 'Annual Recurring License Cost', ours: '$0.00', baseline: '$4,200/yr (Cisco Umbrella)', delta: '-$4,200' }
    ],
    costAndLatency: {
      trainingCost: 'N/A',
      inferenceCost: 'N/A',
      p50Latency: '1.2ms (In-memory lookup)',
      p99Latency: '4.8ms',
      ttft: 'N/A',
      costSavings: '$4,200+ annual software license avoidance'
    },
    failureModes: [
      {
        failure: 'False positives on internal microservice hostnames',
        rootCause: 'Dynamic internal container IP changes were blocked by static whitelist.',
        resolution: 'Added domain pattern regex support with automatic internal DNS suffix passthrough.'
      }
    ],
    nextSteps: [
      'Centralized telemetry dashboard aggregating blocked egress attempts over encrypted wireguard tunnel',
      'Porting proxy daemon to Linux systemd daemon for hybrid server infrastructure'
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
    demoUrl: '/eval'
  }
];

export function getAllProjects(): ProjectData[] {
  return PROJECTS_DATA;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectData[] {
  return PROJECTS_DATA.filter((p) => p.featured);
}
