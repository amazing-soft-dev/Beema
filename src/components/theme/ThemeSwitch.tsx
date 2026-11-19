'use client';

import { Desktop, Moon, Sun } from '@phosphor-icons/react';
import { useSyncExternalStore } from 'react';
import { Icon } from '@/components/ui/Icon';
import { type ThemeChoice, applyChoice, isDark, readChoice, subscribeTheme } from '@/lib/theme';

const useDark = () => useSyncExternalStore(subscribeTheme, isDark, () => false);
const useChoice = () => useSyncExternalStore(subscribeTheme, readChoice, () => 'system' as ThemeChoice);

/**
 * Header switch: one 48px button, "Dark mode" on or off. Turning it on or off saves an
 * explicit choice; the footer's ThemeChoices offers "Use my device setting" again.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const dark = useDark();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={() => applyChoice(dark ? 'light' : 'dark')}
      className={`inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-pill border-2 border-current px-3 font-semibold ${className}`}
    >
      <Icon icon={dark ? Moon : Sun} weight="fill" />
      <span className="sr-only">Dark mode</span>
    </button>
  );
}

const options: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: 'system', label: 'Device setting', icon: Desktop },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
];

/**
 * Three labelled radio buttons: device setting, light or dark. `inline` puts the legend
 * beside the choices on one row (the footer's bottom bar); a floated legend still names
 * the group for screen readers.
 */
export function ThemeChoices({ className = '', inline = false }: { className?: string; inline?: boolean }) {
  const choice = useChoice();
  return (
    <fieldset className={className}>
      <legend className={`t-label font-semibold ${inline ? 'float-left me-4 leading-12' : 'mb-3'}`}>Color theme</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-pill border-2 border-current px-4 font-medium has-[:checked]:bg-gold has-[:checked]:text-on-gold has-[:checked]:border-gold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-current"
          >
            <input
              type="radio"
              name="theme-choice"
              value={o.value}
              checked={choice === o.value}
              onChange={() => applyChoice(o.value)}
              className="sr-only"
            />
            <Icon icon={o.icon} weight="fill" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
