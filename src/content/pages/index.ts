import { medigapPage } from './medigap.ts';
import { medicareAdvantagePage } from './medicare-advantage.ts';
import { partDPage } from './part-d.ts';
import { annualReviewPage } from './annual-review.ts';
import { beyondMedicarePage } from './beyond-medicare.ts';
import { finalExpensePage } from './final-expense.ts';
import { hospitalIndemnityPage } from './hospital-indemnity.ts';
import { dentalVisionHearingPage } from './dental-vision-hearing.ts';
import type { ContentPage } from './types.ts';

/** Every data-driven content page, for tests and the sitemap. */
export const contentPages: ContentPage[] = [medigapPage, medicareAdvantagePage, partDPage, annualReviewPage, beyondMedicarePage, finalExpensePage, hospitalIndemnityPage, dentalVisionHearingPage];
