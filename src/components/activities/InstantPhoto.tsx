import type { Memory } from '../../data/memories';

type Props = { memory: Memory; developing?: boolean };
export default function InstantPhoto({ memory, developing = false }: Props) {
  return (
    <figure className={`instant-photo ${developing ? 'instant-photo--developing' : ''}`}>
      <div className="instant-photo__print memory-photo">
        <img src={memory.image} alt={memory.label} />
      </div>
      <figcaption>{memory.title}</figcaption>
    </figure>
  );
}
