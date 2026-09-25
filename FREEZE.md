# Z5 Freeze Registry

> A layer is marked FROZEN only after its acceptance test has passed. Frozen layers must not be changed without a documented defrost request.

## Layer: Typecheck
- Status: FROZEN
- Date: 2026-09-25
- Files: tsconfig.json, package.json (typecheck script)
- Acceptance Test: npm run typecheck
- Evidence: GitHub Actions run 36074252008 passed after the typecheck script was introduced.
- Reason: Prevents TypeScript/Astro diagnostics from being bypassed before build.

## Layer: Build
- Status: FROZEN
- Date: 2026-09-25
- Files: astro.config.mjs, package.json (build script)
- Acceptance Test: npm run build
- Evidence: GitHub Actions run 36074252008 passed the build after the current build gate was introduced.
- Reason: Keeps the static Astro build as a protected release gate.

## Layer: Environment
- Status: ACTIVE
- Reason: Repository requires Node >=22.22.3, while this execution environment reports Node 22.16.0. The CI workflow requests Node 22.22.3, but the exact local acceptance command has not been verified against that version.

## Layer: Lint
- Status: ACTIVE
- Reason: Latest CI run 36074254785 failed in the Lint step. The exact lint output is not available through the current GitHub log endpoint.

## Layer: CI
- Status: ACTIVE
- Reason: Latest CI run 36074254785 failed because the Lint step failed.

## Defrost Record: ESLint Configuration
- Status: DEFROSTED
- Date: 2026-09-25
- File: eslint.config.mjs
- Reason: Verified Lint output showed Node globals (`process`, `console`, `fetch`) were undefined in catalog scripts.
- Action: Removed the temporary hold and applied the scoped Node globals configuration above.
