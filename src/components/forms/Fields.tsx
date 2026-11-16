import type { ComponentProps, ReactNode } from 'react';

/**
 * Accessible form fields: a visible label, an optional hint and an error message, all
 * linked with aria-describedby. 56px tall controls with 18px text and a 2px border.
 */
const control = 'min-h-14 w-full rounded-card-sm border-2 bg-white px-4 text-lg aria-invalid:border-error';

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
}

function Meta({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="text-base">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="font-medium text-error">
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({ id, label, hint, error, className = '', ...input }: { id: string; label: string; hint?: ReactNode; error?: string } & Omit<ComponentProps<'input'>, 'id'>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <label htmlFor={id} className="t-label font-semibold">
        {label}
        {input.required && <span className="sr-only"> (required)</span>}
      </label>
      <input id={id} name={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} className={`${control} border-field`} {...input} />
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  options,
  className = '',
  ...select
}: { id: string; label: string; hint?: ReactNode; error?: string; options: readonly { value: string; label: string }[] } & Omit<ComponentProps<'select'>, 'id'>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <label htmlFor={id} className="t-label font-semibold">
        {label}
      </label>
      <select id={id} name={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} className={`${control} border-field`} {...select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Meta id={id} hint={hint} error={error} />
    </div>
  );
}

/** Off-screen field that people never see; bots that fill it are ignored by the API. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export const BEST_TIME_OPTIONS = [
  { value: '', label: 'Choose a time' },
  { value: 'morning', label: 'Morning (8 a.m. to noon)' },
  { value: 'afternoon', label: 'Afternoon (noon to 4 p.m.)' },
  { value: 'evening', label: 'Evening (4 to 6 p.m.)' },
  { value: 'anytime', label: 'Any time' },
] as const;
