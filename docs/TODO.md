# Engineering Action Items & Verification Backlog (TODO.md)
**Project:** Harsh Thanki Portfolio & Engineering Systems Showcase  
**Status:** Active Tracking  
**Last Updated:** November 2026  

This file catalogues all placeholders, performance benchmarks to verify against physical hardware, and manual deployment actions required in external dashboards.

---

## 1. Metric Placeholders to Measure on Physical Hardware

| Project / Section | Placeholder Tag | Target Metric to Benchmark | Instructions |
| :--- | :--- | :--- | :--- |
| **Hero Proof Metric** | `[METRIC]` | `Sub-80ms P99 Local LLM Speculative TTFT` | Run test batch of 1,000 prompt completions through Ollama/vLLM on target hardware; measure Time to First Token (TTFT) and log exact median & 99th percentile. |
| **Multimodal Voice DAG** | `[MEASURE THIS]` | `Exact Total Training & Fine-Tuning Compute Cost` | Check cloud billing or electricity meter log for Gemini multimodal prompt tuning + Whisper fine-tuning runs; replace placeholder in `src/data/projects.ts`. |
| **Case Studies** | `[MEASURE THIS]` | `Full Cold-Start Latency on Zero-Shot Voice Studio` | Benchmark reference audio enrollment time from wav ingestion to synthetic vocoder output on RTX 4090. |

---

## 2. Manual External Configurations (Host & Services)

These tasks must be performed in external provider web consoles:

### 2.1 Domain & DNS Configuration
- [ ] **Custom Domain Setup:** Add apex domain `harshthanki.dev` (or chosen domain) in Vercel Project Settings -> Domains.
- [ ] **DNS Records:**
  - `A` Record: `@` -> `76.76.21.21` (Vercel Anycast IP)
  - `CNAME` Record: `www` -> `cname.vercel-dns.com`
- [ ] **HTTPS Certificate:** Verify automatic Let's Encrypt SSL issuance in Vercel dashboard.

### 2.2 Environment Variables (Vercel Project Settings)
- [ ] `RESEND_API_KEY`: Generate a live production API key at [resend.com](https://resend.com) with domain sending verification.
- [ ] `CONTACT_NOTIFICATION_EMAIL`: Set to personal destination email (e.g., `harshthanki203@gmail.com`).
- [ ] `RATE_LIMIT_MAX_REQUESTS`: Default `5` requests per IP per 15-minute sliding window.

### 2.3 Social & Rich Results Verification
- [ ] **Google Rich Results Test:** Submit `https://<domain>/` and verify `Person` and `WebSite` JSON-LD schema validity.
- [ ] **LinkedIn Post Inspector:** Paste `https://<domain>/work/erp-llm-foundation` to force cache refresh on generated 1200x630 OG image.
- [ ] **Twitter Card Validator:** Verify `summary_large_image` rendering across all `/work/[slug]` routes.

---

## 3. Resume & Asset Verification
- [ ] Replace `public/Harsh_Thanki_Resume.pdf` with the updated, single-page production resume reflecting the refined technical claims (removing "zero hallucination guarantee").
- [ ] Verify headshot image at `public/harsh-thanki-transparent.png` with AVIF/WebP equivalents.
