import type { Metadata } from 'next';
import { HelpTicker } from '@/components/home/HelpTicker';
import { HomeHero } from '@/components/home/HomeHero';
import { FreeAndWindow, ReviewsTeaser } from '@/components/home/HomeSections';
import { WhoItsFor } from '@/components/home/WhoItsFor';
import { TwoPaths } from '@/components/home/TwoPaths';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Medicare help for people turning 65` },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HelpTicker />
      <WhoItsFor />
      <TwoPaths />
      <FreeAndWindow />
      <ReviewsTeaser />
    </>
  );
}
