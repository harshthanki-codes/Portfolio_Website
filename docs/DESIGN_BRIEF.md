# Fusion Design Brief (Phase 2)
**Project:** Harsh Thanki Portfolio  
**Author:** AI engineer  
**Concept:** Editorial Dark, Living Background  
**Date:** November 2026  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Concept Vision

The objective is to establish an authentic, high-impact digital presence for **Harsh Thanki**, an AI engineer based in Ahmedabad, India. The site must enable any engineering hiring manager, founder, or CTO to understand what Harsh does in **5 seconds** and compel them to initiate a conversation within **60 seconds**.

The design concept is **"Editorial dark, living background"**:
* A dark-first, typography-driven editorial broadsheet with a warm light "paper" theme switch.
* Structural hierarchy built with **1px hairlines (`#26262B` / `#D9D3C5`)**, generous whitespace, and high-contrast typography rather than heavy drop shadows or generic glassmorphic cards.
* A signature **"Quiet signal" living background**: soft ambient warm glows (6–10%), a fluid flow-field canvas bending toward the cursor, an authentic 4% SVG film grain texture, and a desktop-only cursor spotlight.
* Strict engineering authenticity: **zero placeholder numbers**, **no fake status text**, **no "live" labels on simulated demos**, and **every metric accompanied by an empirical Method line**.

---

## 2. Source-to-Principle Mapping Table

Every visual choice, structural pattern, and interaction originates from curated principles harvested across the 10 industry references (documented in `docs/DESIGN_REFERENCES.md`):

| # | Reference Platform | Principle Extracted | Where It Is Used in the Portfolio |
| :---: | :--- | :--- | :--- |
| **1** | **Behance** (Studio Freight / K. Malec) | **Broadside Headline & Method Lines**<br>Opening case studies with hard numerical outcomes; documenting dataset, hardware, and date below every metric. | Case-study headers (`/work/[slug]`) and Proof Strip method annotations. |
| **2** | **Dribbble** (Tran Mau Tri Tam / UI8) | **Quiet Hover Lift & Thin-Line System SVGs**<br>Bento cards feature lightweight 1.25px stroke vector diagrams that lift -4px on hover with sliding arrow. | Selected Work Bento Grid (`src/components/home/SelectedWork.tsx`). |
| **3** | **Pinterest** (Dark Academia / Swiss Print) | **Tactile Paper Texture & Warm Obsidian**<br>Using warm charcoal (`#0A0A0B`) and warm paper (`#F4F0E6`) with 4% SVG film grain overlay. | Base styling, canvas background, and global grain texture (`src/styles/globals.css`). |
| **4** | **Lapa Ninja** (Sam Goddard / Huy Nguyen) | **5-Second Value Proposition & Proof Strip**<br>Eyebrow + 8-word headline + 1 supporting sentence + 3 measured numbers directly under hero. | Hero (`Hero.tsx`) and Proof Strip (`ProofStrip.tsx`). |
| **5** | **Awwwards** (Roman Jean-Elie / E. Mangham) | **Line-by-Line Stagger & 1px Hairlines**<br>Headline reveals line-by-line via CSS transforms (640ms, 60ms stagger); razor-sharp borders over shadows. | Hero headline reveal and global card/section divider system. |
| **6** | **SiteInspire** (Rauno Freiberg / Paco Coursey) | **Generous Section Whitespace & Technical Notes**<br>Section padding scaling `clamp(96px, 12vw, 176px)`; treating writing as clean engineering notes. | Page section pacing and Writing/Notes section (`WritingSection.tsx`). |
| **7** | **UI Garage / Component Archives** | **Asymmetric 2x2 Bento & Accessible Form States**<br>Featured flagship card with 3 compact companion cards; 44px touch targets; 2px accent focus rings. | Bento Grid layout and Contact form inputs (`ContactSection.tsx`). |
| **8** | **Godly** (Linear / Fey / Resend) | **Quiet Signal Living Flow-Field Canvas**<br>Soft warm radial glows (6–10%) + flow-field lines drifting toward cursor; pauses off-screen; DPR capped at 1.5. | Global background (`QuietSignalBackground.tsx`). |
| **9** | **Land-book** (Bento.me / Reflect) | **Two-Column Editorial About & Vertical Timeline**<br>Large serif pull quote on the left (5 cols) paired with quiet hairline vertical timeline on the right (7 cols). | About & Credentials Section (`AboutSection.tsx`). |
| **10** | **Mobbin** (Raycast / Notion Calendar) | **Full-Screen Mobile Serif Menu & Instant Copy**<br>Mobile nav opens a full-screen drawer with large serif links; email button features instant "Copied" feedback. | Mobile navigation drawer (`Navbar.tsx`) and Contact email button. |

---

## 3. Design Tokens & Design System Specification

### 3.1 Color Tokens
```css
/* Dark Theme (Default) */
--bg: #0A0A0B;          /* Deep warm obsidian canvas */
--surface: #111113;     /* Bento cards & container tiles */
--raised: #17171A;      /* Elevated surfaces & hover states */
--hairline: #26262B;    /* 1px structural dividing lines */
--text-primary: #F3EFE6;/* Warm parchment headline & body text */
--text-muted: #9B978E;  /* Secondary explanatory copy */
--text-tertiary: #9c9c94; /* Micro metadata & method lines (WCAG AA: 5.8:1) */
--accent: #FF7A3D;      /* Restrained warm terracotta / ochre */
--accent-subtle: rgba(255, 122, 61, 0.08);

/* Light "Paper" Theme */
--bg: #F4F0E6;          /* Tactile warm paper canvas */
--surface: #FBF8F1;     /* Cream card background */
--raised: #FFFFFF;      /* Clean crisp elevated card */
--hairline: #D9D3C5;    /* Subtle bookbinding divider line */
--text-primary: #0E0E10;/* Ink-black typographic print */
--text-muted: #5E5B55;  /* Editorial secondary prose */
--text-tertiary: #54575c; /* Footnotes & timestamps (WCAG AA: 6.1:1) */
--accent: #D9531A;      /* Earthy terracotta stamp */
--accent-subtle: rgba(217, 83, 26, 0.08);
```

### 3.2 Typography Tokens
* **Display Face:** `Instrument Serif` (Google Fonts via `next/font`) — large, expressive editorial headlines with tight tracking (`-0.02em`) and leading (`0.98`).
* **Text Face:** `Geist` or `Inter` (via `next/font`) — crisp, modern grotesque body copy set at `17px / 1.65` line-height.
* **Monospace Face:** `Geist Mono` or `JetBrains Mono` (via `next/font`) — restricted strictly to numbers, benchmark deltas, code terms, and tiny labels.
* **Scale & Sizes:**
  * Display: `clamp(2.75rem, 7vw + 1rem, 6.5rem)`
  * Section H2: `clamp(2rem, 3.5vw, 3.25rem)`
  * Card Titles: `clamp(1.25rem, 2vw, 1.75rem)` (8 words or fewer)
  * Body: `17px / 1.65`
  * Micro Labels: `11px` uppercase with `0.1em` letter-spacing.

### 3.3 Spacing, Geometry & Hairlines
* **Base Grid:** `8px`
* **Container Width:** `1200px` max, centered.
* **Gutters:** `24px` on desktop, `16px` on phones.
* **Section Padding:** `clamp(96px, 12vw, 176px)` top and bottom.
* **Border Radius:** `14px` on bento tiles and buttons; `2px` on interior diagrams.
* **Hairline Rule:** `1px` hairlines instead of heavy drop shadows. Shadows are limited to a subtle `0 1px 2px rgba(0,0,0,0.2)`.

### 3.4 Motion & Physics Budget
* **Primary Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
* **Timing Scale:**
  * Fast / Micro: `180ms` (buttons, copy-to-clipboard, hover color transitions)
  * Medium / Cards: `320ms` (hover lift, drawer slide, mobile menu items)
  * Slow / Macro: `640ms` (hero headline line reveal, page entrances)
* **Stagger Interval:** `60ms` between sequential items.
* **Properties Allowed:** `transform` and `opacity` ONLY (zero layout shift, zero width/height transitions).
* **Accessibility:** Full `prefers-reduced-motion` compliance. When active, all durations become `0.01ms` with static layout presentation.

---

## 4. Background Architecture: "Quiet Signal" (Three Layers)

1. **Base Layer (CSS Ambient Lighting):**
   * Two soft warm radial glows at `6–10%` opacity fixed in the background:
     * Top-left: `radial-gradient(circle at 18% 12%, rgba(255, 122, 61, 0.08), transparent 45%)`
     * Bottom-right: `radial-gradient(circle at 82% 88%, rgba(217, 83, 26, 0.06), transparent 50%)`
2. **Hero Living Canvas (Flow-Field Tokens):**
   * Lightweight HTML5 2D Canvas rendering thin vector flow-field streamlines that drift gently and bend toward the cursor.
   * Concept: Visualizes acoustic tokens and speculative draft tokens passing through a transformer pipeline.
   * Hardware Safety Guardrails:
     * `devicePixelRatio` capped at `1.5` to avoid mobile GPU strain.
     * Particle count reduced by 60% on screens `<768px`.
     * Pauses automatically via `IntersectionObserver` when scrolled out of view or when `document.hidden`.
     * Single static frame rendered if `prefers-reduced-motion: reduce`.
     * Initialized only after first paint (`requestIdleCallback` / `useEffect`).
3. **Finish Layer (Texture & Spotlight):**
   * SVG film grain noise overlay at `4%` opacity (`feTurbulence`), eliminating digital banding.
   * Desktop-only soft cursor spotlight (`(pointer: fine)`) with 300px radius at 6% opacity illuminating hairline borders as the mouse glides across cards.

---

## 5. Page Blueprint & Layout Flow

```
[Sticky Header]
  Wordmark ("Harsh Thanki") · Eyebrow ("AI engineer") · 4 Links (Work, About, Notes, Contact) · Resume (PDF) · Theme Toggle
  (On Mobile: Full-Screen Drawer with Large Serif Links)

[Hero]
  Eyebrow: "AI engineer, Ahmedabad"
  Headline: "AI systems that run on your own hardware." (Line-by-line reveal, <= 8 words)
  Subhead: "I fine-tune open models, build the pipelines around them, and test them until they stop failing." (17 words)
  CTAs: [See the work ->] (Solid Terracotta) · [Email me] (Hairline Outline)
  Portrait: Framed with 1px hairline border + caption ("Harsh Thanki · Ahmedabad, India")
  Background: Living Flow-Field Canvas bending to mouse

[Proof Strip]
  Three Large Serif Numbers with Count-Up:
  1. "8.7/10 vs 10/10 frontier" (ERP ORM reasoning benchmark)
  2. "96.8% SKU match" (RapidFuzz acoustic voice matching)
  3. "under 140 ms recovery" (Watchdog daemon self-healing)
  Method Line below each metric detailing dataset, hardware, and date.

[01 / Selected Work — Bento Grid]
  Featured Tile (2x2): Autonomous Enterprise ERP Local Intelligence Engine (8.7/10 score, QLoRA)
  Tile 2 (1x1): 7-Tier Multimodal Voice Failover DAG (99.98% preservation)
  Tile 3 (1x1): High-Throughput Financial Ledger Core (0ms blocking latency)
  Tile 4 (1x1): Fails-Closed DNS & Routing Watchdog (Sub-15ms interception)
  Every tile features a custom thin-line vector architecture diagram that lifts on hover.

[02 / About & Credentials — Two Columns]
  Left: Large Serif Pull Quote ("Deterministic architecture over probabilistic guesswork.")
  Right: Quiet Vertical Timeline with hairline spine (2025–Pres Synapse-AI; 2023–24 Enterprise; 2024–26 MCA Alliance).

[03 / Production Stack]
  Skills grouped strictly by what Harsh has shipped in production (Inference, Fine-Tuning, Backend, Guardrails).

[04 / Technical Notes]
  Three real architecture essays linking directly to case studies and evaluation benchmarks.

[05 / Contact — "Let's talk."]
  Huge Serif Heading: "Let's talk."
  Email Card: harsh.h.thanki@gmail.com with one-click "Copy email" button (micro-feedback "Copied to clipboard").
  Accessible Form: Name, Email, Message, with honeypot trap, Zod validation, and mailto fallback.

[Footer]
  One-line minimal colophon: "© 2026 Harsh Thanki · AI engineer · Ahmedabad, India" + Top ↑ / GitHub / LinkedIn / Resume.
```

---

## 6. Verification Against the "Never Do" List

| Banned Pattern | Strict Enforcement in This Design |
| :--- | :--- |
| **Default purple/violet gradients** | **ELIMINATED.** Zero purple. Deep warm charcoal (`#0A0A0B`), warm parchment (`#F3EFE6`), and restrained warm terracotta (`#FF7A3D`). |
| **Glass cards everywhere** | **ELIMINATED.** Replaced with matte, solid surfaces (`#111113`) bound by crisp 1px hairlines (`#26262B`). Zero blurry glass soup. |
| **Emoji icons** | **ELIMINATED.** 100% clean, professional monochrome vector icons via `lucide-react`. |
| **"Welcome to my portfolio"** | **BANNED.** Direct, confident value proposition in under 8 words. |
| **Stock illustrations / 3D floating blobs** | **ELIMINATED.** Replaced with custom, thin-line SVG system architecture diagrams and a purposeful flow-field canvas. |
| **Mono uppercase labels as decoration** | **BANNED.** Monospace font is restricted strictly to numbers, benchmark deltas, code terms, and tiny functional labels. |
| **Auto-playing sound** | **BANNED.** Zero audio playback. |
| **Copying any site's layout or wording** | **BANNED.** Tailored custom bento composition, original copy from `docs/COPY.md`, and unique flow-field token canvas. |

---

## 7. Anti-Template Audit

To ensure the portfolio would never be mistaken for a generic theme or boilerplate:
1. **Asymmetric Bento Architecture:** The featured 2x2 tile combined with custom SVG dataflow diagrams creates a bespoke layout unique to Harsh Thanki's technical work.
2. **Method Lines as Design Elements:** No template includes empirical hardware/dataset method lines below every benchmark metric.
3. **Living Flow-Field Background:** The custom canvas streamlines drift with subtle fluid physics, echoing actual token probabilities rather than generic particle dust.
4. **Editorial Serif Scaling:** `clamp(2.75rem, 7vw + 1rem, 6.5rem)` with leading `0.98` delivers the raw typographic impact of a high-end architectural journal.
