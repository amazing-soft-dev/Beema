'use client';

import Cal from '@calcom/embed-react';
import { Desktop, MapPin, Phone, Sparkle } from '@phosphor-icons/react';
import { useState, useSyncExternalStore } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { Icon } from '@/components/ui/Icon';
import { type TopicId, addOnTopics, bookingNote, medicareTopics, topicLabel, topicsFromQuery } from '@/content/booking';
import { site } from '@/content/site';
import { matchTitle } from '@/lib/match/engine';
import { team } from '@/content/team';

const MEETINGS = [
  { value: 'phone', label: 'Phone call', icon: Phone, note: 'We call you' },
  { value: 'video', label: 'Video call', icon: Desktop, note: 'On your computer or tablet' },
  { value: 'in-person', label: 'In person', icon: MapPin, note: `At our ${site.address.city} office` },
] as const;


const noSubscribe = () => () => {};

/**
 * Meeting type, the Scope of Appointment topics, a separate final expense opt-in and an
 * optional reminders consent, then the Cal.com calendar for that event type.
 * Links can pre-fill it: ?topic=medigap, ?finalExpense=1, ?match=<type> (the AI Plan Match
 * result, shown back to the visitor and sent in the booking notes; no personal data).
 * NEXT_PUBLIC_CAL_LINK is the Cal.com username or team (e.g. "senior-ai-plans"), with event
 * types named "phone", "video" and "in-person". Without it, visitors get the phone number
 * and the callback form instead of a dead calendar.
 */
export function BookingWidget() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  // ?advisor=<slug> from Meet the Team, read from the URL in the browser. The server snapshot
  // is empty, so the page renders fully on the server (no Suspense placeholder).
  const query = useSyncExternalStore(noSubscribe, () => window.location.search, () => '');
  const advisor = team.find((a) => a.slug === new URLSearchParams(query).get('advisor'));
  const [meeting, setMeeting] = useState<(typeof MEETINGS)[number]['value']>('phone');
  const params = new URLSearchParams(query);
  const match = matchTitle(params.get('match') ?? '');
  const [picked, setPicked] = useState<TopicId[] | null>(null);
  const topics = picked ?? topicsFromQuery(params.get('topic') ?? (match ? 'turning-65' : null));
  const [finalExpenseChoice, setFinalExpense] = useState<boolean | null>(null);
  const finalExpense = finalExpenseChoice ?? params.get('finalExpense') === '1';
  const [reminders, setReminders] = useState(false);
  const toggle = (id: TopicId) => setPicked(topics.includes(id) ? topics.filter((t) => t !== id) : [...topics, id]);
  const note = bookingNote({ topics, finalExpense, match, remindersConsent: reminders });
  const topicText = topics.length ? topics.map(topicLabel).join(', ').toLowerCase() : 'Medicare';

  return (
    <div className="flex flex-col gap-8">
      {advisor && (
        <p className="rounded-card-sm bg-sand p-4">
          You are booking with <strong>{advisor.name}</strong>. <a href="/book-a-call" className="font-semibold text-navy-700 underline underline-offset-4">Book with anyone instead</a>
        </p>
      )}

      <fieldset>
        <legend className="t-label mb-3 font-semibold">1. How would you like to meet?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {MEETINGS.map((m) => (
            <label key={m.value} className="flex min-h-20 cursor-pointer items-center gap-3 rounded-card-sm border-2 border-field bg-white p-4 has-[:checked]:border-navy-700 has-[:checked]:bg-surface">
              <input type="radio" name="meeting" value={m.value} checked={meeting === m.value} onChange={() => setMeeting(m.value)} className="size-6 shrink-0 accent-navy-700" />
              <Icon icon={m.icon} size={28} className="shrink-0 text-navy-700" />
              <span>
                <span className="block font-semibold">{m.label}</span>
                <span className="block text-base">{m.note}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {match && (
        <p className="flex gap-3 rounded-card-sm border-2 border-navy-700 bg-surface p-4">
          <Icon icon={Sparkle} weight="fill" className="mt-0.5 shrink-0 text-navy-700" />
          <span>
            Your free plan match: <strong>{match}</strong>. Your agent will review it with you.
          </span>
        </p>
      )}

      <fieldset>
        <legend className="t-label mb-1 font-semibold">2. What would you like to talk about?</legend>
        <p className="mb-3 text-base">Choose all that apply. These become your Scope of Appointment, and we discuss only these.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[...medicareTopics, ...addOnTopics].map((t) => (
            <label key={t.id} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-card-sm border-2 border-field bg-white p-4 has-[:checked]:border-navy-700 has-[:checked]:bg-surface">
              <input type="checkbox" checked={topics.includes(t.id)} onChange={() => toggle(t.id)} className="size-6 shrink-0 accent-navy-700" />
              <span className="font-medium">{t.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-base">Dental, vision and hearing plans and hospital indemnity are not Medicare. We discuss them only if you check them here.</p>
      </fieldset>

      <fieldset className="rounded-card-sm border-2 border-line p-4">
        <legend className="t-label px-1 font-semibold">Final expense life insurance (separate)</legend>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={finalExpense} onChange={(e) => setFinalExpense(e.target.checked)} className="mt-1 size-6 shrink-0 accent-navy-700" />
          <span>
            I would also like a <strong>separate</strong> appointment about final expense life insurance. Medicare rules keep life insurance out of Medicare appointments,
            so we will book it on its own.
          </span>
        </label>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-base">
        <input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} className="mt-0.5 size-6 shrink-0 accent-navy-700" />
        <span>
          Optional: {site.legalName} may call or text me reminders about this appointment, including by automated technology. Consent is not a condition of any purchase.
          Reply STOP to opt out.
        </span>
      </label>

      <div>
        <h2 className="t-label mb-3 font-semibold">3. Pick a time</h2>
        {calLink ? (
          <div className="overflow-hidden rounded-card border-2 border-line bg-white">
            <Cal
              key={`${meeting}-${advisor?.slug ?? 'any'}`}
              calLink={`${calLink}/${meeting}`}
              style={{ width: '100%', minHeight: 640 }}
              config={{ layout: 'month_view', theme: 'light', notes: `${note}${advisor ? `. Advisor: ${advisor.name}` : ''}` }}
            />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-card bg-surface p-6 md:p-8">
              <p className="t-h4">Online booking is not set up yet</p>
              <p className="mt-2">
                Call <a href={`tel:${site.phone.tel}`} className="font-semibold text-navy-700 underline underline-offset-4">{site.phone.display}</a> ({site.tty.display}) and we
                will book your {MEETINGS.find((m) => m.value === meeting)!.label.toLowerCase()} about {topicText} right away, or leave your number and we will call you.
              </p>
            </div>
            <LeadForm endpoint="/api/callback" form="callback" idPrefix="booking" submitLabel="Call me to book" />
          </div>
        )}
      </div>
    </div>
  );
}
