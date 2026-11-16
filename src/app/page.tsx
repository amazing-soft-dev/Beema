import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/HomeHero';
import { CtaBand, FreeAndWindow, ReviewsTeaser } from '@/components/home/HomeSections';
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
      <TwoPaths />
      <FreeAndWindow />
      <ReviewsTeaser />
      <CtaBand />
    </>
  );
}
