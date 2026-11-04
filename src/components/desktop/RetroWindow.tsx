import type { ReactNode } from 'react';
import PixelIcon, { type IconName } from '../ui/PixelIcon';

type Props = {
  title: string;
  icon: IconName;
  children: ReactNode;
  onClose?: () => void;
  kind?: string;
};
export default function RetroWindow({ title, icon, children, onClose, kind = '' }: Props) {
  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label={title}
      className={`retro-window retro-window--${kind || 'standard'}`}
    >
      <div className="retro-window__titlebar">
        <span className="retro-window__heading">
          {kind === 'phone' ? (
            <img src="/images/1996/nokia-title.svg" alt="" />
          ) : (
            <PixelIcon name={icon} size={21} />
          )}
          <span>{title}</span>
        </span>
        {onClose && (
          <button
            className="retro-window__close"
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            title="Close window"
          >
            ×
          </button>
        )}
      </div>
      <div className="retro-window__body">{children}</div>
    </section>
  );
}
