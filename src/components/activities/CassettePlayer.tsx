import { useEffect, useRef, useState } from 'react';
import { getTrack, tracks } from '../../data/tracks';
import type { TrackId } from '../../types/capsule';

type Props = {
  savedId: TrackId | null;
  onChoose: (id: TrackId) => void;
  notify: (message: string) => void;
};
export default function CassettePlayer({ savedId, onChoose, notify }: Props) {
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      tracks.findIndex((track) => track.id === savedId),
    ),
  );
  const [playing, setPlaying] = useState(false);
  const [muted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = tracks[index];
  const hasAudio = Boolean(track.audioSrc) && !audioError;
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
    if (!track.audioSrc) {
      audioRef.current = null;
      return;
    }
    const audio = new Audio(track.audioSrc);
    audio.preload = 'metadata';
    audio.muted = muted;
    audioRef.current = audio;
    const sync = () => {
      setCurrentTime(audio.currentTime);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setProgress(audio.duration && Number.isFinite(audio.duration) ? audio.currentTime / audio.duration : 0);
    };
    const ended = () => setPlaying(false);
    const fail = () => {
      setAudioError(true);
      setPlaying(false);
    };
    audio.addEventListener('timeupdate', sync);
    audio.addEventListener('loadedmetadata', sync);
    audio.addEventListener('ended', ended);
    audio.addEventListener('error', fail);
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', sync);
      audio.removeEventListener('loadedmetadata', sync);
      audio.removeEventListener('ended', ended);
      audio.removeEventListener('error', fail);
      audio.removeAttribute('src');
      audio.load();
      if (audioRef.current === audio) audioRef.current = null;
    };
    // Muting is handled by the separate effect to avoid restarting audio.
  }, [track.id, track.audioSrc]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);
  function move(by: number) {
    setIndex((current) => (current + by + tracks.length) % tracks.length);
  }
  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setAudioError(true);
        setPlaying(false);
      }
    }
  }
  function clock(seconds: number) {
    const safe = Math.floor(Number.isFinite(seconds) && seconds >= 0 ? seconds : 0);
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
  }
  function choose() {
    onChoose(track.id);
    notify('Soundtrack added to Time Capsule!');
  }
  return (
    <div className="activity activity--music">
      <div className="cassette-stage">
        <button
          type="button"
          className="retro-button arrow-button"
          onClick={() => move(-1)}
          aria-label="Previous track"
        >
          ◀
        </button>
        <img
          className="cassette-image"
          src="/images/1996/cassette.png"
          alt="A black cassette with a handwritten My 1996 Mixtape label"
        />
        <button
          type="button"
          className="retro-button arrow-button"
          onClick={() => move(1)}
          aria-label="Next track"
        >
          ▶
        </button>
      </div>
      <h2 className="track-title">{track.title}</h2>
      <p className="track-description">{track.description}</p>
      <div className="track-controls">
        <button
          type="button"
          className="retro-button"
          onClick={togglePlay}
          disabled={!hasAudio}
          aria-label={playing ? 'Pause track' : 'Play track'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <div
          className="track-progress"
          role="progressbar"
          aria-label="Playback progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="track-time" aria-label="Playback time">
          {clock(currentTime)} / {duration > 0 ? clock(duration) : '--:--'}
        </span>
      </div>
      {!hasAudio && (
        <p className="audio-unavailable" role="status">
          Audio not installed. You can still choose your soundtrack.
        </p>
      )}
      <button type="button" className="retro-button track-add" onClick={choose}>
        {savedId === track.id ? '✓ Saved to my capsule' : 'Add to Time Capsule'}
      </button>
      {savedId && savedId !== track.id && (
        <p className="hint">Currently saved: {getTrack(savedId)?.title}</p>
      )}
    </div>
  );
}
