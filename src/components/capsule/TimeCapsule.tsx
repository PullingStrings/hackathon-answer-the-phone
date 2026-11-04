import { getMemory } from '../../data/memories';
import { getTrack } from '../../data/tracks';
import type { CapsuleState, WindowId } from '../../types/capsule';

type Props = {
  capsule: CapsuleState;
  completed: number;
  open: (window: WindowId) => void;
  onSeal: () => void;
};
export default function TimeCapsule({ capsule, completed, open, onSeal }: Props) {
  const memory = getMemory(capsule.memoryId);
  const slots: { sprite: string; label: string; value: string | null; window: WindowId }[] = [
    { sprite: 'desktop-camera.svg', label: 'Photo', value: memory?.title ?? null, window: 'memory' },
    { sprite: 'desktop-phone.svg', label: 'Message', value: capsule.prediction, window: 'phone' },
    {
      sprite: 'player-classic.svg',
      label: 'Soundtrack',
      value: getTrack(capsule.trackId)?.title ?? null,
      window: 'music',
    },
  ];
  return (
    <div className="activity activity--capsule">
      <div className="capsule-layout">
        <div className="capsule-slots">
          {slots.map((slot) => (
            <button
              type="button"
              className="capsule-slot"
              key={slot.window}
              onClick={() => open(slot.window)}
              aria-label={`${slot.value ? 'Edit' : 'Choose'} ${slot.label.toLowerCase()}`}
            >
              <span className="capsule-slot__image">
                {slot.window === 'memory' && memory ? (
                  <span className="capsule-thumbnail memory-photo">
                    <img src={memory.image} alt="" />
                  </span>
                ) : (
                  <img className="capsule-slot__sprite" src={`/images/1996/${slot.sprite}`} alt="" />
                )}
              </span>
              <span className="capsule-slot__content">
                <strong>
                  {slot.label}:{' '}
                  {slot.value ? (
                    <img
                      className="collection-check"
                      src="/images/1996/collection-check.svg"
                      alt="Collected"
                    />
                  ) : (
                    <span className="collection-empty">—</span>
                  )}
                </strong>
                <span>{slot.value ?? 'Not collected yet'}</span>
              </span>
            </button>
          ))}
        </div>
        <img
          className="capsule-floppy"
          src="/images/1996/floppy.png"
          alt="My Time Capsule, 1996, on a purple floppy disk"
        />
      </div>
      <div className="capsule-footer">
        <span role="status" aria-label={`${completed} of 3 memories collected`}>
          {completed < 3 ? `${completed}/3 collected` : '3/3 ready'}
        </span>
        <button type="button" disabled={completed !== 3} className="retro-button" onClick={onSeal}>
          Seal Until 2026...
        </button>
      </div>
    </div>
  );
}
