# Contributing

Every change goes through an issue, a branch and an automatic pull request (see the README for how the workflows merge it). Do not push to `dev` or `main`.

## Steps

1. **Open an issue** describing the change and its acceptance criteria.
2. **Branch from `origin/dev`:** `git switch -c feat/<issue>-<slug> origin/dev` (prefixes: `feat/`, `fix/`, `docs/`, `ci/`, `build/`).
3. **Commit in small, focused steps** with Conventional Commit subjects (`feat(tools): …`, `fix(a11y): …`). Explain the why in the body and end the last commit with `Closes #<issue>`.
4. **Check locally before pushing:**
   ```bash
   npm run lint && npm run typecheck && npm test && npm run check:images && npm run build:static && npm run a11y
   ```
   If you changed guide content (`src/content/guides`, `medicare-figures.ts`, `site.ts`, the guide pages or print styles), run `npm run pdf` and commit `public/pdf`; CI's `pdf:check` fails otherwise.
5. **Push.** The pull request opens itself; a green CI run merges it into `dev`, and `dev` is promoted to `main` the same way.

## House rules

- **Older readers first.** 18px body text, no gray body copy, targets at least 48px, plain words, acronyms spelled out on first use, nothing that moves on its own, forms that ask only for what we need.
- **Compliance text is fixed.** The CMS disclaimer, government notice, consent and Scope of Appointment wording live in `src/content/site.ts`. The consent box is never pre-checked (a test enforces this).
- **Nothing invented.** No made-up ratings, reviews, quotes or statistics. Official figures go in `medicare-figures.ts` with their source and the date checked.
- **Photos:** Unsplash (free license, never Unsplash+) or Pexels only. Add them to `scripts/images/manifest.json` with photographer, source and alt text, run `npm run images:fetch`, and use each photo exactly once with `<Photo id="…" />`. No Medicare cards, flags or government imagery.
- **No Switzer files in git.** The font license forbids it; `npm run fonts` downloads them at build time.
- **Commit trailers** used on this project:
  ```
  Co-authored-by: shark314 <112891100+shark314@users.noreply.github.com>
  Co-authored-by: tomost8 <178904341+tomost8@users.noreply.github.com>
  ```
