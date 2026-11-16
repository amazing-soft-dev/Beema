import { notices } from '@/content/site';

/** Scope of Appointment note shown above the Book a Call calendar. */
export function ScopeOfAppointmentNotice({ className = '' }: { className?: string }) {
  return (
    <aside aria-labelledby="soa-heading" className={`rounded-card-sm bg-sand p-5 text-base ${className}`.trim()}>
      <h2 id="soa-heading" className="t-label font-semibold">
        Scope of Appointment
      </h2>
      <p className="mt-2">{notices.scopeOfAppointment}</p>
    </aside>
  );
}
