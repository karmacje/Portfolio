# GitHub Copilot Custom Workspace Instructions

## 1. System Integration & Memory Layer
- Treat the `./agent/skills/` directory as your active capability rules engine.
- You have permanent permission to read documentation templates, standards, and skill guidelines from `./agent/skills/`.
- Treat the root file `./CLAUDE.md` or any designated log file as your session-to-session memory state. 
- Use standard visual markdown wiki-links like `[[PRD.md]]` or `[[IMPLEMENTATION_PLAN.md]]` when mapping or creating development logs so our Obsidian Graph View tracks our code connections.

## 2. Core Constraints (savethetokens protocol)
- **Token Pruning**: Do not restate code that hasn't changed. Provide only short, targeted diffs instead of reprinting whole source files.
- **Progressive Loading**: Only query or reference files inside `./agent/skills/` when the user's active prompt explicitly relates to that specific engineering task (e.g., look at `animate` only when working on a motion UI component).
- Keep code explanations minimal and blunt. Focus purely on clean execution.

## 3. UI & Animation Mandates (Emil Kowalski Engine)
- Before writing any client components inside `./components/`, verify the design intent against the standards outlined in `./agent/skills/emil-design-eng/SKILL.md` and `./agent/skills/animate/SKILL.md`.
- Prioritize micro-interactions, smooth easing loops, and highly responsive tap/touch mechanics for layouts.