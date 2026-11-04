# Portfolio Editorial Signal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio into a quiet, editorial signal-system experience with a uniform type scale, clear project proof, responsive composition, and restrained Apple/Emil-inspired motion.

**Architecture:** Keep the existing Next.js route, data, components, and public assets. Move visual decisions into shared CSS tokens and section-level classes, keep content interfaces stable, and use native HTML/CSS for disclosures, navigation, focus states, and motion. No framework or dependency migration.

**Tech Stack:** Next.js 16.3.3, React 19, TypeScript, Tailwind CSS v4 import, CSS custom properties, native HTML/CSS motion.

**Spec:** `docs/superpowers/specs/2026-11-04-portfolio-editorial-signal-redesign-design.md`

## Global Constraints

- Use Soft White `#FAF9F6`, near-black ink, Sky Blue `#74B0FF`, and Signal Persimmon `#F4512C`.
- Keep Geist as the only typeface and use a small tokenized type scale.
- No gradients, glows, decorative blobs, emoji, arbitrary index labels, pill navigation, or backdrop blur.
- Preserve the real project content, contact routes, CV, metadata routes, and public assets.
- Keep headlines to two lines or fewer and prevent horizontal overflow at 390px.
- Gate hover motion with `(hover: hover) and (pointer: fine)`.
- Preserve native keyboard behavior, visible focus, meaningful portrait alt text, and reduced-motion fallbacks.
- Animate transform and opacity only; keep interactive UI motion under 300ms.
- Do not add a dependency unless native CSS/HTML cannot satisfy a requirement.

---

### Task 1: Establish the editorial visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` only if metadata or font wiring needs a minimal correction

**Interfaces:**
- Consumes: Existing class names in `app/page.tsx` and child components.
- Produces: Shared CSS tokens for color, spacing, typography, frame width, easing, focus, and reduced motion. Later tasks must use these tokens rather than local values.

- [ ] **Step 1: Replace the skeletal global rules with tokens**

Define `:root` custom properties for the four colors, frame width, outer padding, section rhythm, display/section/body/meta sizes, line-heights, and the approved ease curve. Keep the existing Tailwind import and universal box sizing.

- [ ] **Step 2: Define the shared frame and type scale**

Style `body`, links, headings, paragraphs, `.section`, `.section-grid`, and focus states so all sections share equal outer margins and a consistent text hierarchy. Use `clamp()` only for the display and section sizes; keep body and metadata readable and stable.

- [ ] **Step 3: Define base navigation and action states**

Create plain sticky header rules, text-link hover/focus states, `.button` base styles, `.button-solid`, `.button-outline`, and the approved CTA border-reveal/signal-mark hooks. Add `:active { transform: scale(0.97); }` with a 100–160ms transform transition.

- [ ] **Step 4: Add responsive and preference fallbacks**

At the mobile breakpoint, collapse grids, reduce outer padding, allow the nav to wrap or scroll without clipping, and keep body text readable. Add `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast` fallbacks without hiding content.

- [ ] **Step 5: Run static validation**

Run:

```powershell
pnpm lint
pnpm exec tsc --noEmit
```

Expected: both commands pass; any new CSS class referenced by JSX should be intentional and type-check should remain clean.

- [ ] **Step 6: Commit the visual foundation**

```powershell
git add app/globals.css app/layout.tsx
git commit -m "feat: establish editorial portfolio design system"
```

### Task 2: Recompose the page sections around real content

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/ProfileCard.tsx`
- Modify: `components/CertificationBadges.tsx`
- Modify: `components/Toolbox.tsx`
- Modify: `components/ProjectList.tsx`

**Interfaces:**
- Consumes: Existing `Project`, `CaseStudy`, toolbox group, certification, and profile data.
- Produces: Semantic section markup using stable IDs `intro`, `background`, `projects`, `stack`, and `contact`; project disclosure and link behavior remain available to Task 3.

- [ ] **Step 1: Simplify and clarify the page copy structure**

Keep the existing claims and contact details, but remove decorative index-style labels and overly fragmented metadata. Ensure the hero has one clear `h1`, one supporting paragraph, one primary project action, and one contact action. Keep every section with a named heading.

- [ ] **Step 2: Rebuild the hero composition**

Use the portrait as the anchored visual partner to the intro copy. Keep `ProfileCard`'s meaningful alt text and stable image dimensions. Add only semantic wrappers/classes needed for the two-column editorial layout and mobile stacking.

- [ ] **Step 3: Rebuild background and proof content**

Present education, focus, experience, and certifications as readable proof blocks using existing content. Keep `CertificationBadges` as a list, but style it as a compact proof composition rather than glass cards or pill chips.

- [ ] **Step 4: Rebuild the project showcase**

Keep all three projects and conditional links. Structure each project as a vertical sequence with title, description, tags, available links, and optional case study. Preserve the NMMC deployment note exactly in meaning and keep the native `details` disclosure accessible.

- [ ] **Step 5: Rebuild toolbox and contact close**

Keep grouped technologies but remove the visual pattern of repeated cards. Make the contact section full-width in Signal Persimmon or Sky Blue with readable ink contrast, a strong email action, phone link, CV, social links, and a designed footer.

- [ ] **Step 6: Add the corresponding section CSS**

Add rules in `app/globals.css` for the hero, profile frame, proof layout, projects sequence, case-study content, toolbox composition, contact close, and mobile order. Ensure neighboring sections use different compositions and no blank half-screen stretches.

- [ ] **Step 7: Validate the page behavior**

Run:

```powershell
pnpm lint
pnpm exec tsc --noEmit
```

Then start the site with `pnpm dev` and verify anchor navigation, the CV link, email/phone links, external links, and the native case-study disclosure in a browser at desktop and 390px widths.

- [ ] **Step 8: Commit the section composition**

```powershell
git add app/page.tsx app/globals.css components/ProfileCard.tsx components/CertificationBadges.tsx components/Toolbox.tsx components/ProjectList.tsx
git commit -m "feat: recompose portfolio sections"
```

### Task 3: Add intentional interaction and motion polish

**Files:**
- Modify: `app/globals.css`
- Modify: `components/ProjectList.tsx` only if disclosure markup needs a class/state hook

**Interfaces:**
- Consumes: Shared motion tokens and section classes from Tasks 1–2.
- Produces: Pointer-gated hover states, immediate press feedback, section entrance states, project emphasis, and reduced-motion behavior without new runtime dependencies.

- [ ] **Step 1: Add progressive section entrance styles**

Use a class/state pattern that leaves content visible by default and adds opacity/transform only when enhancement is active. Stagger heading, copy, and visual children by 40–80ms. Keep travel between 16px and 24px and remove it under reduced motion.

- [ ] **Step 2: Add CTA signal behavior**

Implement the Signal Node border reveal using `clip-path: inset(0 100% 0 0)` to `inset(0 0 0 0)` over 180ms with the approved curve. Shift the signal mark by 3px on fine-pointer hover and keep press feedback immediate.

- [ ] **Step 3: Add project and portrait hover states**

Gate hover effects behind `(hover: hover) and (pointer: fine)`. Use only transform and opacity, keep image scale at or below `1.02`, and avoid layout movement. Do not add hover-only information that touch users cannot access.

- [ ] **Step 4: Style disclosure and focus feedback**

Make `summary` clearly interactive, preserve keyboard focus, and use a short transform/opacity or color response for open/active state where supported. Do not replace native details behavior with a custom client component.

- [ ] **Step 5: Validate motion preferences**

Use browser emulation or DevTools to check normal motion, reduced motion, keyboard navigation, and touch-sized viewport behavior. Confirm content is readable if animation is disabled and no UI locks input during transitions.

- [ ] **Step 6: Commit interaction polish**

```powershell
git add app/globals.css components/ProjectList.tsx
git commit -m "feat: add restrained portfolio interaction polish"
```

### Task 4: Production validation and visual quality gate

**Files:**
- Modify: `app/globals.css`, `app/page.tsx`, or component files only for issues found during this validation pass.
- Test: Production build and browser review at desktop, tablet, and 390px widths.

**Interfaces:**
- Consumes: Completed implementation from Tasks 1–3.
- Produces: A verified production build with no lint/type/build regressions, overflow, missing headings, inaccessible actions, or broken links.

- [ ] **Step 1: Run the complete local checks**

Run:

```powershell
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Expected: all commands pass without warnings that indicate the redesign broke existing Next.js behavior.

- [ ] **Step 2: Review production output at three widths**

Run `pnpm start`, then inspect the production page at approximately 1440px, 768px, and 390px. Check equal outer margins, two-line maximum headings, no horizontal overflow, stable portrait crop, section density, contrast, and a clear first-screen action.

- [ ] **Step 3: Exercise all interactive paths**

Verify:

```text
Intro / Background / Projects / Stack / Contact anchors
CV opens in a new tab
Email and phone links target the correct destinations
GitHub, LinkedIn, and Credly open in new tabs
NMMC case study opens and closes with keyboard and pointer
All links have visible focus states
Reduced motion removes travel and hover transforms
```

- [ ] **Step 4: Fix only validated visual or behavioral issues**

If a check fails, make the smallest change in the owning file. Re-run the specific failed check, then repeat the complete checks if markup, styles, or build behavior changed.

- [ ] **Step 5: Commit the verified result**

```powershell
git add app components
git commit -m "chore: verify portfolio redesign"
```

