# Senior AI Plans: Turning 65 Medicare site

The Hybrid Website Plan (November 2026) in code: plain-English Medicare help for people turning 65 and the families who help them, the free AI Plan Match, Medicare and Beyond Medicare pages, a blog, large-print PDFs, booking and contact forms, built for older readers. Carrier commissions on Medicare and add-on products are about 80% of the business; the AI Plan Match (free Basic now, optional Plus and Family later) is the other 20%. Work lands on `dev` through an automatic pull request, and a green CI run promotes it to `main`. Production is a Next.js app that Vercel deploys from `main`.

> **Placeholder mode.** Business details in `src/content/site.ts` (name, phone, NPN, licensed states, team, CMS disclaimer counts) are realistic samples marked `TODO(#57)`. While `site.placeholder` is `true`, every page shows a "Sample content" notice and is `noindex`, and `robots.txt` blocks crawling. Replace them before launch (see `docs/annual-refresh-runbook.md`).

## How the GitHub workflow works

Two long-lived branches. `dev` is where work lands. `main` is the release branch. Do not push to either one. Rulesets in `.github/rulesets/` block direct pushes, force-pushes, and deletion. A change can land only through a pull request, and only as a merge commit, after the **CI passed** check is green. No human review is required.

The path for a change:

1. Open a GitHub issue and note the number.
2. Branch from `origin/dev` with one of these prefixes: `feat/`, `fix/`, `docs/`, `ci/`, or `build/`. Put the issue number first, for example `feat/12-short-description`.
3. Commit with a Conventional Commit subject (`feat(home): short description`). A `Closes #12` line is optional when the branch name already has the number. `Fixes` and `Resolves` work the same way.
4. Push. Three workflows take it from there.

**Open pull request** (`.github/workflows/open-pull-request.yml`) runs on that push. A prefix branch opens a pull request into `dev`. A push to `dev` opens `dev` into `main` when `dev` is ahead, or updates the open one. It uses the `GH_TOKEN` repository secret, not the default `GITHUB_TOKEN`, because the default token does not start the next workflow after a merge. For the `dev` → `main` pull request it rewrites the body so GitHub closes the issues named in branch names and in `Closes` / `Fixes` / `Resolves` lines since `main`. A keyword on the pull request into `dev` does not close the issue; only the pull request into `main` does.

**CI** (`.github/workflows/ci.yml`) runs on every pull request, on every push to `dev` or `main`, and on manual dispatch. A newer push to the same branch or pull request cancels the older run.

| Job | What it does |
| --- | --- |
| Lint and type check | `npm ci`, then `lint`, `typecheck`, `test`, `pdf:check` (PDFs match the content) and `check:images` (each photo used once) |
| Build (server and static) | **server** is the full app with `/api` routes. **static** sets `NEXT_OUTPUT=export`, builds WebP images, checks `out/` (HTML for every page, sitemap, robots, icons, manifest, images, no `out/api`), then runs the axe accessibility check on every exported page |
| CI passed | The single required status check. Fails unless both jobs succeeded. Posts or updates one summary comment on a pull request |

**Merge passing pull request** (`.github/workflows/merge-passing-pr.yml`) starts after CI succeeds on a pull request and merge-commits it if the head is still the commit CI validated (`--match-head-commit`). Eligible pairs: a prefix branch into `dev`, and `dev` into `main`. Anything else is left alone.

A merge to `main` only re-runs CI. Actions does not deploy; Vercel deploys from its Git connection, with Production tracking `main`. Dependabot opens weekly pull requests for npm and GitHub Actions; a person merges or closes them.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack). React Compiler is on (`reactCompiler` and `turbopackRustReactCompiler` in `next.config.ts`) |
| UI | React 19.3, TypeScript 7 (strict). TypeScript 6 is installed side by side for typescript-eslint (see below) |
| Styling | Tailwind CSS v4, CSS-first in `src/app/globals.css`: navy and gold tokens from the logo, with dark values for `prefers-color-scheme` and `data-theme`. `header.css` (floating header), `ui.css` (surface rules) and `motion.css` (loops and hovers) sit beside it. There is no `tailwind.config` |
| Motion | Motion (motion/react) with the Beema Framer values in `src/lib/motion.ts` (see Motion below); reduced motion keeps short fades; content visible without JavaScript |
| Forms | zod schemas shared by browser and server; Resend email from Node route handlers |
| Booking and chat | Cal.com embed; Crisp chat loaded only on click |
| Analytics | Vercel Web Analytics and Speed Insights, production only (stubbed out of every other build) |
| Images | Unsplash/Pexels photos in a manifest; `sharp` pre-builds responsive WebP files for the static export |
| PDFs | Playwright (Chromium) renders tagged PDFs; `pdf-lib` adds fillable checkboxes |
| Quality | ESLint 10 with `eslint-config-next` (zero warnings), Node's test runner, axe |
| Runtime in CI | Node.js latest |

### TypeScript 7 and typescript-eslint

TypeScript 7.0 has no programmatic API yet, so typescript-eslint and Next's build-time type check still need TypeScript 6. Both are installed as the TypeScript 7 release notes recommend: `"@typescript/native": "npm:typescript@7.0.2"` and `"typescript": "npm:@typescript/typescript6@6.0.2"`. `npx tsc` runs 7.0; tools that `import "typescript"` get 6.0.

## Brand and themes

- Logos: the uploaded `public/brand/senior_ai_plans_{light,dark}.png` (light: navy and gold, for light surfaces; dark: white and teal, for dark surfaces and the dark theme). `node scripts/brand/build-logos.mjs` trims them into the 48, 96 and 192px files that `<LogoMark>` uses; CSS picks the version for each surface.
- Favicons and the web manifest come from `public/brand/senior_ai_plans_{light,dark}/`, switched by `prefers-color-scheme`.
- Themes: Light, Dark or the device setting (header switch, mobile menu and footer). Tokens keep their names in both themes, so components need no `dark:` classes; `.on-dark` sections stay dark. `tests/contrast.test.ts` checks both themes, and CI runs axe on every page in light and dark.

## Motion (matched to beemas.framer.website)

Values come from the audit of the Framer bundle (`audit/motion/`, kept out of git) and live in `src/lib/motion.ts`. Components in `src/components/motion/`:

| Effect | Component | Framer values |
| --- | --- | --- |
| Text appear | `TextAppear` | rise 75px from opacity .001, spring k 300 / c 100, 0.2s after half in view; hero 0.4s after load |
| Fade up | `Reveal` | 35/50/75/100/150px offsets, siblings 0.2s apart, drop-in with negative offsets |
| Column slide | `SlideIn` | x ∓200 with the reveal spring, in a clipped row |
| Count-up | `Counter` | about 0.8s, strong ease-out, once in view |
| Marquee | `Marquee` | 30px/s right to left, seamless, with a Pause button |
| Card zoom-out | `ZoomOutCard` | scale 1.8 / y 260 (tablet 1.2 / 45, phone none), spring k 300 / c 90 |
| Line wipe | `LineWipe` | a half-opaque bar per line slides 98.77% at mid-viewport, spring k 500 / c 60, from 810px |
| Fan carousel | `FanCarousel` | ±7° tilt, ±4° skew, 83% width, 50% opacity, spring k 260 / c 32 |
| Testimonial slider | `TestimonialSlider` | autoplay about every 8.6s with Pause, dots and arrows |
| Parallax | `Parallax` | CTA background drifts about −0.1× the scroll |
| Header | `HeaderShell` | floating pill, clear over dark heroes, solid on scroll (.65s / .4s), drop-in after 0.7s |
| Hovers | `motion.css` | underline unfolds from rotateY(90°) in .4s, arrow swap .6s, buttons .3s / .4s, ping dot 1.5s |

Anything that moves on its own has a visible pause control and stops for reduced motion; dropdowns open on click or keyboard, not hover (plan §9).

## Where things live

- **Content and figures:** `src/content/`. `site.ts` holds business facts and the required notices; `menu.ts` the five-item menu (Home, Services with the AI Plan Match / Medicare / Beyond Medicare groups, Resources, About, Contact), the header buttons and the eight footer pages (a page joins the menus once it exists); `pages/*.ts` the Services and Beyond Medicare pages; `blog/*.ts` the articles; `pricing.ts` the tiers (prices TBD); `disclosures.ts` the non-Medicare product notices; `booking.ts` the Scope of Appointment topics; `medicare-figures.ts` holds official yearly figures (plan year, source, date checked); page copy lives in `home.ts`, `about.ts`, `team.ts`, `reviews.ts`, `glossary.ts`, `guides/*.ts` and `library/*.ts`.
- **Routes:** `src/app/` — pages, `sitemap.ts`, `robots.ts`, `manifest.ts`, Open Graph and icon images, `llms.txt`, and internal large-print layouts under `print/library/[slug]`.
- **AI Plan Match:** rules in `src/lib/match/engine.ts` (coverage type only, no plan or company, no steering), the log schema in `src/lib/match/log.ts`, the UI in `src/components/match/`.
- **API (server build only):** `POST /api/contact`, `/api/callback`, `/api/plan-intake`, `/api/plan-match` (one log line per match), `/api/guide-email`, `/api/newsletter`. Files are named `route.server.ts`; only the server build treats `server.ts` as a route extension, so the static export never sees them.
- **Compliance components:** `src/components/compliance/` (CMS disclaimer, government notice, unchecked consent box, Scope of Appointment). Never paraphrase their text; edit it in `site.ts`.

## Two build targets

- **Server** (default `next build`) is what Vercel runs. Form routes and Resend work. Images use Next's optimizer (AVIF, then WebP).
- **Static** (`NEXT_OUTPUT=export`) writes plain HTML to `out/`. There is no server, so `/api` is omitted and forms show a "call us" fallback. `npm run images` pre-builds WebP variants and a custom loader serves them. CI still builds and checks this export.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server (fetches the Switzer font first) |
| `npm run build` / `start` | Server build (what Vercel runs) / serve it |
| `npm run build:static` | Static export to `out/`, then `check:export` |
| `npm run lint` / `typecheck` / `test` | ESLint (zero warnings) / TypeScript 7 / unit tests |
| `npm run images:fetch` / `images` | Download manifest photos / build WebP variants |
| `npm run check:images` | Each photo used exactly once, with credit and alt text |
| `npm run pdf` | Re-render the guide-page PDFs in `public/pdf` (needed whenever guide content changes; CI's `pdf:check` enforces it) |
| `npm run pdf:library` | Re-render the ten ready-made PDFs in `public/guides` (opt-in, because those files may be replaced by uploads) |
| `npm run a11y` | axe check on `out/` in light and dark (run `build:static` first) |
| `npm run fonts` | Download Switzer from Fontshare (its license forbids committing it to a public repository) |

Environment variables are listed in `.env.example`. Contribution steps are in `CONTRIBUTING.md`; the yearly update checklist is in `docs/annual-refresh-runbook.md`.
