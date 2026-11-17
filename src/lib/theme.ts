/**
 * Color theme preference: "system" follows prefers-color-scheme, "light" and "dark" set
 * <html data-theme>. Stored per browser; globals.css does the rest.
 */
export type ThemeChoice = 'system' | 'light' | 'dark';

export const THEME_KEY = 'theme';
export const THEME_EVENT = 'themechange';

/**
 * Runs in <head> before first paint, so a saved choice never flashes the other theme.
 * Kept tiny and dependency-free; storage can throw (private mode, blocked cookies).
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function readChoice(): ThemeChoice {
  if (typeof document === 'undefined') return 'system';
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'system';
}

/** True when the page currently renders dark (explicit choice or system setting). */
export function isDark(): boolean {
  const choice = readChoice();
  if (choice !== 'system') return choice === 'dark';
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === 'system') delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === 'system') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Subscribe to theme changes from any switch on the page or the system setting. */
export function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onChange);
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    media.removeEventListener('change', onChange);
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}
