import { site } from '../site.ts';

/** Placeholder author until the agency supplies its agents (TODO(#57)). */
export const defaultAuthor = {
  name: `${site.shortName} licensed agent team`,
  license: `Licensed health insurance agents, NPN ${site.npn}. Licensed in ${site.licensedStates.map((s) => s.code).join(', ')}.`,
};
