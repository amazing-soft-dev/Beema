import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { notices, site } from '@/content/site';
import { freeAlternatives } from '@/lib/match/engine';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Tool & Health Data Notice',
  description: `How the ${site.name} AI Plan Match works, what it can and cannot see, the human review, and how we collect, keep and delete the data you give it.`,
  path: '/legal/ai-health-data',
});

/** Footer page (plan §4, phase 2): how the AI match works and how health data is handled. */
export default function AiHealthDataPage() {
  return (
    <LegalPage
      title="AI Tool & Health Data Notice"
      lead="How our free AI Plan Match works, what it does not do, and what happens to the answers you give it."
      updated="November 26, 2026"
      sections={[
        {
          heading: 'What the AI Plan Match does',
          body: (
            <p>
              The <Link href="/plan-match">AI Plan Match</Link> asks a few questions about your situation and suggests a <strong>type</strong> of coverage, such as
              Original Medicare with a Medigap plan, Medicare Advantage, or keeping job-based coverage for now, with three reasons and the trade-offs. If you have
              Medicaid (Medi-Cal), VA, TRICARE or Marketplace coverage, or Medicare before 65, it asks you to talk with a licensed agent first instead. It follows
              written rules that our licensed agents review; it does not choose a specific plan or company.
            </p>
          ),
        },
        {
          heading: 'What it does not do',
          body: (
            <ul>
              <li>It does not enroll you in anything or require you to buy insurance or a subscription.</li>
              <li>It does not favor any plan or company because it pays us more or because we represent it.</li>
              <li>It does not see every plan in your area. {notices.cmsDisclaimer}</li>
              <li>It is not medical, legal or tax advice.</li>
            </ul>
          ),
        },
        {
          heading: 'A licensed person reviews every match',
          body: (
            <>
              <p>
                The tool only explains; it never makes a decision about your coverage. Before any enrollment, a licensed agent reviews the match with you, checks your
                doctors and prescriptions against real plans, and corrects anything that does not fit. Any recommendation comes from that licensed person.
              </p>
              <p>
                Each year a licensed agent also reviews a sample of recent results to check that the rules are fair and do not steer anyone. The rules do not use
                your ZIP code or age to rank or route you.
              </p>
            </>
          ),
        },
        {
          heading: 'Data sources and plan year',
          body: (
            <p>
              The rules use Medicare enrollment rules and cost figures published by the Centers for Medicare &amp; Medicaid Services (CMS) and Social Security for the
              current plan year, and are updated each fall before Annual Enrollment.
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <ul>
              <li>Your answers: ZIP code, birth month and year, other coverage, budget and travel preference. The match is worked out in your browser.</li>
              <li>Only if you agree separately: whether you want to keep specific doctors and roughly how many prescriptions you take.</li>
              <li>We do not ask for your name, Medicare number or diagnoses in the tool.</li>
              <li>Only your ZIP code, birth month and the result are sent to us, and we cut them down to the first three digits of the ZIP code and the birth year.</li>
            </ul>
          ),
        },
        {
          heading: 'How long we keep it, and deleting it',
          body: (
            <p>
              To review that the tool works fairly, we keep a record of each match with only the first three digits of your ZIP code and your birth year, plus the
              result and its reasons, for up to 24 months. Your full answers stay in your browser and are gone when you close the page. To ask about or delete
              anything we hold, call {site.phone.display} or email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
        {
          heading: 'No sale or sharing of health data',
          body: (
            <p>
              We never sell your answers or use them for advertising. We do not share health information with anyone without your separate written consent naming
              who receives it. See our <Link href="/legal/privacy">privacy policy</Link> for your state privacy and health-data rights.
            </p>
          ),
        },
        {
          heading: 'Free, unbiased alternatives',
          body: (
            <ul>
              {freeAlternatives.map((a) => (
                <li key={a.href}>
                  <a href={a.href}>{a.label}</a>: {a.detail}
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  );
}
