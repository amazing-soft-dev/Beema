import { ContentPageView } from '@/components/content/ContentPageView';
import { medigapPage } from '@/content/pages/medigap';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...medigapPage.meta, path: medigapPage.path });

export default function MedigapPage() {
  return <ContentPageView page={medigapPage} />;
}
