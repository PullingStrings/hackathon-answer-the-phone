import { useEffect, useState, type ChangeEvent } from 'react';
import PixelIcon from '../ui/PixelIcon';

const predictions = [
  "We'll have flying cars.",
  'Robots will teach at school.',
  'The internet will be everywhere.',
];
type Props = {
  saved: string | null;
  onSend: (message: string) => void;
  notify: (message: string) => void;
};
export default function NokiaPhone({ saved, onSend, notify }: Props) {
  const [mode, setMode] = useState<'compose' | 'sending' | 'sent'>(saved ? 'sent' : 'compose');
  const [choice, setChoice] = useState<number>(() =>
    saved ? (predictions.includes(saved) ? predictions.indexOf(saved) : 3) : 2,
  );
  const [custom, setCustom] = useState(saved && !predictions.includes(saved) ? saved : '');
  const selected = choice === 3 ? custom.trim() : predictions[choice];
  const valid = selected.length > 0 && selected.length <= 120;

  useEffect(() => {
    if (mode !== 'sending') return;
    const timer = window.setTimeout(
      () => {
        setMode('sent');
        notify('Message added to Time Capsule!');
      },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 40 : 950,
    );
    return () => window.clearTimeout(timer);
  }, [mode, notify]);

  function send() {
    if (!valid) return;
    onSend(selected);
    setMode('sending');
  }
  return (
    <div className="activity activity--phone">
      <div className="phone-device">
        <img
          src="/images/1996/phone.png"
          alt="Dark blue, early mobile phone with physical keypad"
        />
        <div className="phone-screen" aria-live="polite">
          {mode === 'sent' ? (
            <PixelIcon name="check" size={26} />
          ) : (
            <svg viewBox="0 0 24 20" aria-hidden="true">
              <rect
                x="1.5"
                y="2"
                width="21"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M2 3l10 8L22 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
          <span>
            {mode === 'sending' ? (
              'Sending...'
            ) : mode === 'sent' ? (
              'Message sent!'
            ) : (
              <>
                1 New
                <br />
                Message
              </>
            )}
          </span>
        </div>
      </div>
      <div className="phone-form">
        <h2 className="phone-prompt">
          What will life be like
          <br />
          in 2026?
        </h2>
        {mode === 'sent' ? (
          <div className="phone-sent">
            <PixelIcon name="check" size={38} />
            <h3>Message sent!</h3>
            <p className="sent-preview">“{saved}”</p>
            <p className="saved-ribbon">✓ Added to Time Capsule</p>
            <button type="button" className="retro-button" onClick={() => setMode('compose')}>
              Edit my prediction
            </button>
          </div>
        ) : (
          <>
            <div className="prediction-options" role="group" aria-label="Choose your prediction">
              {predictions.map((prediction, index) => (
                <button
                  key={prediction}
                  type="button"
                  className={`prediction-option ${choice === index ? 'is-picked' : ''}`}
                  aria-pressed={choice === index}
                  onClick={() => setChoice(index)}
                  disabled={mode === 'sending'}
                >
                  <span className="prediction-radio" aria-hidden="true" />
                  <span>{prediction}</span>
                </button>
              ))}
              <div
                className={`prediction-option prediction-option--custom ${choice === 3 ? 'is-picked' : ''}`}
              >
                <button
                  type="button"
                  className="prediction-option__custom-choice"
                  aria-label="Write my own prediction"
                  aria-pressed={choice === 3}
                  onClick={() => setChoice(3)}
                  disabled={mode === 'sending'}
                >
                  <span className="prediction-radio" aria-hidden="true" />
                </button>
                <input
                  id="custom-prediction"
                  className="prediction-option__custom-input"
                  type="text"
                  maxLength={120}
                  value={custom}
                  disabled={mode === 'sending'}
                  placeholder="Write my own..."
                  aria-label="Write my own prediction"
                  onFocus={() => setChoice(3)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setChoice(3);
                    setCustom(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="phone-form__actions">
              <button
                type="button"
                className="retro-button"
                disabled={!valid || mode === 'sending'}
                onClick={send}
              >
                {mode === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
