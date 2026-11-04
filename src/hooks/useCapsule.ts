import { useCallback, useEffect, useState } from 'react';
import { EMPTY_CAPSULE, type CapsuleState, type MemoryId, type TrackId } from '../types/capsule';
import { getCompletedCount, parseCapsule, STORAGE_KEY, WELCOME_KEY } from '../data/capsuleStorage';

function restoreCapsule(): CapsuleState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseCapsule(JSON.parse(stored) as unknown) : { ...EMPTY_CAPSULE };
  } catch {
    return { ...EMPTY_CAPSULE };
  }
}

export function useCapsule() {
  const [capsule, setCapsule] = useState<CapsuleState>(restoreCapsule);
  useEffect(() => {
    try {
      if (!capsule.memoryId && !capsule.trackId && !capsule.prediction && !capsule.sealed)
        localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(capsule));
    } catch {
      /* Storage may be disabled. */
    }
  }, [capsule]);
  const chooseMemory = useCallback((memoryId: MemoryId) => {
    setCapsule((current) => (current.sealed ? current : { ...current, memoryId }));
  }, []);
  const choosePrediction = useCallback((prediction: string) => {
    const value = prediction.trim().slice(0, 120);
    if (value)
      setCapsule((current) => (current.sealed ? current : { ...current, prediction: value }));
  }, []);
  const chooseTrack = useCallback((trackId: TrackId) => {
    setCapsule((current) => (current.sealed ? current : { ...current, trackId }));
  }, []);
  const seal = useCallback(() => {
    setCapsule((current) =>
      current.memoryId && current.prediction && current.trackId
        ? { ...current, sealed: true }
        : current,
    );
  }, []);
  const restart = useCallback(() => {
    setCapsule({ ...EMPTY_CAPSULE });
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(WELCOME_KEY);
    } catch {
      /* Ignore. */
    }
  }, []);
  return {
    capsule,
    completed: getCompletedCount(capsule),
    chooseMemory,
    choosePrediction,
    chooseTrack,
    seal,
    restart,
  };
}
