# Engineering Action Items & Verification Backlog (TODO.md)
**Project:** Harsh Thanki Portfolio  
**Status:** Active Tracking  
**Last Updated:** November 2026  

---

## 1. Hero Proof Point & Benchmark Verification

- [ ] **Empirical Hero Proof Point Measurement:**
  - *Context:* The previous "[METRIC]" placeholder and "Verified" label were removed from the Hero to maintain strict engineering authenticity.
  - *Current Working Copy:* `"Trained local 7B models achieving 8.7/10 on ERP ORM evaluation benchmarks."`
  - *Action Required:* Once final evaluation runs are completed across the expanded 150MB+ codebase test suites, benchmark the exact P99 Time-to-First-Token (TTFT) and token-generation throughput (tok/s) on target client workstations (e.g. RTX 4090 / Mac Studio M2 Max) and publish the measured numbers.

---

## 2. Project Case Studies Hardware Measurements

- [ ] **Multimodal Voice DAG (`multimodal-voice-failover-dag`):**
  - Verify total dollar compute cost for prompt-tuning Gemini Multimodal vs local Whisper fine-tuning runs. Replace `[MEASURE THIS]` in `src/data/projects.ts`.
- [ ] **Zero-Shot Voice Studio (`neural-voice-cloning-studio`):**
  - Record reference audio enrollment time from wav ingestion to synthetic vocoder output.

---

## 3. External Infrastructure & DNS Checklist

- [ ] **Custom Domain Setup (Vercel or Cloudflare):**
  - Point apex domain (`harshthanki.dev` or chosen domain) `A` record to `76.76.21.21` and `www` CNAME to `cname.vercel-dns.com`.
- [ ] **Resend Contact Delivery:**
  - Set `RESEND_API_KEY` in deployment environment variables if switching from static GitHub Pages to dynamic Vercel hosting.
