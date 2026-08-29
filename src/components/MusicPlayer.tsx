import { Music2, Play, Pause } from 'lucide-react';
import { invitation } from '../data/invitation';
import { useMusic } from '../context/MusicContext';

interface MusicPlayerProps {
  variant?: 'floating' | 'bar' | 'bar-dark';
}

export function MusicPlayer({ variant = 'floating' }: MusicPlayerProps) {
  const { playing, toggle } = useMusic();

  if (variant === 'bar' || variant === 'bar-dark') {
    const dark = variant === 'bar-dark';
    return (
      <div
        className={[
          'flex w-full max-w-xs items-center gap-3 rounded-full border px-3 py-2 shadow-soft',
          dark ? 'border-champagne/25 bg-cream/5 backdrop-blur' : 'border-gold-soft/30 bg-ivory',
        ].join(' ')}
      >
        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            dark ? 'bg-champagne/10 text-champagne' : 'bg-cream text-sage-dark',
          ].join(' ')}
        >
          <Music2
            className={`h-4 w-4 ${playing ? 'animate-pulse-soft' : ''}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className={['truncate font-serif text-xs', dark ? 'text-cream' : 'text-umber'].join(' ')}>
            {invitation.songTitle}
          </p>
          <p
            className={[
              'truncate font-sans text-[10px] uppercase tracking-wide',
              dark ? 'text-champagne/60' : 'text-umber-light',
            ].join(' ')}
          >
            {invitation.songArtist}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          aria-pressed={playing}
          className={[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition active:scale-95',
            dark ? 'bg-champagne/20 text-champagne' : 'bg-sage-dark text-ivory',
          ].join(' ')}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor" />
          ) : (
            <Play className="h-3.5 w-3.5 translate-x-[1px]" aria-hidden="true" fill="currentColor" />
          )}
        </button>
      </div>
    );
  }

  // floating pill
  return (
    <div className="fixed bottom-24 right-4 z-40 sm:bottom-8">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 bg-ivory/90 text-umber shadow-soft backdrop-blur transition active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Music2 className="h-4 w-4 animate-pulse-soft" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
