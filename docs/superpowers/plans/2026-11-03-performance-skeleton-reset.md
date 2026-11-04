# Performance Skeleton Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's card-heavy animated presentation with a semantic, unstyled, dependency-light skeleton while preserving content and functional links.

**Architecture:** Keep the App Router page and root layout, but make `app/page.tsx` the static composition root for navigation, intro, background, projects, Toolbox, and contact. Replace client-only card, deck, flip, magnetic, theme, and liquid-navigation behavior with semantic server-rendered elements; keep `next/font/google` and `next/image` for the two performance-critical assets.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript, `next/font/google`, `next/image`, plain CSS, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-03-performance-skeleton-reset-design.md`

## Global Constraints

- Preserve portfolio content, accessible navigation, external links, CV link, contact links, and project case-study information.
- Toolbox logo lists must have no flip, blur, filter, interval, or transition behavior.
- `app/globals.css` must contain no card tokens, shadows, blur, transforms, hover elevations, flip/deck rules, animation wrappers, or theme switching.
- Remove `motion` and `lucide-react` only after the final import scan confirms they are unused.
- Use `next/image` for the local profile asset with explicit dimensions and `priority`.
- Do not add analytics or `next/script` when no analytics script exists.
- Leave unrelated existing worktree changes untouched.

---

### Task 1: Establish the semantic page contract

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/ProfileCard.tsx`
- Modify: `components/CertificationBadges.tsx`
- Create: `components/Toolbox.tsx`
- Create: `components/ProjectList.tsx`
- Delete: `components/AnimatedHeroTitle.tsx`
- Delete: `components/MagneticLink.tsx`
- Delete: `components/ProjectCard.tsx`
- Delete: `components/ProjectDeck.tsx`
- Delete: `components/ui/liquid-glass-navbar.tsx`
- Delete: `components/ui/logos-with-blur-flip.tsx`

**Interfaces:**
- `app/page.tsx` consumes `ProjectList`, `ProfileCard`, `CertificationBadges`, and `Toolbox`.
- `ProjectList` accepts `projects: Project[]`, where `Project` retains the existing title, description, tags, links, and optional `caseStudy` shape.
- `Toolbox` accepts `groups: { label: string; items: string[] }[]`.
- `ProfileCard` renders the existing `/Profile.JPG` asset with `width={580}`, `height={580}`, `priority`, and a descriptive alt string.

- [ ] **Step 1: Replace animated and card imports in `app/page.tsx`**

Remove imports of `lucide-react`, `MagneticLink`, `AnimatedHeroTitle`, `ProjectDeck`,
`LiquidNavbar`, and `LogosWithBlurFlip`. Add imports for the new semantic list and
Toolbox components plus `ProfileCard` and `CertificationBadges`.

- [ ] **Step 2: Replace the navigation and hero with semantic HTML**

Render a normal `<nav aria-label="Primary navigation">` containing anchor links to
`#intro`, `#background`, `#projects`, `#stack`, and `#contact`, plus the CV and
availability links. Render the hero heading as static text:

```tsx
<h1>Full-stack <em>Web Developer</em></h1>
```

Use ordinary `<a>` elements for “View projects” and “Contact me”.

- [ ] **Step 3: Replace each section's card wrappers with semantic structures**

Use `<section>`, `<header>`, `<div>`, `<ul>`, `<li>`, `<article>`, `<dl>`, and
`<form>`/mapping blocks as appropriate. Keep the existing section IDs and copy.
Render `<ProjectList projects={projects} />` and
`<Toolbox groups={stackGroups} />`.

- [ ] **Step 4: Make profile content static**

Replace the button/flip faces in `ProfileCard.tsx` with:

```tsx
<figure className="profile">
  <Image
    src="/Profile.JPG"
    alt="Portrait of Karley Valmores"
    width={580}
    height={580}
    priority
    sizes="(max-width: 700px) 100vw, 40vw"
  />
  <figcaption>Karl Mc Jay G. Valmores</figcaption>
</figure>
```

- [ ] **Step 5: Make certifications static**

Replace `CertificationBadges.tsx` with a server-rendered list of the two existing
certification names and details. Remove state, session storage, theme toggling,
timeouts, icons, and button-only behavior.

- [ ] **Step 6: Implement plain project articles**

Create `ProjectList.tsx` with a `<ul className="projects-list">`. Each project is
an `<article>` containing its number, title, description, tags, public links, and
an optional `<details>` block containing the existing case-study fields. Do not
add pointer handlers, transforms, card faces, or motion imports.

- [ ] **Step 7: Implement the static Toolbox**

Create `Toolbox.tsx` with one `<section>` per group and a `<ul>` of text items.
Do not request Simple Icons, use timers, or attach CSS animation/filter classes.

- [ ] **Step 8: Run the focused source scan**

Run:

```powershell
rg -n "motion|lucide-react|MagneticLink|AnimatedHeroTitle|ProjectCard|ProjectDeck|LiquidNavbar|LogosWithBlurFlip|backdrop-filter|box-shadow|is-flipped|tool-logo-card" app components
```

Expected: no matches in the rewritten source.

- [ ] **Step 9: Commit the semantic page reset**

```powershell
git add app/page.tsx components/ProfileCard.tsx components/CertificationBadges.tsx components/Toolbox.tsx components/ProjectList.tsx components/AnimatedHeroTitle.tsx components/MagneticLink.tsx components/ProjectCard.tsx components/ProjectDeck.tsx components/ui/liquid-glass-navbar.tsx components/ui/logos-with-blur-flip.tsx
git commit -m "refactor: replace portfolio cards with semantic skeleton" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

### Task 2: Replace global styling with the flat baseline

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/loading.tsx`

**Interfaces:**
- `app/layout.tsx` remains the root document and metadata provider.
- `app/globals.css` provides only reset, typography fallback, readable spacing,
  basic grid/list layout, and narrow-screen stacking.

- [ ] **Step 1: Reduce `app/layout.tsx` to the root font and document shell**

Keep `Geist` from `next/font/google`, metadata, `lang="en"`, and the global
stylesheet import. Remove the unused `Geist_Mono` import/configuration and
utility class strings, then use:

```tsx
<html lang="en" className={geistSans.variable}>
  <body>{children}</body>
</html>
```

- [ ] **Step 2: Replace `app/globals.css`**

Use only the following categories: `@import "tailwindcss"`, universal
box-sizing, `html`/`body` defaults, anchor inheritance, visible focus,
`.site-header`, `.section`, `.section-grid`, `.profile`, `.projects-list`,
`.toolbox-list`, `.contact-list`, and a `max-width: 700px` media query. Do not define shadows,
rounded cards, backdrop filters, transitions, transforms, blur, filters,
theme variables, hover elevations, or animation keyframes.

- [ ] **Step 3: Simplify the loading fallback**

Keep `app/loading.tsx` as a plain `<main aria-label="Loading portfolio">Loading...</main>`
without animation-specific classes.

- [ ] **Step 4: Verify style vocabulary**

Run:

```powershell
rg -n "box-shadow|backdrop-filter|filter:|transform:|transition:|border-radius|alternate-theme|card|flip|deck|reveal|@keyframes" app components
```

Expected: no presentation-effect matches; structural words such as “case study”
are allowed only in content/data.

- [ ] **Step 5: Commit the flat CSS baseline**

```powershell
git add app/globals.css app/layout.tsx app/loading.tsx
git commit -m "style: reduce portfolio to flat CSS baseline" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

### Task 3: Prune dependencies and image configuration

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `next.config.ts`
- Delete: unused public assets only after route/import scan

**Interfaces:**
- The project must build without `motion`, `lucide-react`, or remote Simple Icons.
- `next.config.ts` must export a valid `NextConfig` without an unnecessary
  `images.remotePatterns` entry.

- [ ] **Step 1: Confirm dead imports and assets**

Run:

```powershell
rg -n "from ['\\\"](motion|lucide-react)|/([A-Za-z0-9._-]+\\.(svg|png|jpg|jpeg|webp|pdf))" app components public
```

Record only files with no remaining source or route references. Keep
`public/Profile.JPG` and `public/Valmores_CV.pdf`.

- [ ] **Step 2: Remove unused packages through pnpm**

If the scan has no remaining imports, run:

```powershell
pnpm remove motion lucide-react
```

This updates both `package.json` and `pnpm-lock.yaml`; do not hand-edit the lockfile.

- [ ] **Step 3: Remove remote image configuration**

Delete the `images.remotePatterns` block from `next.config.ts` because the static
Toolbox no longer requests `cdn.simpleicons.org`.

- [ ] **Step 4: Delete only confirmed-unused public assets**

The import scan confirms the default starter SVGs are not referenced by the
application. Remove them with an explicit command and no wildcard; keep the
profile image and CV:

```powershell
Remove-Item -LiteralPath 'public\file.svg','public\globe.svg','public\next.svg','public\profile-placeholder.svg','public\vercel.svg','public\window.svg'
```

- [ ] **Step 5: Commit the dependency cleanup**

```powershell
git add package.json pnpm-lock.yaml next.config.ts
git commit -m "chore: remove unused animation dependencies" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

### Task 4: Validate performance-skeleton behavior

**Files:**
- Modify: none unless validation exposes a regression.

**Interfaces:**
- The final branch must pass lint, production build, and whitespace checks.

- [ ] **Step 1: Install only if dependency metadata changed**

Run:

```powershell
pnpm install --frozen-lockfile
```

- [ ] **Step 2: Run lint**

Run:

```powershell
pnpm lint
```

Expected: exit code 0 with no lint errors.

- [ ] **Step 3: Run the production build**

Run:

```powershell
pnpm build
```

Expected: exit code 0 and successful static/page compilation.

- [ ] **Step 4: Check the diff**

Run:

```powershell
git diff --check
git status --short --branch
```

Expected: no whitespace errors; only intended reset files plus the pre-existing
unrelated `skills-lock.json` and `.agents/skills/design-taste-frontend/` changes.

- [ ] **Step 5: Confirm no scripts need `next/script`**

Run:

```powershell
rg -n "analytics|gtag|googletagmanager|<script|script" app components
```

Expected: no analytics or third-party script integration. Do not add
`next/script` for an absent script.

- [ ] **Step 6: Commit any validation-only correction**

If validation required a source correction, run:

```powershell
git add app components package.json pnpm-lock.yaml next.config.ts
git commit -m "fix: resolve skeleton validation issues" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```
