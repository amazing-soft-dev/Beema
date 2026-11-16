/**
 * Reviews. Nothing here may be invented: ratings, counts and quotes are added only from
 * real review profiles and with each client's written permission (TODO(#57)).
 * Empty values render honest "coming soon" states instead of sample numbers.
 */
export type Platform = {
  name: 'Google' | 'Facebook' | 'Trustpilot';
  /** Average star rating, e.g. 4.9. null until copied from the real profile. */
  rating: number | null;
  count: number | null;
  /** Public profile, to read reviews. */
  profileUrl: string | null;
  /** Direct "write a review" link. */
  reviewUrl: string | null;
};

export type ClientQuote = {
  quote: string;
  name: string;
  /** e.g. "Retired teacher, Austin". */
  detail: string;
  /** What we helped with, shown as a short story. */
  story?: string;
  /** Must be true: written permission to publish name and quote is on file. */
  consent: true;
};

export const reviews = {
  platforms: [
    { name: 'Google', rating: null, count: null, profileUrl: null, reviewUrl: null },
    { name: 'Facebook', rating: null, count: null, profileUrl: null, reviewUrl: null },
    { name: 'Trustpilot', rating: null, count: null, profileUrl: null, reviewUrl: null },
  ] as Platform[],
  quotes: [] as ClientQuote[],
};
