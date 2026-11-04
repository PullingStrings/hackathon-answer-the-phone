import type { TrackId } from '../types/capsule';

export type Track = {
  id: TrackId;
  title: string;
  description: string;
  side: string;
  color: string;
  // Add a path such as '/audio/funk.mp3' when an original, licensed recording exists.
  audioSrc?: string;
};

export const tracks: Track[] = [
  {
    id: 'funk',
    title: 'Dancefloor Anthems',
    description: 'Big beats, rave nights and Eurodance energy.',
    side: 'VOL. 01',
    color: '#ef875c',
  },
  {
    id: 'synth',
    title: 'Grunge & Britpop',
    description: 'Loud guitars, teenage angst and indie anthems.',
    side: 'VOL. 02',
    color: '#a6badd',
  },
  {
    id: 'hiphop',
    title: 'Hip-Hop & R&B',
    description: 'Iconic rhymes, smooth harmonies and soulful grooves.',
    side: 'VOL. 03',
    color: '#db9de0',
  },
];

export function getTrack(id: TrackId | null): Track | undefined {
  return tracks.find((track) => track.id === id);
}
