import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { invitation } from '../data/invitation';

interface AudioContextValue {
  playing: boolean;
  toggle: () => void;
  /** Attempts to start playback; safe to call only right after a user gesture (e.g. the envelope tap). */
  requestAutoStart: () => void;
}

const MusicContext = createContext<AudioContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(invitation.musicSrc);
    audio.loop = true;
    audio.preload = 'none';
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const requestAutoStart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const value = useMemo(() => ({ playing, toggle, requestAutoStart }), [playing]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
