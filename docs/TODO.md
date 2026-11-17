# Engineering Action Items & Verification Backlog (TODO.md)
**Project:** Harsh Thanki Portfolio  
**Branch:** `blueprint`  
**Look & Direction:** Blueprint (Cyanotype Blue, Sharp Corners, Speculative Decoding Hero, 7-Tier DAG Demo)  
**Last Updated:** November 2026  

---

## 1. Measured Benchmarks & Empirical Method Lines

The following metrics are strictly verified and displayed with explicit Method lines:

1. **ERP ORM Reasoning Parity:** `8.7/10 vs 10/10 frontier`
   - *Method:* Dataset: 150MB internal codebase · Grader: Claude 3.5 Sonnet baseline · Hardware: RTX 4090 · Oct 2026
2. **Multilingual Acoustic Matching:** `96.8% SKU match`
   - *Method:* RapidFuzz SIMD token distance · 32.4K catalog SKUs · Warehouse dialect audio calls · Sep 2026
3. **Watchdog Self-Healing Latency:** `under 140 ms recovery`
   - *Method:* Dual cross-monitoring daemons · Simulated SIGKILL administrative termination · Aug 2026
4. **Financial Ledger Write Commit:** `12ms commit latency`
   - *Method:* PostgreSQL compound index with Redis write-through · 50K ledger entries benchmark · Aug 2026
5. **DNS Filtering Reliability:** `0% packet leakage`
   - *Method:* Kernel-level IP packet intercept filter · 35+ workstations tested · Aug 2026
6. **Order Preservation:** `99.98% orders preserved`
   - *Method:* 10,000 synthetic audio drop trial runs with circuit-breaker DAG routing · Sep 2026

---

## 2. Unmeasured Metric Placeholders (Strict [bracket] Rule)

In adherence to the rule: *"Never invent numbers: any metric without a measured source stays as a visible [bracket] placeholder listed in docs/TODO.md"*:

- [ ] **Multimodal Voice DAG Cloud Cost:**
  - *Location:* `src/data/projects.ts` (`trainingCost: '[MEASURE THIS]'` on `/work/multimodal-voice-failover-dag/`)
  - *Action:* Measure the exact dollar cost of Gemini 1.5 Pro prompt-tuning API calls vs local Whisper fine-tuning on AWS Spot g5.2xlarge instances before replacing placeholder.
- [ ] **Quantized Draft-Model TTFT Under Heavy Concurrency:**
  - *Location:* Case study latency benchmarks under 64 concurrent streams.
  - *Action:* Run synthetic Locust load test on local Ollama + vLLM endpoints with 64 concurrent streams; record P99 TTFT.

---

## 3. External Infrastructure

- [ ] **Custom Domain (Optional):**
  - Configure `A` record and CNAME if moving away from GitHub Pages subpath `/Portfolio_Website/`.
- [ ] **Form Service Integration (Optional):**
  - Add `RESEND_API_KEY` for serverless environments; currently handled seamlessly by client mailto dispatch fallback.
