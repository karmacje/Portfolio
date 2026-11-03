# Performance Skeleton Reset Design

## Goal

Reset the portfolio to a semantic, unstyled baseline while preserving its
content, accessible navigation, external links, CV link, contact links, and
project case-study information. The Toolbox remains grouped and readable, but
its logo list is static and has no flip, blur, filter, interval, or transition
behavior.

## Architecture

- `app/layout.tsx` keeps `next/font/google` and metadata, but uses only
  semantic document structure and the minimal global reset.
- `app/page.tsx` owns the static section data and renders five semantic areas:
  navigation/intro, background, selected projects, Toolbox, and contact.
- The profile uses a plain `figure` and `next/image` with explicit dimensions
  and `priority`.
- Projects render as a plain list of articles. Existing case-study content is
  shown in accessible disclosure blocks rather than a card flip or scroll deck.
- Toolbox renders all groups as static lists. Logo URLs are removed so the
  skeleton does not depend on remote image requests; text labels remain the
  source of truth.
- Certification data is rendered as plain text mappings without theme toggles,
  timed effects, or card faces.
- The liquid navbar, magnetic links, rotating hero title, project deck, and
  card-specific presentation components are removed.

## Styling

`app/globals.css` contains only the Tailwind import, box-sizing reset, document
defaults, link inheritance, basic responsive layout primitives, and a
reduced-motion-safe fallback. It contains no card tokens, shadows, blur,
transforms, hover elevations, flip/deck rules, animation wrappers, or theme
switching.

## Dependencies and assets

`motion` and `lucide-react` are removed if the final import scan confirms no
remaining usage. `next/image` remains for the local profile asset. The remote
Simple Icons image configuration is removed from `next.config.ts` when the
Toolbox no longer requests remote images. Existing public assets are retained
unless the import/route scan proves they are unreachable.

## Verification

Run the import scan, `pnpm lint`, `pnpm build`, and `git diff --check`.
Confirm that the final source contains no references to the deleted card,
navbar, magnetic, motion, flip, blur, or theme-toggle implementations.
