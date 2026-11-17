'use client';

import { CheckCircle, PaperPlaneTilt, WarningCircle } from '@phosphor-icons/react';
import { ConsentCheckbox } from '@/components/compliance/ConsentCheckbox';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { CallUsFallback } from './CallUsFallback';
import { BEST_TIME_OPTIONS, Honeypot, SelectField, TextField } from './Fields';
import { formsDisabled, useFormSubmit } from './useFormSubmit';

/**
 * The short lead form from the content plan: name, ZIP code, phone, best time to call and
 * the required (unchecked) consent box. Used by the Contact page and the callback panel.
 */
export function LeadForm({
  endpoint,
  form,
  idPrefix,
  submitLabel = 'Request a call',
  title,
}: {
  endpoint: '/api/contact' | '/api/callback';
  form: 'contact' | 'callback';
  idPrefix: string;
  submitLabel?: string;
  title?: string;
}) {
  const { status, errors, submit } = useFormSubmit(endpoint, form);
  if (formsDisabled) return <CallUsFallback />;

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-card bg-surface p-6 md:p-8">
        <Icon icon={CheckCircle} weight="fill" size={40} className="text-navy-700" />
        <h2 className="t-h3">Thank you. We got your request.</h2>
        <p>A licensed advisor will call you at the time you chose, usually within one business day.</p>
      </div>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;
  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-5 rounded-card bg-surface p-6 md:p-8" aria-labelledby={title ? id('title') : undefined}>
      {title && (
        <h2 id={id('title')} className="t-h3">
          {title}
        </h2>
      )}
      <p className="text-base">All fields are required. We only use your details to call you back.</p>
      {/* Field names match the API schema; ids are prefixed so two forms can share a page. */}
      <TextField id={id('name')} name="name" label="Your name" autoComplete="name" required error={errors.name} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id={id('zip')} name="zip" label="ZIP code" inputMode="numeric" autoComplete="postal-code" maxLength={5} required error={errors.zip} />
        <TextField id={id('phone')} name="phone" label="Phone number" type="tel" autoComplete="tel" required error={errors.phone} />
      </div>
      <SelectField id={id('bestTime')} name="bestTime" label="Best time to call" options={BEST_TIME_OPTIONS} required defaultValue="" error={errors.bestTime} />
      <ConsentCheckbox id={id('consent')} error={errors.consent} />
      <Honeypot />
      {errors.form && (
        <p role="alert" className="flex gap-2 font-medium text-error">
          <Icon icon={WarningCircle} weight="fill" className="mt-1 shrink-0" />
          {errors.form}
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === 'sending'} icon={<Icon icon={PaperPlaneTilt} />} className="self-start">
        {status === 'sending' ? 'Sending…' : submitLabel}
      </Button>
    </form>
  );
}
