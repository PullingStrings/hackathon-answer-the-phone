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
    title: 'Playing at the Arcade',
    eyebrow: 'AFTER SCHOOL · 4:15 PM',
    description: 'One last coin. One more high score. The carpet glows brighter than the future.',
    image: '/images/1996/arcade.png',
    label: 'Illustration of a neon-lit 1990s arcade with classic game cabinets',
  },
  {
    id: 'cartoons',
    title: 'Saturday Morning Cartoons',
    eyebrow: 'SATURDAY · 9:02 AM',
    description: 'Cereal for breakfast, the best spot on the carpet, and absolutely no plans.',
    image: '/images/1996/cartoons.png',
    label: 'Illustration of a cosy living room with a CRT television and cereal bowl',
  },
  {
    id: 'vhs',
    title: 'Friday Night Video Rental',
    eyebrow: 'FRIDAY · 6:38 PM',
    description: 'An entire weekend, two tapes, and the impossible choice of what to watch first.',
    image: '/images/1996/vhs.png',
    label: 'Illustration of a 1990s video rental store packed with colourful VHS cases',
  },
];

export function getMemory(id: MemoryId | null): Memory | undefined {
  return memories.find((memory) => memory.id === id);
}
