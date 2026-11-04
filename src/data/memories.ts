import type { MemoryId } from '../types/capsule';

export type Memory = {
  id: MemoryId;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  label: string;
};

export const memories: Memory[] = [
  {
    id: 'arcade',
    title: 'Playing Nintendo',
    eyebrow: 'AFTER SCHOOL · 4:15 PM',
    description: 'Controller in hand, one more level, and the best spot in front of the TV.',
    image: '/images/1996/nintendo.png',
    label: 'A Nintendo 64 and controller in a cosy 1990s living room with a game on the CRT television',
  },
  {
    id: 'cartoons',
    title: 'Watching MTV',
    eyebrow: 'SATURDAY · 7:02 PM',
    description: 'Your favourite video comes on. Turn it up and forget about everything else.',
    image: '/images/1996/mtv.png',
    label: 'A CRT television showing MTV in a 1990s room with cassette tapes and warm lamplight',
  },
  {
    id: 'vhs',
    title: 'Dancing the Night Away',
    eyebrow: 'FRIDAY · 11:38 PM',
    description: 'Hands in the air, your friends beside you, and a beat you never want to end.',
    image: '/images/1996/dancefloor.png',
    label: 'A crowd dancing under colourful lights and a mirror ball at a 1990s club',
  },
];

export function getMemory(id: MemoryId | null): Memory | undefined {
  return memories.find((memory) => memory.id === id);
}
