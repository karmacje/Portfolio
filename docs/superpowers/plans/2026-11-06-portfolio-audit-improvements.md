# Portfolio Audit Improvements Implementation Plan

> **For agentic workers:** Follow this plan in order. Complete one task only, verify it, then stop and ask the user to confirm before continuing. After confirmation, reread this plan to select the next unchecked task.

**Goal:** Resolve the five prioritized findings from the November 6, 2026 portfolio audit without changing unrelated copy or visual direction.

**Architecture:** Make each audit finding a separate, independently verifiable task. Start with the measured color-contrast failure, then address narrow viewport overflow, project-detail consistency, landmark semantics, and mobile tap areas. Keep the existing Next.js, CSS-token, and browser-native interaction patterns.

**Tech Stack:** Next.js 16.3.3, React 19, TypeScript, CSS, Node.js built-in test runner, Impeccable detector, browser emulation.

**Spec:** Full-page audit reported in the conversation on 2026-11-06; no separate design spec.

## Global Constraints

- Preserve the portfolio's existing identity, content, and functioning links.
- Do not invent project facts, case-study content, or URLs; request user-provided approved material if required.
- Do not start a later task until the user confirms the previous task is complete.
- After each confirmation, reread this file and continue with the next unchecked task only.
- Validate the relevant behavior at the rendered viewport sizes, not only through source assertions.
- Do not commit unless the user asks.

---

### Task 1: Correct text contrast (P1)

**Files:**
- Modify: `app/globals.css`
- Test: `tests/mobile-ui.test.mjs`

**Interfaces:**
- Consumes: Existing `--blue`, `--ground`, and `--surface` color custom properties.
- Produces: Color values that meet WCAG AA contrast for the small blue eyebrow on the page background and the light button label on the blue button background.

- [x] **Step 1: Add a failing contrast regression test**

Add tests to `tests/mobile-ui.test.mjs` that read the relevant color tokens from `app/globals.css`, calculate WCAG relative luminance and contrast ratio, and assert `--blue` against `--ground`, `--surface` against `--blue`, and the selected-text foreground against `--blue` are at least 4.5:1.

- [x] **Step 2: Run the targeted test and verify the current colors fail**

Run: `node --test tests/mobile-ui.test.mjs`
Expected: The new contrast test fails for the current blue (`#438ef2`); existing mobile UI tests continue to pass.

- [x] **Step 3: Adjust the shared blue token**

Change `--blue` in `app/globals.css` to a blue that passes the checks while preserving its role as the portfolio accent. Set the `::selection` foreground to `var(--surface)` so selected text also meets contrast on the darker blue. Do not weaken the tests or change copy.

- [x] **Step 4: Verify tests and rendered detector results**

Run: `node --test tests/mobile-ui.test.mjs`
Run: `.github/skills/impeccable/scripts/impeccable.cmd detect --json http://localhost:3000`
Expected: All tests pass; the detector no longer reports low contrast for the contact eyebrow or solid button.

- [x] **Step 5: Stop for user confirmation**

Report the changed color token, measured ratios, and verification results. Do not begin Task 2 until the user confirms.

### Task 2: Remove overflow at a 320px viewport (P2)

**Files:**
- Modify: `app/globals.css`
- Verify: rendered page in the browser at 320px and 390px viewport widths

**Interfaces:**
- Consumes: Existing responsive CSS and browser viewport sizing.
- Produces: No horizontal document overflow at a 320px viewport, without regressing the existing 390px layout.

- [x] **Step 1: Reproduce and inspect the overflow**

Use the browser to set the viewport to 320px wide and record `document.documentElement.scrollWidth` and `document.documentElement.clientWidth`. The initial overflow came from the body's 320px minimum width; after removing it, a hidden navigation indicator still extended beyond the 305px layout viewport.

- [x] **Step 2: Make the smallest CSS correction**

Remove the body's fixed 320px minimum width and hide the decorative navigation indicator at mobile widths in `app/globals.css`. Keep content readable; do not hide overflow globally as a workaround.

- [x] **Step 3: Verify narrow and standard mobile widths**

At 320px and 390px, verify `scrollWidth <= clientWidth` both with the mobile menu closed and open, check the hero and navigation, and run `node --test tests/mobile-ui.test.mjs`. Browser emulation reported no overflow at either width or menu state.

- [x] **Step 4: Stop for user confirmation**

Report the observed overflow cause and the viewport verification. Do not begin Task 3 until the user confirms.

### Task 3: Give the second project a consistent next step (P2)

**Files:**
- Modify: `components/ProjectList.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-ui.test.mjs`
- Verify: rendered project list at desktop, tablet, and phone widths

**Interfaces:**
- Consumes: The existing `Project` type and the two project records in `app/page.tsx`.
- Produces: For both projects, an image placeholder beside the existing short description and tags, plus a testimonial placeholder below it.
- User-approved composition: preserve the existing editorial style; project image beside the intro; testimonial below with a portrait slot and its text.
- Privacy/content constraint: do not render names, roles, portraits, or attributed quotes until exact approved material and publication permission are supplied. Clearly mark the current visual slots as pending, not as real images or testimonials.

- [x] **Step 1: Add a failing rendered-placeholder check**

Use the browser to confirm neither project currently renders a project-image placeholder or a testimonial placeholder. Record the current project count and available NMMC case study before editing.

- [x] **Step 2: Add semantic placeholder structure**

In `components/ProjectList.tsx`, add a visibly labeled project-image placeholder and a testimonial section for each project. Include a distinct portrait placeholder and neutral pending-approval copy. Keep the existing project descriptions, tags, project links, and NMMC case-study disclosure unchanged; do not include the provided names or roles yet.

- [x] **Step 3: Style the responsive editorial layout**

In `app/globals.css`, place the preview beside the project intro on wide screens and stack it before the intro on narrow screens. Place the testimonial portrait slot beside its pending copy, use simple flat token-based placeholder surfaces with no fabricated imagery, and preserve the existing content rhythm and mobile gutters.

- [x] **Step 4: Verify the rendered project list**

At 1440px, 768px, and 390px, confirm two project previews and two testimonial placeholders render, no horizontal overflow occurs, the placeholders are clearly announced/labeled, and the NMMC case study remains operable. Run `node --test tests/mobile-ui.test.mjs`, `npx eslint components/ProjectList.tsx tests/mobile-ui.test.mjs`, and `npm run build`.

- [x] **Step 5: Stop for user confirmation**

Report the placeholder treatment and verification. Ask for confirmation before Task 4. Add real names, roles, images, and quotations only after the user supplies approved content and permission.

### Task 4: Expose page-wide landmark semantics (P2)

**Files:**
- Modify: `app/page.tsx`
- Modify if required: `components/SiteNavigation.tsx`
- Verify: browser accessibility snapshot and keyboard navigation

**Interfaces:**
- Consumes: The existing navigation header, main page sections, and contact footer.
- Produces: Page-wide banner, main, and contentinfo landmarks, with the navigation and footer outside the main landmark.

- [x] **Step 1: Verify the current landmark tree**

Inspect the browser accessibility snapshot and confirm the current placement of the header, main landmark, and footer.

- [x] **Step 2: Restructure the page landmarks**

Place the site header and site footer as siblings of the single `<main>` landmark. Preserve existing section IDs, link destinations, content, and visual layout.

- [x] **Step 3: Verify semantics and behavior**

Check the browser accessibility snapshot for one banner/header, one main, and one contentinfo/footer landmark. Verify navigation links, in-page anchors, and keyboard focus order; run `node --test tests/mobile-ui.test.mjs`.
The rendered tab-stop order places primary-navigation links first and footer links after the main content. The browser harness did not dispatch Tab key events, so live Tab movement was not claimed.

- [x] **Step 4: Stop for user confirmation**

Report the resulting landmarks and verification. Do not begin Task 5 until the user confirms.

### Task 5: Improve compact mobile tap areas (P3)

**Files:**
- Modify: `app/globals.css`
- Verify: rendered page in the browser at 320px and 390px viewport widths

**Interfaces:**
- Consumes: Existing case-study `<summary>`, scroll cue, and mobile layout styles.
- Produces: Comfortable mobile hit areas for the case-study disclosure and scroll cue without altering their visible content.

- [x] **Step 1: Measure current interaction bounds**

At 320px and 390px, measure the rendered bounding boxes of `.project-item summary` and `.scroll-cue`; confirm which targets are below 44px tall.

- [x] **Step 2: Increase the hit areas**

Add mobile-only minimum hit-area sizing and alignment for the undersized controls. Keep the disclosure keyboard-operable and do not apply broad styles to unrelated inline links.

- [x] **Step 3: Verify pointer, keyboard, and layout behavior**

At 320px and 390px, both controls measure 44px high with no document overflow. A native DOM click opened the case study and the scroll cue resolved to `#background`; the `<summary>` remains focusable (`tabIndex=0`). The browser harness did not dispatch real pointer or keyboard events.

Run `node --test tests/mobile-ui.test.mjs`.

- [x] **Step 4: Report completion**

Summarize final verification and note that the optional detector advisories (font distinctiveness and paragraph wraps) were not prioritized in the audit findings.
