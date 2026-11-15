# Design context: Harsh Thanki portfolio

## Owner and goal
Harsh Thanki, AI/ML engineer in Ahmedabad, India. Goal: get a hiring manager or client to understand what I do in 5 seconds and want to talk within 60 seconds.

## Positioning rules
- Title: "AI engineer". Never "Senior" or "Architect".
- Every number must be measured and have a Method line (dataset, grader, hardware, date).
- No placeholder metrics, no fake status text, no "live" label on simulated demos.
- Show the honest gap (for example 8.7/10 vs a 10/10 baseline). It builds trust.

## Technical constraints
- Next.js (App Router) + TypeScript + Tailwind v4, deployed as a static export on GitHub Pages under the subpath `/Portfolio_Website/`. All asset paths must work under that `basePath`.
- No server at runtime. Contact form uses a form service. Demos that need a server are labelled as simulated or hosted elsewhere.
- Public repo: no secrets, no private data, no copyrighted reference screenshots committed (put `docs/refs/` in `.gitignore`).

## Design concept: Editorial dark, living background
Dark-first with a light "paper" theme. Editorial layout, bento work grid, proof strip, one signature hero moment.

## Tokens
- Dark: bg `#0A0A0B`, surface `#111113`, raised `#17171A`, hairline `#26262B`, text `#F3EFE6`, muted `#9B978E`, accent `#FF7A3D`.
- Light: bg `#F4F0E6`, surface `#FBF8F1`, raised `#FFFFFF`, hairline `#D9D3C5`, text `#0E0E10`, muted `#5E5B55`, accent `#D9531A`.
- Fonts: display Instrument Serif (or Fraunces), text Geist or Inter, mono Geist Mono (numbers and tiny labels only).
- Sizes: display `clamp(2.75rem, 7vw + 1rem, 6.5rem)`, tight tracking `-0.02em`, line-height `0.98`; h2 `clamp(2rem, 3.5vw, 3.25rem)`; body `17px/1.65`.
- Spacing: 8px base. Section padding `clamp(96px, 12vw, 176px)`. Container 1200px. Gutters 24px (16px on phones). Radius 14px. 1px hairlines, minimal shadows. Accent only for one action per screen and key numbers.
- Motion: `cubic-bezier(0.16, 1, 0.3, 1)`; 180/320/640 ms; 60 ms stagger; transform and opacity only.
- Texture: SVG film grain at about 4% opacity.

## Background: Quiet signal
Soft warm radial glows (6-10%), hero flow-field canvas bending toward the cursor, grain overlay, desktop-only cursor spotlight. Pause off-screen, static frame for reduced motion, init after first paint, devicePixelRatio max 1.5, fewer particles on mobile.

## Copy rules
One idea per sentence, about 18 words on average, plain verbs, define a technical term once, numbers with unit and comparison. Banned words: leverage, robust, seamless, cutting-edge, state-of-the-art, synergy. Headline 8 words or fewer. Card titles 8 words or fewer.

## Page blueprint
Nav (4 links, resume, theme) > Hero > Proof strip (3 numbers) > Selected work (bento, 1 featured + 3) > How I work > Notes (only if real) > Contact > Footer. Case-study pages: cinematic header, sticky TOC, diagram, results with method, what broke, next project.

## Never do
Default purple gradients, glass cards everywhere, emoji icons, "Welcome to my portfolio", stock illustrations, mono uppercase labels as decoration, auto-playing sound, copying any site's layout, code, assets or wording.

## Definition of done
Lighthouse mobile: Performance 95+, Accessibility 100, Best Practices 100, SEO 100. LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less. WCAG AA contrast. Works at 390, 768, 1440 px. Keyboard-only usable. Reduced motion respected.
