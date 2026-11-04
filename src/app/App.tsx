import { useCallback, useEffect, useState } from 'react';
import Desktop from '../components/desktop/Desktop';
import RetroWindow from '../components/desktop/RetroWindow';
import WelcomeWindow from '../components/ui/WelcomeWindow';
import ToastNotification from '../components/ui/ToastNotification';
import ViewMaster from '../components/activities/ViewMaster';
import NokiaPhone from '../components/activities/NokiaPhone';
import CassettePlayer from '../components/activities/CassettePlayer';
import TimeCapsule from '../components/capsule/TimeCapsule';
import SealingWindow from '../components/capsule/SealingWindow';
import FinalCapsuleCard from '../components/capsule/FinalCapsuleCard';
import { useCapsule } from '../hooks/useCapsule';
import { WELCOME_KEY } from '../data/capsuleStorage';
import type { WindowId } from '../types/capsule';

function hasBeenWelcomed(): boolean {
  try {
    return localStorage.getItem(WELCOME_KEY) === 'yes';
  } catch {
    return false;
  }
}
function rememberWelcome() {
  try {
    localStorage.setItem(WELCOME_KEY, 'yes');
  } catch {
    /* Restricted storage. */
  }
}
export default function App() {
  const { capsule, completed, chooseMemory, choosePrediction, chooseTrack, seal, restart } =
    useCapsule();
  const [active, setActive] = useState<WindowId | null>(() =>
    capsule.sealed ? 'final' : hasBeenWelcomed() ? null : 'welcome',
  );
  const [toast, setToast] = useState<string | null>(null);
  const notify = useCallback((message: string) => {
    setToast(message);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2900);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const open = (windowId: WindowId) => {
    if (active === 'sealing') return;
    if (capsule.sealed) {
      setActive('final');
      return;
    }
    if (active === 'welcome' && windowId !== 'welcome') rememberWelcome();
    setActive(windowId);
  };
  const close = () => {
    if (active === 'welcome') rememberWelcome();
    setActive(null);
  };
  const start = () => {
    rememberWelcome();
    setActive(null);
  };
  const reset = () => {
    restart();
    setToast(null);
    setActive('welcome');
  };
  const sealed = () => {
    seal();
    setActive('final');
  };
  return (
    <Desktop active={active} completed={completed} open={open}>
      {active === 'welcome' && (
        <RetroWindow
          title="You've Got 10 Minutes Before Mum Needs the Phone"
          icon="computer"
          kind="welcome"
          onClose={close}
        >
          <WelcomeWindow onStart={start} />
        </RetroWindow>
      )}
      {active === 'memory' && (
        <ViewMaster
          selectedId={capsule.memoryId}
          onChoose={chooseMemory}
          notify={notify}
          onClose={close}
        />
      )}
      {active === 'phone' && (
        <RetroWindow title="Future Phone" icon="phone" kind="phone" onClose={close}>
          <NokiaPhone saved={capsule.prediction} onSend={choosePrediction} notify={notify} />
        </RetroWindow>
      )}
      {active === 'music' && (
        <RetroWindow title="Music Player" icon="music" kind="music" onClose={close}>
          <CassettePlayer savedId={capsule.trackId} onChoose={chooseTrack} notify={notify} />
        </RetroWindow>
      )}
      {active === 'capsule' && (
        <RetroWindow
          title="My Time Capsule - Collection"
          icon="disk"
          kind="capsule"
          onClose={close}
        >
          <TimeCapsule
            capsule={capsule}
            completed={completed}
            open={open}
            onSeal={() => {
              if (completed === 3) setActive('sealing');
            }}
          />
        </RetroWindow>
      )}
      {active === 'sealing' && (
        <RetroWindow title="Sealing Time Capsule..." icon="hourglass" kind="sealing">
          <SealingWindow onDone={sealed} />
        </RetroWindow>
      )}
      {active === 'final' && (
        <RetroWindow title="SAVE COMPLETE! - Your 1996 Time Capsule" icon="disk" kind="final">
          <FinalCapsuleCard capsule={capsule} onRestart={reset} />
        </RetroWindow>
      )}
      <ToastNotification message={toast} />
    </Desktop>
  );
}
