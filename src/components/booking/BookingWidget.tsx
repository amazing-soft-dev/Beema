'use client';

import Cal from '@calcom/embed-react';
import { Desktop, MapPin, Phone } from '@phosphor-icons/react';
import { useState, useSyncExternalStore } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/content/site';
import { team } from '@/content/team';

const MEETINGS = [
  { value: 'phone', label: 'Phone call', icon: Phone, note: 'We call you' },
  { value: 'video', label: 'Video call', icon: Desktop, note: 'On your computer or tablet' },
  { value: 'in-person', label: 'In person', icon: MapPin, note: `At our ${site.address.city} office` },
] as const;

const TOPICS = ['Turning 65', 'Medigap (Medicare Supplement)', 'Medicare Advantage', 'Prescription drug plans'] as const;

const noSubscribe = () => () => {};

/**
 * Meeting type and topic, then the Cal.com calendar for that event type.
 * NEXT_PUBLIC_CAL_LINK is the Cal.com username or team (e.g. "silver-path"), with event
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
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>('Turning 65');

  return (
    <div className="flex flex-col gap-8">
      {advisor && (
        <p className="rounded-card-sm bg-sand p-4">
          You are booking with <strong>{advisor.name}</strong>. <a href="/book-a-call" className="font-semibold text-green-700 underline underline-offset-4">Book with anyone instead</a>
        </p>
      )}

      <fieldset>
        <legend className="t-label mb-3 font-semibold">1. How would you like to meet?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {MEETINGS.map((m) => (
            <label key={m.value} className="flex min-h-20 cursor-pointer items-center gap-3 rounded-card-sm border-2 border-field bg-white p-4 has-[:checked]:border-green-700 has-[:checked]:bg-surface">
              <input type="radio" name="meeting" value={m.value} checked={meeting === m.value} onChange={() => setMeeting(m.value)} className="size-6 shrink-0 accent-green-700" />
              <Icon icon={m.icon} size={28} className="shrink-0 text-green-700" />
              <span>
                <span className="block font-semibold">{m.label}</span>
                <span className="block text-base">{m.note}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex max-w-[480px] flex-col gap-2">
        <label htmlFor="booking-topic" className="t-label font-semibold">
          2. What would you like to talk about?
        </label>
        <select id="booking-topic" value={topic} onChange={(e) => setTopic(e.target.value as (typeof TOPICS)[number])} className="min-h-14 rounded-card-sm border-2 border-field bg-white px-4 text-lg">
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="t-label mb-3 font-semibold">3. Pick a time</h2>
        {calLink ? (
          <div className="overflow-hidden rounded-card border-2 border-line bg-white">
            <Cal
              key={`${meeting}-${advisor?.slug ?? 'any'}`}
              calLink={`${calLink}/${meeting}`}
              style={{ width: '100%', minHeight: 640 }}
              config={{ layout: 'month_view', theme: 'light', notes: `Topic: ${topic}${advisor ? `. Advisor: ${advisor.name}` : ''}` }}
            />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-card bg-surface p-6 md:p-8">
              <p className="t-h4">Online booking is not set up yet</p>
              <p className="mt-2">
                Call <a href={`tel:${site.phone.tel}`} className="font-semibold text-green-700 underline underline-offset-4">{site.phone.display}</a> ({site.tty.display}) and we
                will book your {MEETINGS.find((m) => m.value === meeting)!.label.toLowerCase()} about {topic.toLowerCase()} right away, or leave your number and we will call you.
              </p>
            </div>
            <LeadForm endpoint="/api/callback" form="callback" idPrefix="booking" submitLabel="Call me to book" />
          </div>
        )}
      </div>
    </div>
  );
}
