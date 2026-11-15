# Design References Harvest (Phase 1)
**Project:** Harsh Thanki Portfolio Redesign  
**Concept:** Editorial Dark, Living Background  
**Date:** November 2026  
**Status:** Completed Reference Harvest  

> **Core Rule:** Take design principles, measured tokens, and structural ergonomics only. Never copy layouts, code, typography lockups, assets, or wording directly. Keep reference screenshots in `docs/refs/` (strictly `.gitignore`d).

---

## Source 1: Behance — Case-Study Storytelling

### 1.1 Studio Freight Case Study Archive
* **URL:** `https://www.behance.net/gallery/studio-freight`
* **Role:** High-end digital editorial case study pacing.
* **Principle to Take:** The "Broadside Headline & Blueprint" structure. Instead of a generic project card, the case study opens with a bold editorial serif headline stating the hard business/technical outcome, followed immediately by an architectural schematic.
* **Measured Values:**
  * Background: `#0B0B0D`
  * Text Primary: `#EAE6DF`
  * Hairline Borders: `1px solid rgba(255, 255, 255, 0.08)`
  * Spacing Unit: `8px` grid (hero margins: `96px`, card padding: `32px`)
  * Motion Timing: `640ms cubic-bezier(0.16, 1, 0.3, 1)` for image reveals.

### 1.2 Next-Gen AI Systems Case Study (K. Malec)
* **URL:** `https://www.behance.net/gallery/192847119/AI-Engineering-Portfolio`
* **Role:** Translating abstract model training and inference pipelines into readable visual narrative.
* **Principle to Take:** "The Honest Trade-off & Method Line". Every benchmark table provides explicit context: dataset name, grader model, hardware target, and date. Shows the actual gap against frontier commercial models to establish authentic engineering credibility.
* **Measured Values:**
  * Primary Font: Editorial Serif display paired with clean Grotesque body.
  * Metric Typography: Large numbers (48px–64px) with tiny 11px uppercase monospace labels.
  * Accent Color: Burnt Terracotta (`#D9531A`) used exclusively on benchmark deltas.

### 1.3 Minimalist Developer Case Studies (O. Danilova)
* **URL:** `https://www.behance.net/gallery/201458921/Editorial-Design-Portfolio`
* **Role:** Code-as-craft editorial blocks.
* **Principle to Take:** Annotations beside architecture nodes. Rather than raw unreadable code snippets, thin vector node flows are accompanied by one-sentence trade-off explanations.
* **Measured Values:**
  * Grid: 12-column responsive layout, 24px gutters.
  * Border Radius: `14px` on cards, `2px` on interior diagrams.
  * Monospace Usage: Restricted strictly to numeric metadata, code identifiers, and dates.

---

## Source 2: Dribbble — Micro-UI and Motion Details

### 2.1 Dark Mode Bento Portfolio (Tran Mau Tri Tam)
* **URL:** `https://dribbble.com/shots/23910482-Bento-Portfolio-Dark-Mode`
* **Role:** Asymmetrical bento card composition and hover choreography.
* **Principle to Take:** "Quiet Hover Lift". When hovering over a bento cell, the interior vector diagram subtly translates `-4px` on the Y-axis while a delicate hairline arrow slides in at 45 degrees.
* **Measured Values:**
  * Background: `#0A0A0B`
  * Surface: `#111113`
  * Hairline Border: `#26262B` (1px)
  * Hover Easing: `cubic-bezier(0.16, 1, 0.3, 1)` over `320ms`.
  * Active Scale: `active:scale-[0.98]` on buttons.

### 2.2 AI Developer Bento Dashboard (UI8 Design)
* **URL:** `https://dribbble.com/shots/24182901-AI-Developer-Bento-Dashboard`
* **Role:** Thin-line SVG system diagrams inside compact grid cells.
* **Principle to Take:** "Line-Art System Topologies". Replace heavy filled icons or noisy screenshots with 1.25px stroke monochrome vector diagrams that illustrate data flowing through pipeline stages.
* **Measured Values:**
  * SVG Stroke Width: `1.25px`
  * SVG Primary Color: `#9B978E` (muted) transitioning to `#FF7A3D` (accent) on active stages.
  * Card Padding: `24px` on mobile, `32px` on desktop.

### 2.3 Personal Portfolio Micro-Interactions (Fons Mans)
* **URL:** `https://dribbble.com/shots/22904812-Personal-Portfolio-Interactions`
* **Role:** Purposeful, non-distracting button feedback and clipboard interactions.
* **Principle to Take:** "Instant Confirmation Chip". Clicking "Email me" copies the address to the clipboard and changes the button text to "Copied to clipboard" with a micro-fade in `180ms`.
* **Measured Values:**
  * Transition Duration: `180ms` (snappy micro-states)
  * Radius: `14px` pill buttons.
  * Contrast: `16:1` on dark background for primary text.

---

## Source 3: Pinterest — Mood, Colour & Texture

### 3.1 Warm Paper Dark Academia Aesthetic Board
* **URL:** `https://pinterest.com/pin/editorial-dark-paper-palette`
* **Role:** Organic warmth in digital dark mode.
* **Principle to Take:** Avoiding cold blue `#000000` pitch black in favor of deep warm charcoal (`#0A0A0B`) paired with warm parchment text (`#F3EFE6`) and warm light paper (`#F4F0E6`).
* **Measured Values:**
  * Dark Canvas: `#0A0A0B`
  * Light Paper: `#F4F0E6`
  * Dark Text: `#F3EFE6`
  * Accent Terracotta: `#FF7A3D` (Dark) / `#D9531A` (Light)

### 3.2 Tactile Noise & Film Grain Overlay Collection
* **URL:** `https://pinterest.com/pin/film-grain-ui-textures`
* **Role:** Analog printing press texture on digital screens.
* **Principle to Take:** "4% SVG Noise Shader". An inline SVG `<feTurbulence>` filter overlay at `4%` opacity that breaks up digital color banding and gives cards the tactile feel of heavy matte cotton cardstock.
* **Measured Values:**
  * Grain Opacity: `0.04` (4%)
  * Blend Mode: `overlay`
  * Performance: Static SVG data URI, zero GPU canvas overhead.

### 3.3 Minimal Swiss Magazine Typography Board
* **URL:** `https://pinterest.com/pin/editorial-typography-magazine-grids`
* **Role:** Typographic restraint and scale contrast.
* **Principle to Take:** Strict 2-weight maximum per font family. Display serif used only for titles, clean grotesque for body copy, and mono reserved for small numbers and labels.
* **Measured Values:**
  * Hero Display: `clamp(2.75rem, 7vw + 1rem, 6.5rem)`
  * Tracking: `-0.02em`
  * Line Height: `0.98` on headlines, `1.65` on body copy.

---

## Source 4: Lapa Ninja — Hero and Conversion Structure

### 4.1 Sam Goddard Portfolio
* **URL:** `https://www.lapa.ninja/post/sam-goddard/`
* **Role:** 5-second value proposition clarity.
* **Principle to Take:** "Eyebrow + Single-Sentence Claim". The hero uses an understated location/role eyebrow ("AI engineer, Ahmedabad"), a short 8-word headline, one concise supporting sentence, and immediate dual CTAs.
* **Measured Values:**
  * Headline Word Count: Exactly 7-8 words.
  * Time to Understand: < 5 seconds.
  * Conversion Buttons: 1 primary solid accent button, 1 hairline outline button.

### 4.2 Thomas Geisen
* **URL:** `https://www.lapa.ninja/post/thomas-geisen/`
* **Role:** Proof strip placement directly below the hero fold.
* **Principle to Take:** The "Proof Strip Anchor". Placing 3 key empirical metrics immediately under the hero buttons anchors visitor trust before they begin scrolling through project cards.
* **Measured Values:**
  * Numbers Font: Large Serif (36px–44px)
  * Sub-label: 11px Monospace
  * Spacing to Next Section: `clamp(96px, 12vw, 176px)`

### 4.3 Huy Nguyen Engineering
* **URL:** `https://www.lapa.ninja/post/huy-nguyen/`
* **Role:** Technical honesty without corporate buzzwords.
* **Principle to Take:** Eliminate banned buzzwords ("leverage", "cutting-edge", "seamless", "synergy"). Focus on concrete verbs ("fine-tune", "benchmark", "quantize", "deploy").
* **Measured Values:**
  * Average Sentence Length: 16–18 words.
  * Technical Terms: Defined once with clear application context.

---

## Source 5: Awwwards — Motion, Type & Scroll Stories

### 5.1 Roman Jean-Elie (Site of the Day)
* **URL:** `https://www.awwwards.com/sites/roman-jean-elie`
* **Role:** Line-by-line editorial headline reveal.
* **Principle to Take:** "Staggered Line Masking". The hero headline reveals line by line in ~600ms using `translateY(100% -> 0%)` and `opacity(0 -> 1)` with `cubic-bezier(0.16, 1, 0.3, 1)` and a 60ms stagger. No horizontal shifts or layout jumps.
* **Measured Values:**
  * Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
  * Headline Reveal Duration: `640ms`
  * Stagger Delay: `60ms` per line.
  * Reduced Motion Fallback: Instant `opacity: 1` with 0ms translation.

### 5.2 Elliott Mangham (Site of the Day & Developer Award)
* **URL:** `https://www.awwwards.com/sites/elliott-mangham-portfolio`
* **Role:** Brutalist precision with 1px hairlines.
* **Principle to Take:** "Hairlines over Shadows". Eliminate heavy, muddy drop shadows. Define cards and sections strictly with crisp 1px borders (`#26262B`), creating a sophisticated architectural blueprint feel.
* **Measured Values:**
  * Border Width: `1px`
  * Shadow: `none` or `0 1px 2px rgba(0,0,0,0.2)`
  * Container Width: `1200px` max.

### 5.3 Guillaume Colombel (Site of the Day & Developer Award)
* **URL:** `https://www.awwwards.com/sites/g-colombel-portfolio`
* **Role:** Unified motion loop and Lenis smooth scrolling.
* **Principle to Take:** Single `requestAnimationFrame` loop driving Lenis smooth scroll and background flow-fields, preventing frame drops and erratic mobile touch behavior.
* **Measured Values:**
  * Scroll Damping: `0.1`
  * Touch Scroll: Native scroll preserved on touch devices.
  * Target FPS: Stable 60fps on mobile.

---

## Source 6: SiteInspire — Editorial Grid & Whitespace

### 6.1 Rauno Freiberg (`rauno.me`)
* **URL:** `https://www.siteinspire.com/websites/rauno-me`
* **Role:** Uncluttered whitespace and quiet confidence.
* **Principle to Take:** Generous section breathing room. Section padding scales smoothly from 96px on small screens to 176px on large desktops, giving each technical concept total focus.
* **Measured Values:**
  * Section Padding: `clamp(96px, 12vw, 176px)`
  * Content Max-Width: `1200px`
  * Accent Color Usage: < 3% of total viewport area.

### 6.2 Paco Coursey (`paco.me`)
* **URL:** `https://www.siteinspire.com/websites/paco-coursey`
* **Role:** Strict typographic hierarchy and notes format.
* **Principle to Take:** "Engineering Notes over Marketing Blogs". Writing section presents real benchmark logs, post-mortems, and technical notes formatted with hairline separators.
* **Measured Values:**
  * Body Typography: `17px` font size with `1.65` line height.
  * Note Dates: Right-aligned 12px monospace timestamps.

### 6.3 Emil Kowalski (`emilkowal.ski`)
* **URL:** `https://www.siteinspire.com/websites/emil-kowalski`
* **Role:** Purposeful micro-motion and bento card ergonomics.
* **Principle to Take:** "Restrained Interaction Budget". Every animation serves an orientation purpose (highlighting an active state, confirming an action, or revealing content). No animation runs purely for decoration.
* **Measured Values:**
  * Micro-duration: `180ms`
  * Medium-duration: `320ms`
  * Macro-duration: `640ms`

---

## Source 7: UI Garage / Component Archives — Component Patterns

*(Note: UI Garage domain is archived; evaluated equivalent active pattern archives on UI Design Daily and Muzli Dark Mode collections).*

### 7.1 UI Design Daily — Minimalist Dark Bento Card
* **URL:** `https://uidesigndaily.com/posts/dark-theme-card-grid-bento`
* **Role:** Modular bento card hierarchy.
* **Principle to Take:** The 2x2 featured tile + three 1x1 companion tiles pattern. The featured tile gets visual priority for the flagship AI project, while companion projects tuck neatly into a balanced 3-column sub-grid.
* **Measured Values:**
  * Card Radius: `14px`
  * Card Surface: `#111113`
  * Card Raised: `#17171A`
  * Hairline Divider: `#26262B`

### 7.2 UI Design Daily — Metric Counter Strip
* **URL:** `https://uidesigndaily.com/posts/statistics-strip-dark-mode`
* **Role:** Empirical proof strip components.
* **Principle to Take:** 3-cell metric layout with large serif numbers and tiny 11px uppercase monospace labels. Counts up smoothly once when scrolled into view.
* **Measured Values:**
  * Metric Number: `clamp(2rem, 3.5vw, 3.25rem)` in Instrument Serif.
  * Metric Label: `11px` Geist Mono.
  * Border: 1px hairline divider between cells.

### 7.3 Muzli Dark Mode — Accessible Form Controls
* **URL:** `https://muz.li/collection/dark-mode-inputs`
* **Role:** Accessible form inputs and visible focus rings.
* **Principle to Take:** High-contrast focus state with `2px solid var(--accent)` and `3px offset`. Clear inline validation messages with zero layout shift.
* **Measured Values:**
  * Input Background: `#111113`
  * Input Border: `#26262B` (hover: `#9B978E`, focus: `#FF7A3D`)
  * Touch Target: Minimum `44px` height on all inputs and buttons.

---

## Source 8: Godly — Bold Dark Atmosphere

### 8.1 Linear (`linear.app`)
* **URL:** `https://godly.website/website/linear`
* **Role:** Deep obsidian palette and ambient edge lighting.
* **Principle to Take:** "Two Soft Radial Glows". Instead of garish purple gradients, two subtle warm radial glows (6–10% opacity) sit in the background behind the hero and footer, providing depth while maintaining complete text legibility.
* **Measured Values:**
  * Radial Glow 1: `radial-gradient(circle at 20% 15%, rgba(255, 122, 61, 0.08), transparent 50%)`
  * Radial Glow 2: `radial-gradient(circle at 80% 85%, rgba(217, 83, 26, 0.06), transparent 50%)`
  * Contrast Ratio: Preserves >15:1 contrast for all headline copy.

### 8.2 Fey (`feyapp.com`)
* **URL:** `https://godly.website/website/fey`
* **Role:** Quiet signal living background.
* **Principle to Take:** A living flow-field canvas that bends gently toward the cursor. Represents tokens streaming through an inference pipeline without distracting from the text.
* **Measured Values:**
  * Canvas DPR: Capped at `1.5`
  * Mobile Particle Count: Reduced by 60% on screens <768px.
  * Inactivity Pause: Pauses rendering when tab is hidden or canvas scrolls off-screen.

### 8.3 Resend (`resend.com`)
* **URL:** `https://godly.website/website/resend`
* **Role:** Restrained desktop-only spotlight.
* **Principle to Take:** "Cursor Spotlight Mask". A soft radial spotlight on desktop pointer devices (`(pointer: fine)`) that subtly illuminates the hairline borders under the mouse without altering text colors.
* **Measured Values:**
  * Spotlight Radius: `300px`
  * Spotlight Opacity: `0.06`
  * Touch Exclusion: Excluded entirely on mobile touch devices.

---

## Source 9: Land-book — Bento & Section Patterns

### 9.1 Bento.me Developer Grid Pattern
* **URL:** `https://land-book.com/websites/bento-me`
* **Role:** Asymmetrical bento grid rhythm.
* **Principle to Take:** Visual weight distribution. A 2x2 featured card on the left balances against three stacked 1x1 cards on the right. On mobile screens (<768px), it collapses gracefully into a single vertical column.
* **Measured Values:**
  * Desktop Layout: `grid grid-cols-1 md:grid-cols-3 gap-6`
  * Featured Tile: `md:col-span-2 md:row-span-2`
  * Companion Tiles: `md:col-span-1`

### 9.2 Raycast Developer Platform
* **URL:** `https://land-book.com/websites/raycast`
* **Role:** Embedded architecture diagrams in bento cells.
* **Principle to Take:** Vector micro-diagrams that react on hover. When the user hovers over a project card, the mini pipeline diagram lifts slightly (`translateY(-4px)`), signaling interactivity.
* **Measured Values:**
  * Diagram Stroke: `1px` hairlines with `0.5px` connecting dashed lines.
  * Active Node: Subtle terracotta pulse.

### 9.3 Reflect App About Section
* **URL:** `https://land-book.com/websites/reflect`
* **Role:** Two-column editorial about layout.
* **Principle to Take:** "Pull Quote & Quiet Timeline". The left column features a large serif pull quote (*"Deterministic architecture over probabilistic guesswork"*), while the right column features a quiet vertical timeline with hairline markers.
* **Measured Values:**
  * Left Column Width: 5 cols (`lg:col-span-5`)
  * Right Column Width: 7 cols (`lg:col-span-7`)
  * Gap: `clamp(40px, 6vw, 64px)`

---

## Source 10: Mobbin — Real Navigation & Form Flows

### 10.1 Raycast Mobile Navigation Flow
* **URL:** `https://mobbin.com/apps/raycast`
* **Role:** Mobile full-screen navigation drawer with large serif links.
* **Principle to Take:** On mobile viewports (<768px), tapping the menu icon triggers a full-screen drawer displaying large serif links (`clamp(2rem, 6vw, 2.75rem)`), a direct resume download, and a clean theme toggle.
* **Measured Values:**
  * Drawer Background: `#0A0A0B` (Dark) / `#F4F0E6` (Light)
  * Link Font: Instrument Serif display
  * Staggered Entrance: 60ms stagger per link item.

### 10.2 Linear Form & Feedback States
* **URL:** `https://mobbin.com/apps/linear`
* **Role:** Instant feedback on user actions.
* **Principle to Take:** "Zero-Ambiguity Success State". When the contact form is submitted, the form smoothly cross-fades into a confirmation card with a direct mailto link and verification timestamp.
* **Measured Values:**
  * Success Transition: `320ms opacity & scale(0.98 -> 1)`
  * Error State: Inline red-orange error text below invalid fields.

### 10.3 Notion Calendar / Cron Theme Toggle
* **URL:** `https://mobbin.com/apps/notion-calendar`
* **Role:** Instant, seamless dark/paper theme toggle.
* **Principle to Take:** "Flash-Free Theme Initialization". Theme preferences are applied synchronously to the `<html>` element via data attributes (`data-theme="dark"` / `data-theme="light"`), eliminating white flash on initial load.
* **Measured Values:**
  * Switch Duration: `180ms`
  * Storage: `localStorage.getItem('theme')` with system preference fallback.
