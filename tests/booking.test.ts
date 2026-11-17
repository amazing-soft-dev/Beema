import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { addOnTopics, bookingNote, medicareTopics, topicsFromQuery } from '../src/content/booking.ts';

describe('Book a Call topics', () => {
  it('pre-checks a topic from the link', () => {
    assert.deepEqual(topicsFromQuery('medigap'), ['medigap']);
    assert.deepEqual(topicsFromQuery('extra-protection'), ['dental-vision', 'hospital-indemnity']);
    assert.deepEqual(topicsFromQuery('nonsense'), []);
    assert.deepEqual(topicsFromQuery(null), []);
  });

  it('never lists final expense among the appointment topics', () => {
    for (const t of [...medicareTopics, ...addOnTopics]) assert.doesNotMatch(t.label, /final expense|life/i);
  });

  it('records final expense as a separate request in the note', () => {
    const note = bookingNote({ topics: ['medigap'], finalExpense: true, remindersConsent: false });
    assert.match(note, /Scope of Appointment topics: Medigap/);
    assert.match(note, /Separately requested: a final expense/);
    assert.match(note, /Reminder calls and texts: not agreed/);
  });
});
