import { notices } from '@/content/site';

/** Field name and the exact wording, so API routes can record what the visitor agreed to. */
export const CONSENT_FIELD = 'consent';
export const CONSENT_TEXT = notices.phoneConsent;

/**
 * Phone-contact consent checkbox. Required on every form that asks for a phone number.
 * Always unchecked by default (never pass defaultChecked), names the business, and has a
 * 24px box with the whole label as the click target.
 */
export function ConsentCheckbox({
  id = 'consent',
  error,
  className = '',
}: {
  id?: string;
  /** Error message shown under the box and announced to screen readers. */
  error?: string;
  className?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-base">
        <input
          id={id}
          name={CONSENT_FIELD}
          type="checkbox"
          value="yes"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-6 shrink-0 cursor-pointer accent-green-700"
        />
        <span>{CONSENT_TEXT}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-2 font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
