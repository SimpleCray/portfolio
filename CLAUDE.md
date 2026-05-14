# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design handoff** for Hai Duong's personal portfolio — a single-page app with a dark cosmic theme. The files in `design_handoff_portfolio/` are **prototype references only** (React loaded from CDN, Babel in-browser transpilation, inline `<script type="text/babel">`). They are not production code. The production implementation does not exist yet.

## Recommended production stack

**React + Vite + TypeScript** — the closest match to the prototype. Use CSS Modules or Tailwind for styling. No routing needed (single page, smooth-scroll only).

## Design reference files

| File | Purpose |
|---|---|
| `portfolio-app.jsx` | All UI components: Nav, Hero, SkillsStrip, About, Projects, Contact, Footer + `useReveal` / `useCounter` hooks |
| `space.jsx` | Cosmic layer: StarField canvas, Planet, SolarSystem, CosmicAnchor, GalaxySVG, BlackHole, AsteroidBelt, CosmicObjects, Comets |
| `portfolio.css` | All tokens, base styles, section styles, planet visual recipes, animations |
| `data.js` | `window.CV` — all content. Migrate to a typed TypeScript object in production. |
| `image-slot.js` | Drag-and-drop placeholder web component. **Do not ship.** Replace with real `<img>` tags. |
| `Portfolio.html` | Entry point that wires CDN React + Babel — for browser preview only. |

## Architecture

### Component tree
```
App
├── StarField          (fixed canvas, z-index -2)
├── Cursor             (fixed, custom mouse cursor)
├── Nav                (sticky, scroll-spy via IntersectionObserver)
└── .page wrapper
    ├── SolarSystem    (8 CSS planets, absolutely positioned against section bounding boxes)
    ├── CosmicObjects  (Galaxy, nebulae, AsteroidBelt, BlackHole — CosmicAnchor for positioning)
    ├── Hero / SkillsStrip / About / Projects / Contact / Footer
    └── Comets         (3 fixed full-screen overlay shooting comets)
```

### Key patterns

**Section-anchored cosmic positioning:** Planets and cosmic objects are positioned by querying the target section's `getBoundingClientRect()` after mount and computing `top + height * frac - size/2` within `.page`. This runs post-mount because section heights aren't known until layout.

**Scroll + mouse parallax on StarField:** `requestAnimationFrame` loop reads `scrollY` and mouse position each tick. Each star has a `depth` value (0.15–1.0) that scales its parallax shift. Stars wrap vertically with modulo to simulate infinite scroll.

**Reveal animation pattern:** `useReveal()` hook returns `[ref, visible]`. Attach `ref` to a section wrapper. Child elements get class `reveal` (opacity 0, translateY 28px) and `reveal visible` when the IO fires. Stagger delays via `d1`–`d5` classes (0.08s steps).

**YOE counter:** `useCounter(target, start, duration)` — starts counting when `start` becomes `true` (from `useReveal`). Target = `currentYear - 2020`. Start year `2020` should remain a named constant.

**Accent theming:** 5 presets (`violet`, `cyan`, `gold`, `magenta`, `mint`) defined in `ACCENT_PRESETS`. Switching a preset writes `--accent`, `--accent-deep`, `--accent-soft`, `--accent-rgb` directly to `document.documentElement.style`. All cosmic objects (nebulae, rings, glow) use `rgba(var(--accent-rgb), ...)` so they recolor automatically.

**Content:** `window.CV` in `data.js` → migrate to a typed `cv.ts` with a `CV` interface. The `featured[]` array (4 projects) drives the Projects section. Contact section reads `cv.email`, `cv.phone`, `cv.linkedin`, `cv.github`.

## Design tokens (abridged)

Colors are defined as CSS custom properties. Key values:
- `--bg: #06070d` / `--fg: #e8edf2` / `--fg-muted: #8892a0`
- `--accent: #a855f7` (violet default), `--accent-rgb: 168, 85, 247`
- Container max-width: **1240px**, gutter: **80px**, section vertical padding: **120px**
- Font: **Geist** (Google Fonts CDN in prototype; self-host in production)
- Easing: `--ease-out: cubic-bezier(.2, .7, .2, 1)`

## Accessibility requirements to carry over

- All animations must respect `prefers-reduced-motion: reduce` — disable canvas animations, CSS animations, and set `scroll-behavior: auto`.
- All decorative cosmic elements need `aria-hidden="true"`.
- Custom cursor (`cursor: none`) must be gated to `@media (hover: hover) and (pointer: fine)` — do not apply on touch devices.
- Add a skip-link to `#main` (not in the prototype).

## Responsive breakpoints (not in prototype — implement in production)

- **≥1280px**: as designed
- **1024–1279px**: gutter 56px, hero title ~60px
- **768–1023px**: all 2-col grids → single column; hero portrait below text; project rows always image-then-text
- **<768px**: hero title ~44px; drop galaxy and black hole for performance; reduce StarField canvas density

## Implementation order (from README)

1. Tokens + typography → layout + content (no animation) → reveal animations → YOE counter → custom cursor → StarField canvas → SolarSystem planets → CosmicObjects → performance pass → responsive pass
