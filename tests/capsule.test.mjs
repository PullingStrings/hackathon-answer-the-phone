import test from 'node:test';
import assert from 'node:assert/strict';
import { getCompletedCount, parseCapsule } from '../src/data/capsuleStorage.ts';

const empty = { memoryId: null, prediction: null, trackId: null, sealed: false };
test('a new or damaged save is safely reset', () => {
  for (const input of [null, [], 'broken', 19, undefined])
    assert.deepEqual(parseCapsule(input), empty);
});
test('all three activities can be completed in any order', () => {
  const photo = parseCapsule({ trackId: 'funk' });
  assert.equal(getCompletedCount(photo), 1);
  const phone = parseCapsule({ trackId: 'funk', prediction: '2026 is wild' });
  assert.equal(getCompletedCount(phone), 2);
  const complete = parseCapsule({ prediction: '2026 is wild', memoryId: 'vhs', trackId: 'funk' });
  assert.equal(getCompletedCount(complete), 3);
  assert.equal(complete.sealed, false);
});
test('unrecognized IDs and invalid sealed saves cannot unlock the ending', () => {
  assert.deepEqual(
    parseCapsule({ memoryId: '__proto__', trackId: 'bad', prediction: '  ', sealed: true }),
    empty,
  );
  assert.equal(parseCapsule({ memoryId: 'arcade', prediction: 'hi', sealed: true }).sealed, false);
});
test('text is trimmed and capped at 120 characters', () => {
  const prediction = parseCapsule({ prediction: ' x'.repeat(100) });
  assert.equal(prediction.prediction?.length, 120);
  assert.equal(parseCapsule({ prediction: '  Hello  ' }).prediction, 'Hello');
});
test('a complete sealed save restores as sealed', () => {
  assert.deepEqual(
    parseCapsule({
      memoryId: 'cartoons',
      prediction: 'Cool phones',
      trackId: 'synth',
      sealed: true,
    }),
    { memoryId: 'cartoons', prediction: 'Cool phones', trackId: 'synth', sealed: true },
  );
});
