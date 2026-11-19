/**
 * Reviews. Nothing here may be invented: ratings, counts and quotes are added only from
 * real review profiles and with each client's written permission (TODO(#57)).
 * Empty values render honest "coming soon" states instead of made-up numbers.
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
  /** CMS testimonial rules: the reviewer is (or was) a member of the plan they describe. */
  planMember: true;
  /** Paid or compensated endorsements must say so on the page. */
  paid: boolean;
};

/** CMS marketing rules for testimonials (plan §6), shown on the Reviews page. */
export const testimonialRules = [
  'Every story is from a real client who was a member of the plan they talk about.',
  'We publish names and quotes only with written permission on file.',
  'If anyone is ever paid or rewarded for a review, we label it as a paid endorsement.',
  'Reviews describe one person’s experience; your plan choices and costs may differ.',
];

export const reviews = {
  platforms: [
    { name: 'Google', rating: null, count: null, profileUrl: null, reviewUrl: null },
    { name: 'Facebook', rating: null, count: null, profileUrl: null, reviewUrl: null },
    { name: 'Trustpilot', rating: null, count: null, profileUrl: null, reviewUrl: null },
  ] as Platform[],
  quotes: [] as ClientQuote[],
};
