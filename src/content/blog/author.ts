import { site } from '../site.ts';

/** NPN shown on the blog byline, as supplied by the owner (2026-11-25). */
export const authorNpn = '13356886';

/** Byline for every article: the agency's licensed agent team. */
export const defaultAuthor = {
  name: `${site.shortName} licensed agent team`,
  license: `Licensed health insurance agents, NPN ${authorNpn}. Licensed in ${site.licensedStates.map((s) => s.code).join(', ')}.`,
};
