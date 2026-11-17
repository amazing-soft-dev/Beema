import { ContentPageView } from '@/components/content/ContentPageView';
import { hospitalIndemnityPage } from '@/content/pages/hospital-indemnity';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...hospitalIndemnityPage.meta, path: hospitalIndemnityPage.path });

export default function HospitalIndemnityPage() {
  return <ContentPageView page={hospitalIndemnityPage} />;
}
