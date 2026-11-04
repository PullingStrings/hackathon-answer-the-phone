export type MemoryId = 'arcade' | 'cartoons' | 'vhs';
export type TrackId = 'funk' | 'hiphop' | 'synth';
export type CapsuleState = {
  memoryId: MemoryId | null;
  prediction: string | null;
  trackId: TrackId | null;
  sealed: boolean;
};
export type WindowId = 'welcome' | 'memory' | 'phone' | 'music' | 'capsule' | 'sealing' | 'final';
export const EMPTY_CAPSULE: CapsuleState = {
  memoryId: null,
  prediction: null,
  trackId: null,
  sealed: false,
};
