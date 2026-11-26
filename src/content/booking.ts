/**
 * Book a Call topics (plan §4 Contact › Book a Call, §6 Scope of Appointment rules).
 * Medicare topics and the health add-ons can share one appointment, but the add-ons only if
 * the visitor lists them on the Scope of Appointment. Final expense is life insurance: it is
 * never part of a Medicare appointment and has its own request form on the final expense page.
 */
export type TopicId = 'turning-65' | 'medigap' | 'medicare-advantage' | 'part-d' | 'annual-review' | 'dental-vision' | 'hospital-indemnity';

export const medicareTopics: { id: TopicId; label: string }[] = [
  { id: 'turning-65', label: 'Turning 65 / new to Medicare' },
  { id: 'medigap', label: 'Medigap (Medicare Supplement)' },
  { id: 'medicare-advantage', label: 'Medicare Advantage' },
  { id: 'part-d', label: 'Part D drug plans' },
  { id: 'annual-review', label: 'Annual Plan Review' },
];

/** Health add-ons, listed on the Scope of Appointment only when checked. */
export const addOnTopics: { id: TopicId; label: string }[] = [
  { id: 'dental-vision', label: 'Dental, vision and hearing plans' },
  { id: 'hospital-indemnity', label: 'Hospital indemnity' },
];

const all = [...medicareTopics, ...addOnTopics];

/** Topics to pre-check from a link such as ?topic=medigap (or the extra-protection review). */
export function topicsFromQuery(value: string | null): TopicId[] {
  if (value === 'extra-protection') return ['dental-vision', 'hospital-indemnity'];
  return all.some((t) => t.id === value) ? [value as TopicId] : [];
}

export const topicLabel = (id: TopicId) => all.find((t) => t.id === id)?.label ?? id;

/** The note sent with the booking: what the visitor asked to discuss, in plain words. */
export function bookingNote({ topics, match, remindersConsent }: { topics: TopicId[]; match?: string; remindersConsent: boolean }) {
  const parts = [`Scope of Appointment topics: ${topics.length ? topics.map(topicLabel).join(', ') : 'not chosen yet'}`];
  if (match) parts.push(`Plan match result: ${match}`);
  parts.push(`Reminder calls and texts: ${remindersConsent ? 'agreed' : 'not agreed'}`);
  return parts.join('. ');
}
