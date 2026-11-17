import { site } from '@/content/site';

/** Renders a JSON-LD block. `<` is escaped so text can never close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** Organization data for every page: an insurance agency serving its licensed states. */
export function agencyJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: new URL('/brand/senior_ai_plans_light/android-chrome-512x512.png', site.url).toString(),
    telephone: site.phone.tel,
    email: site.email,
    foundingDate: String(site.foundedYear),
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.licensedStates.map((s) => ({ '@type': 'State', name: s.name })),
  };
}
