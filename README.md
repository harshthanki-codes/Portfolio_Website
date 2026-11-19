# Harsh Thanki — AI Engineer

[![Live Site](https://img.shields.io/badge/Live%20Site-harshthanki--codes.github.io-FF5A36?style=flat-square&logo=github)](https://harshthanki-codes.github.io/Portfolio_Website/)
[![Framework](https://img.shields.io/badge/Next.js-16%20(App%20Router)-16161D?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](LICENSE)

Personal portfolio and systems engineering showcase for **Harsh Thanki**, an **AI engineer** based in Ahmedabad, India. Specializing in **deterministic LLM backends**, **fault-tolerant inference DAGs**, and **local open-weights parameter tuning (QLoRA, Ollama, Unsloth)** running entirely on private hardware at zero marginal token cost.

🌐 **Live Portfolio:** [https://harshthanki-codes.github.io/Portfolio_Website/](https://harshthanki-codes.github.io/Portfolio_Website/)

---

## 🛠️ Featured Systems & Case Studies

Each case study provides end-to-end technical documentation including architectural diagrams, explicit rejected alternatives, empirical trade-off matrices, and real incident postmortems:

1. **Enterprise ERP Coding Assistant**  
   Air-gapped coding intelligence fine-tuned on relational database schemas. Reaches 8.7/10 benchmark parity against frontier commercial models on internal ERP ORM reasoning tasks at $0 marginal token cost.  
   *(Local fine-tuning, YaRN RoPE extension, AST guardrails)*

2. **7-Tier Voice Order Ingestion DAG**  
   Converts multi-dialect warehouse voice orders into verified ERP transactions. Built with a deterministic 7-stage failover circuit breaker (Whisper Large-v3 → Flash-Lite → Cloud ASR → Human Operator) so no voice order is ever dropped.  
   *(Circuit-breaker state machine, SIMD token distance, live fallback)*

3. **High-Throughput Financial Ledger Engine**  
   Distributed double-entry accounting engine handling concurrent writes without database contention or ledger lockups.  
   *(P95 write optimization, compound indexing, idempotency keys)*

4. **Self-Healing DNS Threat Watchdog**  
   Low-overhead network watchdog providing sub-140ms automatic packet filtering and query failover across distributed regional clusters.  
   *(eBPF kernel hooks, health probes, automated failover)*

---

## 🎨 Design Philosophy: "Ink and Coral"

- **Palette Discipline:** High-contrast warm paper ground (`#F7F5F2`), deep full-bleed ink blocks (`#16161D`), and an intentional coral accent (`#FF5A36`). Coral is strictly reserved for high-priority interactive states and is never used as text on paper.
- **Zero Layout Shift (CLS 0.000):** Height-reserved layout frames ensure static stability during streaming and hydration.
- **Speculative Decoding Signature:** Real-time visual representation of speculative token candidate generation, rejection, and verification on the homepage hero.
- **Accessibility & Contrast:**
  - Text contrast exceeds **16.2:1** (WCAG AAA compliant).
  - High-visibility **3px solid focus rings** on all interactive controls for keyboard accessibility.
  - Complete compliance with `prefers-reduced-motion: reduce`.
- **Static Zero-Runtime Architecture:** Fully compiled static export (`output: 'export'`) optimized for GitHub Pages subpath deployment (`/Portfolio_Website/`).

---

## 🏗️ Repository Architecture

```
├── src/
│   ├── app/                      # Next.js App Router (Static Export)
│   │   ├── layout.tsx            # Global metadata, typography, and accessibility shell
│   │   ├── page.tsx              # Homepage: Hero, Proof Strip, Break-A-Tier Demo, Bento Work, Contact
│   │   ├── work/[slug]/          # In-depth architectural case studies
│   │   │   ├── page.tsx          # Case study body (Problems, Diagrams, Trade-offs, Results)
│   │   │   └── opengraph-image.tsx # Dynamic OpenGraph card generation
│   │   ├── not-found.tsx         # Custom 404 page with Ink & Coral styling
│   │   ├── robots.ts             # Static search crawler directives
│   │   └── sitemap.ts            # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── home/                 # Hero, ProofStrip, BreakATierDemo, SelectedWork, AboutSection, ContactSection
│   │   ├── layout/               # Header, Footer, navigation primitives
│   │   ├── motion/               # Pointer glow, reveal observers, reduced-motion handlers
│   │   └── ui/                   # Button, Container, Section, Label, Hairline primitives
│   ├── data/projects.ts          # Structured project inventory and benchmark data
│   └── styles/globals.css        # Tailwind CSS v4 design tokens and focus states
├── public/                       # Static media, icons, and downloadable PDF resume
├── scripts/
│   ├── local-server.cjs          # Local HTTP static server for testing production exports
│   └── run-quality-gate.cjs      # Automated Playwright + Axe accessibility verification suite
└── next.config.ts                # Next.js export & GitHub Pages basePath configuration
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ (Node.js 22 LTS recommended)
- npm 10+

### Setup & Run
```bash
# 1. Clone the repository
git clone https://github.com/harshthanki-codes/Portfolio_Website.git
cd Portfolio_Website

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build static export for production
npm run build
```

The static production export will be generated in `./out`, configured with basePath `/Portfolio_Website`.

### Quality & Verification
```bash
# Verify static build and run automated axe accessibility & viewport audits
node scripts/run-quality-gate.cjs
```

---

## 📄 License

Distributed under the [MIT License](LICENSE). Copyright © 2026 Harsh Thanki.
