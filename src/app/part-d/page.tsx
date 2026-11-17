import { ContentPageView } from '@/components/content/ContentPageView';
import { partDPage } from '@/content/pages/part-d';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...partDPage.meta, path: partDPage.path });

export default function PartDPage() {
  return <ContentPageView page={partDPage} />;
}
