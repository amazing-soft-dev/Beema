import { medigapPage } from './medigap.ts';
import { medicareAdvantagePage } from './medicare-advantage.ts';
import { partDPage } from './part-d.ts';
import { annualReviewPage } from './annual-review.ts';
import type { ContentPage } from './types.ts';

/** Every data-driven content page, for tests and the sitemap. */
export const contentPages: ContentPage[] = [medigapPage, medicareAdvantagePage, partDPage, annualReviewPage];
