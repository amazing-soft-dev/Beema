import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/content/site';

export type Crumb = { label: string; href: string };

/**
 * Breadcrumb trail above a page title ("Home › Services › Medigap"), with matching
 * BreadcrumbList JSON-LD. The last crumb is the current page. Color follows the surface.
 */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const all = [{ label: 'Home', href: '/' }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-base">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="inline-flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="u-line inline-flex min-h-12 items-center [--u-bottom:10px]">
                      {c.label}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: new URL(c.href, site.url).toString() })),
        }}
      />
    </>
  );
}
