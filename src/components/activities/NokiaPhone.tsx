import { useEffect, useState, type ChangeEvent } from 'react';
import PixelIcon from '../ui/PixelIcon';

const predictions = [
  'Everyone will have flying cars.',
  'Robots will teach at school.',
  'Everyone will carry the internet in their pocket.',
];
type Props = {
  saved: string | null;
  onSend: (message: string) => void;
  notify: (message: string) => void;
};
export default function NokiaPhone({ saved, onSend, notify }: Props) {
  const [mode, setMode] = useState<'new' | 'compose' | 'sending' | 'sent'>(saved ? 'sent' : 'new');
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
  function edit() {
    setMode('compose');
  }
  function move(by: number) {
    setChoice((current) => (current + by + 4) % 4);
    setMode('compose');
  }

  return (
    <div className="activity activity--phone">
      <div className="phone-device">
        <img src="/images/1996/phone.png" alt="A dark blue 1990s mobile phone" />
        <button
          className="phone-screen"
          type="button"
          onClick={mode === 'new' ? edit : mode === 'sent' ? edit : send}
          disabled={mode === 'sending' || (mode === 'compose' && !valid)}
          aria-label="Phone select"
        >
          <PixelIcon name={mode === 'sent' ? 'check' : 'mail'} size={28} />
          <span>
            {mode === 'new' ? (
              <>
                1 New
                <br />
                Message
              </>
            ) : mode === 'sending' ? (
              'Sending...'
            ) : mode === 'sent' ? (
              <>
                Message
                <br />
                sent!
              </>
            ) : (
              <>
                Write to
                <br />
                2026
              </>
            )}
          </span>
        </button>
        <div className="phone-navigation">
          <button
            type="button"
            className="retro-button"
            onClick={() => move(-1)}
            aria-label="Previous prediction"
            disabled={mode !== 'compose'}
          >
            ▲
          </button>
          <button
            type="button"
            className="retro-button"
            onClick={() => move(1)}
            aria-label="Next prediction"
            disabled={mode !== 'compose'}
          >
            ▼
          </button>
        </div>
      </div>
      <div className="phone-form">
        <h2 className="phone-prompt">
          What will life be like
          <br />
          in 2026?
        </h2>
        {mode === 'new' ? (
          <div className="phone-new">
            <PixelIcon name="mail" size={54} />
            <h3>You have a message!</h3>
            <p>
              From: Your future self
              <br />
              Received: 1996
            </p>
            <button type="button" className="retro-button" onClick={edit}>
              Open message
            </button>
          </div>
        ) : mode === 'sent' ? (
          <div className="phone-sent">
            <PixelIcon name="check" size={44} />
            <h3>Message sent!</h3>
            <p className="sent-preview">“{saved}”</p>
            <p className="saved-ribbon">✓ Added to Time Capsule</p>
            <button type="button" className="retro-button" onClick={edit}>
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
              <button
                type="button"
                className={`prediction-option ${choice === 3 ? 'is-picked' : ''}`}
                aria-pressed={choice === 3}
                onClick={() => setChoice(3)}
                disabled={mode === 'sending'}
              >
                <span className="prediction-radio" aria-hidden="true" />
                <span>Write my own...</span>
              </button>
            </div>
            {choice === 3 && (
              <div className="custom-prediction">
                <label htmlFor="custom-prediction">Your message to 2026</label>
                <textarea
                  id="custom-prediction"
                  maxLength={120}
                  rows={2}
                  value={custom}
                  disabled={mode === 'sending'}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setCustom(event.target.value)
                  }
                  placeholder="Dear future me..."
                />
                <small>{custom.length} / 120 characters</small>
              </div>
            )}
            <div className="phone-form__actions">
              <button
                type="button"
                className="retro-button"
                disabled={mode === 'sending'}
                onClick={() => setMode(saved ? 'sent' : 'new')}
              >
                Back
              </button>
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
