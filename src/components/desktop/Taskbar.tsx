import PixelIcon from '../ui/PixelIcon';
import type { WindowId } from '../../types/capsule';

type Props = {
  active: WindowId | null;
  onStart: () => void;
  completed: number;
  onCapsule: () => void;
};
const names: Partial<Record<WindowId, string>> = {
  welcome: 'Welcome to 1996',
  memory: 'View-Master',
  phone: 'Future Phone',
  music: 'Music Player',
  capsule: 'My Time Capsule',
  sealing: 'Sealing...',
  final: 'Save Complete',
};
export default function Taskbar({ active, onStart, completed, onCapsule }: Props) {
  return (
    <footer className="taskbar">
      <button type="button" onClick={onStart} className="start-button">
        <img className="start-logo" src="/images/1996/start-logo.svg" alt="" />
        <b>Start</b>
      </button>
      <span className="taskbar__separator" aria-hidden="true" />
      <button
        type="button"
        className={`taskbar__tab ${active ? 'taskbar__tab--active' : ''}`}
        onClick={onCapsule}
        title="Open my time capsule"
      >
        <PixelIcon name="disk" size={22} />
        <span>{active ? names[active] : '1996 Time Capsule'}</span>
      </button>
      <span className="taskbar__spacer" />
      <button
        type="button"
        onClick={onCapsule}
        className="taskbar__progress"
        aria-label={`${completed} of 3 memories collected. Open capsule.`}
      >
        <PixelIcon name="disk" size={17} />
        <span>{completed}/3 saved</span>
      </button>
      <div className="taskbar__clock" title="This computer is proudly stuck in 1996">
        <PixelIcon name="speaker" size={22} />
        10:14 AM
      </div>
    </footer>
  );
}
