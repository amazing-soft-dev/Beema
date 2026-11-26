'use client';

import { ArrowLeft, ArrowRight, CheckCircle, Plus, Trash, WarningCircle } from '@phosphor-icons/react';
import { useState, useSyncExternalStore } from 'react';
import { CallRecordingNotice } from '@/components/compliance/CallRecordingNotice';
import { ConsentCheckbox } from '@/components/compliance/ConsentCheckbox';
import { BEST_TIME_OPTIONS, Honeypot, SelectField, TextField } from '@/components/forms/Fields';
import { formsDisabled } from '@/components/forms/useFormSubmit';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';
import { track } from '@/lib/analytics';

export const PLAN_FINDER_URL = 'https://www.medicare.gov/plan-compare/';

type Drug = { name: string; dose: string; frequency: string };
type Doctor = { name: string; specialty: string; city: string };
const STEPS = ['Your ZIP code', 'Your medicines', 'Your doctors', 'How to reach you'] as const;
const noSubscribe = () => () => {};
const emptyDrug: Drug = { name: '', dose: '', frequency: '' };
const emptyDoctor: Doctor = { name: '', specialty: '', city: '' };

/**
 * Four-step plan comparison intake. Nothing is priced here: the advisor uses the details to
 * compare plans, and the visitor can always go to the official Medicare.gov Plan Finder.
 */
export function PlanIntake() {
  const query = useSyncExternalStore(noSubscribe, () => window.location.search, () => '');
  const zipFromHome = new URLSearchParams(query).get('zip') ?? '';
  const [step, setStep] = useState(0);
  const [zip, setZip] = useState<string | null>(null);
  const [drugs, setDrugs] = useState<Drug[]>([{ ...emptyDrug }]);
  const [doctors, setDoctors] = useState<Doctor[]>([{ ...emptyDoctor }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const zipValue = zip ?? zipFromHome;

  const next = () => {
    if (step === 0 && !/^\d{5}$/.test(zipValue)) {
      setErrors({ zip: 'Please enter a 5-digit ZIP code.' });
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const contact = Object.fromEntries(new FormData(e.currentTarget));
    const payload = {
      ...contact,
      page: window.location.pathname,
      zip: zipValue,
      drugs: drugs.filter((d) => d.name.trim()),
      doctors: doctors.filter((d) => d.name.trim()),
    };
    setStatus('sending');
    try {
      const res = await fetch('/api/plan-intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (body.ok) {
        setStatus('sent');
        track('form_submit', { form: 'plan-intake' });
        track('tool_result', { tool: 'plan-comparison' });
        return;
      }
      setErrors(body.errors ?? { form: 'Please check the form.' });
    } catch {
      setErrors({ form: 'We could not send your details. Please call us instead.' });
    }
    setStatus('idle');
  }

  const listed = (
    <dl className="grid gap-2 text-base sm:grid-cols-[auto_1fr]">
      <dt className="font-semibold">ZIP code</dt>
      <dd>{zipValue}</dd>
      <dt className="font-semibold">Medicines</dt>
      <dd>{drugs.filter((d) => d.name).map((d) => [d.name, d.dose, d.frequency].filter(Boolean).join(', ')).join('; ') || 'None listed'}</dd>
      <dt className="font-semibold">Doctors</dt>
      <dd>{doctors.filter((d) => d.name).map((d) => [d.name, d.specialty, d.city].filter(Boolean).join(', ')).join('; ') || 'None listed'}</dd>
    </dl>
  );

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-5 rounded-card bg-surface p-6 md:p-10">
        <Icon icon={CheckCircle} weight="fill" size={44} className="text-navy-700" />
        <h2 className="t-h3">Thank you. An advisor will compare plans for you.</h2>
        <p>We will call at the time you chose, usually within one business day. Here is what you sent:</p>
        {listed}
        <PlanFinderNote />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ol className="grid grid-cols-4 gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? 'step' : undefined} className={`rounded-card-sm px-3 py-2 text-base font-semibold ${i === step ? 'bg-ink text-white' : i < step ? 'bg-gold text-on-gold' : 'bg-surface'}`}>
            <span className="block">Step {i + 1}</span>
            <span className="hidden font-normal md:block">{label}</span>
          </li>
        ))}
      </ol>

      <section aria-labelledby="intake-step" className="flex flex-col gap-6 rounded-card bg-surface p-6 md:p-10">
        <h2 id="intake-step" className="t-h3" tabIndex={-1}>
          Step {step + 1} of 4: {STEPS[step]}
        </h2>

        {step === 0 && (
          <TextField id="intake-zip" label="ZIP code where you live" hint="Plans and prices depend on where you live." inputMode="numeric" maxLength={5} autoComplete="postal-code" value={zipValue} onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))} error={errors.zip} className="max-w-[260px]" />
        )}

        {step === 1 && (
          <RepeatList
            items={drugs}
            setItems={setDrugs}
            empty={emptyDrug}
            addLabel="Add another medicine"
            fields={[
              ['name', 'Medicine name', 'For example, metformin'],
              ['dose', 'Strength', 'For example, 500 mg'],
              ['frequency', 'How often', 'For example, twice a day'],
            ]}
            idPrefix="drug"
            hint="List the prescriptions you take regularly. You can skip this step."
          />
        )}

        {step === 2 && (
          <RepeatList
            items={doctors}
            setItems={setDoctors}
            empty={emptyDoctor}
            addLabel="Add another doctor"
            fields={[
              ['name', 'Doctor or clinic name', ''],
              ['specialty', 'Specialty', 'For example, family doctor'],
              ['city', 'City', ''],
            ]}
            idPrefix="doctor"
            hint="If keeping your doctors matters to you, list them here. You can skip this step."
          />
        )}

        {step === 3 &&
          (formsDisabled ? (
            <div className="flex flex-col gap-4">
              {listed}
              <p>
                This version of the site cannot send forms. Call <a href={`tel:${site.phone.tel}`} className="font-semibold text-navy-700 underline">{site.phone.display}</a> and an advisor will
                compare plans with you.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative flex flex-col gap-5">
              {listed}
              <TextField id="name" label="Your name" autoComplete="name" required error={errors.name} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="phone" label="Phone number" type="tel" autoComplete="tel" required error={errors.phone} />
                <SelectField id="bestTime" label="Best time to call" options={BEST_TIME_OPTIONS} defaultValue="" required error={errors.bestTime} />
              </div>
              <ConsentCheckbox id="intake-consent" error={errors.consent} />
              <CallRecordingNotice />
              <Honeypot />
              {errors.form && (
                <p role="alert" className="flex gap-2 font-medium text-error">
                  <Icon icon={WarningCircle} weight="fill" className="mt-1 shrink-0" />
                  {errors.form}
                </p>
              )}
              <Button type="submit" size="lg" disabled={status === 'sending'} className="self-start">
                {status === 'sending' ? 'Sending…' : 'Send to an advisor'}
              </Button>
            </form>
          ))}

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)} icon={<Icon icon={ArrowLeft} />}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button variant="secondary" onClick={next} icon={<Icon icon={ArrowRight} />}>
              {step === 0 ? 'Next' : 'Next step'}
            </Button>
          )}
        </div>
      </section>

      <PlanFinderNote />
    </div>
  );
}

function PlanFinderNote() {
  return (
    <p className="rounded-card-sm bg-sand p-5">
      Prefer to compare on your own? Use the official{' '}
      <a href={PLAN_FINDER_URL} className="font-semibold text-navy-700 underline underline-offset-4">
        Medicare.gov Plan Finder
      </a>
      , which lists every plan in your area. Have your medicine list ready.
    </p>
  );
}

function RepeatList<T extends Record<string, string>>({
  items,
  setItems,
  empty,
  fields,
  addLabel,
  idPrefix,
  hint,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  empty: T;
  fields: [keyof T & string, string, string][];
  addLabel: string;
  idPrefix: string;
  hint: string;
}) {
  const update = (i: number, key: keyof T, value: string) => setItems(items.map((it, j) => (j === i ? { ...it, [key]: value } : it)));
  return (
    <div className="flex flex-col gap-5">
      <p>{hint}</p>
      {items.map((item, i) => (
        <fieldset key={i} className="grid gap-4 rounded-card-sm bg-white p-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
          <legend className="sr-only">
            {idPrefix === 'drug' ? 'Medicine' : 'Doctor'} {i + 1}
          </legend>
          {fields.map(([key, label, placeholder]) => (
            <TextField key={key} id={`${idPrefix}-${i}-${key}`} label={label} placeholder={placeholder || undefined} value={item[key]} onChange={(e) => update(i, key, e.target.value)} />
          ))}
          {items.length > 1 && (
            <Button variant="outline" onClick={() => setItems(items.filter((_, j) => j !== i))} icon={<Icon icon={Trash} />} aria-label={`Remove ${idPrefix === 'drug' ? 'medicine' : 'doctor'} ${i + 1}`}>
              Remove
            </Button>
          )}
        </fieldset>
      ))}
      {items.length < 15 && (
        <Button variant="outline" onClick={() => setItems([...items, { ...empty }])} icon={<Icon icon={Plus} />} className="self-start">
          {addLabel}
        </Button>
      )}
    </div>
  );
}

