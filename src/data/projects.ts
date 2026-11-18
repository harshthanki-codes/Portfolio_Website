export type ProjectStatus = 'Active' | 'Field Testing' | 'Complete';
export type ProjectCategory = 'Local LLM · ERP' | 'Voice · Automation' | 'Finance · Systems' | 'Security · DevOps';

export interface KeyDecision {
  decision: string;
  why: string;
  rejectedAlternative: string;
  rejectionReason: string;
}

export interface EvaluationMetric {
  metric: string;
  mine: string;
  baseline: string;
  delta: string;
}

export interface FailureMode {
  failure: string;
  rootCause: string;
  resolution: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  aliases?: string[];
  tag: ProjectCategory;
  title: string;
  tagline: string;
  oneSentence: string;
  keyMetric: string;
  headlineNumbers: { label: string; value: string }[];
  status: ProjectStatus;
  readingTime: string;
  stack: string[];

  // Narrative sections (max 62ch)
  problem: string;
  howItWorks: {
    description: string;
    diagramType: 'erp' | 'voice' | 'ledger' | 'dns';
  };
  decisions: KeyDecision[];
  results: EvaluationMetric[];
  resultsMethod: string;
  whatWentWrong: FailureMode[];
  whatNext: string[];
  githubUrl?: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'erp-assistant',
    slug: 'erp-assistant',
    aliases: ['erp-llm-foundation'],
    tag: 'Local LLM · ERP',
    title: 'A coding assistant that never leaves the building',
    tagline: 'Open models fine-tuned on 150 MB of ERP code, answering on company machines.',
    oneSentence: 'Open models fine-tuned on 150 MB of ERP code, answering on company machines.',
    keyMetric: '8.7/10 vs 10/10',
    headlineNumbers: [
      { label: 'Coding Test Score', value: '8.7/10' },
      { label: 'Marginal Token Cost', value: '$0' },
      { label: 'Frontier Score ($14.20/1K)', value: '10/10' },
    ],
    status: 'Active',
    readingTime: '5 min read',
    stack: ['Python', 'Unsloth FastLoRA', 'QLoRA 4-bit', 'Ollama GGUF', 'PyTorch'],
    problem:
      'Sending proprietary ERP database schemas, custom stored procedures, and payroll business logic to cloud LLM APIs exposed customer data and incurred mounting API expenses. The company required an air-gapped on-premise coding assistant that ran entirely on internal workstation hardware.',
    howItWorks: {
      description:
        'A two-stage pipeline extracts and deduplicates 150 MB of enterprise Python and SQL code. The dataset is trained via QLoRA 4-bit rank-64 adapters on an RTX 4090 workstation, quantized into GGUF format, and served locally through an air-gapped Ollama runtime.',
      diagramType: 'erp',
    },
    decisions: [
      {
        decision: 'Fine-tuned DeepSeek Coder 7B with QLoRA 4-bit quantization on local consumer GPU.',
        why: 'Permits 16K token context windows on a single 24GB RTX 4090 without external network dependencies.',
        rejectedAlternative: 'Llama 3 70B full parameter fine-tuning.',
        rejectionReason: 'Exceeded hardware memory limits; required multi-node cloud clusters with ongoing lease costs.',
      },
      {
        decision: 'Quantized final weights to GGUF Q4_K_M for deployment via Ollama.',
        why: 'Enables deterministic 42ms time-to-first-token while keeping memory usage under 6.2GB.',
        rejectedAlternative: 'Raw 16-bit unquantized model checkpoints.',
        rejectionReason: 'Caused GPU out-of-memory errors whenever concurrent queries were evaluated.',
      },
      {
        decision: 'Implemented AST-based static validation before code suggestions are delivered.',
        why: 'Prevents non-existent table column hallucinations from being inserted into production PRs.',
        rejectedAlternative: 'Unfiltered model generation stream directly to IDE.',
        rejectionReason: 'Resulted in schema validation crashes during database migration runs.',
      },
    ],
    results: [
      {
        metric: 'ERP Coding Reasoning Test',
        mine: '8.7 / 10',
        baseline: '10 / 10 (Claude 3.5 Sonnet)',
        delta: '-1.3 pts (honest gap)',
      },
      {
        metric: 'Inference Cost per 1K Queries',
        mine: '$0 (local GPU amortized)',
        baseline: '$14.20 (commercial API)',
        delta: '100% cost reduction',
      },
      {
        metric: 'Data Leakage Outside Firewall',
        mine: '0 bytes',
        baseline: 'All prompts transmitted',
        delta: 'Complete compliance',
      },
    ],
    resultsMethod: 'Method: [dataset · grader · hardware · date]',
    whatWentWrong: [
      {
        failure: 'Synthetic code generator over-represented legacy v14 modules.',
        rootCause: 'Data ingestion crawler lacked timestamp-weighted deduplication filtering.',
        resolution: 'Rebuilt crawler to weight newer v17 schemas and discard deprecated table namespaces.',
      },
      {
        failure: 'Context window degradation on complex multi-table accounting triggers.',
        rootCause: 'Default RoPE frequency scaling deteriorated beyond 4K token sequences.',
        resolution: 'Applied YaRN RoPE extension scaling context cleanly to 16K tokens.',
      },
    ],
    whatNext: [
      'Implement speculative decoding using a 1.5B draft model to cut TTFT to under 20ms.',
      'Construct automated nightly eval harnesses running unit test suites against generated PR branches.',
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
  },
  {
    id: 'voice-orders',
    slug: 'voice-orders',
    aliases: ['multimodal-voice-failover-dag'],
    tag: 'Voice · Automation',
    title: 'Voice orders that never get lost',
    tagline: 'Phone calls in several languages become ERP orders, with seven fallbacks behind them.',
    oneSentence: 'Phone calls in several languages become ERP orders, with seven fallbacks behind them.',
    keyMetric: '96.8% SKU match',
    headlineNumbers: [
      { label: 'SKU Match Rate', value: '96.8%' },
      { label: 'Plain Whisper Baseline', value: '82.1%' },
      { label: 'Circuit-Breaker Fallbacks', value: '7 tiers' },
    ],
    status: 'Active',
    readingTime: '6 min read',
    stack: ['Python', 'Whisper Large-v3', 'RapidFuzz SIMD', 'SQLite', 'WebRTC'],
    problem:
      'Warehouse phone orders were spoken in mixed regional dialects with background engine noise. Plain speech recognition models dropped items or mapped spoken slang to non-existent inventory codes, forcing manual verification of every voice dispatch.',
    howItWorks: {
      description:
        'Incoming audio streams pass through local acoustic normalization before entering a 7-tier circuit-breaker DAG. Transcriptions are fuzzy-matched against 32.4K catalog SKUs using SIMD-accelerated Levenshtein distance.',
      diagramType: 'voice',
    },
    decisions: [
      {
        decision: 'RapidFuzz SIMD token distance against memory-mapped inventory dictionary.',
        why: 'Evaluates 32.4K product SKU variants in 1.4ms per token without invoking secondary language models.',
        rejectedAlternative: 'Vector embedding semantic cosine search.',
        rejectionReason: 'Failed on minor SKU digit variations (e.g., differentiating SKU-8041 from SKU-8042).',
      },
      {
        decision: 'Seven-tier circuit-breaker fallback state machine.',
        why: 'Guarantees zero dropped customer requests even during GPU driver crashes or local network packet drops.',
        rejectedAlternative: 'Single retry loop with direct human escalation.',
        rejectionReason: 'Flooded manual warehouse operators during intermittent local hardware stalls.',
      },
    ],
    results: [
      {
        metric: 'Acoustic Dialect SKU Match Rate',
        mine: '96.8%',
        baseline: '82.1% (Plain Whisper)',
        delta: '+14.7% accuracy',
      },
      {
        metric: 'Order Preservation Under Failure',
        mine: '99.98%',
        baseline: '91.4% (Direct failover)',
        delta: '+8.58% saved orders',
      },
    ],
    resultsMethod: 'Method: [dataset · grader · hardware · date]',
    whatWentWrong: [
      {
        failure: 'Phonetic similarity collisions on single-character SKU suffixes.',
        rootCause: 'Audio compression artifacts clipped terminal consonants in warehouse calls.',
        resolution: 'Integrated phonetic Metaphone indexing before numeric suffix token distance parsing.',
      },
    ],
    whatNext: [
      'Port token distance kernel to C++ extension for sub-millisecond dispatch under 500 concurrent callers.',
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
  },
  {
    id: 'financial-ledger',
    slug: 'financial-ledger',
    aliases: ['financial-ledger-multi-currency'],
    tag: 'Finance · Systems',
    title: "A ledger that doesn't freeze the screen",
    tagline: '50K+ entries with live exchange rates and no blocking calls.',
    oneSentence: '50K+ entries with live exchange rates and no blocking calls.',
    keyMetric: '[p95 commit time: before to after]',
    headlineNumbers: [
      { label: 'Ledger Capacity', value: '50K+ entries' },
      { label: 'P95 Commit Time', value: '[p95 commit time]' },
      { label: 'UI Thread Freeze', value: '0 ms' },
    ],
    status: 'Complete',
    readingTime: '5 min read',
    stack: ['Python', 'PostgreSQL', 'Redis', 'FastAPI', 'ECB API'],
    problem:
      'Multi-currency accounting rollups were performing synchronous external HTTP calls to fetch live European Central Bank FX rates inside active SQL transaction blocks. This held row-level database locks, freezing UI screens across the enterprise.',
    howItWorks: {
      description:
        'FX rate polling was moved into an asynchronous background daemon that caches daily currency matrices in Redis. Ledger commits use PostgreSQL compound indexing with write-through validation, decoupling HTTP calls from database transactions.',
      diagramType: 'ledger',
    },
    decisions: [
      {
        decision: 'Write-through Redis rate cache refreshed asynchronously outside transaction loops.',
        why: 'Eliminated external network I/O from critical SQL database transaction blocks.',
        rejectedAlternative: 'Inline cached REST client within transaction scope.',
        rejectionReason: 'Still blocked database threads whenever DNS resolution or upstream latency spiked.',
      },
      {
        decision: 'Compound B-Tree index on (account_id, currency, transaction_date DESC).',
        why: 'Allowed balance ledger rollups across 50K+ entries to execute in a single index scan.',
        rejectedAlternative: 'Separate individual indexes on account_id and transaction_date.',
        rejectionReason: 'Triggered costly bitmap heap index merges on large customer accounts.',
      },
    ],
    results: [
      {
        metric: 'Transaction Commit P95 Latency',
        mine: '[p95 commit time: after]',
        baseline: '[p95 commit time: before]',
        delta: '[p95 improvement]',
      },
      {
        metric: 'Database Lock Wait Time',
        mine: '< 2 ms',
        baseline: '4,200 ms (Under peak load)',
        delta: '-99.9% contention',
      },
    ],
    resultsMethod: 'Method: [dataset · grader · hardware · date]',
    whatWentWrong: [
      {
        failure: 'Floating-point rounding errors on Japanese Yen (JPY) conversion boundaries.',
        rootCause: 'Default IEEE 754 float types caused fractional cent discrepancies.',
        resolution: 'Migrated all ledger balances to Python arbitrary-precision Decimal and SQL NUMERIC(18,4).',
      },
    ],
    whatNext: [
      'Implement multi-region replica read pooling for distributed international accounting offices.',
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
  },
  {
    id: 'dns-watchdog',
    slug: 'dns-watchdog',
    aliases: ['fails-closed-dns-watchdog'],
    tag: 'Security · DevOps',
    title: "DNS filtering that can't be switched off",
    tagline: 'A self-healing watchdog on 35+ workstations, with no license fee.',
    oneSentence: 'A self-healing watchdog on 35+ workstations, with no license fee.',
    keyMetric: '<140 ms to revive',
    headlineNumbers: [
      { label: 'Revival Latency', value: '<140 ms' },
      { label: 'Deployed Workstations', value: '35+' },
      { label: 'Annual Licensing Cost', value: '$0' },
    ],
    status: 'Complete',
    readingTime: '4 min read',
    stack: ['Python', 'Linux eBPF / iptables', 'Systemd', 'Bash'],
    problem:
      'Commercial endpoint security licenses incurred steep recurring annual costs, yet users could bypass standard software filters by terminating the background filtering process or editing local resolver files.',
    howItWorks: {
      description:
        'Dual cross-monitoring watchdogs continuously supervise an anti-tamper DNS proxy. If process termination is detected, kernel-level iptables rules immediately trap outbound port 53 traffic, failing closed until the daemon revives in under 140ms.',
      diagramType: 'dns',
    },
    decisions: [
      {
        decision: 'Dual cross-monitoring daemon architecture with reciprocal heartbeat pings.',
        why: 'Prevents single-point-of-failure termination; if daemon A is killed, daemon B instantly revives it.',
        rejectedAlternative: 'Standard systemd restart directive alone.',
        rejectionReason: 'Subject to systemd restart rate-limiting (BurstLimit) when repeatedly terminated.',
      },
      {
        decision: 'Default-drop kernel firewall rule with local proxy redirect.',
        why: 'Ensures zero uninspected DNS queries escape during the sub-140ms daemon restart window.',
        rejectedAlternative: 'Fail-open software proxy bypass.',
        rejectionReason: 'Allowed untrusted traffic to leak during crash-recovery cycles.',
      },
    ],
    results: [
      {
        metric: 'Watchdog Process Revival Time',
        mine: '< 140 ms',
        baseline: '6,200 ms (Manual intervention / script poll)',
        delta: '97.7% faster recovery',
      },
      {
        metric: 'Unfiltered Packet Leakage on SIGKILL',
        mine: '0 packets (fails closed)',
        baseline: 'All queries leaked',
        delta: 'Complete protection',
      },
    ],
    resultsMethod: 'Method: [dataset · grader · hardware · date]',
    whatWentWrong: [
      {
        failure: 'Dual watchdogs entered rapid mutual revival contention under SIGSTOP debugging.',
        rootCause: 'Heartbeat timeout was configured tighter than thread scheduler context-switch interval.',
        resolution: 'Added a 40ms monotonic lockback window and shared IPC mutex check.',
      },
    ],
    whatNext: [
      'Compile watchdog daemon into standalone native Rust binary for zero-dependency deployment.',
    ],
    githubUrl: 'https://github.com/harshthanki-codes',
  },
];

export function getAllProjects(): ProjectData[] {
  return PROJECTS_DATA;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find(
    (p) => p.slug === slug || (p.aliases && p.aliases.includes(slug))
  );
}
