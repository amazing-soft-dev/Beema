# Annual refresh and launch runbook

Two checklists: one to launch with real business data, and one to repeat every fall before Annual Enrollment (October 15). Each change follows the normal flow in `CONTRIBUTING.md` (issue → branch → pull request).

## A. Before launch: replace placeholders (issue #57)

1. In `src/content/site.ts`, replace every value marked `TODO(#57)`: name, legal name, URL, phone, email, hours, address, founding year, NPN, licensed states with license numbers, and the CMS disclaimer counts (`cms.organizations`, `cms.products`) for the plans you actually represent.
2. `src/content/about.ts`: replace the founder story. `src/content/team.ts`: real advisors, states and bios (one entry switches the site to solo mode).
3. Team photos: add real portraits to `scripts/images/manifest.json` (or keep stock photos only if you are comfortable with them), run `npm run images:fetch`, remove the sample portraits.
4. `src/content/reviews.ts`: copy real ratings and counts from Google, Facebook and Trustpilot, add the profile and "write a review" links, and add client quotes only with written permission (`consent: true`).
5. Accounts and environment (Vercel and `.env.local`, see `.env.example`): Resend with a verified sending domain, Cal.com event types `phone`, `video` and `in-person`, Crisp website ID, `NEXT_PUBLIC_SITE_URL`.
6. Set `site.placeholder` to `false`. This removes the sample notices and allows indexing (`robots.txt` and page metadata).
7. Run `npm run pdf` and `npm run pdf:library` so every PDF carries the real details, and commit them.
8. Compliance review (below), then merge.

## B. Pre-launch compliance review

Have the agency's compliance lead or counsel confirm:

- [ ] The CMS disclaimer wording and the organization/product counts (website footer, chat greeting, tools, every PDF).
- [ ] The government non-affiliation notice.
- [ ] The phone-consent text (names the business, unchecked by default, not a condition of purchase) and how consent records are kept (each lead email includes the exact text and time).
- [ ] The Scope of Appointment note and how SOAs are recorded before meetings.
- [ ] The privacy policy and terms of use (currently template text).
- [ ] No Medicare card image or government-style logos anywhere; no invented reviews or ratings.
- [ ] Licensing page: NPN and every state license number.

## C. Every fall, before October 15

1. **Official figures.** When CMS publishes the new "Medicare Parts A & B Premiums and Deductibles" fact sheet (usually October–November), update `src/content/medicare-figures.ts`: `planYear`, `incomeYear` (two years earlier), standard Part B premium and deductible, every IRMAA tier for individual, joint and married-filing-separately returns, the Part D adjustments, `sources` and `verifiedOn`. The IRMAA tests in `tests/irmaa.test.ts` pin the band edges; update them to the new table.
2. **Rules and dates.** Recheck anything that changed this year (Part D out-of-pocket cap, enrollment rules) on Medicare.gov and update the guide content in `src/content/guides/` and `src/content/library/`.
3. **Ready-made PDFs.** Bump `planYear` and `updated` for each guide in `src/content/guides-library.ts`, then `npm run pdf:library` (or upload newly designed files with the same names to `public/guides/` and update the dates).
4. **Guide-page PDFs.** `npm run pdf` (CI's `pdf:check` fails until you do).
5. **CMS disclaimer counts.** Update `cms.organizations` and `cms.products` if your carrier contracts changed.
6. **Review your analytics** (`guide_download`, `call_click`, `form_submit`) to see which guides seniors use most, and refresh the weakest ones.
7. Ship the changes through the normal pull request flow, ideally by October 1.

## D. When a dependency or the platform changes

- Dependabot opens weekly pull requests; merge them by hand after CI is green.
- If Fontshare is unreachable at build time, headings fall back to Geist and the build still succeeds; retry later with `npm run fonts`.
- TypeScript: when typescript-eslint supports TypeScript 7's API, drop the `@typescript/typescript6` alias (see README).
