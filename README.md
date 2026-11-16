# Turning 65 Medicare Guide

Plain-English Medicare help for people turning 65 or new to Medicare. Work lands on `dev` through an automatic pull request, and a green CI run promotes it to `main`. Production is a Next.js app that Vercel deploys from `main`.

## How the GitHub workflow works

Two long-lived branches. `dev` is where work lands. `main` is the release branch. Do not push to either one. Rulesets in `.github/rulesets/` block direct pushes, force-pushes, and deletion. A change can land only through a pull request, and only as a merge commit, after the **CI passed** check is green. No human review is required.

The path for a change:

1. Open a GitHub issue and note the number.
2. Branch from `origin/dev` with one of these prefixes: `feat/`, `fix/`, `docs/`, `ci/`, or `build/`. Put the issue number first, for example `feat/12-short-description`.
3. Commit with a Conventional Commit subject (`feat(home): short description`). A `Closes #12` line is optional when the branch name already has the number. `Fixes` and `Resolves` work the same way.
4. Push. Three workflows take it from there.

**Open pull request** (`.github/workflows/open-pull-request.yml`) runs on that push. A prefix branch opens a pull request into `dev`. A push to `dev` opens `dev` into `main` when `dev` is ahead, or updates the open one. It uses the `GH_TOKEN` repository secret, not the default `GITHUB_TOKEN`, because the default token does not start the next workflow after a merge. For the `dev` → `main` pull request it rewrites the body so GitHub closes the issues named in branch names and in `Closes` / `Fixes` / `Resolves` lines since `main`.

**CI** (`.github/workflows/ci.yml`) runs on every pull request, on every push to `dev` or `main`, and on manual dispatch. A newer push cancels the older run.

| Job | What it does |
| --- | --- |
| Lint and type check | `npm ci`, then `npm run lint`, `npm run typecheck`, and `npm run check:images` |
| Build (server and static) | **server** is the full app with `/api` routes. **static** sets `NEXT_OUTPUT=export` and checks `out/` |
| CI passed | The single required status check. Fails unless both jobs succeeded. Posts or updates one summary comment on a pull request |

**Merge passing pull request** (`.github/workflows/merge-passing-pr.yml`) starts after CI succeeds on a pull request and merge-commits it if the head is still the commit CI validated (`--match-head-commit`). Eligible pairs: a prefix branch into `dev`, and `dev` into `main`.

Dependabot opens weekly pull requests for npm and GitHub Actions. A person merges or closes them.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack), React Compiler on |
| UI | React 19.3, TypeScript 7 (strict) |
| Styling | Tailwind CSS v4, CSS-first in `src/app/globals.css` |
| Lint | ESLint 10 with `eslint-config-next`, zero warnings allowed |

### TypeScript 7 and typescript-eslint

TypeScript 7.0 has no programmatic API yet, so `typescript-eslint` (and Next's build-time type check) still need TypeScript 6. Both are installed side by side, as the TypeScript 7 release notes recommend:

```json
"@typescript/native": "npm:typescript@7.0.2",
"typescript": "npm:@typescript/typescript6@6.0.2"
```

`npx tsc` (and `npm run typecheck`) runs TypeScript 7. Tools that `import "typescript"` get 6.0.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Server build (what Vercel runs) |
| `npm run build:static` | Static export to `out/`, then `check:export` |
| `npm run lint` / `typecheck` | ESLint (zero warnings) / TypeScript 7 |
| `npm run check:images` | Each photo used exactly once |
