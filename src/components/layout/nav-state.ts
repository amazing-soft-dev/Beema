import type { MenuItem } from '@/content/menu';

/** True when `href` is the current page or one of its sections (except Home). */
export function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** True when the current page is the item's landing page or one of its group links. */
export function isItemActive(pathname: string, item: MenuItem) {
  return isActive(pathname, item.href) || (item.groups ?? []).some((g) => g.links.some((l) => isActive(pathname, l.href)));
}
