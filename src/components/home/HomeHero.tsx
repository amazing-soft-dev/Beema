import { FilePdf, Phone, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Photo } from '@/components/ui/Photo';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { ZipForm } from './ZipForm';

/** Home hero: who the site is for, the ZIP box, the phone number and the checklist. */
export function HomeHero() {
  const h = home.hero;
  return (
    <section className="bg-sand">
      <div className="container-x grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <TextAppear as="h1" onMount className="t-h1 max-w-[20ch]">
            {h.title}
          </TextAppear>
          <p className="t-lead max-w-[46ch]">{h.lead}</p>

          <Reveal className="rounded-card bg-white p-6 md:p-8" delay={0.1}>
            <ZipForm label={h.zipLabel} hint={h.zipHint} button={h.zipButton} />
          </Reveal>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div>
              <p className="text-base font-medium">{h.callPrompt}</p>
              <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-12 items-center gap-2 text-2xl font-semibold underline-offset-4 hover:underline">
                <Icon icon={Phone} weight="fill" />
                {site.phone.display}
              </a>
              <p className="text-base">{site.tty.display}</p>
            </div>
            <ButtonLink href={h.checklist.href} variant="outline" icon={<Icon icon={FilePdf} />} className="sm:ml-auto">
              {h.checklist.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <Photo id="home-hero-couple" priority sizes="(min-width: 1200px) 600px, 100vw" className="aspect-[4/3] w-full lg:aspect-[5/6]" />
          <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 font-semibold shadow-none md:bottom-6 md:left-6">
            <Icon icon={ShieldCheck} weight="fill" className="text-green-700" />
            {h.badge}
          </p>
        </div>
      </div>
    </section>
  );
}
