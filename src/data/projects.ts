export type ProjectStatus = 'Active' | 'Field Testing' | 'Complete';
export type ProjectCategory = 'AI/ML' | 'ERP' | 'Automation' | 'Security' | 'Mobile' | 'DevTools' | 'LegalTech';

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

export interface CaseStudySubTrack {
  name: string;
  focus: string;
  stack: string[];
  approach: string;
  benchmark: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  statusDetail: string;
  statusWeight: number; // 1 = Active, 2 = Field Testing, 3 = Complete
  categories: ProjectCategory[];
  tags: string[];
  stack: string[];
  primaryTech: string[];
  
  // The 4-Part Narrative Framework
  problem: string;
  constraint: string;
  architecture: {
    description: string;
    flowTitle: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  result: {
    metrics: { label: string; value: string }[];
    summary: string;
  };
  
  subTracks?: CaseStudySubTrack[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'erp-llm-foundation',
    title: 'Autonomous ERP Intelligence Engine — Fine-Tuned Open-Weights LLMs',
    tagline: 'Locally deployed, fine-tuned open-weights coding intelligence beating commercial API benchmarks at zero marginal token cost.',
    status: 'Active',
    statusDetail: 'Active — Phase 2 in progress',
    statusWeight: 1,
    categories: ['AI/ML', 'DevTools', 'ERP'],
    tags: ['AI/ML', 'LLM Fine-Tuning', 'ERP Systems', 'DevTools'],
    stack: [
      'Python',
      'HuggingFace Transformers',
      'PEFT/LoRA',
      'QLoRA',
      'BitsAndBytes',
      'Ollama',
      'Unsloth',
      'PyTorch'
    ],
    primaryTech: ['PEFT/QLoRA', 'Ollama', 'Unsloth', 'Python'],
    problem: 'Cloud coding assistants incur recurring per-token expenses and risk leaking proprietary enterprise ERP business logic off-premise.',
    constraint: 'Fine-tuning open-source models (DeepSeek Coder 6.7B, Qwen 2.5 Coder 7B, Mistral 7B) on consumer GPU compute to accurately comprehend complex ORM quirks, XML architecture views, and relational constraints.',
    architecture: {
      description: 'Ingested raw enterprise codebases across 8 curated sources -> Cleaned and tokenized into structured instruction pairs -> QLoRA 4-bit quantized fine-tuning via Unsloth & PEFT -> Local Ollama air-gapped runtime -> Custom transparent proxy bridge intercepting CLI calls and routing directly to on-premise weights.',
      flowTitle: 'On-Premise Fine-Tuning & Local Proxy Bridge Pipeline',
      nodes: [
        { id: '1', label: '150MB+ ERP Codebase Dataset', sub: '8 curated source corpora', type: 'input' },
        { id: '2', label: 'QLoRA 4-bit Quantization', sub: 'Unsloth + Transformers', type: 'process' },
        { id: '3', label: 'Domain-Tuned Weights', sub: 'DeepSeek / Qwen 2.5', type: 'process' },
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
    result: {
      metrics: [
        { label: 'Benchmark Score', value: '8.7 / 10' },
        { label: 'Baseline (Claude Sonnet 5)', value: '10 / 10' },
        { label: 'Marginal Token Cost', value: '$0.00' },
        { label: 'Internal Eval Suite', value: '22 Tests / 10 Cats' }
      ],
      summary: 'Domain-tuned DeepSeek Coder scored 8.7/10 against Claude Sonnet 5 on ORM/XML/logic benchmarks at $0 marginal cost. Built a comprehensive 22-test internal evaluation suite and expanded training corpora to 150MB+.'
    }
  },
  {
    id: 'financial-ledger-multi-currency',
    title: 'High-Throughput Financial Ledger & Multi-Currency ERP Engine',
    tagline: 'High-throughput financial ledger tracking materials, labour, and live FX rates with zero UI-blocking synchronous operations.',
    status: 'Complete',
    statusDetail: 'Feature-complete',
    statusWeight: 3,
    categories: ['ERP', 'Automation'],
    tags: ['ERP Architecture', 'Financial Ledger', 'PostgreSQL', 'Performance Optimization'],
    stack: [
      'Python',
      'Enterprise ORM',
      'PostgreSQL',
      'XML / Relational Views',
      'ECB FX Rate API',
      'In-Memory Cache'
    ],
    primaryTech: ['ERP ORM', 'PostgreSQL', 'Python', 'Asynchronous Queues'],
    problem: 'Project-based operations require multi-currency, categorized cost tracking (materials, labour, overhead) tied live to purchase orders, vendor invoices, and timesheets.',
    constraint: 'Synchronous external FX rate API lookups were freezing client sessions, and computed fields triggered severe N+1 query cascades across massive timesheet tables.',
    architecture: {
      description: 'Refactored backend architecture to introduce an automated FX rate cache layer, compound database indexing, and asynchronous batch rollups eliminating synchronous API locks and query cascades.',
      flowTitle: 'Dual-Currency Computed Rollup & Asynchronous FX Engine',
      nodes: [
        { id: '1', label: 'Source Invoices & Orders', sub: 'Multi-currency ledger', type: 'input' },
        { id: '2', label: 'FX Rate Cache Layer', sub: 'Automated Rate Sync', type: 'process' },
        { id: '3', label: 'Batch ORM Resolver', sub: 'Indexed DB Rollup', type: 'process' },
        { id: '4', label: 'Master Financial Sheet', sub: 'Zero-Latency View', type: 'output' }
      ],
      edges: [
        { from: '1', to: '3' },
        { from: '2', to: '3' },
        { from: '3', to: '4' }
      ]
    },
    result: {
      metrics: [
        { label: 'Security & Perf Audit', value: 'Passed 100%' },
        { label: 'N+1 Query Resolution', value: '0 Cascades' },
        { label: 'UI Blocking Time', value: '0ms' }
      ],
      summary: 'Production-grade, standards-compliant, and passed a full security/performance audit resolving critical N+1 database queries, synchronous UI locks, and missing database indexes.'
    }
  },
  {
    id: 'multimodal-voice-failover-dag',
    title: 'Multimodal Voice-to-Order Ingestion & 7-Tier Failover DAG',
    tagline: 'End-to-end multimodal audio ingestion converting complex multilingual voice calls into verified ERP sales and purchase orders.',
    status: 'Field Testing',
    statusDetail: 'Active field testing',
    statusWeight: 2,
    categories: ['AI/ML', 'Mobile', 'ERP', 'Automation'],
    tags: ['AI/ML', 'Speech-to-Structured-Data', 'ERP Automation', 'Flutter', 'Mobile'],
    stack: [
      'Python',
      'Google Gemini (multimodal)',
      'NVIDIA NIM',
      'RapidFuzz',
      'Asynchronous Job Queues',
      'Flutter/Android',
      'HMAC-SHA256'
    ],
    primaryTech: ['Gemini Multimodal', 'NVIDIA NIM', 'Flutter', 'Async Queues'],
    problem: 'Manual entry of multilingual (Gujarati/Hindi/English) voice orders caused delivery bottlenecks, transcription errors, and lost inventory data.',
    constraint: 'Field audio contains background machinery noise and dialect code-switching. System required strict failover tolerance to guarantee 0% order drop rate during cloud API disruptions.',
    architecture: {
      description: 'HMAC-SHA256 authenticated webhook streams raw audio into memory -> Processed through a 7-tier model failover chain (Gemini multimodal -> NVIDIA NIM fallbacks) -> Fuzzy catalogue SKU matching -> Dual-confidence auto-approval gate -> Asynchronous database write -> Companion mobile application for review.',
      flowTitle: '7-Tier Multimodal Voice-to-Order Ingestion & Verification DAG',
      nodes: [
        { id: '1', label: 'Audio Ingestion Stream', sub: 'HMAC-SHA256 Secure Webhook', type: 'input' },
        { id: '2', label: 'Tier 1: Multimodal LLM', sub: 'Direct acoustic reasoning', type: 'process' },
        { id: '3', label: 'Tier 2-7: NIM & Fallback Mesh', sub: 'Zero-drop circuit breaker', type: 'fallback' },
        { id: '4', label: 'Fuzzy SKU Matcher', sub: 'Catalogue alignment', type: 'process' },
        { id: '5', label: 'Dual Confidence Gate', sub: 'Auto-Approval Rule', type: 'decision' },
        { id: '6', label: 'Asynchronous Queue Engine', sub: 'Automated Record Creation', type: 'output' },
        { id: '7', label: 'Companion Mobile App', sub: 'Review UI', type: 'output' }
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
    result: {
      metrics: [
        { label: 'Failover Architecture', value: '7-Tier Chain' },
        { label: 'Dialect Ingestion', value: 'Guj / Hin / Eng' },
        { label: 'Order Drop Rate', value: '0% in field' }
      ],
      summary: 'Automatic Sales/Purchase Order creation with delivery tracking, live on production servers undergoing real-call field trials with zero dropped orders.'
    }
  },
  {
    id: 'fails-closed-dns-watchdog',
    title: 'Fails-Closed Enterprise DNS Proxy & Anti-Tamper Watchdog',
    tagline: 'Zero-license, tamper-proof endpoint DNS filtering and self-healing watchdog architecture across 35+ workstations.',
    status: 'Complete',
    statusDetail: 'Ready for deployment',
    statusWeight: 3,
    categories: ['Security', 'DevOps'],
    tags: ['Systems Programming', 'Security Architecture', 'Windows Services', 'DevOps'],
    stack: [
      'Windows Services',
      'Custom DNS Proxy',
      'Watchdog Service Architecture',
      'PowerShell',
      'C#'
    ],
    primaryTech: ['Windows Services', 'DNS Proxy', 'Watchdog System', 'DevOps'],
    problem: 'Required tamper-proof, zero-license-cost network whitelisting across 35+ workstations to ensure secure enterprise operation without expensive dedicated appliance hardware.',
    constraint: 'Users could easily circumvent standard DNS blocks via browser DNS-over-HTTPS (DoH) settings, manual service terminations, or hosts file modifications.',
    architecture: {
      description: 'Engineered a low-level local DNS proxy intercepting all port 53 traffic, combined with registry policies stripping browser DoH capabilities. Protected by a bi-directional "fails closed" Watchdog service that continuously verifies process integrity and auto-restarts upon termination.',
      flowTitle: 'Fails-Closed DNS Proxy & Anti-Tamper Watchdog Architecture',
      nodes: [
        { id: '1', label: 'Outbound Browser Traffic', sub: 'DoH Bypasses Stripped', type: 'input' },
        { id: '2', label: 'Local DNS Proxy', sub: 'Strict Whitelist Filter', type: 'process' },
        { id: '3', label: 'Fails-Closed Watchdog', sub: 'Process Health Monitor', type: 'decision' },
        { id: '4', label: 'Whitelisted Enterprise Gateway', sub: 'Tamper-Proof Routing', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '4', label: 'Matched Whitelist' },
        { from: '3', to: '2', label: 'Auto-Revive if Killed' }
      ]
    },
    result: {
      metrics: [
        { label: 'Workstations Deployed', value: '35+ Nodes' },
        { label: 'License Cost', value: '$0.00' },
        { label: 'DoH Bypass Vectors', value: '100% Sealed' },
        { label: 'Documentation', value: 'Bilingual (En/Gu)' }
      ],
      summary: 'Closes DNS-over-HTTPS bypass loopholes in browsers; auto-restarting tamper protection; full rollout with comprehensive documentation.'
    }
  },
  {
    id: 'neural-voice-cloning-studio',
    title: 'Neural Speech Synthesis & Zero-Shot Voice Cloning Studio',
    tagline: 'Dual-architecture speech synthesis: Studio-grade Hindi narration vs. ultra-fast zero-shot cloning from under 60s of reference audio.',
    status: 'Active',
    statusDetail: 'Both in active refinement',
    statusWeight: 1,
    categories: ['AI/ML', 'Automation'],
    tags: ['AI/ML', 'Speech Synthesis', 'Cloud Infrastructure', 'Zero-Cost Engineering'],
    stack: [
      'Python',
      'VibeVoice (GPU Cloud)',
      'AI4Bharat IndicF5',
      'Whisper',
      'Resemblyzer',
      'PyTorch'
    ],
    primaryTech: ['VibeVoice', 'IndicF5', 'Resemblyzer', 'GPU Cloud'],
    problem: 'Two distinct voice-cloning requirements — one needing commercial-grade narration matching proprietary cloud providers, another needing true zero-cost cloning from under 60 seconds of reference audio.',
    constraint: 'Track A required studio-grade multi-speaker Hindi dialogue; Track B hit provider-side GPU training blocks across free cloud tiers, forcing an immediate pivot to zero-shot inference.',
    architecture: {
      description: 'Track A deployed self-hosted VibeVoice on GPU cloud instances with custom fine-tuning and multi-speaker dialogue UI. Track B pivoted to zero-shot IndicF5 with zero training time, backed by an automated QC gate scoring Word Error Rate (WER) and speaker similarity via Resemblyzer.',
      flowTitle: 'Dual-Track Speech Synthesis & Automated QC Scoring Matrix',
      nodes: [
        { id: '1', label: 'Reference Audio (<60s)', sub: 'Clean acoustic sample', type: 'input' },
        { id: '2', label: 'Track A: GPU Studio', sub: 'High-Fidelity Dialogue', type: 'process' },
        { id: '3', label: 'Track B: IndicF5 Zero-Shot', sub: 'Zero-training inference', type: 'process' },
        { id: '4', label: 'Automated QC Gate', sub: 'Resemblyzer + Whisper WER', type: 'decision' },
        { id: '5', label: 'Production Speech Output', sub: 'Natural Turn-Taking', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2', label: 'Commercial Narration' },
        { from: '1', to: '3', label: 'Zero-Cost Target' },
        { from: '2', to: '4' },
        { from: '3', to: '4' },
        { from: '4', to: '5' }
      ]
    },
    subTracks: [
      {
        name: 'Track A: Studio-Grade Narration',
        focus: 'Match commercial quality for professional multi-speaker Hindi dialogue.',
        stack: ['GPU Compute', 'VibeVoice', 'Custom Hindi Fine-Tune', 'Studio UI'],
        approach: 'Self-hosted VibeVoice with a dedicated Hindi fine-tune and custom studio interface supporting natural multi-character dialogue turn-taking.',
        benchmark: 'Benchmarked directly against commercial cloud reference outputs with near-parity acoustic naturalness.'
      },
      {
        name: 'Track B: Zero-Cost, Zero-Training Instant Cloning',
        focus: 'Clone target voices in seconds with zero infrastructure budget.',
        stack: ['AI4Bharat IndicF5', 'Whisper', 'Resemblyzer', 'GPU Instances'],
        approach: 'Pivoted to zero-shot IndicF5 requiring <60s of audio and zero training steps, governed by automated QC checks.',
        benchmark: 'Cut voice turnaround time from hours of model training down to 3 seconds of direct inference.'
      }
    ],
    result: {
      metrics: [
        { label: 'Reference Audio Needed', value: '< 60 seconds' },
        { label: 'Track B Turnaround', value: 'Seconds vs Hours' },
        { label: 'Automated QC', value: 'WER + Similarity' }
      ],
      summary: 'Two working pipelines under two distinct constraint sets — one tuned for maximum fidelity, one tuned for zero cost and speed, cutting turnaround from hours of training to seconds of inference.'
    }
  },
  {
    id: 'meeting-intelligence-mesh',
    title: 'Zero-Click Enterprise Meeting Intelligence & 6-Tier LLM Mesh',
    tagline: 'Zero-cost, zero-click meeting intelligence engine with 6-tier LLM failover and automated workspace dispatch.',
    status: 'Field Testing',
    statusDetail: 'Cross-browser testing phase',
    statusWeight: 2,
    categories: ['AI/ML', 'Automation', 'DevTools'],
    tags: ['AI/ML', 'NLP', 'Enterprise Automation', 'Workspace Integration'],
    stack: [
      'Google Apps Script',
      'Chrome Extension (Manifest V3)',
      'Gemini 1.5',
      'Groq (LLaMA 3.3)',
      'Mistral Large',
      'NVIDIA NIM',
      'OpenRouter',
      'Drive API'
    ],
    primaryTech: ['Manifest V3', 'Apps Script', '6-Tier LLM Failover', 'Drive API'],
    problem: 'Multilingual technical calls were manually transcribed into SOWs, meeting minutes, and task lists — slow and error-prone.',
    constraint: 'Enterprise transcription platforms charge recurring fees, and single-provider LLM API rate limits caused data loss during long technical discussions.',
    architecture: {
      description: 'Browser Extension silently captures free live closed captions in real-time -> Buffers and transmits to serverless script -> Processed through a 6-tier fallback matrix (Gemini -> Groq -> Mistral -> NVIDIA NIM -> OpenRouter -> Local heuristics) -> Automatically formats SOWs, MOMs, and Action Items into organized workspace folders.',
      flowTitle: 'Zero-Cost Caption Ingestion & 6-Tier LLM Resilience Mesh',
      nodes: [
        { id: '1', label: 'Live Meeting Captions', sub: 'Zero-Click Browser Extension', type: 'input' },
        { id: '2', label: 'Tier 1: Primary LLM', sub: 'Primary Extraction Engine', type: 'process' },
        { id: '3', label: 'Tier 2-6: Multi-Model Mesh', sub: 'Instant failover routing', type: 'fallback' },
        { id: '4', label: 'Document Generator', sub: 'SOW / MOM / Tasks', type: 'process' },
        { id: '5', label: 'Workspace Hierarchy', sub: 'Organized Storage', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3', label: 'On 429 / Outage', isFallback: true },
        { from: '2', to: '4' },
        { from: '3', to: '4' },
        { from: '4', to: '5' }
      ]
    },
    result: {
      metrics: [
        { label: 'LLM Failover Tiers', value: '6 Providers' },
        { label: 'Transcription Cost', value: '$0.00' },
        { label: 'Manual Clicks Needed', value: '0 Clicks' }
      ],
      summary: 'Bypasses enterprise paid transcription tiers using free live captions — a zero-cost, zero-click meeting intelligence pipeline.'
    }
  },
  {
    id: 'legal-docket-extraction-pipeline',
    title: 'Serverless Legal Docket Automation & Multilingual Extraction Pipeline',
    tagline: 'Serverless legal docket scraping, OCR CAPTCHA-solving, and multilingual judgment summarization directly inside cloud workspace.',
    status: 'Field Testing',
    statusDetail: 'End-to-end historical testing in progress',
    statusWeight: 2,
    categories: ['Automation', 'LegalTech', 'DevTools'],
    tags: ['Automation', 'LegalTech', 'Cloud Workspace', 'OCR'],
    stack: [
      'Google Apps Script',
      'Google Sheets',
      'Google Drive',
      'Gemini Spark',
      'OCR CAPTCHA Solver'
    ],
    primaryTech: ['Apps Script', 'Gemini Spark', 'OCR Engine', 'Cloud Storage'],
    problem: 'Manually tracking and summarizing court case documents across languages was labor-intensive and delayed case briefings.',
    constraint: 'Court portals actively block automated access with rotating distorted CAPTCHAs, deliver multi-hundred-page vernacular PDF judgments, and the system required zero dedicated cloud server overhead.',
    architecture: {
      description: 'Fully serverless workflow built in cloud script engine -> Automated HTTP requests parse case records -> Custom OCR solves visual CAPTCHAs -> Downloads and archives PDFs -> LLM extracts key holdings and generates multilingual summaries in English, Hindi, and Gujarati directly into spreadsheets and slide decks.',
      flowTitle: 'Serverless Legal Docket Ingestion & Multilingual Briefing Pipeline',
      nodes: [
        { id: '1', label: 'Court Record Portals', sub: 'Protected Case Records', type: 'input' },
        { id: '2', label: 'OCR CAPTCHA Solver', sub: 'Automated Access Gate', type: 'process' },
        { id: '3', label: 'Cloud PDF Archival', sub: 'High-Volume Storage', type: 'process' },
        { id: '4', label: 'Multilingual LLM', sub: 'Extraction Engine', type: 'process' },
        { id: '5', label: 'Automated Briefings', sub: 'Sheets & Slides (En/Hi/Gu)', type: 'output' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '3', to: '4' },
        { from: '4', to: '5' }
      ]
    },
    result: {
      metrics: [
        { label: 'Infrastructure Cost', value: '$0.00 Serverless' },
        { label: 'User Setup Friction', value: 'Zero Setup' },
        { label: 'Languages Supported', value: 'Eng / Hin / Guj' }
      ],
      summary: 'Zero infrastructure cost, zero technical setup required, automating end-to-end legal document retrieval and multilingual briefing.'
    }
  }
];
