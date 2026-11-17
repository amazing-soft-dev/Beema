import { ContentPageView } from '@/components/content/ContentPageView';
import { medicareAdvantagePage } from '@/content/pages/medicare-advantage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...medicareAdvantagePage.meta, path: medicareAdvantagePage.path });

export default function MedicareAdvantagePage() {
  return <ContentPageView page={medicareAdvantagePage} />;
}
