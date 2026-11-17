import { ContentPageView } from '@/components/content/ContentPageView';
import { finalExpensePage } from '@/content/pages/final-expense';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...finalExpensePage.meta, path: finalExpensePage.path });

export default function FinalExpensePage() {
  return <ContentPageView page={finalExpensePage} />;
}
