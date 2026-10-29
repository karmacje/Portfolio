---
title: Project Card Case Study Flip Prompt
tags:
  - frontend
  - ui
  - animation
  - project-card
---

# Project Card Case Study Flip Prompt

```text
Fix the Project Card case-study interaction in the existing Next.js portfolio.

Problem:
When “View Case Study” is clicked on the NMMC Queuing System card, the case-study content currently expands below the card in normal document flow. It overlaps the other project cards and pushes into the Toolbox section.

Desired behavior:
When “View Case Study” is clicked, the specific project card should flip in place and show its case-study content on the back face of the same card.

Requirements:

1. Modify only the project card case-study presentation and related styles.
2. Preserve all existing project text exactly:
   - project titles
   - descriptions
   - tags
   - “View Case Study”
   - Context
   - Problem
   - What I built & my role
   - Tech stack
   - Deployment
   - all case-study content
3. Do not change the project arrays, project order, project deck behavior, or Toolbox section.
4. Only the clicked card should flip. Other cards must remain unchanged.
5. The card must keep the same fixed dimensions before and after flipping.
6. The case-study content must not render below the card or affect document layout.
7. Keep the ProjectDeck height stable so the Toolbox section does not move or overlap.

Implementation direction:

- Inspect:
  - components/ProjectCard.tsx
  - components/ProjectDeck.tsx
  - the related project-card styles in app/globals.css
- Replace the current normal-flow <details> expansion behavior with an in-card front/back structure, or adapt the existing details state into a controlled flipped state.
- Use a wrapper with:
  - perspective
  - transform-style: preserve-3d
  - fixed/minimum height
  - position: relative
- Create two faces:
  - front face: current project number, title, description, tags, icon, and case-study trigger
  - back face: existing case-study content
- Both faces must be absolutely positioned within the same card bounds.
- Back face should use:
  backface-visibility: hidden;
  transform: rotateY(180deg);
- The card inner wrapper should rotate with:
  transform: rotateY(180deg);
  when the case study is open.
- Use a controlled React boolean state such as:

  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

- The “View Case Study” control must toggle that state.
- Add a “Back” or equivalent close control only if necessary, but do not add or modify visible content unless required for accessibility. Prefer using the same trigger area or an icon button with an accessible label.
- Ensure all case-study text is scrollable within the back face if it exceeds the fixed card height:

  overflow-y: auto;

- Do not let the back face increase the card height.
- Preserve the existing draggable ProjectDeck behavior. Clicking the case-study trigger must not start card dragging.
- Ensure pointer events are enabled only on the visible face if needed.
- Ensure keyboard users can open and close the case study with Enter or Space.
- Add visible focus styles.
- Respect reduced motion:

  @media (prefers-reduced-motion: reduce) {
    .project-card-inner {
      transition: none;
      transform: none;
    }

    .project-card-front,
    .project-card-back {
      display: none;
    }

    .project-card-front.is-visible,
    .project-card-back.is-visible {
      display: block;
    }
  }

  Use an appropriate accessible static fallback if the exact CSS above does not fit the implementation.

Animation requirements:

- Use only a vertical-axis card flip:
  rotateY(180deg)
- Do not use horizontal expansion, height animation, margin animation, or normal-flow expansion.
- Use a restrained duration under 500ms with an ease-out/custom ease.
- The flip must originate from the card center.
- The animation must remain contained within the original card bounds.
- Do not animate the entire project deck or surrounding sections.

Suggested structure:

<article className={`project-card ${isCaseStudyOpen ? "is-case-study-open" : ""}`}>
  <div className="project-card-inner">
    <div className="project-card-face project-card-front">
      {/* existing project card content */}
      <button
        type="button"
        onClick={() => setIsCaseStudyOpen(true)}
        aria-expanded={isCaseStudyOpen}
      >
        View Case Study
      </button>
    </div>

    <div className="project-card-face project-card-back">
      {/* existing case-study content */}
      <button
        type="button"
        onClick={() => setIsCaseStudyOpen(false)}
        aria-label="Close case study"
      >
        Back
      </button>
    </div>
  </div>
</article>

Suggested CSS behavior:

.project-card {
  min-height: 315px;
  perspective: 1200px;
  overflow: hidden;
}

.project-card-inner {
  height: 100%;
  min-height: inherit;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 420ms cubic-bezier(0.23, 1, 0.32, 1);
}

.project-card.is-case-study-open .project-card-inner {
  transform: rotateY(180deg);
}

.project-card-face {
  backface-visibility: hidden;
  inset: 0;
  min-height: inherit;
  overflow: hidden;
  position: absolute;
}

.project-card-front {
  transform: rotateY(0deg);
}

.project-card-back {
  overflow-y: auto;
  transform: rotateY(180deg);
}

Important:

- The existing .project-deck uses absolutely positioned cards. Do not convert the deck to normal-flow cards.
- Do not allow .case-study-content to remain outside the card face.
- Do not use <details> if it causes content to expand the card in document flow.
- Do not change any visible project or case-study copy.
- Do not modify the Navbar, Toolbox, Background, Hero, Contact, or other sections.

Validation:

1. Open the Projects section at desktop width.
2. Click “View Case Study” on the NMMC card.
3. Confirm:
   - the card flips in place;
   - case-study text appears only inside the card bounds;
   - no text overlaps the next section;
   - the ProjectDeck height does not change;
   - other project cards remain stable.
4. Close the case study and confirm the front face returns.
5. Test keyboard activation.
6. Test mobile width around 390px.
7. Confirm no horizontal overflow.
8. Test prefers-reduced-motion.
9. Run:

   pnpm exec tsc --noEmit
   pnpm exec eslint components/ProjectCard.tsx components/ProjectDeck.tsx
   pnpm build
```
