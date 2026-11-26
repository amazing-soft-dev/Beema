import Link from 'next/link';
import { LegalPage } from '@/components/legal/LegalPage';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Privacy policy', description: `How ${site.name} collects, uses, keeps and protects your information, and your rights.`, path: '/legal/privacy' });

/**
 * Privacy policy. Retention periods and the California section follow the compliance review of
 * 2026-11-25 (INS-12, INS-13, INS-33 to INS-36, California addendum). Keep in step with the
 * AI Tool & Health Data Notice and with what the forms and API routes actually collect.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lead={`How ${site.legalName} collects, uses, keeps and protects the information you share with us.`}
      updated="November 26, 2026"
      sections={[
        {
          heading: 'What we collect',
          body: (
            <ul>
              <li>Contact and callback forms: your name, ZIP code, phone number and the best time to call. Guide and newsletter forms: your name and email address.</li>
              <li>
                Plan comparison form: the names, doses and frequency of the medicines you list, and the names, specialties and cities of the doctors you list. We treat
                these as sensitive health information.
              </li>
              <li>
                Free AI Plan Match: your answers stay in your browser. We keep only the first 3 digits of your ZIP code, your birth year, and the result and reasons,
                as described in the <Link href="/legal/ai-health-data">AI Tool &amp; Health Data Notice</Link>.
              </li>
              <li>
                Proof of consent, with every form that asks for a phone number: whether you checked the consent box, its exact wording, the time, the page you used,
                the form version, your IP address and your browser.
              </li>
              <li>Call recordings and chat messages, and the Scope of Appointment you complete before an appointment.</li>
              <li>Basic visit statistics (pages viewed, device type) from Vercel Web Analytics, which does not use cookies. We do not use advertising cookies or pixels.</li>
            </ul>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <ul>
              <li>To answer your questions, call you back and prepare for appointments you book.</li>
              <li>To compare plans for you and, if you ask us to, help you enroll.</li>
              <li>To send a guide you requested, or our newsletter if you signed up. You can unsubscribe at any time.</li>
              <li>To keep the records that Medicare and state insurance rules require, such as Scope of Appointment forms, call recordings and proof of consent.</li>
            </ul>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <>
              <p>
                We never sell your information, and we never share your contact details or health information with another agency, marketing company or call center.
                We share it only:
              </p>
              <ul>
                <li>With an insurance company when you decide to apply for one of its plans.</li>
                <li>
                  With the service providers that run parts of this website for us, who may use it only to provide that service: Vercel (hosting and visit
                  statistics), Resend (email delivery), Cal.com (appointment booking, only after you open the calendar) and Crisp (chat, only after you start a chat).
                </li>
                <li>When the law requires it.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Calls, texts and recordings',
          body: (
            <>
              <p>
                We use automated calls or texts only if you checked the consent box on a form. Without it, we return the call you asked for by hand. Consent is never
                required to buy anything. To stop, reply STOP to a text, tell us on a call, or contact us using the details below.
              </p>
              <p>
                Calls with our licensed agents, including the sound of video calls, are recorded, as Medicare rules require. We tell you at the start of every call,
                and by continuing you agree to the recording. Chat messages are saved the same way.
              </p>
            </>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <ul>
              <li>Call recordings: at least 6 years (audio for the first 3 years, then audio or a full transcript).</li>
              <li>Scope of Appointment records and proof of consent: 10 years.</li>
              <li>AI Plan Match records (3-digit ZIP, birth year, result and reasons): 24 months.</li>
              <li>Other form requests and chat messages: as long as we need them to help you, and no longer than the law requires for records about a sale.</li>
            </ul>
          ),
        },
        {
          heading: 'How we protect it',
          body: <p>Information you send is encrypted in transit. Access is limited to the staff and providers who need it.</p>,
        },
        {
          heading: 'Your choices and rights',
          body: (
            <p>
              You can ask to see, correct or delete the information we hold about you, and withdraw consent at any time. Records that Medicare or state law requires us
              to keep, such as call recordings and Scope of Appointment forms, are kept for the required time even if you ask us to delete them. We will not treat
              you differently for using your rights.
            </p>
          ),
        },
        {
          heading: 'California residents',
          body: (
            <>
              <p>
                The California Insurance Information and Privacy Protection Act gives you the right to see the personal information we collect about you in an
                insurance transaction, and to ask us to correct it (Insurance Code sections 791.08 and 791.09). We will not share it for marketing without first
                giving you a chance to opt out, and we never share medical information for marketing. You will also receive a Notice of Information Practices before
                any policy you buy is delivered.
              </p>
              <p>
                The California Consumer Privacy Act applies only to businesses above certain size thresholds. We review each year whether it applies to us. We do not
                sell or share personal information for cross-context advertising.
              </p>
            </>
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
