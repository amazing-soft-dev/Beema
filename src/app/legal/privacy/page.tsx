import { LegalPage } from '@/components/legal/LegalPage';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Privacy policy', description: `How ${site.name} collects, uses and protects your information.`, path: '/legal/privacy' });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lead={`How ${site.legalName} collects, uses and protects the information you share with us.`}
      updated="November 15, 2026"
      sections={[
        {
          heading: 'What we collect',
          body: (
            <ul>
              <li>Details you type into our forms: your name, ZIP code, phone number, email address and the best time to call.</li>
              <li>If you use our plan comparison tool: the medicines and doctors you list. We treat this as sensitive health information.</li>
              <li>The consent you give to be contacted, including the exact wording you agreed to and when.</li>
              <li>Basic, anonymous visit statistics (pages viewed, device type). We do not use advertising cookies.</li>
            </ul>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <ul>
              <li>To answer your questions, call you back and prepare for appointments you book.</li>
              <li>To compare plans for you and, if you ask us to, help you enroll.</li>
              <li>To send a guide you requested, or our newsletter if you signed up. Every email has an unsubscribe link.</li>
              <li>To keep records that Medicare and state insurance rules require, such as Scope of Appointment forms.</li>
            </ul>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <>
              <p>We never sell your information. We share it only:</p>
              <ul>
                <li>With an insurance company when you decide to enroll in one of its plans.</li>
                <li>With service providers that run parts of this website for us, such as email delivery, appointment scheduling, chat and hosting. They may use it only to provide that service.</li>
                <li>When the law requires it.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Calls and texts',
          body: (
            <p>
              We call or text you only if you checked the consent box on a form or asked us to. Consent is never required to buy anything. To stop, reply
              STOP to a text, tell us on a call, or contact us using the details below.
            </p>
          ),
        },
        {
          heading: 'How we protect it',
          body: <p>Information you send is encrypted in transit. Access is limited to the staff and providers who need it, and we keep it only as long as needed for the purposes above or as the law requires.</p>,
        },
        {
          heading: 'Your choices and rights',
          body: (
            <p>
              You can ask to see, correct or delete the information we hold about you, and withdraw consent at any time. Depending on your state, you may
              have additional rights. We will not treat you differently for using them.
            </p>
          ),
        },
        {
          heading: 'Contact us',
          body: (
            <p>
              Call <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> ({site.tty.display}), email <a href={`mailto:${site.email}`}>{site.email}</a> or write to{' '}
              {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}.
            </p>
          ),
        },
      ]}
    />
  );
}
