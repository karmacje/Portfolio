@AGENTS.md

## Frontend Footprint (2026-10-05)
- Entry: [[app/page.tsx]] composes [[components/AnimatedHeroTitle.tsx]], [[components/ProfileCard.tsx]], [[components/CertificationBadges.tsx]], and [[components/ProjectDeck.tsx]]; page CTAs use [[components/MagneticLink.tsx]].
- Project chain: [[components/ProjectDeck.tsx]] -> [[components/ProjectCard.tsx]] -> [[components/MagneticLink.tsx]].
- Motion styles live in [[app/globals.css]]; standards: [[agent/skills/emil-design-eng/SKILL.md]], [[agent/skills/animate/SKILL.md]], [[agent/skills/review-animations/SKILL.md]], [[agent/skills/review-animations/STANDARDS.md]].
- Review notes: reduced-motion overrides exist; revisit the hero's 900 ms width animation, 650-850 ms card flips, and ungated card hover motion against those standards.
