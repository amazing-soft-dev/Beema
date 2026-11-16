'use client';

import { useState } from 'react';
import type { AnalyticsEvent } from '@/lib/analytics';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FormName = Extract<AnalyticsEvent, { name: 'form_submit' }>['props']['form'];

/**
 * Posts a form to one of our API routes as JSON and maps server errors back to fields.
 * The server is the source of truth for validation; the browser only reflects its answer.
 */
export function useFormSubmit(endpoint: string, form: FormName) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl));
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (body.ok) {
        setStatus('sent');
        track('form_submit', { form });
        formEl.reset();
        return;
      }
      setErrors(body.errors ?? { form: 'Please check the form and try again.' });
      setStatus('error');
      // Move focus to the first field with an error so screen-reader users hear it.
      const first = Object.keys(body.errors ?? {})[0];
      if (first) (formEl.elements.namedItem(first) as HTMLElement | null)?.focus();
    } catch {
      setErrors({ form: 'We could not send your form. Please check your connection or call us.' });
      setStatus('error');
    }
  }

  return { status, errors, submit };
}

/** True in the static export, which has no server to receive forms. */
export const formsDisabled = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
