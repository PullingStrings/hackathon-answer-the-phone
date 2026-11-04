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
    title: 'Funky Mixtape',
    description: 'Groovy basslines and funky rhythms.',
    side: 'VOL. 01',
    color: '#ef875c',
  },
  {
    id: 'hiphop',
    title: 'Old-School Hip-Hop',
    description: 'Dusty drums and laid-back beats.',
    side: 'VOL. 02',
    color: '#a6badd',
  },
  {
    id: 'synth',
    title: 'Retro Synth',
    description: 'Dreamy electronic sounds from the future.',
    side: 'VOL. 03',
    color: '#db9de0',
  },
];

export function getTrack(id: TrackId | null): Track | undefined {
  return tracks.find((track) => track.id === id);
}
