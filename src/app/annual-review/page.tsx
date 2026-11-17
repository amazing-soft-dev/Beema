import { ContentPageView } from '@/components/content/ContentPageView';
import { annualReviewPage } from '@/content/pages/annual-review';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...annualReviewPage.meta, path: annualReviewPage.path });

export default function AnnualReviewPage() {
  return <ContentPageView page={annualReviewPage} />;
}
