import { GlossaryList } from '@/components/guides/GlossaryList';
import { PageIntro } from '@/components/layout/PageIntro';
import { JsonLd } from '@/components/seo/JsonLd';
import { glossary } from '@/content/glossary';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medicare glossary: terms in plain English',
  description: 'Plain-English definitions of Medicare terms from A to Z, including IEP, AEP, IRMAA, MOOP, Medigap and Part D.',
  path: '/resources/glossary',
});

export default function GlossaryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Resources"
        title="Medicare glossary"
        lead="Medicare comes with a lot of letters and terms. Here they are in plain English, from A to Z."
      />
      <section className="section-y">
        <div className="container-x">
          <GlossaryList terms={glossary} />
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: `${site.name} Medicare glossary`,
          hasDefinedTerm: glossary.map((t) => ({ '@type': 'DefinedTerm', name: t.term, alternateName: t.aka, description: t.definition, url: `${site.url}/resources/glossary#${t.slug}` })),
        }}
      />
    </>
  );
}
