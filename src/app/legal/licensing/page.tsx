import { LegalPage } from '@/components/legal/LegalPage';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Licensing', description: `${site.legalName} insurance licenses, National Producer Number and licensed states.`, path: '/legal/licensing' });

export default function LicensingPage() {
  return (
    <LegalPage
      title="Licensing"
      lead={`${site.legalName} is a licensed insurance agency. Here are our license details so you can check them yourself.`}
      updated="November 26, 2026"
      sections={[
        {
          heading: 'Agency details',
          body: (
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="font-semibold">Legal name</dt>
              <dd>{site.legalName}</dd>
              <dt className="font-semibold">National Producer Number (NPN)</dt>
              <dd>{site.npn}</dd>
              <dt className="font-semibold">Address</dt>
              <dd>
                {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
              </dd>
            </dl>
          ),
        },
        {
          heading: 'States where we are licensed',
          body: (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <caption className="sr-only">Insurance licenses by state</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="py-3 pr-6">
                      State
                    </th>
                    <th scope="col" className="py-3 pr-6">
                      License number
                    </th>
                    <th scope="col" className="py-3">
                      Lines of authority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {site.licensedStates.map((s) => (
                    <tr key={s.code} className="border-b border-line">
                      <th scope="row" className="py-3 pr-6 font-medium">
                        {s.name}
                      </th>
                      <td className="py-3 pr-6">{s.license}</td>
                      <td className="py-3">{s.lines.join(' and ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          heading: 'Check a license',
          body: (
            <p>
              You can look up any agent or agency through the <a href="https://nipr.com/help/look-up-your-npn">National Insurance Producer Registry</a> or your
              state’s department of insurance. Our individual advisors’ licensed states are listed on the <a href="/about/team">Meet the Team</a> page.
            </p>
          ),
        },
        {
          heading: 'What each line of authority covers',
          body: (
            <ul>
              <li>
                <strong>Health:</strong> Medicare Advantage, Medicare Supplement (Medigap), Part D drug plans, hospital indemnity, and dental, vision and hearing plans.
              </li>
              <li>
                <strong>Life:</strong> final expense life insurance, which we discuss only in a separate appointment.
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
