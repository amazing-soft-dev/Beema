'use client';

import { ArrowClockwise } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { HelpLinks } from '@/components/layout/HelpLinks';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** Shown if a page fails to load. Offers a retry, the phone number and the main pages. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="section-y bg-sand">
      <div className="container-x flex max-w-[64ch] flex-col gap-5">
        <p className="t-caps text-green-700">Something went wrong</p>
        <h1 className="t-h1">Sorry, this page didn’t load</h1>
        <p className="t-lead">Please try again. If it keeps happening, call us and we will help right away.</p>
        <Button onClick={reset} variant="secondary" className="self-start" icon={<Icon icon={ArrowClockwise} />}>
          Try again
        </Button>
        <HelpLinks />
      </div>
    </section>
  );
}
