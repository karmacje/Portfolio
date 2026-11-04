# Portfolio Editorial Signal Redesign

## Status

Approved direction: editorial signal system, optimized for quiet precision.

## Goal

Redesign the single-page portfolio so the first screen communicates who Karley is,
what he builds, and where to go next within five seconds. The page should feel
considered and award-level without sacrificing scanability, accessibility, mobile
usability, or the real content already present in the repository.

## Design direction

The page uses a restrained signal-system language:

- Soft White `#FAF9F6` is the primary ground.
- Near-black ink carries all running text.
- Sky Blue `#74B0FF` establishes structural fields and highlights.
- Signal Persimmon `#F4512C` is reserved for primary actions and active states.
- The existing Geist family remains the only typeface.
- Square or lightly rounded surfaces replace the current glass/card treatment.
- No gradients, glows, decorative blobs, emoji, or arbitrary index labels.

The page's idea is: **the portfolio's signal path becomes the navigation path
from problem to useful system**. The visual language is carried by route-like
CTA marks, repeated alignment, and a clear progression from introduction to proof
to contact.

## Information architecture

The existing one-page route remains intact:

1. **Intro** — name, role, concise value proposition, portrait, and one primary
   project action plus a contact action.
2. **Background** — education, focus, experience, and certifications presented as
   proof rather than a dense biography.
3. **Projects** — a vertical showcase for the three real projects. Each project
   keeps its title, description, tags, links, and optional case study. The NMMC
   case study remains expandable and explains its internal deployment honestly.
4. **Toolbox** — grouped technologies with a readable hierarchy, not repeated
   icon cards or pill rows.
5. **Contact** — one strong invitation, email, phone, social links, CV, and a
   designed footer close.

Navigation remains sticky and uses plain text links plus the CV action. It has no
floating pill chrome or backdrop blur.

## Layout and typography

- Use one shared page frame with equal outer margins and a constrained content
  width.
- Use a small, explicit type scale: display, section heading, body, and metadata.
  Components must consume tokens rather than inventing local sizes.
- Keep headlines to two lines or fewer at desktop and mobile widths.
- Keep body copy between 45 and 75 characters per line where possible.
- Use distinct compositions for neighboring sections: two-column hero, proof
  split, vertical project sequence, asymmetric toolbox, and full-width contact.
- Keep the portrait anchored to the hero grid with a stable aspect ratio and
  intentional crop.
- Use tone changes and spacing for grouping instead of thin rules and shadows.
- Maintain readable focus states and keyboard order.

## Motion and interaction

Motion serves feedback, wayfinding, and hierarchy:

- Primary and secondary links respond immediately on press with a subtle
  `scale(0.97)` state.
- CTA signal marks shift a few pixels and reveal the approved rectangular border
  over 180ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Section content enters with short, staggered opacity/transform transitions when
  it becomes visible; content is never hidden if scripting fails.
- Project hover motion is enabled only for fine pointers and uses transform/opacity
  only. No hover behavior is required for touch.
- Case study disclosure remains native and keyboard-accessible; its state change
  uses a short, interruptible transition where supported.
- Reduced-motion users retain color/opacity feedback while movement and
  pointer-follow effects are removed.
- No continuous background motion, oversized parallax, or long entrance delays.

## Component responsibilities

- `app/page.tsx` owns content and section structure only.
- `components/ProfileCard.tsx`, `CertificationBadges.tsx`, `ProjectList.tsx`, and
  `Toolbox.tsx` keep their data interfaces while receiving the new visual
  structure and states.
- `app/globals.css` owns tokens, layout, responsive rules, focus states, and
  motion utilities.
- Existing real assets and destination links remain unchanged unless a layout
  change requires an accessible label or more descriptive action text.

## Responsive behavior

- Desktop uses the full editorial grid and anchored portrait.
- Tablet compresses the grid while preserving the same reading order.
- Mobile becomes a deliberate single-column composition: nav links remain usable,
  the portrait follows the hero copy, project details stay readable, and contact
  actions remain visible without horizontal overflow.
- Hover-only effects are gated with `(hover: hover) and (pointer: fine)`.
- All spacing and type values that affect layout use responsive tokens or `rem`.

## Validation

Run the smallest relevant checks after implementation:

1. `pnpm lint`
2. `pnpm exec tsc --noEmit`
3. `pnpm build`
4. Review the production page at desktop, tablet, and 390px mobile widths.
5. Verify anchor navigation, external links, mail/phone links, CV link, native
   case-study disclosure, focus visibility, reduced motion, and no horizontal
   overflow.

## Out of scope

- No framework migration.
- No new dependency unless an existing requirement cannot be met with CSS and
  native browser behavior.
- No invented project screenshots, testimonials, metrics, or deployment claims.
- No change to project data, contact details, metadata routes, or public assets
  beyond what is needed for the redesign.
