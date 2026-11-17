'use client';

import { CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';
import { Honeypot, TextField } from '@/components/forms/Fields';
import { formsDisabled, useFormSubmit } from '@/components/forms/useFormSubmit';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

/** Optional "Email me a copy": name and email only. Downloading never requires it. */
export function EmailCopyForm({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const { status, errors, submit } = useFormSubmit('/api/guide-email', 'guide-email');
  if (formsDisabled) return null;
  if (status === 'sent') {
    return (
      <p role="status" className="flex items-center gap-2 font-semibold">
        <Icon icon={CheckCircle} weight="fill" className="text-navy-700" /> Sent. Check your inbox.
      </p>
    );
  }
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} aria-expanded={false} className="inline-flex min-h-12 items-center gap-2 self-start font-semibold text-navy-700 underline underline-offset-4">
        <Icon icon={EnvelopeSimple} /> Email me a copy
      </button>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-3" aria-label={`Email me ${title}`}>
      <input type="hidden" name="guide" value={slug} />
      <TextField id={`${slug}-name`} name="name" label="Your name" autoComplete="name" required error={errors.name} />
      <TextField id={`${slug}-email`} name="email" label="Email address" type="email" autoComplete="email" required error={errors.email} />
      <Honeypot />
      {errors.form && <p className="font-medium text-error">{errors.form}</p>}
      <Button type="submit" variant="secondary" disabled={status === 'sending'} className="self-start">
        {status === 'sending' ? 'Sending…' : 'Send it to me'}
      </Button>
      <p className="text-base">
        One email with the link. We will not add you to a mailing list.{' '}
        <Link href="/legal/privacy" className="underline underline-offset-4">
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
