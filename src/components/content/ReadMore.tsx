import Link from 'next/link';
import { ArrowSwap } from '@/components/ui/ArrowSwap';

/** "Read the full guide →" link from a summary to its own page; the arrow swaps on hover. */
export function ReadMore({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="inline-flex min-h-12 items-center gap-2 self-start font-semibold text-navy-700 underline underline-offset-4 print:hidden">
      {children}
      <ArrowSwap />
    </Link>
  );
}
