import type { Metadata } from 'next';
import { ByTheNumbers } from '@/components/home/ByTheNumbers';
import { HelpTicker } from '@/components/home/HelpTicker';
import { HomeHero } from '@/components/home/HomeHero';
import { ChecklistBand, HomeCta, HomeReviews, LatestArticles } from '@/components/home/HomeClosing';
import { FreeAndWindow } from '@/components/home/HomeSections';
import { MatchBox } from '@/components/home/MatchBox';
import { WhoItsFor } from '@/components/home/WhoItsFor';
import { ServiceTiles } from '@/components/home/ServiceTiles';
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
      <ServiceTiles />
      <TwoPaths />
      <ByTheNumbers />
      <MatchBox />
      <FreeAndWindow />
      <HomeReviews />
      <ChecklistBand />
      <LatestArticles />
      <HomeCta />
    </>
  );
}
