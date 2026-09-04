# Toolbox Section Asset Brief

## Purpose

Transform the existing Toolbox section into a visual, physical-toolbox-inspired presentation of Karley's technology stack. The section should feel like a real open toolbox containing organized tools, while remaining a refined portfolio interface rather than a playful illustration or a dense technology-logo wall.

The toolbox is a visual metaphor for practical capability: each technology is a tool Karley uses to build useful systems.

## Existing Section

The current page already has a section with:

- Section label: `03 / Toolbox`
- Heading: `Curious by default. Precise by practice.`
- Three groups:
  - Frontend
  - Backend & data
  - Systems
- Existing stack items:
  - Frontend: Next.js, React, TypeScript, Tailwind CSS
  - Backend & data: Prisma, MySQL, Supabase, REST APIs
  - Systems: Networking, Cybersecurity, Cisco tools

The redesign must preserve this information and hierarchy. Do not turn the section into a separate page, dashboard, or marketing hero.

## Design Direction

Create a minimal open toolbox or tool tray viewed from a slightly elevated front angle. The toolbox should be recognizable through silhouette, compartments, a handle, and a small number of visible tools. The technology marks should sit inside the compartments like labeled tools.

The visual language should be:

- Editorial and intentional
- Minimal and slightly industrial
- Clean enough for repeated scanning
- Tactile without looking cartoonish
- Refined enough to belong beside the existing glassmorphic cards
- More like a product still life than a generic SaaS illustration

The toolbox is supporting visual content. The written stack names must remain readable and must not be replaced by images alone.

## Palette Constraints

Use the existing design tokens from `app/globals.css`:

- Ink: `#1d2623`
- Paper: `#f2f2ed`
- Muted: `#68716d`
- Accent: `#d66a43`
- Glass: translucent warm off-white
- Line: low-opacity ink border

Use the coral accent sparingly for small handles, outlines, selected details, or tiny highlights. Do not make the entire toolbox coral.

The alternate theme already in the project inverts the paper and ink values. The asset must work on both themes. Avoid baked-in white backgrounds, hard-coded full-page colors, heavy gradients, neon colors, purple, blue, gold, and bright orange.

Do not use a government seal, hospital logo, or unauthorized brand asset. This toolbox is a generic portfolio metaphor.

## Asset Strategy

Prefer a small number of transparent PNG or WebP assets rather than one large image containing all text. Text inside generated images is often inaccurate and cannot adapt responsively.

Recommended approach:

1. Generate one transparent toolbox illustration with no words, no logos, and no tiny unreadable labels.
2. Render technology names as HTML text in the React component.
3. Use small local SVG icon assets or Lucide icons for individual technology marks where an official logo is not necessary.
4. If using official technology logos, verify their usage rights and download only approved brand assets. Do not ask the external AI to recreate trademarks.
5. Keep the toolbox illustration decorative and let the existing HTML remain the source of truth for the stack content.

## Recommended Asset Specifications

Create the main toolbox asset with these constraints:

- File format: transparent PNG or WebP
- Suggested filename: `public/toolbox-illustration.webp`
- Canvas: 1200 x 900 pixels
- Subject bounds: keep the toolbox inside roughly 88% of the canvas
- Transparent background
- No text
- No watermark
- No extra objects outside the toolbox
- No photorealistic hands or people
- No hospital, government, or company branding
- Clear silhouette at approximately 240px wide
- Enough empty space around the object for responsive cropping
- Subtle paper/ink-compatible shading
- Details must remain visible on both light and dark theme backgrounds

If the generated asset has a solid background, regenerate it with transparency. Do not use CSS to remove a background by blending it into one theme because that will fail in the alternate theme.

## Prompt For An External Asset AI

Use this prompt as a starting point:

> Create a refined editorial illustration of an open compact mechanic's toolbox or modular tool tray, viewed from a slightly elevated front angle. It represents a web developer's technology toolbox. Use a minimal industrial form with clean geometry, thin line details, shallow compartments, a small handle, and a few abstract tool shapes. Use a restrained palette compatible with warm off-white paper `#f2f2ed`, deep green-black ink `#1d2623`, muted gray-green `#68716d`, and a very small coral accent `#d66a43`. Keep the object elegant, quiet, and slightly tactile, with subtle realistic depth but no busy texture. Transparent background. No words, no letters, no labels, no logos, no brand marks, no watermark, no people, no hands, no hospital imagery, no government seals, no neon colors, no purple, no blue, no large gradient background. The object must remain recognizable when displayed at 220 to 420 pixels wide on a responsive portfolio page.

### Negative Prompt

> text, misspelled words, fake logos, brand names, company logos, government seal, hospital logo, watermark, signature, people, hands, background scene, desk, dramatic perspective, excessive detail, glossy chrome, neon colors, purple, blue, gold, orange background, cartoon mascot, 3D emoji style, clutter, cropped toolbox, low contrast silhouette

## Optional Individual Mark Assets

Do not generate a single image containing all technology logos. If marks are desired, create them separately or use existing icon libraries.

Suggested non-branded visual mapping:

- Next.js: simple code or framework mark
- React: abstract atom-style mark only if usage is permitted
- TypeScript: small `TS` text badge rendered in HTML/CSS
- Tailwind CSS: utility/grid mark
- Prisma: database/diamond-style mark
- MySQL: database mark
- Supabase: database or signal mark
- REST APIs: route/link mark
- Networking: network nodes mark
- Cybersecurity: shield/lock mark
- Cisco tools: network-switch mark, without recreating an unauthorized logo

A safer default is to use Lucide icons such as `Code2`, `Boxes`, `Database`, `Workflow`, `Network`, `ShieldCheck`, and `Wrench`, paired with the technology name in HTML.

## Suggested UI Composition

Preserve the existing section structure:

- Left: `03 / Toolbox` label
- Right: existing heading and supporting content
- Below heading: an open toolbox visual with organized compartments
- Each compartment corresponds to Frontend, Backend & data, or Systems
- Each item is a small glass label or tool tag with:
  - A small icon
  - Technology name
  - Optional one-word role descriptor

The toolbox should not become a nested card inside a card. Treat the overall section as an unframed composition. A toolbox illustration can be a framed visual object, but avoid stacking decorative cards around it.

Recommended desktop layout:

- Toolbox illustration on the left or centered within the section body
- Stack groups arranged as labeled compartments around or below it
- Maintain generous whitespace and the current section rhythm

Recommended mobile layout:

- Toolbox illustration above the stack groups
- Illustration width limited to the available content width
- Stack groups become full-width rows
- No horizontal scrolling
- Keep technology names selectable, readable, and outside the image

## Motion And Interaction

Use only a few meaningful effects:

- Toolbox enters with the existing reveal animation
- Compartments or tool labels may stagger very slightly
- Hovering a tool label may lift it by 2 to 4px and show a restrained coral or ink shadow
- Touch devices should use press feedback, not hover-only content
- Respect `prefers-reduced-motion: reduce`
- Do not make the entire toolbox continuously bounce, rotate, or float
- Do not let animation change layout dimensions

Keep the existing magnetic interaction pattern for actual links and commands. Stack labels do not need to be links unless a real destination exists.

## Accessibility Requirements

- The illustration needs meaningful alt text, for example: `Open toolbox representing Karley's frontend, backend, and systems toolkit`
- If the illustration is purely decorative and the text fully communicates the content, use an empty alt attribute instead
- Every technology name must exist as real HTML text
- Do not rely on color alone to distinguish groups
- Preserve visible keyboard focus states for interactive labels
- Keep contrast readable in both themes
- Avoid putting important information only inside the generated image

## Manual Steps After The Asset Is Finished

1. Export the final transparent asset as WebP or PNG.
2. Rename it exactly to `toolbox-illustration.webp`.
3. Copy it into the project's `public` folder:

   `E:\4th Year\PORTFOLIO\Personal\projectx\public\toolbox-illustration.webp`

4. Confirm the file has a transparent background and does not contain generated text or logos.
5. Tell the coding assistant the exact filename and format you used.
6. Ask the coding assistant to update `app/page.tsx` and the Toolbox component or markup to render the local asset with `next/image`.
7. Ask the coding assistant to preserve the existing stack data and render technology names as HTML.
8. Review the implementation at desktop and mobile widths.
9. Switch to the alternate theme and check that the toolbox still has enough contrast.
10. Check keyboard focus and `prefers-reduced-motion` behavior.
11. If an individual technology logo is added later, verify its license or brand-use permission before placing it in `public`.

## Implementation Request To Give The Coding Assistant

After placing the asset in `public`, provide this instruction:

> Add the local asset `/toolbox-illustration.webp` to the existing Toolbox section using `next/image`. Keep the image responsive with explicit dimensions or a stable aspect ratio to prevent layout shift. Preserve the current Frontend, Backend & data, and Systems stack groups as real HTML text. Create a restrained toolbox composition that works in both the default paper theme and the alternate ink theme. Do not place text inside the image, do not add trademarked logos without permission, do not create nested cards, and do not break the current mobile layout. Use the existing Lucide dependency for generic tool marks where useful. Preserve reduced-motion support and the existing spacing rhythm.

## Definition Of Done

The work is complete when:

- The Toolbox section visibly reads as a real toolbox metaphor
- All current technology names remain present and readable
- The local asset loads through `next/image`
- No external image hotlink is used
- Both themes have sufficient contrast
- Desktop, tablet, and mobile layouts have no horizontal overflow
- The composition does not push or overlap neighboring sections
- Hover, touch, keyboard, and reduced-motion states are considered
- No unauthorized hospital, government, or technology branding is included
