import { availableMenu, legalLinks, notices, site } from '@/content/site';
import { listStaticRoutes } from '@/lib/routes';

export const dynamic = 'force-static';

/** llms.txt: a plain-text guide to the site for AI assistants (https://llmstxt.org). */
export function GET() {
  const url = (path: string) => new URL(path, site.url).toString();
  const routes = new Set(listStaticRoutes());
  const items = availableMenu(routes);
  const seen = new Set<string>();
  const pages = [...items, ...items.flatMap((i) => i.groups?.flatMap((g) => g.links) ?? []), ...legalLinks.filter((l) => routes.has(l.href))].filter(
    (p) => !seen.has(p.href) && seen.add(p.href),
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
    '## Notices',
    `- ${notices.cmsDisclaimer}`,
    `- ${notices.govDisclaimer}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
