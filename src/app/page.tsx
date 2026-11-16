import { CalendarCheck, Phone } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Container, Section } from '@/components/ui/Layout';
import { site } from '@/content/site';

// Placeholder home page: shows the shared primitives until the real home page lands (#16).
export default function HomePage() {
  return (
    <main>
      <Section>
        <Container>
          <Eyebrow>Turning 65</Eyebrow>
          <TextAppear as="h1" onMount className="t-h1 mt-3 max-w-[18ch]">
            Medicare made simple for people turning 65
          </TextAppear>
          <p className="t-lead mt-6 max-w-[42ch] text-muted">The site is being built. Pages arrive through the issues on this repository.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/book-a-call" size="lg" icon={<Icon icon={CalendarCheck} />}>
              Book a call
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone.tel}`} variant="outline" size="lg" icon={<Icon icon={Phone} />}>
              {site.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section tone="sand">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card>
              <Eyebrow variant="pill">Path one</Eyebrow>
              <h2 className="t-h3 mt-4">Original Medicare plus Medigap</h2>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card tone="surface">
              <Eyebrow variant="pill">Path two</Eyebrow>
              <h2 className="t-h3 mt-4">Medicare Advantage</h2>
            </Card>
          </Reveal>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <Eyebrow tone="dark">Talk to us</Eyebrow>
          <h2 className="t-h2 mt-3">Questions? A licensed advisor can help.</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/about" variant="light">
              About us
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
