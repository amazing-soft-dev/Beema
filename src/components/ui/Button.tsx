import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Pill buttons from the Beema design, sized for older readers: at least 48px tall
 * (56px for `lg`), 18px labels, and a 3px focus ring from globals.css.
 *
 * primary   gold with ink text, the main call to action
 * secondary navy-700 with white text
 * outline   ink border on light backgrounds
 * light     white outline for dark sections and photos
 *
 * Hover timing from the Framer site (audit/motion/button-hover.md): the gold button eases
 * out over .3s, the others fill over .4s ease-in-out. Keyboard focus gets the same look.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'light';
export type ButtonSize = 'md' | 'lg';

const base =
  // Labels may wrap on narrow screens rather than overflow; py keeps wrapped labels inside the pill.
  'inline-flex max-w-full items-center justify-center gap-2.5 rounded-pill border-2 py-2 text-center font-medium leading-snug transition-[background-color,border-color,color] disabled:cursor-not-allowed disabled:opacity-60 [&>svg]:shrink-0';

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-gold bg-gold text-on-gold duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:border-gold-hover hover:bg-gold-hover focus-visible:border-gold-hover focus-visible:bg-gold-hover',
  // On dark sections (.on-dark) secondary turns gold so it stands apart from the band.
  secondary:
    'border-navy-700 bg-navy-700 text-white duration-400 ease-[cubic-bezier(.65,0,.35,1)] hover:border-navy-800 hover:bg-navy-800 focus-visible:border-navy-800 focus-visible:bg-navy-800 in-[.on-dark]:border-gold in-[.on-dark]:bg-gold in-[.on-dark]:text-on-gold in-[.on-dark]:hover:border-gold-hover in-[.on-dark]:hover:bg-gold-hover in-[.on-dark]:focus-visible:border-gold-hover in-[.on-dark]:focus-visible:bg-gold-hover',
  // On dark sections (.on-dark) outline turns white, like `light`.
  outline:
    'border-ink bg-transparent text-ink duration-400 ease-[cubic-bezier(.65,0,.35,1)] hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white in-[.on-dark]:border-white in-[.on-dark]:text-white in-[.on-dark]:hover:bg-white in-[.on-dark]:hover:text-ink in-[.on-dark]:focus-visible:bg-white in-[.on-dark]:focus-visible:text-ink',
  light: 'border-white bg-transparent text-white duration-400 ease-[cubic-bezier(.65,0,.35,1)] hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-lg',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; icon?: ReactNode; className?: string; children: ReactNode };

/** Link styled as a button. `tel:`, `mailto:` and external URLs render a plain anchor. */
export function ButtonLink({ href, variant, size, icon, className, children, ...rest }: Common & { href: string } & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    const external = href.startsWith('http');
    return (
      <a href={href} className={classes} data-variant={variant ?? 'primary'} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-variant={variant ?? 'primary'} {...rest}>
      {content}
    </Link>
  );
}

/** Native button with the same look. Defaults to type="button" so it never submits by accident. */
export function Button({ variant, size, icon, className, children, type = 'button', ...rest }: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} data-variant={variant ?? 'primary'} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
