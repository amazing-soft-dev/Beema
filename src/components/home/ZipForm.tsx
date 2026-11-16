import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { Icon } from '@/components/ui/Icon';
import { buttonClasses } from '@/components/ui/Button';

/**
 * ZIP code box. A plain GET form to the plan comparison tool, so it works without
 * JavaScript; the browser checks the 5-digit pattern before submitting.
 */
export function ZipForm({ label, hint, button }: { label: string; hint: string; button: string }) {
  return (
    <form action="/tools/plan-comparison" method="get" className="flex flex-col gap-2">
      <label htmlFor="hero-zip" className="t-label font-semibold">
        {label}
      </label>
      <p id="hero-zip-hint" className="text-base text-muted">
        {hint}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="hero-zip"
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          pattern="[0-9]{5}"
          maxLength={5}
          required
          aria-describedby="hero-zip-hint"
          title="Please enter a 5-digit ZIP code"
          className="min-h-14 w-full rounded-pill border-2 border-field bg-white px-6 text-xl tracking-widest placeholder:text-muted sm:max-w-[220px]"
          placeholder="ZIP code"
        />
        <button type="submit" className={buttonClasses('primary', 'lg')}>
          <Icon icon={MagnifyingGlass} weight="bold" />
          <span>{button}</span>
        </button>
      </div>
    </form>
  );
}
