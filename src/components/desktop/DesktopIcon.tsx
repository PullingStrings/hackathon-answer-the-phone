import PixelIcon, { type IconName } from '../ui/PixelIcon';

type Props = {
  icon: IconName;
  title: string;
  subtitle?: string;
  onClick: () => void;
  selected?: boolean;
  badge?: boolean;
};
export default function DesktopIcon({
  icon,
  title,
  subtitle,
  onClick,
  selected = false,
  badge = false,
}: Props) {
  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
      title={`Open ${title}`}
    >
      <span className="desktop-icon__art">
        {['computer', 'camera', 'phone', 'music', 'disk'].includes(icon) ? (
          <img
            src={
              icon === 'music'
                ? '/images/1996/player-classic.svg'
                : `/images/1996/desktop-${icon}.svg`
            }
            alt=""
          />
        ) : (
          <PixelIcon name={icon} size={40} />
        )}
        {badge && <span className="desktop-icon__badge" aria-label="Complete" />}
      </span>
      <span className="desktop-icon__label">{title}</span>
      {subtitle && <span className="desktop-icon__subtitle">{subtitle}</span>}
    </button>
  );
}
