import { EMPTY_CAPSULE, type CapsuleState, type MemoryId, type TrackId } from '../types/capsule.ts';

export const STORAGE_KEY = 'mum-needs-the-phone:capsule:v1';
export const WELCOME_KEY = 'mum-needs-the-phone:welcome:v1';
const MEMORY_IDS = new Set<MemoryId>(['arcade', 'cartoons', 'vhs']);
const TRACK_IDS = new Set<TrackId>(['funk', 'hiphop', 'synth']);

/** Restore only allowlisted IDs, a nonblank 120-character prediction and a valid sealed state. */
export function parseCapsule(input: unknown): CapsuleState {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ...EMPTY_CAPSULE };
  const candidate = input as Record<string, unknown>;
  const memoryId =
    typeof candidate.memoryId === 'string' && MEMORY_IDS.has(candidate.memoryId as MemoryId)
      ? (candidate.memoryId as MemoryId)
      : null;
  const trackId =
    typeof candidate.trackId === 'string' && TRACK_IDS.has(candidate.trackId as TrackId)
      ? (candidate.trackId as TrackId)
      : null;
  const prediction =
    typeof candidate.prediction === 'string' && candidate.prediction.trim().length > 0
      ? candidate.prediction.trim().slice(0, 120)
      : null;
  const sealed = candidate.sealed === true && Boolean(memoryId && trackId && prediction);
  return { memoryId, prediction, trackId, sealed };
}

export function getCompletedCount(capsule: CapsuleState): number {
  return (
    Number(Boolean(capsule.memoryId)) +
    Number(Boolean(capsule.prediction)) +
    Number(Boolean(capsule.trackId))
  );
}
