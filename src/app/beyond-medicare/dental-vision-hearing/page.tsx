import { ContentPageView } from '@/components/content/ContentPageView';
import { dentalVisionHearingPage } from '@/content/pages/dental-vision-hearing';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...dentalVisionHearingPage.meta, path: dentalVisionHearingPage.path });

export default function DentalVisionHearingPage() {
  return <ContentPageView page={dentalVisionHearingPage} />;
}
