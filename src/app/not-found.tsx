import type { Metadata } from 'next';
import { HelpLinks } from '@/components/layout/HelpLinks';
import { Photo } from '@/components/ui/Photo';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section-y bg-sand">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <p className="t-caps text-navy-700">Page not found</p>
          <h1 className="t-h1">We can’t find that page</h1>
          <p className="t-lead">The link may be old or mistyped. These pages are a good place to start, or call and we will help you find what you need.</p>
          <HelpLinks />
        </div>
        <Photo id="not-found-bridge" sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />
      </div>
    </section>
  );
}
