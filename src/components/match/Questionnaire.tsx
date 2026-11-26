'use client';

import { ArrowLeft, ArrowRight, Phone } from '@phosphor-icons/react';
import { MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { bookCall, site } from '@/content/site';
import { type Answers, isBirthMonth, isZip } from '@/lib/match/engine';
import { fadeOffset, revealSpring } from '@/lib/motion';

type Choice = { value: string; label: string; hint?: string };
type StepId = 'zip' | 'birth' | 'work' | 'consent' | 'doctors' | 'drugs' | 'budget' | 'travel';

const choices: Partial<Record<StepId, { question: string; help?: string; options: Choice[] }>> = {
  work: {
    question: 'What other health coverage will you have when Medicare starts?',
    help: 'Yours or your spouse’s. Choose the one that fits best.',
    options: [
      { value: 'none', label: 'None: no job or other coverage' },
      { value: 'employer-large', label: 'From a current job at a company with 20 or more employees' },
      { value: 'employer-small', label: 'From a current job at a company with fewer than 20 employees' },
      { value: 'retiree', label: 'Retiree coverage from a former employer' },
      { value: 'cobra', label: 'COBRA' },
      { value: 'marketplace', label: 'A Marketplace plan (HealthCare.gov or Covered California)' },
      { value: 'medicaid', label: 'Medicaid (Medi-Cal in California) or state help with Medicare costs' },
      { value: 'va', label: 'VA health care' },
      { value: 'tricare', label: 'TRICARE (military health coverage)' },
      { value: 'disability-esrd', label: 'I am under 65 and have Medicare because of a disability or kidney failure (ESRD)' },
    ],
  },
  doctors: {
    question: 'How important is keeping your current doctors?',
    options: [
      { value: 'keep-specific', label: 'I want to keep specific doctors or hospitals' },
      { value: 'flexible', label: 'I am open to new doctors if needed' },
    ],
  },
  drugs: {
    question: 'How many prescriptions do you take regularly?',
    options: [
      { value: 'none', label: 'None' },
      { value: 'few', label: 'One to three' },
      { value: 'several', label: 'Four or more, or a brand-name drug' },
    ],
  },
  budget: {
    question: 'Which matters more to you?',
    options: [
      { value: 'low-premium', label: 'A low monthly premium', hint: 'I can handle copays when I use care.' },
      { value: 'predictable', label: 'Predictable costs', hint: 'I would rather pay more each month and get few bills.' },
      { value: 'unsure', label: 'I am not sure yet' },
    ],
  },
  travel: {
    question: 'How often do you travel or spend time away from home?',
    options: [
      { value: 'often', label: 'Often, or I live in two places' },
      { value: 'sometimes', label: 'A few trips a year' },
      { value: 'rarely', label: 'Rarely' },
    ],
  },
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * AI Plan Match questionnaire (plan §9): one question per screen, a progress bar, a Back
 * button, no time limits, and "talk to a person instead" on every step. The doctor and
 * drug questions are optional and only asked after a separate, unchecked health-data
 * consent. Each new question fades up 50px (Framer appear) and gets focus.
 */
export function Questionnaire({ onComplete }: { onComplete: (answers: Answers) => void }) {
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [consent, setConsent] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  // The first question appears with the page; later ones fade up.
  const [touched, setTouched] = useState(false);

  const steps: StepId[] = ['zip', 'birth', 'work', 'consent', ...(consent ? (['doctors', 'drugs'] as StepId[]) : []), 'budget', 'travel'];
  const step = steps[index]!;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const next = (patch: Partial<Answers> = {}) => {
    setTouched(true);
    const merged = { ...answers, ...patch };
    setAnswers(merged);
    setError('');
    if (index < steps.length - 1) setIndex(index + 1);
    else onComplete({ doctors: 'skip', drugs: 'skip', ...merged } as Answers);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (step === 'zip') {
      const zip = String(data.get('zip') ?? '').trim();
      return isZip(zip) ? next({ zip }) : setError('Enter your 5-digit ZIP code, for example 78701.');
    }
    if (step === 'birth') {
      const month = String(data.get('month') ?? '');
      const year = String(data.get('year') ?? '').trim();
      const value = `${year}-${month}`;
      return isBirthMonth(value) ? next({ birthMonth: value }) : setError('Choose your birth month and enter the 4-digit year, for example 1961.');
    }
    if (step === 'consent') {
      setConsent(data.get('health') === 'yes');
      return next(data.get('health') === 'yes' ? {} : { doctors: 'skip', drugs: 'skip' });
    }
    const value = data.get('choice');
    if (!value) return setError('Choose one answer to continue.');
    next({ [step]: String(value) } as Partial<Answers>);
  };

  const errorId = 'match-error';
  const describedBy = error ? errorId : undefined;
  const c = choices[step];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold" id="match-progress-label">
            Question {index + 1} of {steps.length}
          </p>
          <progress className="match-progress h-3 w-full" max={steps.length} value={index + 1} aria-labelledby="match-progress-label" />
        </div>

        {/* Keyed by step: each question mounts fresh and fades up. No exit animation, so a
            stalled animation frame (background tab) can never block the next question. */}
        <motion.form
            key={step}
            onSubmit={submit}
            noValidate
            initial={index === 0 && !touched ? false : { opacity: 0, y: fadeOffset.md }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealSpring}
            className="flex flex-col gap-6"
          >
            {c ? (
              <fieldset className="flex flex-col gap-3" aria-describedby={describedBy}>
                <legend className="mb-2">
                  <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                    {c.question}
                  </h2>
                  {c.help && <p className="mt-2">{c.help}</p>}
                </legend>
                {c.options.map((o) => (
                  <label
                    key={o.value}
                    className="flex min-h-14 cursor-pointer items-start gap-3 rounded-card-sm border-2 border-field bg-white p-4 has-[:checked]:border-navy-700 has-[:checked]:bg-surface"
                  >
                    <input type="radio" name="choice" value={o.value} defaultChecked={answers[step as keyof Answers] === o.value} className="mt-1 size-6 shrink-0 accent-navy-700" />
                    <span className="flex flex-col">
                      <span className="font-semibold">{o.label}</span>
                      {o.hint && <span className="text-base">{o.hint}</span>}
                    </span>
                  </label>
                ))}
              </fieldset>
            ) : step === 'zip' ? (
              <div className="flex flex-col gap-2">
                <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                  <label htmlFor="match-zip">What is your ZIP code?</label>
                </h2>
                <p id="match-zip-hint">Plans and prices depend on where you live. We do not save your address.</p>
                <input
                  id="match-zip"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  defaultValue={answers.zip}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={['match-zip-hint', describedBy].filter(Boolean).join(' ')}
                  className="min-h-14 w-48 rounded-card-sm border-2 border-field bg-white px-4 text-xl"
                />
              </div>
            ) : step === 'birth' ? (
              <fieldset className="flex flex-col gap-3" aria-describedby={describedBy}>
                <legend className="mb-2">
                  <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                    When were you born?
                  </h2>
                  <p className="mt-2">Month and year are enough to work out your enrollment dates.</p>
                </legend>
                <div className="flex flex-wrap gap-4">
                  <label className="flex flex-col gap-2 font-semibold">
                    Month
                    <select name="month" defaultValue={answers.birthMonth?.slice(5)} className="min-h-14 rounded-card-sm border-2 border-field bg-white px-4 font-normal">
                      {months.map((m, i) => (
                        <option key={m} value={String(i + 1).padStart(2, '0')}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-2 font-semibold">
                    Year
                    <input
                      name="year"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="bday-year"
                      defaultValue={answers.birthMonth?.slice(0, 4)}
                      className="min-h-14 w-32 rounded-card-sm border-2 border-field bg-white px-4 font-normal"
                    />
                  </label>
                </div>
              </fieldset>
            ) : (
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-2">
                  <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                    Add your doctors and prescriptions?
                  </h2>
                  <p className="mt-2">
                    Two optional questions about your doctors and medicines make the match more useful. This is health information, so we ask first. You can skip them.
                  </p>
                </legend>
                <label className="flex cursor-pointer items-start gap-3 rounded-card-sm border-2 border-field bg-white p-4">
                  <input type="checkbox" name="health" value="yes" defaultChecked={consent} className="mt-1 size-6 shrink-0 accent-navy-700" />
                  <span>
                    I agree that {site.name} may use my answers about doctors and prescriptions only to make this match and to prepare for a call I book. They are never sold or used for
                    ads. See the{' '}
                    <Link href="/legal/ai-health-data" className="underline underline-offset-4">
                      AI Tool &amp; Health Data Notice
                    </Link>
                    .
                  </span>
                </label>
              </fieldset>
            )}

            {error && (
              <p id={errorId} role="alert" className="font-semibold text-error">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {index > 0 && (
                <Button variant="outline" onClick={() => (setError(''), setIndex(index - 1))} icon={<Icon icon={ArrowLeft} />}>
                  Back
                </Button>
              )}
              <Button type="submit" icon={<Icon icon={ArrowRight} />}>
                {index === steps.length - 1 ? 'See my match' : 'Next'}
              </Button>
            </div>
        </motion.form>

        <p className="border-t border-line pt-4">
          Rather talk to a person?{' '}
          <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
            <Icon icon={Phone} weight="fill" size={20} />
            Call {site.phone.display}
          </a>{' '}
          ({site.tty.display}) or{' '}
          <Link href={bookCall.href} className="font-semibold underline underline-offset-4">
            book a call
          </Link>
          .
        </p>
      </div>
    </MotionConfig>
  );
}
