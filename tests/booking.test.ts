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

  it('keeps final expense out of the Medicare booking note', () => {
    const note = bookingNote({ topics: ['medigap'], remindersConsent: false });
    assert.match(note, /Scope of Appointment topics: Medigap/);
    assert.doesNotMatch(note, /final expense|life insurance/i);
    assert.match(note, /Reminder calls and texts: not agreed/);
  });
});
