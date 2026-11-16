'use client';

import { CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Honeypot, TextField } from './Fields';
import { formsDisabled, useFormSubmit } from './useFormSubmit';

/** Newsletter signup: email (and optional first name), with the unsubscribe and privacy notice. */
export function NewsletterForm() {
  const { status, errors, submit } = useFormSubmit('/api/newsletter', 'newsletter');
  if (formsDisabled) return <p>Call us to join our mailing list for yearly Medicare updates.</p>;
  if (status === 'sent') {
    return (
      <p role="status" className="flex items-center gap-2 font-semibold">
        <Icon icon={CheckCircle} weight="fill" className="text-green-700" />
        You are signed up. Check your email for a confirmation.
      </p>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
        <TextField id="newsletter-name" name="name" label="First name (optional)" autoComplete="given-name" />
        <TextField id="newsletter-email" name="email" label="Email address" type="email" autoComplete="email" required error={errors.email} />
      </div>
      <Honeypot />
      {errors.form && <p className="font-medium text-error">{errors.form}</p>}
      <Button type="submit" variant="secondary" disabled={status === 'sending'} icon={<Icon icon={EnvelopeSimple} />} className="self-start">
        {status === 'sending' ? 'Signing up…' : 'Sign me up'}
      </Button>
      <p className="text-base">
        A few emails a year, mostly before Annual Enrollment. Unsubscribe any time. See our{' '}
        <Link href="/legal/privacy" className="underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
