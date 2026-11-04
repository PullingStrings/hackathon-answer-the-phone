import type { CSSProperties, ReactNode } from 'react';
import PixelIcon, { type IconName } from '../ui/PixelIcon';

type Props = {
  title: string;
  icon: IconName;
  children: ReactNode;
  onClose?: () => void;
  kind?: string;
  style?: CSSProperties;
};
export default function RetroWindow({ title, icon, children, onClose, kind = '', style }: Props) {
  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label={title}
      className={`retro-window retro-window--${kind || 'standard'}`}
      style={style}
    >
      <div className="retro-window__titlebar">
        <span className="retro-window__heading">
          {kind === 'phone' || kind === 'capsule' ? (
            <img
              src={`/images/1996/${kind === 'phone' ? 'nokia-title.svg' : 'desktop-disk.svg'}`}
              alt=""
            />
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
