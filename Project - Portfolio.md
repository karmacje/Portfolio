# Project - Portfolio

## Current Baseline

- **Status:** Skeletal HTML complete, styling phase beginning.
- **Core Assets:** Raw text, layout elements, and placeholder CTAs.
- **Active Project Skills:** `taste-skill:design-taste-frontend`, `emil-design-eng`, and `obsidian-cli`.


## CTA and Motion Blueprint

### CTA treatment

- Replace generic arrow/logo-like CTA treatments with action-led labels: View projects, Open case study, Contact me, and Download CV.
- Use one custom signal path SVG symbol: a compact bent route ending in a square node, representing a system becoming clear and actionable. Use it only beside primary actions and case-study links.
- Keep the symbol set minimal: signal path for forward action, square node for an available/active state, and no decorative brand marks.
- CTA structure: flat Signal Persimmon fill #F4512C on Soft White #FAF9F6 or Sky Blue #74B0FF; text remains sentence case, no pills, no gradients, no generic social/logo icons.

### Animation rules

- CTA hover purpose: feedback and state indication. On fine pointers, use a 180ms ease transition with cubic-bezier(0.23, 1, 0.32, 1); shift the signal-path mark 3px along its route and scale the CTA to 1.015, never animate layout dimensions.
- CTA press purpose: immediate feedback. Use a 140ms transform transition and scale(0.97) on active; return through the same custom ease-out curve.
- Optional pointer-follow treatment for the primary hero CTA only: spring { mass: 1, stiffness: 100, damping: 10 }, capped at 4px translation, disabled for touch and reduced-motion users.
- Portfolio image hover: exactly 180ms, transform and opacity only, custom ease-out cubic-bezier(0.23, 1, 0.32, 1); use a restrained scale(1.02) with no layout shift, and gate hover rules behind (hover: hover) and (pointer: fine).
- Reduced motion: preserve color/opacity state changes, remove translation, scale, and pointer-follow motion.
- Macro dials remain: Variance 78/100, Motion 42/100, Density 64/100.
- Palette remains: Sky Blue #74B0FF, Soft White #FAF9F6, Signal Persimmon #F4512C, with deep near-black ink.


## Approved CTA Variant

- **Selected variant:** Signal Node.
- **Interaction:** Text-led CTA with the signal-path mark and a soft rectangular border that draws in on hover.
- **Border animation:** Signal Persimmon #F4512C, revealed with clip-path: inset(0 100% 0 0) to inset(0 0 0 0) over 180ms using cubic-bezier(0.23, 1, 0.32, 1).
- **Hover behavior:** Signal mark shifts 3px along its route; CTA may scale to 1.015 on fine pointers.
- **Press behavior:** CTA scales to 