/**
 * Advisors. PLACEHOLDER: names, bios, states and photos are stand-ins, marked TODO(#57);
 * swap in the real team (and their portraits in scripts/images/manifest.json) before
 * launch. With a single entry the site switches to "solo" mode: About shows a founder
 * bio and the team page shows one card.
 */
export type Advisor = {
  slug: string;
  name: string;
  role: string;
  photo: 'team-advisor-1' | 'team-advisor-2' | 'team-advisor-3';
  /** State codes from site.licensedStates. */
  states: string[];
  yearsExperience: number;
  bio: string;
  languages?: string[];
};

export const team: Advisor[] = [
  {
    slug: 'maria-alvarez',
    name: 'Maria Alvarez', // TODO(#57)
    role: 'Founder and licensed Medicare advisor',
    photo: 'team-advisor-1',
    states: ['TX', 'FL', 'AZ'],
    yearsExperience: 12,
    bio: 'Maria started the agency after helping her own parents through their first Medicare year. She specializes in people still working past 65 and in comparing Medigap with Medicare Advantage.',
    languages: ['English', 'Spanish'],
  },
  {
    slug: 'james-carter',
    name: 'James Carter', // TODO(#57)
    role: 'Licensed Medicare advisor',
    photo: 'team-advisor-2',
    states: ['TX', 'AZ'],
    yearsExperience: 8,
    bio: 'James walks clients through Part D drug plans and checks every year that their medicines are still covered at the best price.',
  },
  {
    slug: 'linda-nguyen',
    name: 'Linda Nguyen', // TODO(#57)
    role: 'Licensed Medicare advisor',
    photo: 'team-advisor-3',
    states: ['FL'],
    yearsExperience: 6,
    bio: 'Linda helps people who are new to Florida or to Medicare understand their local plan choices and the deadlines that matter.',
  },
];

export const isSolo = team.length === 1;
