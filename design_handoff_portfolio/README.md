# Handoff: Personal Portfolio — Hai Duong (Cray)

A single-page personal portfolio for a Senior Fullstack Engineer. Dark cosmic theme: starfield + solar-system planets that scroll past as the user moves through the page, with galaxy, black hole, asteroid belt, nebulae, and comets layered behind the content.

---

## About the Design Files

The files in this bundle are **design references created in HTML/CSS/Babel-JSX** — a prototype that demonstrates the intended look, behavior, animation, and interaction patterns. They are **not production code to ship as-is**.

Your task is to **recreate this design in the target codebase's environment** (React + Vite, Next.js, Astro, plain HTML — whatever the project already uses). If no environment exists yet, **React + Vite + TypeScript** is the closest match to what's prototyped here. Reuse the codebase's existing component patterns, styling layer (CSS Modules, Tailwind, vanilla-extract, styled-components — whatever it has), routing, and any already-established design tokens. Lift the **visual design, copy, motion, and structure**; don't lift the file layout.

The prototype loads React/Babel via CDN and uses inline `<script type="text/babel">` — this is convenient for prototyping but **wrong for production**. Use a real build step.

---

## Fidelity

**High-fidelity.** All colors, type, spacing, and animations are final and intended to be matched closely. The accent palette is configurable via 5 presets (see Design Tokens) — violet is the default. The cosmic theme (starfield, planets, etc.) is intentional and should be recreated faithfully, though implementation choices (canvas vs WebGL, CSS planets vs SVG, etc.) are up to the developer as long as the visual result matches.

---

## Screens / Views

This is a **single-page application** with smooth-scroll navigation between in-page sections. No routes.

### Section 1: Nav (sticky)

**Purpose:** Persistent top navigation. Highlights the section the user is currently viewing.

**Layout:**
- Fixed at top of viewport, full width
- Initial state: transparent background, taller padding (22px vertical)
- After scrolling > 24px: adds `rgba(12,17,23,.85)` background with 14px blur, drops padding to 14px, adds 1px bottom border in `--rule`
- Inner: max-width 1240px container, 80px horizontal padding (gutter)
- Flex row, space-between

**Components:**
- **Brand:** Left side. Text "Hai Duong" (17px, weight 600, letter-spacing -0.015em, color `--fg`) followed by a violet "." (22px, color `--accent`).
- **Links:** Right side, flex row, 4px gap. 4 links: Home / About / Work / Contact.
  - Default: 14px, weight 500, color `--fg-muted`, padding 10px 20px
  - Hover: color shifts to `--fg`
  - Active (current section): color `--fg`, plus a 4px violet dot below the label (`bottom: 4px`, centered, `box-shadow: 0 0 12px var(--accent)`, pulses softly)

**Behavior:**
- Active state is driven by `IntersectionObserver` watching each section's id (`#home`, `#about`, `#work`, `#contact`) with `rootMargin: '-40% 0px -55% 0px'` — i.e., a section is "active" when its middle band is in the viewport.

---

### Section 2: Hero (`#home`)

**Purpose:** Introduce the person. First impression.

**Layout:**
- Min-height 100vh, flex centered vertically
- Padding 120px top, 60px bottom, 80px horizontal gutter
- Inner grid: 2 equal columns, 60px gap, vertically centered

**Components (left column):**
1. **Greeting:** "Hello." — 42px, weight 600, letter-spacing -0.025em, color `--fg`. The "." is in `--accent`, sized 50px (overflowing the line via `line-height: 0`).
2. **Sub:** "I'm Hai Duong" — 22px, color `--fg-muted`, weight 400. Prefixed with a 40px × 1px violet line on the left (positioned absolute, vertically centered).
3. **Title:** "Senior **Fullstack** Engineer" — 72px, weight 700, letter-spacing -0.035em, line-height 1.05. The word "Fullstack" is in `--accent`. Two lines via `<br/>`.
4. **CTAs:** Flex row, 14px gap, 36px below title.
   - Primary: "Got a project? →" — filled violet `--accent`, white text, 16/28 padding, 6px radius, weight 500, with arrow that translates 4px on hover. Hover: lifts 2px, deeper violet `--accent-deep`, larger shadow.
   - Ghost: "See my work" — transparent, 1px `--rule-strong` border, `--fg` text. Hover: border + text turn violet, lifts 2px.

**Components (right column):**
- **Portrait wrap** (420×420 container, centered):
  - **Glow:** Radial-gradient behind everything, blur 20px, accent-colored.
  - **3 concentric rings** around portrait:
    - Outermost (`.r3`): inset -64px, 1px dashed `rgba(var(--accent-rgb), .25)`
    - Middle (`.r2`): inset -32px, 2px solid `rgba(var(--accent-rgb), .35)`
    - Innermost: inset 0, 2px solid `--accent`
  - **`<` and `>` quotes:** Positioned at left/right of portrait, 80px, weight 300, accent color, opacity 0.7. Float ±6px vertically (4s loop).
  - **Portrait image:** 380×380, circle, user-droppable image placeholder (see `image-slot.js` web component, attribute `id="portrait"` for persistence).

**Components (bottom of hero):**
- **Scroll cue:** Absolute bottom-center. Text "SCROLL" (11px, letter-spacing 0.18em, uppercase, `--fg-subtle`). Followed by a 1px × 36px vertical line, gradient from `--accent` to transparent, that pulses (scaleY 1→0.3→1) every 2s.

**Hero load animation (page-load reveal, staggered):**

| Element | Delay | Animation | Duration |
|---|---|---|---|
| Nav | 0s | fade | 0.6s |
| Greeting | 0.15s | translateY(24→0) + fade | 0.8s |
| Sub | 0.3s | same | 0.8s |
| Title | 0.45s | same | 0.9s |
| CTAs | 0.6s | same | 0.8s |
| Portrait wrap | 0.35s | scale(0.92→1) + fade | 1.0s |
| Portrait ring innermost | 0.8s | rotate(-90→0) + scale(0.7→1) + fade | 1.2s |
| Portrait ring r2 | 1.0s | same, then `ring-float` loop from 2.2s | 1.2s |
| Portrait ring r3 | 1.2s | same, then `ring-float` loop reverse from 2.4s | 1.2s |
| `<` `>` quotes | 1.5s | fade, then `quote-float` loop from 2.5s | 1.0s |
| Scroll cue | 1.8s | fade | 1.0s |

Easing: `cubic-bezier(.2, .7, .2, 1)` throughout (defined as `--ease-out`).

---

### Section 3: Skills strip

**Purpose:** Quick visual cue of the tech stack.

**Layout:**
- Padding 36px vertical, 1px borders top & bottom (`--rule`)
- Has subtle backdrop tint: `background: rgba(6,7,13,.55); backdrop-filter: blur(6px)`
- Inner: container width, flex row, 56px gap, space-between

**Components:**
- 7 plain text items: **React · Next.js · TypeScript · Node.js · WebSockets · AWS · PostgreSQL**
- Each: 17px, weight 400, color `--fg-subtle`, letter-spacing 0.02em
- Hover: color shifts to `--accent`
- Stagger entry: each fades-up with delay `0.1s + index * 0.06s`

---

### Section 4: About (`#about`)

**Purpose:** Personal pitch + value propositions.

**Layout:**
- Padding 120px vertical
- Inner grid: 2 columns (0.9fr / 1.1fr), 100px gap, items aligned to start
- Left column is `position: sticky; top: 120px` so it stays pinned while right column scrolls past

**Left column:**
1. Eyebrow "About me" — 12px, weight 500, letter-spacing 0.18em, uppercase, `--accent`. Prefixed with a 32px × 2px accent bar.
2. Heading: "Building **scalable products** that ship." — 56px, weight 700, letter-spacing -0.03em, line-height 1.05. "scalable products" in `--accent`.
3. Lead: "Based in Saigon. Working with teams worldwide." — 18px, line-height 1.55, `--fg-muted`, max-width 380px.

All three have `text-shadow: 0 0 24px var(--bg), 0 0 12px var(--bg)` for readability over cosmic objects.

**Right column:**
1. Paragraph 1 (20px, line-height 1.55, `--fg`): "I'm Hai Duong — a Senior Fullstack Engineer with **{YOE}+** years of experience architecting real-time platforms, integration systems, and the AI tooling that lets small teams ship like big ones."
   - **YOE counter**: animates from 0 to `(currentYear - 2020)` over 1.2s with cubic ease-out when section scrolls into view. Wrapped in `<span class="yoe-number">{n}+</span>` (violet, weight 600, tabular-nums).
2. Paragraph 2 (17px, `--fg-muted`): "I started shipping in 2020 and have since led frontend teams, owned architecture decisions, and quietly turned 'this is going to be hard' into 'this shipped Tuesday' — across remote teams in Australia, Denmark, and Vietnam."
3. **3 pillars** below, separated by 1px `--rule` top border + 32px padding:
   - Layout: `grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px`
   - Each pillar:
     - Number "/ 01" (13px, weight 500, `--accent`, letter-spacing 0.06em, uppercase)
     - Heading (18px, weight 600, letter-spacing -0.012em, `--fg`)
     - Body (14px, line-height 1.55, `--fg-muted`)
   - Pillar 1: **Real-time systems** — "WebSocket pipelines, event-driven backends, streaming LLM UI."
   - Pillar 2: **Integration architecture** — "CRM/ERP middleware, OAuth, queue-based processing at multi-tenant scale."
   - Pillar 3: **Frontend leadership** — "Architecture patterns, design systems, mentoring teams across products."

**Scroll-triggered reveal:**
- Each element has `.reveal` class (opacity 0, translateY 28px) and gets `.visible` added when section enters viewport (threshold 0.15 via IntersectionObserver).
- Reveals are staggered with `.d1` (0.08s), `.d2` (0.16s), `.d3` (0.24s), `.d4` (0.32s), `.d5` (0.4s) delays.

---

### Section 5: Projects (`#work`)

**Purpose:** Showcase 4 selected projects.

**Layout:**
- Padding 60px top, 120px bottom
- Container width

**Head:**
- Centered text block, 80px bottom margin
- Eyebrow "Selected work" (centered inline-flex variant of the .eyebrow)
- Heading "Projects" — 64px, weight 700, letter-spacing -0.03em
- Underline: 4px × 32px violet bar, 28px top margin, rounded, with glow shadow

**Project rows (×4):**
- Grid: 2 columns 1fr/1fr, 80px gap, vertically centered
- 140px bottom margin between rows
- **Alternating layout**: Even-indexed rows (0, 2) are image-LEFT/text-RIGHT. Odd-indexed (1, 3) use `.alt` class to flip: text-LEFT/image-RIGHT (via `order` on the children).

**Per-row media (image):**
- 4:3 aspect, 14px border-radius, `--surface` background
- Has 2 frame corners (top-left, bottom-right) — 24×24 violet square brackets with only the outer corner stroked
- Inside: `<image-slot>` web component (drop-target for user's screenshot)
- Hover:
  - Lifts -4px
  - Inner image scales to 1.04 over 0.6s
  - Pre-`::before` gradient overlay fades from 0.18 → 0.08
  - Frame corners grow 24→36px

**Per-row body (text):**
- Title (h3): 38px, weight 700, letter-spacing -0.025em
- Tech tags: pill chips. Flex wrap, 8px gap. Each: 5/12 padding, 999px radius, 1px `--rule-strong` border, `--bg-elev` bg, 12px text, weight 500, `--fg-muted`. Hover: border + text turn violet.
- Description: 16px, line-height 1.6, `--fg-muted`, max-width 500px
- Links: 2 buttons in a row
  - Primary "View case study ↗" — filled violet, white
  - Ghost "Live demo ↗" — `--fg` text, no fill. Hover: violet.
  - Both lift -2px on hover; arrow translates (3px, -3px)

**Project content** (pulled from `data.js`, see Content section below):

| # | Title | Tech tags | Description |
|---|---|---|---|
| 0 | A ChatGPT-style assistant that actually keeps up | React, TypeScript, Vite, Zustand, TanStack Query, WebSockets, Chime SDK | Long-session streaming LLM UI… |
| 1 | The middleware ERP and Monday actually needed | Node.js, Express, Bull, Redis, AWS SQS, OAuth 2.0, Webhooks | Webhook-driven sync between HarmoniQ ERP and Monday… |
| 2 | Two-way SMS, embedded where work already lives | React, TypeScript, MUI, Socket.IO, Node.js, BullMQ, MySQL | Real-time chat threads inside Monday boards… |
| 3 | Scheduling hundreds of workers, drag-and-drop simple | React, Next.js, Drag & Drop, Framer Motion | Drag-and-drop workforce scheduling for a Danish construction giant… |

Each row also carries a `data-i="{index}"` attribute used by the cosmic layer to anchor planets.

**Reveal:** Media and body have `.reveal` with index-based stagger (`.d1` on the trailing side of the row).

---

### Section 6: Contact (`#contact`)

**Purpose:** Contact methods list.

**Layout:**
- Padding 60px top, 100px bottom
- 1px top border `--rule`
- Inner grid: 2 columns 1fr/1fr, 80px gap, items aligned to start

**Left column:**
1. Eyebrow "Contact"
2. Heading: "Have a project? Let's **talk.**" — 64px, weight 700, line-height 1.05. "talk." in `--accent`. Two lines via `<br/>`.
3. Paragraph (17px, `--fg-muted`, max-width 380px): "Currently accepting briefs for fullstack contracts, frontend leadership, and real-time integration work. Reach out through any channel."

**Right column — contact methods (5 rows):**
Each row is a `<a>` styled as a flex row.
- Grid: 96px (label) / 1fr (value) / 28px (arrow)
- 20px column gap, 22px vertical padding, 1px bottom border `--rule`
- Label: 12px, weight 500, letter-spacing 0.14em, uppercase, `--fg-subtle`
- Value: 17px, weight 500, letter-spacing -0.005em, `--fg`
- Arrow "↗" right-aligned, 16px, `--fg-muted`
- Hover: row gets 16px left-padding (slides right), arrow turns violet and translates (4, -4)

Methods, in order:
1. **EMAIL** → `ngochaiitech@gmail.com` → `mailto:`
2. **LINKEDIN** → `linkedin.com/in/simplecray` → `https://...`
3. **GITHUB** → `github.com/simplecray` → `https://...`
4. **PHONE** → `(+84) 375-911-341` → `tel:`
5. **LOCATION** → `Ho Chi Minh City, Vietnam` → `#`

Reveals staggered `.d1` through `.d5`.

---

### Section 7: Footer

**Purpose:** Sign-off + socials.

**Layout:**
- Padding 40px vertical
- 1px top border `--rule`
- Background `rgba(13,15,23,.85)` with blur 8px
- Inner: container, flex row, space-between, vertically centered

**Content:**
- **Brand** (left): "Hai Duong**.**" — 15px, weight 600, letter-spacing -0.01em, "." in `--accent`
- **Copy** (center): "Designed & built with care, © 2026" — 12px, `--fg-subtle`
- **Socials** (right): 3 circular icons (36×36, 1px `--rule-strong` border, 50% radius)
  - Email (envelope SVG, mailto:)
  - GitHub (Octocat SVG, link to github.com profile)
  - LinkedIn (in mark SVG, link to profile)
  - Hover: border + icon turn violet, lift -2px

---

## Cosmic Background Layer

This is the visual centerpiece. **Recreate it carefully.**

### 1. StarField (full-viewport canvas, `position: fixed`, z-index -2)

A full-screen `<canvas>` that draws:
- **Stars** — density `(viewport_w * viewport_h) / 3200`. Each star has:
  - `x, y` — initial random position
  - `r` — radius. 4% chance "big" (1.4–2.6px), otherwise 0.4–1.3px
  - `phase, speed` — for sinusoidal twinkle (`tw = 0.55 + 0.45 * sin(time * speed + phase)`)
  - `tint` — 18% chance: drawn in `rgba(192, 132, 252, alpha * 0.9)` instead of white
  - `depth` — 0.15 → 1.0. Used for parallax (higher = closer = moves more)
  - Big stars get diffraction crosses (4 spikes) when twinkle > 0.8
- **Mouse parallax** — stars shift `mx * depth * 8` horizontally and `my * depth * 4` vertically
- **Scroll parallax** — stars' Y shifts by `scrollY * depth * 0.18`, wrapped with modulo to make infinite scroll feel
- **3 nebula glow blobs drawn on canvas** — large soft radial gradients at random positions, colors: violet `(168,85,247, .10)`, blue `(80,140,255, .08)`, pink `(236,72,153, .06)`. Parallax with `scrollY * 0.05` (slowest layer).
- Animation loop via `requestAnimationFrame`. DPR-aware (capped at 2× retina).

### 2. SolarSystem (8 CSS-rendered planets anchored to sections)

Each planet is a positioned `<div>` with radial-gradient + inset shadows for spherical lighting. Planets are **dynamically positioned** after mount by querying the target section's bounding box and placing the planet at `target.top + target.height * frac - planet.size/2` within the `.page` wrapper.

**Planet order matches actual solar system (Earth outward):**

| # | Planet | Target section | Size | Side | Offset | scrollSpeed | Opacity |
|---|---|---|---|---|---|---|---|
| 1 | **Earth** | `#home` (frac 0.5) | 380 | right | -160 | 1.0 | 0.88 |
| 2 | **Moon** (Earth's companion) | `#home` (frac 0.32) | 90 | right | 220 | 1.6 | 0.92 |
| 3 | **Mars** | `#about` | 320 | left | -240 | 0.9 | 0.7 |
| 4 | **Jupiter** | `#work .project[data-i="0"]` | 460 | right | -180 | 0.85 | 0.78 |
| 5 | **Saturn** (rings) | `.project[data-i="1"]` | 380 | left | -260 | 0.75 | 0.7 |
| 6 | **Uranus** (rings, cyan) | `.project[data-i="2"]` | 280 | right | -120 | 1.0 | 0.75 |
| 7 | **Neptune** | `.project[data-i="3"]` | 280 | left | -120 | 1.05 | 0.78 |
| 8 | **Sun** | `#contact` | 500 | right | -180 | 0.55 | 0.92 |

**Per-planet behavior:**
- Slow continuous rotation on `.planet-inner` (`animation: planet-spin 90s linear infinite`)
- Gentle bob on `.planet-wrap` (12s ease-in-out loop, ±12px)
- Parallax: each frame, computes its center distance from viewport center and applies `transform: translateY(-center * 0.08 * scrollSpeed)` — so each planet drifts at its own speed
- IntersectionObserver fades each planet in/out as it enters/leaves viewport (15% rootMargin)

**Planet visual recipes** (from CSS — `.planet-{kind} .planet-inner`):

- **Earth:** Layered radial-gradients — 3 green "continent" blobs over a blue base; cloud highlights on `::after`
- **Moon:** Grayscale radial + cratered `::before`
- **Mars:** Red-orange radial + darker crater spots
- **Jupiter:** Repeating horizontal bands (5 color stops) + Great Red Spot on `::after`
- **Saturn:** Yellow-amber radial + elliptical rings via separate `.rings` div (rotateX 72° + rotateZ -18°, 4px border with 3 inset box-shadows for ring layers)
- **Uranus:** Pale cyan radial + thin perpendicular rings (rotateX 72° + rotate 70°)
- **Neptune:** Deep blue radial with cool highlights
- **Sun:** Yellow-white center, orange/red mid, dark edge + heavy outer drop-shadow glow; faster spin (60s)

See `portfolio.css` `.planet-{kind}` blocks for exact gradient stops.

### 3. CosmicObjects (layered behind sections, `position: absolute` inside `.page`, z-index -1)

Each object anchors to a section via a `<CosmicAnchor>` wrapper (same dynamic positioning pattern as planets).

- **Galaxy** (SVG, 520×520) — anchored to `#home` frac 0.15, left -80px. Multi-arm spiral built from 8 rotated ellipses (4 violet + 4 blue, at rotations 0/45/90/135 and 22/67/112/157) over an elliptical disc + bright core (radial gradient white→amber→orange). Whole group rotates 120s.
- **Violet nebula** — `#about` frac 0.4, right -200px, 900×700px, blur 60px, mix-blend-mode screen. Background: `radial-gradient(ellipse, rgba(168,85,247,.6), rgba(80,50,180,.18) 50%, transparent 75%)`. Opacity 0.75.
- **Asteroid belt** — anchored to project 1 frac -0.15 (slightly before it), centered, 900×120px. ~70 small CSS dots (1.5–5.5px radius), random positions, each with `asteroid-bob` animation (8s, alternating direction by `:nth-child(odd)`).
- **Blue nebula** — project 2, right side, 800×600px. Same recipe with `rgba(80,140,255,...)`
- **Black hole** — project 3 frac -0.1, left -80px, 300×300px:
  - `.disk` — full size, `conic-gradient` of amber/orange/violet/blue, blur 24px, spins 14s
  - `.disk-edge` — inset 10%, more saturated conic, blur 8px, spins 10s
  - `.lens` — inset 22%, 1px white border ring (gravitational lensing)
  - `.core` — inset 28%, pure black radial center with outer amber glow
- **Pink nebula** — project 4, left side, 900×700px, `rgba(236,72,153,...)`
- **Cyan nebula** — contact, left side, 1100×800px, `rgba(34,211,238,...)`

### 4. Comets (3, fixed full-screen overlay, z-index 4)

Three diagonal shooting comets that fly across viewport on CSS animation loops (22s / 30s with 8s delay / 26s with 16s delay). Each: 220×3px white gradient trail with violet drop-shadow glow + 10×10px white head with double box-shadow.

Animation: starts off-screen one corner, opacity 0, fades in 6→10%, traverses to opposite corner over ~30% of cycle, fades out at 40%, stays at 0 until next cycle. Three different `@keyframes` (`comet-fly-1`, `comet-fly-2`, `comet-fly-3`) with different angles (28°, -22°, 35°).

---

## Custom Cursor

Replaces native cursor with a 2-layer cosmetic one (CSS `cursor: none` everywhere):

- **`.cursor`** — 6×6 violet dot, `position: fixed`, `mix-blend-mode: difference`, follows mouse exactly
- **`.cursor-ring`** — 32×32 1px white ring, follows with smoothing (lerps toward target at 0.18 per frame via rAF)
- When hovering interactive elements (`a, button, [data-hover], image-slot, input, textarea, .project-media`):
  - Ring grows to 56×56, border turns `--accent` (violet), gets `rgba(var(--accent-rgb), .12)` background fill
  - Transition: 0.35s `--ease-out`
- Hidden when mouse leaves document; reveals on mouseenter

---

## Interactions & Behavior — Summary

| Trigger | Effect | Implementation |
|---|---|---|
| Page load | Hero elements stagger-reveal (greeting → sub → title → CTAs → portrait rings) | CSS `@keyframes load-up` with per-element `animation-delay` |
| Scroll into view (section / element) | Fade-up reveal (.reveal → .reveal.visible) | IntersectionObserver, threshold 0.15 |
| Scroll into view (About) | YOE number counts 0 → (currentYear - 2020) | requestAnimationFrame, cubic ease-out, 1.2s |
| Scroll (any) | Stars parallax (per depth), nebulae parallax slowly, planets parallax per scrollSpeed | rAF, computed once per scroll event |
| Scroll | Nav scrolled state engages > 24px | scroll listener, sets `.scrolled` class |
| Scroll | Active nav link updates | IntersectionObserver on section ids, rootMargin '-40% 0px -55% 0px' |
| Hover link/button/card | Cursor ring grows + turns accent | mouseover listener checks closest interactive ancestor |
| Hover project media | Image scales 1.04, container lifts -4px, corner brackets grow | CSS transitions |
| Hover skills strip item | Color shifts to accent | CSS |
| Hover contact method | Slides right 16px, arrow tilts | CSS |
| Hover footer social | Lift -2px + accent | CSS |
| Continuous | Star twinkle, planet rotation, planet bob, ring float, comet fly-by, galaxy spin, black-hole disk spin, scroll cue pulse, active-nav dot pulse | CSS animations + rAF |

---

## State Management

Minimal client state. All state lives in components, no global store needed.

- `Cursor`: dot position, ring position, hidden, hover (4 useState)
- `Nav`: scrolled (boolean), active (section id string)
- `useReveal()` hook: visible (boolean) — reusable across About, Projects rows, Contact
- `useCounter(target, start, duration)` hook: animated number
- `Planet` / `CosmicAnchor`: pos (top + ready), visible

No data fetching. CV content is statically imported from `data.js`.

---

## Design Tokens

All defined as CSS custom properties on `:root` in `portfolio.css`.

### Colors

```css
--bg: #06070d;          /* page background */
--bg-elev: #0d0f17;     /* slightly elevated surfaces */
--surface: #131625;     /* card / media backgrounds */
--fg: #e8edf2;          /* primary text */
--fg-muted: #8892a0;    /* secondary text */
--fg-subtle: #525c6b;   /* tertiary / labels */
--rule: #1a1d2e;        /* default borders */
--rule-strong: #2a2e44; /* emphasis borders */

--accent: #a855f7;          /* PRIMARY — violet (default) */
--accent-deep: #9333ea;     /* hover / pressed */
--accent-soft: #c084fc;     /* highlight */
--accent-rgb: 168, 85, 247; /* for rgba() composition */
```

**Accent presets** (configurable, see `ACCENT_PRESETS` in `portfolio-app.jsx`):

| Preset | `--accent` | `--accent-deep` | `--accent-soft` |
|---|---|---|---|
| **violet** (default) | `#a855f7` | `#9333ea` | `#c084fc` |
| cyan | `#22d3ee` | `#06b6d4` | `#67e8f9` |
| gold | `#fbbf24` | `#f59e0b` | `#fcd34d` |
| magenta | `#ec4899` | `#db2777` | `#f9a8d4` |
| mint | `#34d399` | `#10b981` | `#6ee7b7` |

The portrait rings, nebulae, and other "accent" colors all derive from `--accent-rgb` via `rgba()`, so swapping the preset re-themes the whole page including the cosmic objects.

### Typography

```css
--font: 'Geist', ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif;
```

Weights used: 300, 400, 500, 600, 700, 800. Loaded from Google Fonts.

| Use | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Section heading (h2 large) | 64px | 700 | -0.03em | 1.05 |
| Project title (h3) | 38px | 700 | -0.025em | 1.1 |
| Hero greeting | 42px | 600 | -0.025em | — |
| Hero title (h1) | 72px | 700 | -0.035em | 1.05 |
| Hero sub | 22px | 400 | — | — |
| About lead | 18px | 400 | — | 1.55 |
| Body large | 20px | 400 | — | 1.55 |
| Body | 17px | 400 | — | 1.55 |
| Body small | 16px | 400 | — | 1.6 |
| Tag / chip | 12px | 500 | -0.005em | — |
| Eyebrow | 12px | 500 | 0.18em (uppercase) | — |
| Footer copy | 12px | 400 | — | — |
| Skills strip item | 17px | 400 | 0.02em | — |

### Spacing

- Container max-width: **1240px**
- Section gutter (horizontal padding): **80px**
- Section vertical padding: **120px** (60px top + 120px bottom for projects, 100/60 for contact)
- Hero padding: **120px top, 60px bottom**

### Radius

| Use | Radius |
|---|---|
| Buttons / chips small | 6px |
| Project media | 14px |
| Circles / pills | 50% / 999px |

### Shadows

```css
--shadow-md: 0 8px 32px rgba(0, 0, 0, .35);
--shadow-lg: 0 24px 80px rgba(0, 0, 0, .5);
--shadow-accent: 0 12px 40px rgba(var(--accent-rgb), .35);
```

### Easing

```css
--ease-out: cubic-bezier(.2, .7, .2, 1);
--ease-in-out: cubic-bezier(.65, 0, .35, 1);
```

---

## Content

The portfolio content is in **`data.js`** as a single `window.CV` object. Migrate this to typed data in your codebase (TypeScript interface or backend CMS). Fields used by the design:

- `cv.email`, `cv.phone`, `cv.linkedin`, `cv.github` — strings used in contact/footer
- `cv.featured[]` — 4 projects, each with `id`, `year`, `client`, `role`, `title`, `summary`, `bullets[]`, `stack[]`, `metric`

`useCounter` reads "years of experience" by computing `currentYear - 2020` at render time — keep the start year `2020` configurable.

---

## Assets & 3rd-party

- **Geist + Geist Mono** fonts — Google Fonts CDN. Self-host in production.
- **No icon library** — 3 footer socials are inline SVGs (env, GitHub Octocat, LinkedIn) inside the Footer component. Lift them or swap for your icon set.
- **`image-slot.js`** is a prototyping web component for user-droppable image placeholders. **Do not ship this.** Replace each `<image-slot id="...">` with a real `<img src="...">` once you have final images, or build a CMS-driven image component.

### Image slots that need real images

| Slot id | Use | Recommended dimensions |
|---|---|---|
| `portrait` | Hero portrait, circle-cropped | 760×760 (display 380×380) |
| `proj-zeligate` | Project 1 media | 1200×900 (display ~520×390) |
| `proj-shade` | Project 2 media | same |
| `proj-sinch` | Project 3 media | same |
| `proj-aarsleff` | Project 4 media | same |

---

## Accessibility

- All animations honor `prefers-reduced-motion: reduce` (disabled when set, plus `scroll-behavior: auto`). Carry this over.
- `aria-hidden="true"` on all decorative cosmic elements (canvas, planets, comets, etc.).
- Cursor replacement should be **opt-in** or skipped on touch/keyboard users. Current implementation uses `cursor: none` globally — consider gating it with `@media (hover: hover) and (pointer: fine)`.
- Color contrast: body text on `--bg` passes WCAG AA. Verify all your final accent/text combos.
- Skip-link to `#main` recommended (not in the prototype — add).

---

## Responsive

**Not implemented in the prototype.** Treat the design as ~1440px wide. For production, plan breakpoints:

- **≥1280px**: as designed
- **1024–1279px**: drop gutter to 56px, scale hero title to ~60px
- **768–1023px**: collapse all 2-column grids to single column. Hero portrait below text. Project rows: image then text always (drop alternating).
- **<768px**: hero title ~44px, contact methods stack with label above value, drop some cosmic objects (galaxy, black hole) to preserve performance.

Also disable / reduce the StarField canvas density on mobile.

---

## Files in this bundle

| File | Role |
|---|---|
| `Portfolio.html` | Entry — loads React/Babel from CDN, mounts `<App>` into `#root`. |
| `portfolio.css` | All styles: tokens, base, every section, cosmic objects, animations. |
| `portfolio-app.jsx` | Components: Cursor, Nav, Hero, SkillsStrip, About, Projects, Contact, Footer, App + hooks (useReveal, useCounter). |
| `space.jsx` | StarField (canvas), Planet, SolarSystem, CosmicAnchor, GalaxySVG, BlackHole, AsteroidBelt, CosmicObjects, Comets. |
| `data.js` | `window.CV` — all content. Migrate to typed data in your project. |
| `image-slot.js` | Prototyping placeholder web component. Replace with real `<img>` in production. |

---

## Suggested implementation order

1. **Set up tokens + typography** — get the dark palette, Geist font, and CSS variables in place. Match the spacing scale.
2. **Build layout + content** — Nav, Hero, Skills strip, About, Projects, Contact, Footer with real content and the static design. Verify reading order, focus order, and spacing look right with no animation yet.
3. **Add reveal animations** — IntersectionObserver-driven `.reveal` → `.visible`, plus the hero page-load stagger.
4. **Add the YOE counter** — easy win, ~10 lines.
5. **Add the custom cursor** — gate it on pointer-fine, mix-blend difference for the dot.
6. **Build the StarField canvas** — get stars + scroll parallax working before adding nebulae and shooting effects.
7. **Add SolarSystem** — start with 1-2 planets (Earth + Saturn), get the section-anchored positioning right, then add the rest.
8. **Add CosmicObjects** — Galaxy, then nebulae, then asteroid belt, black hole, comets.
9. **Performance pass** — throttle scroll handlers, gate cosmic layer on `prefers-reduced-motion`, mobile fallback (lower star count, skip galaxy/black-hole).
10. **Responsive pass** — collapse grids, drop heavy effects on small screens.

Good luck.
