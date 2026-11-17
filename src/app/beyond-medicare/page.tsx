import { ContentPageView } from '@/components/content/ContentPageView';
import { beyondMedicarePage } from '@/content/pages/beyond-medicare';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...beyondMedicarePage.meta, path: beyondMedicarePage.path });

export default function BeyondMedicarePage() {
  return <ContentPageView page={beyondMedicarePage} />;
}
