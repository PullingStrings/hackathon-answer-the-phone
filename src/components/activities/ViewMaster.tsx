import { useEffect, useState } from 'react';
import { getMemory, memories } from '../../data/memories';
import type { MemoryId } from '../../types/capsule';
import InstantPhoto from './InstantPhoto';
import RetroWindow from '../desktop/RetroWindow';

type Props = {
  selectedId: MemoryId | null;
  onChoose: (id: MemoryId) => void;
  notify: (message: string) => void;
  onClose: () => void;
};
export default function ViewMaster({ selectedId, onChoose, notify, onClose }: Props) {
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      memories.findIndex((memory) => memory.id === selectedId),
    ),
  );
  const [phase, setPhase] = useState<'gallery' | 'developing' | 'developed'>(
    selectedId ? 'developed' : 'gallery',
  );
  const memory = memories[index];
  useEffect(() => {
    if (phase !== 'developing') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => {
        setPhase('developed');
        notify('Photo added to Time Capsule!');
      },
      reduced ? 40 : 1750,
    );
    return () => window.clearTimeout(timer);
  }, [phase, notify]);

  function select() {
    onChoose(memory.id);
    setPhase('developing');
  }
  function move(by: number) {
    setIndex((previous) => (previous + by + memories.length) % memories.length);
  }
  const savedMemory = getMemory(selectedId);

  return (
    <RetroWindow
      title={phase === 'gallery' ? 'View-Master' : 'Instant Camera'}
      icon="camera"
      kind="memory"
      onClose={onClose}
    >
      <div className={`activity activity--memory activity--memory-${phase}`}>
        {phase === 'gallery' ? (
          <>
            <div className="viewer-counter" aria-live="polite">
              {index + 1} / {memories.length}
            </div>
            <div className="viewer">
              <button
                type="button"
                className="retro-button arrow-button"
                onClick={() => move(-1)}
                aria-label="Previous scene"
              >
                ◀
              </button>
              <figure className="viewer-frame">
                <div className="viewer-image">
                  <img src={memory.image} alt={memory.label} />
                </div>
                <figcaption>{memory.title}</figcaption>
              </figure>
              <button
                type="button"
                className="retro-button arrow-button"
                onClick={() => move(1)}
                aria-label="Next scene"
              >
                ▶
              </button>
            </div>
            <button type="button" className="retro-button memory-choose" onClick={select}>
              This is my memory! <span aria-hidden="true">✔</span>
            </button>
            {savedMemory && <p className="hint">Saved: {savedMemory.title}. You can replace it.</p>}
          </>
        ) : (
          <div className="development-layout">
            <InstantPhoto key={memory.id} memory={memory} developing={phase === 'developing'} />
            <div className="development-copy">
              <h2>{phase === 'developing' ? 'Developing your photo...' : 'Picture perfect.'}</h2>
              {phase === 'developing' ? (
                <div className="development-progress" role="status" aria-label="Developing photo">
                  <span />
                </div>
              ) : (
                <p className="saved-ribbon">✓ Photo added to Time Capsule!</p>
              )}
              <img
                className="instant-camera"
                src="/images/1996/instant-camera.svg"
                alt="A pixel art folding instant camera with a rainbow stripe"
              />
              {phase === 'developed' && (
                <button type="button" className="retro-button" onClick={() => setPhase('gallery')}>
                  Back to the gallery
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </RetroWindow>
  );
}
