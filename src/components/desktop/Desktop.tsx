import type { ReactNode } from 'react';
import type { WindowId } from '../../types/capsule';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';

type Props = {
  active: WindowId | null;
  completed: number;
  open: (window: WindowId) => void;
  children: ReactNode;
};
export default function Desktop({ active, completed, open, children }: Props) {
  return (
    <main
      className={`desktop ${active === 'welcome' || active === null ? 'desktop--intro' : ''} ${active === 'phone' ? 'desktop--phone' : ''}`}
    >
      <nav className="desktop__icons" aria-label="Desktop applications">
        <DesktopIcon
          icon="computer"
          title="My Computer"
          selected={active === 'welcome'}
          onClick={() => open('welcome')}
        />
        <DesktopIcon
          icon="camera"
          title="View-Master"
          selected={active === 'memory'}
          onClick={() => open('memory')}
        />
        <DesktopIcon
          icon="phone"
          title="Phone"
          selected={active === 'phone'}
          onClick={() => open('phone')}
        />
        <DesktopIcon
          icon="music"
          title="Music Player"
          selected={active === 'music'}
          onClick={() => open('music')}
        />
        <DesktopIcon
          icon="disk"
          title="My Time Capsule"
          selected={active === 'capsule'}
          badge={completed === 3}
          onClick={() => open('capsule')}
        />
      </nav>
      <div className={`desktop__window-stage desktop__window-stage--${active ?? 'empty'}`}>
        {children}
      </div>
      <Taskbar
        active={active}
        completed={completed}
        onStart={() => open('welcome')}
        onCapsule={() => open('capsule')}
      />
    </main>
  );
}
