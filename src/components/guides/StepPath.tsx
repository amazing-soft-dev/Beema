import { Lightbulb } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/ui/Icon';
import type { Step } from '@/content/guides/turning-65';

/** Numbered step list with optional tips, as an ordered list for screen readers. */
export function StepPath({ id, label, steps, tone = 'surface' }: { id: string; label: string; steps: readonly Step[]; tone?: 'surface' | 'sand' }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-40 rounded-card p-6 md:p-10 ${tone === 'surface' ? 'bg-surface' : 'bg-sand'}`}>
      <h3 id={`${id}-heading`} className="t-h3">
        {label}
      </h3>
      <ol className="mt-6 flex flex-col gap-6">
        {steps.map((s, i) => (
          <Reveal key={s.title} as="li" delay={Math.min(i, 3) * 0.05} className="grid grid-cols-[48px_1fr] gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-ink text-xl font-semibold text-white" aria-hidden="true">
              {i + 1}
            </span>
            <div className="flex flex-col gap-2">
              <h4 className="t-h4">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h4>
              <p>{s.text}</p>
              {s.tip && (
                <p className="flex gap-2 rounded-card-sm bg-white p-4 text-base">
                  <Icon icon={Lightbulb} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
                  {s.tip}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
