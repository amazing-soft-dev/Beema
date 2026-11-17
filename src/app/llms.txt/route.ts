import { availableMenu, legalLinks, notices, site } from '@/content/site';
import { articleHref, articles } from '@/content/blog';
import { listStaticRoutes } from '@/lib/routes';
import { noindexRoutes } from '@/lib/sitemap-entries';

export const dynamic = 'force-static';

/** llms.txt: a plain-text guide to the site for AI assistants (https://llmstxt.org). */
export function GET() {
  const url = (path: string) => new URL(path, site.url).toString();
  const routes = new Set(listStaticRoutes().filter((r) => !noindexRoutes.has(r)));
  const items = availableMenu(routes);
  const seen = new Set<string>();
  const pages = [...items, ...items.flatMap((i) => i.groups?.flatMap((g) => g.links) ?? []), ...legalLinks.filter((l) => routes.has(l.href))].filter(
    (p) => routes.has(p.href.split('#')[0] || '/') && !seen.has(p.href) && seen.add(p.href),
  );
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Licensed Medicare insurance agency. Phone ${site.phone.display} (${site.tty.display}). Help is free to the consumer.`,
    '',
    '## Pages',
    ...pages.map((item) => `- [${item.label}](${url(item.href)})`),
    '',
    '## Free AI Plan Match',
    `- [AI Plan Match](${url('/plan-match')}): suggests a Medicare coverage type (not a named plan) with three reasons and trade-offs. Free; no purchase required; reviewed by a licensed agent before any enrollment.`,
    '',
    '## Articles',
    ...articles.map((a) => `- [${a.title}](${url(articleHref(a.slug))}): ${a.description}`),
    '',
    '## Notices',
    `- ${notices.cmsDisclaimer}`,
    `- ${notices.govDisclaimer}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
