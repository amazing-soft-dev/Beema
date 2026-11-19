import { Clock, Envelope, MapPin, Phone, Sparkle, UserCircle } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Breadcrumb } from '@/components/content/Breadcrumb';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { LeadForm } from '@/components/forms/LeadForm';
import { PageIntro } from '@/components/layout/PageIntro';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact us',
  description: `Call ${site.phone.display}, email or send us a short form and a licensed Medicare advisor will call you back.`,
  path: '/contact',
});

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Talk with a licensed agent"
        lead="Call us, email us, or leave your number and we will call you at a time that suits you."
        aside={<Photo id="contact-phone-call" priority sizes="(min-width: 1200px) 560px, 100vw" className="aspect-[4/3] w-full" />}
        breadcrumb={<Breadcrumb trail={[{ label: 'Contact', href: '/contact' }]} />}
      />
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <TextAppear className="t-h2">Ways to reach us</TextAppear>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4">
                <Icon icon={Phone} weight="fill" size={28} className="mt-1 shrink-0 text-navy-700" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-12 items-center text-2xl font-semibold underline underline-offset-4">
                    {site.phone.display}
                  </a>
                  <p>
                    {site.tty.display}, or call through your relay service. <a href={`tel:${site.tty.tel}`} className="underline underline-offset-4">Dial 711</a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Icon icon={Clock} weight="fill" size={28} className="mt-1 shrink-0 text-navy-700" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <ul>
                    {site.hours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <Icon icon={Envelope} weight="fill" size={28} className="mt-1 shrink-0 text-navy-700" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center underline underline-offset-4">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Icon icon={MapPin} weight="fill" size={28} className="mt-1 shrink-0 text-navy-700" />
                <div>
                  <p className="font-semibold">Mailing address</p>
                  <address className="not-italic">
                    {site.legalName}
                    <br />
                    {address.street}
                    <br />
                    {address.city}, {address.region} {address.postalCode}
                  </address>
                </div>
              </li>
            </ul>
          </div>
          <Reveal y="lg">
            <LeadForm endpoint="/api/contact" form="contact" idPrefix="contact" title="Request a callback" />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-sand" aria-label="Clients and subscribers">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div id="existing-clients" className="flex scroll-mt-40 flex-col gap-4">
          <Icon icon={UserCircle} weight="fill" size={40} className="text-navy-700" />
          <h2 id="clients-heading" className="t-h2">
            Already a client?
          </h2>
          <p>
            Questions about a plan you have, a claim, a bill or your ID card? Call {site.phone.display} and say “client service”, or email{' '}
            <a href={`mailto:${site.email}?subject=Existing%20client`} className="font-semibold text-navy-700 underline underline-offset-4">
              {site.email}
            </a>{' '}
            with “Existing client” in the subject. For questions about coverage or claims, the phone number on the back of your insurance card is often fastest.
          </p>
          <Link href="/book-a-call?topic=annual-review" className="self-start font-semibold text-navy-700 underline underline-offset-4">
            Book your free annual review
          </Link>
        </div>
        <div id="subscribers" className="flex scroll-mt-40 flex-col gap-4">
          <Icon icon={Sparkle} weight="fill" size={40} className="text-navy-700" />
          <h2 id="subscribers-heading" className="t-h2">
            Plus and Family subscribers
          </h2>
          <p>
            Our optional subscriptions are coming later. Once you subscribe, your alerts, reminders and caregiver help will be managed here. You never need a
            subscription to get help with Medicare.
          </p>
          <Link href="/plans-pricing" className="self-start font-semibold text-navy-700 underline underline-offset-4">
            Plans &amp; Pricing
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
