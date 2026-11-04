import { getMemory } from '../../data/memories';
import { getTrack } from '../../data/tracks';
import type { CapsuleState } from '../../types/capsule';
import PixelIcon from '../ui/PixelIcon';

type Props = { capsule: CapsuleState; onRestart: () => void };
export default function FinalCapsuleCard({ capsule, onRestart }: Props) {
  const memory = getMemory(capsule.memoryId);
  const track = getTrack(capsule.trackId);
  return (
    <div className="final-experience">
      <div className="final-card" id="final-capsule-card">
        <header className="final-card__header">
          <PixelIcon name="disk" size={57} />
          <div>
            <h2>SAVE COMPLETE.</h2>
            <p>Your 1996 time capsule has been sealed!</p>
          </div>
        </header>
        <div className="final-card__grid">
          <figure className="final-photo">
            {memory && (
              <div className="memory-photo">
                <img src={memory.image} alt={memory.label} />
              </div>
            )}
            <figcaption>
              My 1996
              <br />
              Memory ♡
            </figcaption>
          </figure>
          <div className="final-notes">
            <div className="final-note">
              <PixelIcon name="camera" size={36} />
              <p>
                <b>Memory:</b> {memory?.title}
              </p>
            </div>
            <div className="final-note">
              <PixelIcon name="mail" size={36} />
              <p>
                <b>Prediction:</b> {capsule.prediction}
              </p>
            </div>
            <div className="final-note">
              <PixelIcon name="music" size={36} />
              <p>
                <b>Soundtrack:</b> {track?.title}
              </p>
            </div>
            <p className="final-highlight">
              Your memories have been safely stored
              <br />
              on a floppy disk.
            </p>
            <p className="final-footnote">Please do not lose it for 30 years.</p>
          </div>
        </div>
      </div>
      <div className="final-actions">
        <span className="crt-status">
          <PixelIcon name="disk" size={19} /> A:\MEMORIES — SAVE COMPLETE.
        </span>
        <div className="final-actions__buttons">
          <button type="button" className="retro-button" onClick={onRestart}>
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
}
