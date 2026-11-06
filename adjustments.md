# Context & Persona

Act as a Staff-Level UI/UX Frontend Engineer with deep expertise in React, Tailwind CSS, and advanced animations (specifically Framer Motion). Your goal is to refine a portfolio website to meet a premium, award-winning design standard (e.g., Awwwards, Vercel-tier design). 

# Strict Execution Rules

You must complete this implementation **strictly sequentially**.
1. Read the instructions for the current step.
2. Generate the exact code required (components, hooks, CSS) and explain precisely where to integrate it.
3. **STOP.** You must ask the user: "Did this step work as expected? Type 'yes' to proceed to the next step."
4. **DO NOT** proceed to the next step or output code for the next step until explicitly confirmed.

---

## Step 1: Premium Interactive Magnetic CTAs

**Task:** Completely redesign all Primary and Secondary CTAs (like "Contact me", "Email me", "Read Case Study") into a premium, interactive component. Remove all existing muddy box-shadows or static glow effects. 

**Component Requirements (Create a reusable `<MagneticButton>` component):**

1.  **Base Styling:** A clean pill-shaped button. 
    *   *Text:* E.g., "Contact me".
    *   *Icon:* An inline SVG arrow pointing top-right (`↗` e.g., Lucide `ArrowUpRight`). 
2.  **Interaction 1 - Playful Arrow Rotation:** 
    *   On hover, the arrow must smoothly animate to point directly to the right (`→`). 
    *   Use a playful but premium spring animation (e.g., in Framer Motion: `type: "spring", stiffness: 300, damping: 15`).
3.  **Interaction 2 - Magnetic Pull Effect:**
    *   Attach `onMouseMove` and `onMouseLeave` event listeners.
    *   On hover/move, calculate the cursor's position relative to the button's center using `getBoundingClientRect()`.
    *   Apply a slight `translate(x, y)` to the entire button so it gets "magnetically" pulled toward the cursor. Multiply the distance by a small friction factor (e.g., `0.2`) so it doesn't detach from its original space.
    *   On mouse leave, use a bouncy spring physics transition to snap the button back to `x: 0, y: 0`.
4.  **Interaction 3 - Cursor Spotlight Glow:**
    *   Track the exact `x` and `y` coordinates of the mouse *inside* the button.
    *   Pass these coordinates to CSS variables (e.g., `--mouse-x`, `--mouse-y`).
    *   Use an absolute positioned `div` or pseudo-element (`::before`) covering the button with `opacity-0` by default, transitioning to `opacity-100` on hover.
    *   Give this overlay a `background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4) 0%, transparent 60%)`. This creates a shiny, metallic spotlight that follows the user's cursor across the button surface.

**\[WAIT FOR USER CONFIRMATION BEFORE PROCEEDING TO STEP 2\]**

---

## Step 2: Apple-Style Glassmorphism Mobile Menu

**Task:** Redesign the open state of the mobile menu to use premium iOS-style glassmorphism. It should no longer be a solid white block that covers the hero image.

**Implementation Details:**

1.  **Glass Effect:** Replace the solid `#FFFFFF` background with a semi-transparent layer using Tailwind classes: `bg-white/60` (or `bg-white/70` depending on contrast) combined with a strong backdrop blur `backdrop-blur-2xl`. Add a subtle `border-b border-white/20` to define edges if needed.
2.  **Close Button Cleanup:** 
    *   Remove the harsh blue square border currently wrapping the "Close" text.
    *   Replace it with a minimalist, unbordered "X" icon in the top right corner. Match the visual weight of the hamburger icon.
3.  **Layout & Spacing:** Increase the vertical gap (`gap-y`) and padding around the menu items (Home, Background, Projects, etc.) to create massive, comfortable touch targets (minimum 44x44px per WCAG 2.2 standards).

**\[WAIT FOR USER CONFIRMATION BEFORE PROCEEDING TO STEP 3\]**

---

## Step 3: Magnetic Mobile Nav Transition (Scroll Animation)

**Task:** Create a fluid, seamless transition where the static top text links morph/pull into a hamburger menu icon upon scrolling. 

**Implementation Details (using Framer Motion `useScroll` or Intersection Observer):**

1.  **Threshold:** Set a scroll threshold of `50px`. 
2.  **The "Suck In" Animation (Links):** When scrolling past 50px, the inline text links should not just disappear. They should stagger animate by:
    *   Scaling down (`scale: 0.8`).
    *   Fading out (`opacity: 0`).
    *   Translating aggressively toward the top-right corner coordinates where the hamburger menu sits (e.g., `x: 100, y: -20`).
3.  **The Reveal (Hamburger):** Simultaneously, the hamburger menu icon should animate into view exactly in the top right corner:
    *   Fade in (`opacity: 1`).
    *   Scale up from a small size (`scale: [0.5, 1]`).
    *   Use a satisfying spring easing so the transition feels like the text was magnetically consolidated into the icon.

**\[WAIT FOR USER CONFIRMATION TO FINISH\]**