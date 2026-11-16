import { LegalPage } from '@/components/legal/LegalPage';
import { site } from '@/content/site';
import { allPhotoCredits } from '@/lib/photos';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Accessibility statement', description: `How ${site.name} makes this website easy to use for everyone, and how to tell us about a problem.`, path: '/legal/accessibility' });

const sourceName = { unsplash: 'Unsplash', pexels: 'Pexels' } as const;

export default function AccessibilityPage() {
  const credits = allPhotoCredits();
  return (
    <LegalPage
      title="Accessibility statement"
      lead="We want everyone to be able to read and use this website comfortably, including people who use screen readers, magnifiers or a keyboard."
      updated="November 15, 2026"
      sections={[
        {
          heading: 'Our goal',
          body: <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA and test the site with automated tools and by hand.</p>,
        },
        {
          heading: 'What we have done',
          body: (
            <ul>
              <li>Text is 18 pixels or larger, with strong contrast and no light gray body text.</li>
              <li>Buttons and links are at least 44 pixels tall and work with a keyboard, with a clear focus outline.</li>
              <li>Animations are gentle and turn off when your device asks for reduced motion. Nothing plays automatically.</li>
              <li>Forms ask only for what we need, label every field and explain errors in words.</li>
              <li>Our guides come as large-print PDFs that you can download or print.</li>
            </ul>
          ),
        },
        {
          heading: 'Known limits',
          body: <p>Our appointment calendar and chat window are provided by other companies. If either is hard to use, call us instead and we will book or answer for you.</p>,
        },
        {
          heading: 'Tell us about a problem',
          body: (
            <p>
              If something on the site is hard to use, call <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> ({site.tty.display}) or email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>. We aim to reply within two business days and will give you the information another way in the
              meantime.
            </p>
          ),
        },
        {
          heading: 'Photo credits',
          body: credits.length ? (
            <ul>
              {credits.map((c) => (
                <li key={c.id}>
                  “{c.alt}” by <a href={c.photographerUrl}>{c.photographer}</a> on <a href={c.sourceUrl}>{sourceName[c.source]}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No photos are used yet.</p>
          ),
        },
      ]}
    />
  );
}
