import { useEffect, useState } from 'react';
import PixelIcon from '../ui/PixelIcon';

type Props = { onDone: () => void };
export default function SealingWindow({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = window.setTimeout(onDone, 50);
      return () => window.clearTimeout(timer);
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const next = Math.min(100, Math.round((now - start) / 20));
      setProgress(next);
      if (next === 100) onDone();
      else raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [onDone]);
  const segments = Array.from({ length: 20 }, (_, index) => index < Math.floor(progress / 5));
  return (
    <div className="sealing">
      <PixelIcon name="hourglass" size={64} />
      <h2>Sealing your memories...</h2>
      <p>Please wait...</p>
      <div
        className="sealing__progress"
        role="progressbar"
        aria-label="Sealing time capsule"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        {segments.map((filled, index) => (
          <span key={index} className={filled ? 'is-filled' : ''} />
        ))}
      </div>
      <span className="sr-only">{progress}% complete</span>
    </div>
  );
}
