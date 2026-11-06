# Context
Act as a Senior UI/UX Developer with expert knowledge of React, Tailwind CSS/custom CSS, and modern animation libraries (like Framer Motion or GSAP). We are refining a portfolio website to fix design inconsistencies and elevate the user experience.

# Strict Execution Rules
You must complete this implementation **strictly sequentially**. 
1. Read the instructions for the current step.
2. Generate the necessary code and explain where to implement it.
3. **STOP.** You must ask me, "Did this step work as expected? Type 'yes' to proceed to the next step."
4. Do not proceed to the next step or output code for the next step until I explicitly confirm.

---

## Step 1: Unify CTAs and Remove "Glow"
**Task:** Standardize the buttons across the site and remove the messy hover effects.
*   **Target 1 (Primary Action):** The bottom "Email me" button is the standard. It should be a solid modern blue pill button. Find all primary CTAs and apply this style.
*   **Target 2 (Secondary Action):** The top "Contact me" button. 
*   **Fixes to apply:** 
    *   Completely remove the soft outer glow / box-shadow on the hover state.
    *   Update hover states to use crisp color shifts (e.g., 10% darker background) or a slight upward transform (`translateY(-2px)`).
    *   Style the secondary button as a clean white pill with a subtle 1px solid border (no shadows).

**[WAIT FOR USER CONFIRMATION BEFORE PROCEEDING TO STEP 2]**

---

## Step 2: Apple-Style Glassmorphism Mobile Menu
**Task:** Redesign the open state of the mobile menu to use premium iOS-style glassmorphism instead of a solid white block.
*   **Target:** The mobile navigation overlay/menu.
*   **Fixes to apply:**
    *   Replace the solid white background with a semi-transparent background (e.g., `backgroundColor: rgba(255, 255, 255, 0.65)` or Tailwind `bg-white/60`).
    *   Apply a backdrop blur (e.g., `backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);` or Tailwind `backdrop-blur-xl`).
    *   Remove the harsh blue square border around the "Close" text button. Replace it with a clean, unbordered "X" icon in the top right.
    *   Increase the padding/gap between the menu items (Home, Background, Projects, etc.) to improve touch target sizes for mobile.

**[WAIT FOR USER CONFIRMATION BEFORE PROCEEDING TO STEP 3]**

---

## Step 3: Magnetic Mobile Nav Transition (Scroll Animation)
**Task:** Create a seamless transition from the static text links to the hamburger menu when the user scrolls down on mobile.
*   **Target:** The mobile header/navbar.
*   **Fixes to apply (using Framer Motion or standard CSS transitions):**
    *   Implement a scroll threshold (e.g., 50px).
    *   When scrolled past the threshold: Animate the text links by scaling them down slightly, dropping their opacity to 0, and translating them toward the top-right corner.
    *   Simultaneously, fade in the hamburger menu icon (`opacity: 1`) and scale it up from the same top-right position.
    *   This should create an optical illusion that the text links are "magnetically" pulled into the hamburger icon.

**[WAIT FOR USER CONFIRMATION BEFORE PROCEEDING TO STEP 4]**

---

## Step 4: Private Project "Read Case Study" Update
**Task:** Adjust the project cards for the "NMMC Queuing System" and "Bantay Baboy" projects, as they cannot have live external links.
*   **Target:** The project list section.
*   **Fixes to apply:**
    *   Change any broken links or "Visit Site" CTAs on these specific projects to read "Read Case Study" or "View Architecture".
    *   Ensure these buttons follow the Secondary Button styling established in Step 1.
    *   *(If requested by the user)* Scaffold a simple modal or dynamic route structure to house the case study content (mockups, flowcharts, hardware photos) for these private projects.

**[WAIT FOR USER CONFIRMATION TO FINISH]**