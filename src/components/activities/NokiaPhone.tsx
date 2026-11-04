import { useEffect, useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react';
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
  const [pixelReady, setPixelReady] = useState(false);
  const phoneCanvas = useRef<HTMLCanvasElement>(null);
  const selected = choice === 3 ? custom.trim() : predictions[choice];
  const valid = selected.length > 0 && selected.length <= 120;

  // Render the original local phone artwork at 45% resolution and upscale with
  // nearest-neighbour sampling. This produces actual visible pixels rather than
  // a smooth modern product shot with a CSS "retro" filter.
  function pixelatePhone(event: SyntheticEvent<HTMLImageElement>) {
    const canvas = phoneCanvas.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = event.currentTarget;
    canvas.width = 116;
    canvas.height = 185;
    context.imageSmoothingEnabled = true;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    setPixelReady(true);
  }

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
  function move(by: number) {
    if (mode !== 'compose') return;
    setChoice((current) => (current + by + 4) % 4);
  }

  return (
    <div className="activity activity--phone">
      <div className={`phone-device ${pixelReady ? 'phone-device--pixelated' : ''}`}>
        <img
          src="/images/1996/phone.png"
          alt="Dark blue, early mobile phone with physical keypad"
          onLoad={pixelatePhone}
        />
        <canvas className="phone-device__pixel-art" ref={phoneCanvas} aria-hidden="true" />
        <button
          className="phone-screen"
          type="button"
          onClick={mode === 'sent' ? () => setMode('compose') : mode === 'compose' ? send : undefined}
          disabled={mode === 'sending' || (mode === 'compose' && !valid)}
          aria-label={mode === 'sent' ? 'Edit message' : 'Phone select'}
        >
          <PixelIcon name={mode === 'sent' ? 'check' : 'mail'} size={26} />
          <span>
            {mode === 'sending' ? 'Sending...' : mode === 'sent' ? 'Message sent!' : (
              <>1 New<br />Message</>
            )}
          </span>
        </button>
        <div className="phone-navigation">
          <button type="button" className="retro-button" onClick={() => move(-1)}
            aria-label="Previous prediction" disabled={mode !== 'compose'}>▲</button>
          <button type="button" className="retro-button" onClick={() => move(1)}
            aria-label="Next prediction" disabled={mode !== 'compose'}>▼</button>
        </div>
      </div>
      <div className="phone-form">
        <h2 className="phone-prompt">What will life be like<br />in 2026?</h2>
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
                <button key={prediction} type="button"
                  className={`prediction-option ${choice === index ? 'is-picked' : ''}`}
                  aria-pressed={choice === index}
                  onClick={() => setChoice(index)}
                  disabled={mode === 'sending'}>
                  <span className="prediction-radio" aria-hidden="true" />
                  <span>{prediction}</span>
                </button>
              ))}
              <button type="button"
                className={`prediction-option ${choice === 3 ? 'is-picked' : ''}`}
                aria-pressed={choice === 3} onClick={() => setChoice(3)}
                disabled={mode === 'sending'}>
                <span className="prediction-radio" aria-hidden="true" />
                <span className="prediction-option__custom-label">Write my own...</span>
              </button>
            </div>
            {choice === 3 && (
              <div className="custom-prediction">
                <label htmlFor="custom-prediction">Your message to 2026</label>
                <textarea id="custom-prediction" maxLength={120} rows={2}
                  value={custom} disabled={mode === 'sending'}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCustom(event.target.value)}
                  placeholder="Dear future me..." />
                <small>{custom.length} / 120 characters</small>
              </div>
            )}
            <div className="phone-form__actions">
              <button type="button" className="retro-button"
                disabled={!valid || mode === 'sending'} onClick={send}>
                {mode === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
