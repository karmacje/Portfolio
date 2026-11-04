# Karley's Portfolio PRD — Personal Website

Functional & design requirements — minimal, glassmorphic personal portfolio site.

---

## 1. Global Design System

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| DS-FR001 | Minimal Base Theme | As a visitor, I want the site to feel clean and uncluttered, so I can focus on the content without visual noise. | Layout uses generous white space, a neutral base palette (e.g. off-white/near-black background and text), and restrained typography with one primary typeface. |
| DS-FR002 | Single Accent Color | As a visitor, I want a hint of personality in the design, so the site doesn't feel sterile, but I don't want it to dominate the page. | One accent color is used sparingly — on buttons, links, active nav states, and small highlights only — while backgrounds and text stay neutral. The accent contrasts against the base palette but never appears in large fills. |
| DS-FR003 | Glassmorphic Buttons & Cards | As a visitor, I want interactive elements to feel modern and light, so the interface feels current rather than flat. | Buttons and key cards (e.g. project cards, nav bar) use a frosted-glass style: semi-transparent background, backdrop blur, a thin light border, and a soft shadow — applied consistently across the site. |
| DS-FR004 | Cursor-Reactive Interaction | As a visitor, I want the interface to feel alive as I move my cursor, so browsing feels engaging rather than static. | When the cursor hovers near a button or interactive element, the element subtly shifts toward the cursor within a small radius (a "magnetic" pull), then eases smoothly back to its resting position when the cursor moves away. Effect is disabled on touch devices. |
| DS-FR005 | Responsive Layout | As a visitor on any device, I want the site to look and work well, so I can browse comfortably on mobile or desktop. | Layout, spacing, and animations adapt across breakpoints; cursor-follow effects gracefully degrade to simple tap/press states on touch devices. |

## 2. Intro / Hero Section

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| INT-FR001 | Hero Introduction | As a visitor, I want to immediately see who this site belongs to and what they do, so I can judge relevance within seconds. | First section on load shows name, a short role/tagline (e.g. full-stack web developer), and two glass-style call-to-action buttons ("View Projects", "Contact Me"). |
| INT-FR002 | Entrance Animation | As a visitor, I want the page to feel polished on load, so my first impression is a strong one. | Hero text and buttons fade/slide in with a subtle, quick entrance animation on page load, without delaying readability. |
| INT-FR003 | Profile Image Beside Header | As a visitor, I want to see a credible portrait of the developer while reading the introduction, so the portfolio feels personal and trustworthy without making the image the primary focus. | The hero/header uses a responsive two-column composition on larger screens: the introductory copy, name, tagline, and calls to action remain the primary content on the left, while a prominent but restrained half-body portrait placeholder is reserved on the right in the available whitespace. The portrait area maintains a stable portrait aspect ratio and defined dimensions so the image never appears to float independently, collapse unexpectedly, or cause layout shift while loading. The final image should fit within the reserved area using an intentional crop (prefer `object-fit: cover` with the subject centered or positioned to preserve the face and upper body), with a modest maximum width and height that supports credibility without competing with the headline. On tablet and mobile widths, the layout must adapt without horizontal scrolling: the image may move below the introduction or reduce proportionally according to the established responsive layout, while preserving readable heading hierarchy, CTA visibility, spacing, and the image placeholder's aspect ratio. The placeholder should use the same border radius, border, background treatment, and spacing as the final image so the unfinished state looks deliberate. Provide meaningful alternative text for the portrait, avoid decorative-only labeling, and respect reduced-motion preferences for any image entrance animation. | 

## 3. Background Section

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| BG-FR001 | About / Background | As a visitor, I want to learn about the developer's background, so I can understand their experience and focus areas. | Section displays education (BS in Information Technology), core focus areas (full-stack web development; networking & cybersecurity), and relevant certifications (e.g. Cisco CyberOps Associate, Ethical Hacking), in short readable blocks rather than dense paragraphs. |
| BG-FR002 | Experience Highlight | As a visitor, I want to see relevant hands-on experience, so I can gauge real-world credibility beyond a project list. | Section includes a brief highlight of the internship experience (e.g. NMMC Queuing System) with a one- or two-line description of the role and outcome. |

## 4. Projects Section

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| PRJ-FR001 | Projects Showcase | As a visitor, I want to browse featured projects, so I can evaluate the developer's actual work. | Section displays project cards (glass-style) for featured work — e.g. NMMC Queuing System, Bantay Baboy IoT monitoring app, artificial greenery showcase site — each with a title, short description, and tech tags. |
| PRJ-FR002 | Project Links | As a visitor, I want to explore a project even when it was deployed privately, so I can understand the work without needing public access. | Each project card conditionally shows live demo and/or repository links when available, opening in a new tab. When a project has no public deployment, it shows a "Case Study" or "Details" link that opens the project's context, contribution, technology, and deployment note, including a short explanation when the system is internal or client-only. |
| PRJ-FR003 | Project Card Hover State | As a visitor, I want project cards to respond when I interact with them, so browsing feels interactive. | Hovering a project card triggers a subtle lift/glow and the cursor-reactive effect defined in DS-FR004, consistent with the rest of the site. |

## 5. Tech Stack Section

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| TS-FR001 | Tech Stack Overview | As a visitor, I want to see what technologies the developer works with, so I can match their skill set to my needs. | Section displays grouped tech/tools (e.g. Frontend: Next.js, React; Backend/Data: Prisma, MySQL, Supabase; Other: networking & cybersecurity tooling) as minimal glass-style chips or icons. |

## 6. Contact / Closing Section

| ID | Feature | User Story | Expected Behavior/Outcome |
|---|---|---|---|
| CTA-FR001 | Contact Section | As a visitor, I want an easy way to reach out, so I can start a conversation without hunting for contact details. | Closing section includes an email link and relevant social/profile links (e.g. GitHub, LinkedIn, Credly), styled as glass buttons matching the rest of the site. |
| NAV-FR001 | Sticky Minimal Navigation | As a visitor, I want to jump between sections quickly, so I don't have to scroll manually through the whole page. | A minimal, glass-style sticky nav bar links to Intro, Background, Projects, Tech Stack, and Contact, and smooth-scrolls to each section on click. |