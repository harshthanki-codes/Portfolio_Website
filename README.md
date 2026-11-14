# Harsh Thanki — AI Systems Architect & Solutions Engineer

[![Production Status](https://img.shields.io/badge/Status-Production%20Ready-emerald?style=flat-square&logo=vercel)](https://harshthanki-codes.github.io/Portfolio_Website/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](LICENSE)
[![Framework](https://img.shields.io/badge/Framework-Next.js%20(App%20Router)-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Styles-Tailwind%20CSS%20v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%20Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Personal portfolio and systems engineering showcase for **Harsh Thanki**, an AI/ML Engineer specializing in **deterministic LLM backends**, **fault-tolerant inference DAGs**, and **local open-weights parameter tuning (QLoRA, Ollama, Unsloth)** at zero marginal token cost.

- **Live URL:** [https://harshthanki-codes.github.io/Portfolio_Website/](https://harshthanki-codes.github.io/Portfolio_Website/)
- **Design System Catalog:** [/design](https://harshthanki-codes.github.io/Portfolio_Website/design)
- **Model Evaluation Dashboard:** [/eval](https://harshthanki-codes.github.io/Portfolio_Website/eval)

---

## 📐 Architecture & How It Is Built

This portfolio is built on an **"Engineering Notebook with System Diagrams"** concept. It prioritizes technical legibility, mathematical contrast, zero layout shift, and minimal client-side overhead:

```
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Self-hosted next/font (Space Grotesk, Inter, JetBrains Mono)
│   │   ├── page.tsx              # Homepage: Hero, Selected Work, Experience, Skills, Contact
│   │   ├── design/page.tsx       # Live Design Token & Component Catalog (/design)
│   │   ├── eval/page.tsx         # Empirical Model Evaluation & Streaming Harness (/eval)
│   │   ├── work/[slug]/          # Dynamic Case Study System with Trade-off Matrices
│   │   │   ├── page.tsx          # Full Case Study Breakdown
│   │   │   └── opengraph-image.tsx # Dynamic 1200x630 OG image generation via next/og
│   │   ├── api/                  # Next.js Route Handlers
│   │   │   ├── contact/route.ts  # Zod validation, Honeypot bot trap, IP rate limiter
│   │   │   └── demo/route.ts     # Speculative decoding streaming demo endpoint
│   │   ├── sitemap.ts            # Dynamic sitemap.xml generator
│   │   ├── robots.ts             # Dynamic robots.txt metadata
│   │   └── manifest.ts           # Web App Manifest
│   ├── components/               # Accessible Component Primitives (Button, Card, Tag, Heading)
│   ├── data/projects.ts          # Structured case-study data with benchmark metrics
│   └── styles/globals.css        # Tailwind v4 CSS variables & design tokens
└── docs/
    ├── AUDIT.md                  # Comprehensive architectural audit report
    ├── API.md                    # Endpoint schemas, rate limits, and verification curls
    ├── QUALITY.md                # Lighthouse scores (98+ Perf, 100 a11y, 100 SEO), a11y tests
    └── TODO.md                   # Metric verification backlog and manual deployment tasks
```

---

## 🎨 Design System Highlights

- **Obsidian & Industrial Amber:** Deep high-contrast background (`#090B0E`) paired with a single purpose-driven signal amber accent (`#F59E0B`). Absolutely no generic purple gradients or blurry glass cards.
- **Strict 8px Grid:** Mathematical spacing rhythm for all margins, paddings, and touch targets.
- **Self-Hosted Typography via `next/font`:**
  - Display: `Space Grotesk` (character, geometric)
  - Text: `Inter` (neutral, legible)
  - Mono: `JetBrains Mono` (code blocks & telemetry labels)
- **WCAG 2.1 AA Contrast:** Meets 16.5:1 text contrast and 9.4:1 accent contrast with visible focus rings (`focus-visible`).
- **Motion Layer:** Driven by Lenis smooth scroll sharing a single animation loop. Full compliance with `prefers-reduced-motion: reduce`.

---

## 🚀 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/harshthanki-codes/Portfolio_Website.git
cd Portfolio_Website

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev

# 5. Production build & type check
npm run build
```

---

## 📋 Manual Setup Checklist (External Services)

For complete deployment in external dashboards, see [docs/TODO.md](docs/TODO.md):
1. **Custom Domain:** Point your DNS (`A` record to `76.76.21.21`, `CNAME` for `www`) in Vercel or your hosting dashboard.
2. **Resend Email API:** Set `RESEND_API_KEY` and `CONTACT_NOTIFICATION_EMAIL` in your production environment variables.
3. **Rich Results Verification:** Test URLs against Google Rich Results and LinkedIn Post Inspector.

---

## 📄 License

Distributed under the [MIT License](LICENSE). Copyright © 2026 Harsh Thanki.
