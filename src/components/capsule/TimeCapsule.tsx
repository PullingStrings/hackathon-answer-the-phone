import { getMemory } from '../../data/memories';
import { getTrack } from '../../data/tracks';
import type { CapsuleState, WindowId } from '../../types/capsule';
import PixelIcon, { type IconName } from '../ui/PixelIcon';

type Props = {
  capsule: CapsuleState;
  completed: number;
  open: (window: WindowId) => void;
  onSeal: () => void;
};
export default function TimeCapsule({ capsule, completed, open, onSeal }: Props) {
  const memory = getMemory(capsule.memoryId);
  const slots: { icon: IconName; label: string; value: string | null; window: WindowId }[] = [
    { icon: 'camera', label: 'Photo', value: memory?.title ?? null, window: 'memory' },
    { icon: 'mail', label: 'Message', value: capsule.prediction, window: 'phone' },
    {
      icon: 'music',
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
                  <img className="capsule-thumbnail" src={memory.image} alt="" />
                ) : (
                  <PixelIcon name={slot.icon} size={46} />
                )}
              </span>
              <span className="capsule-slot__content">
                <strong>
                  {slot.label}:{' '}
                  <span className={slot.value ? 'collection-check' : 'collection-empty'}>
                    {slot.value ? '✓' : '—'}
                  </span>
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
