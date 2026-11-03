Status: Complete
Commits: c88981a (style: reduce portfolio to flat CSS baseline)
Tests: `pnpm exec eslint app/layout.tsx app/loading.tsx` passed; `git diff --check` passed; full `pnpm lint` failed on pre-existing errors under `.agents/skills/`; required rg scan returned `components/ProjectList.tsx` presentation class matches (`project-card`).
Concerns: The required scan still reports `project-card` and `project-card-main` in the Task 1 component; only the three Task 2 source files were permitted to change, so those unrelated component classes remain.
