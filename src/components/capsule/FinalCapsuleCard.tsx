import { useState } from 'react';
import { getMemory } from '../../data/memories';
import { getTrack } from '../../data/tracks';
import type { CapsuleState } from '../../types/capsule';
import PixelIcon from '../ui/PixelIcon';

type Props = { capsule: CapsuleState; onRestart: () => void };
export default function FinalCapsuleCard({ capsule, onRestart }: Props) {
  const [showCRT, setShowCRT] = useState(false);
  const memory = getMemory(capsule.memoryId);
  const track = getTrack(capsule.trackId);
  return (
    <div className={`final-experience ${showCRT ? 'final-experience--crt' : ''}`}>
      {showCRT ? (
        <div className="crt-room" role="region" aria-label="1996 computer save complete">
          <div className="crt-room__poster" aria-hidden="true">90s</div>
          <div className="crt-room__lamp" aria-hidden="true"><span /></div>
          <div className="crt-computer">
            <div className="crt-computer__bezel">
              <div className="crt-computer__screen">
                <PixelIcon name="disk" size={39} />
                <strong>SAVE COMPLETE.</strong>
                <p>Your memories have been<br />safely stored on a floppy disk.</p>
                <p>Please do not lose it<br />for 30 years.</p>
              </div>
            </div>
            <div className="crt-computer__chin"><span>●</span></div>
          </div>
          <div className="crt-room__sticky" aria-hidden="true">☺</div>
        </div>
      ) : (
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
            {memory && <img src={memory.image} alt={memory.label} />}
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
      )}
      <div className="final-actions">
        <span className="crt-status">
          <PixelIcon name="disk" size={19} /> A:\MEMORIES — SAVE COMPLETE.
        </span>
        <div className="final-actions__buttons">
          <button type="button" className="retro-button" onClick={() => setShowCRT((value) => !value)}>
            {showCRT ? 'View My Capsule' : 'View CRT Ending'}
          </button>
          <button type="button" className="retro-button" onClick={onRestart}>
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
}
