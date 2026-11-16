import { CalendarCheck, FilePdf, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';
import { TextAppear } from '@/components/motion/TextAppear';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { turning65 } from '@/content/guides/turning-65';

/**
 * The Initial Enrollment Period as a 7-step timeline (an ordered list, so it reads in order
 * and never relies on color alone), plus the Medigap Open Enrollment explanation.
 */
export function EnrollmentWindows() {
  const w = turning65.windows;
  return (
    <section className="section-y bg-surface" aria-labelledby="windows-heading">
      <div className="container-x flex flex-col gap-10">
        <TextAppear id="windows-heading" className="t-h2">
          {w.title}
        </TextAppear>

        <div id={w.iep.id} className="scroll-mt-40 flex flex-col gap-6 rounded-card bg-white p-6 md:p-10">
          <h3 className="t-h3">{w.iep.title}</h3>
          <p className="max-w-[70ch]">{w.iep.text}</p>
          <ol className="grid gap-2 md:grid-cols-7">
            {w.iep.months.map((m, i) => {
              const birthday = i === 3;
              const early = i < 3;
              return (
                <li
                  key={m.label}
                  className={`flex flex-col gap-1 rounded-card-sm p-4 md:min-h-40 ${birthday ? 'bg-lime text-ink' : early ? 'bg-ink text-white' : 'bg-sand'}`}
                >
                  <span className="text-base font-semibold">Month {i + 1}</span>
                  <span className="font-semibold">{m.label}</span>
                  <span className="text-base">{m.note}</span>
                </li>
              );
            })}
          </ol>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/tools/enrollment-calculator" icon={<Icon icon={CalendarCheck} />}>
              Find my exact dates
            </ButtonLink>
            <ButtonLink href={w.checklist.href} variant="outline" icon={<Icon icon={FilePdf} />}>
              {w.checklist.label}
            </ButtonLink>
          </div>
        </div>

        <Reveal id={w.medigap.id} className="scroll-mt-40 grid gap-6 rounded-card bg-sand p-6 md:grid-cols-[auto_1fr] md:p-10">
          <Icon icon={ShieldCheck} weight="fill" size={48} className="text-green-700" />
          <div className="flex flex-col gap-3">
            <h3 className="t-h3">{w.medigap.title}</h3>
            <p>{w.medigap.text}</p>
            <p>{w.medigap.after}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
