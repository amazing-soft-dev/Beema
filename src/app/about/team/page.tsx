import { AdvisorCard } from '@/components/about/AdvisorCard';
import { PageIntro } from '@/components/layout/PageIntro';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/content/site';
import { team } from '@/content/team';
import { buildMetadata } from '@/lib/seo';
import { photo } from '@/lib/photos';

export const metadata = buildMetadata({
  title: 'Meet the team',
  description: `The licensed Medicare advisors at ${site.name}: where they are licensed, their experience, and how to book a call.`,
  path: '/about/team',
});

// Each portrait is referenced exactly once (npm run check:images).
const portraits = {
  'team-advisor-1': photo('team-advisor-1'),
  'team-advisor-2': photo('team-advisor-2'),
  'team-advisor-3': photo('team-advisor-3'),
};

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="Meet the team"
        lead="Licensed advisors who explain Medicare in plain words and help you choose. Book a call with any of us."
      >
        {site.placeholder && (
          <p className="rounded-card-sm bg-white p-4 text-base">
            <strong>Sample team.</strong> These names, bios and photos are placeholders and will be replaced with the real team.
          </p>
        )}
      </PageIntro>
      <section className="section-y">
        <ul className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((advisor, i) => (
            <Reveal key={advisor.slug} as="li" stagger={i}>
              <AdvisorCard advisor={advisor} image={portraits[advisor.photo]} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
