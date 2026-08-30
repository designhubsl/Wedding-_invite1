import { useCallback, useRef, useState } from 'react';
import { invitation } from '../data/invitation';
import { WeddingLetter } from './WeddingLetter';
import { FloralDecoration } from './FloralDecoration';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useGuestName } from '../hooks/useGuestName';

// Custom-artwork slots — replace these placeholder files with your own
// Photoshop/Illustrator exports (same filenames), then set
// `useCustomGraphics: true` in src/data/invitation.ts to switch them on.
import envelopeBackImg from '../assets/graphics/envelope/envelope-back.png';
import envelopeFrontImg from '../assets/graphics/envelope/envelope-front.png';
import envelopeFlapImg from '../assets/graphics/envelope/envelope-flap.png';
import waxSealImg from '../assets/graphics/envelope/wax-seal.png';

type Stage = 'idle' | 'tapped' | 'sealing' | 'flap-opening' | 'peek' | 'done';

interface EnvelopeOpeningProps {
  onComplete: () => void;
}

// Timing constants (ms) — tuned to feel physical, not explosive.
const T_SEAL = 380;
const T_FLAP_START = 160; // flap begins slightly after the tap settles
const T_FLAP_DURATION = 820;
const T_PEEK_START_OFFSET = 420; // letter peeks a little further out once the flap is ~halfway open
const T_PEEK_DURATION = 480;
const T_HOLD_BEFORE_REVEAL = 380;

export function EnvelopeOpening({ onComplete }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const busy = useRef(false);
  const guestName = useGuestName();

  const handleOpen = useCallback(() => {
    if (busy.current) return;
    busy.current = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // Simplified, near-instant but still staged sequence.
      setStage('sealing');
      window.setTimeout(() => setStage('flap-opening'), 120);
      window.setTimeout(() => setStage('peek'), 260);
      window.setTimeout(() => setStage('done'), 480);
      window.setTimeout(onComplete, 780);
      return;
    }

    setStage('tapped');
    window.setTimeout(() => setStage('sealing'), 0);
    window.setTimeout(() => setStage('flap-opening'), T_FLAP_START);
    window.setTimeout(() => setStage('peek'), T_FLAP_START + T_PEEK_START_OFFSET);

    const settledAt = Math.max(
      T_FLAP_START + T_FLAP_DURATION,
      T_FLAP_START + T_PEEK_START_OFFSET + T_PEEK_DURATION
    );
    window.setTimeout(() => setStage('done'), settledAt + T_HOLD_BEFORE_REVEAL);
    window.setTimeout(onComplete, settledAt + T_HOLD_BEFORE_REVEAL + 550);
  }, [onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  const sealVisible = stage === 'idle' || stage === 'tapped';
  const flapOpen = stage === 'flap-opening' || stage === 'peek' || stage === 'done';
  const letterPeek = stage === 'peek' || stage === 'done';
  const isDone = stage === 'done';

  return (
    <div
      className={[
        'paper-texture fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ivory px-6',
        'transition-opacity duration-500 ease-out',
        isDone ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      aria-hidden={isDone}
    >
      {/* ambient corner florals */}
      <FloralDecoration
        variant="corner"
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 text-sage/70 sm:h-32 sm:w-32"
      />
      <FloralDecoration
        variant="corner"
        flip
        className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rotate-180 text-sage/70 sm:h-32 sm:w-32"
      />

      <p className="mb-2 text-center font-serif text-[11px] uppercase tracking-[0.25em] text-umber-light sm:text-sm">
        Together with their families
      </p>
      {guestName && (
        <p className="mb-6 text-center font-serif text-sm italic text-umber sm:mb-8 sm:text-base">
          Dear {guestName},
        </p>
      )}
      {!guestName && <div className="mb-6 sm:mb-8" />}

      {/* ENVELOPE */}
      <button
        type="button"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        disabled={stage !== 'idle'}
        aria-label={`Open the wedding invitation for ${invitation.groom} and ${invitation.bride}`}
        className="group relative block w-[78vw] max-w-[340px] focus-visible:outline-none disabled:cursor-default"
        style={{ perspective: '1400px' }}
      >
        <div
          className={[
            'relative aspect-[3/2] w-full transition-transform ease-out',
            stage === 'tapped' ? 'duration-200' : 'duration-300',
          ].join(' ')}
          style={{
            transform:
              stage === 'tapped'
                ? 'scale(1.015)'
                : 'scale(1)',
            transitionTimingFunction:
              stage === 'tapped' ? 'ease-out' : 'ease-in-out',
          }}
        >
          {/* BACK PANEL */}
          <div
            className="absolute inset-0 rounded-[6px] shadow-envelope overflow-hidden"
            style={{ zIndex: 0 }}
          >
            {invitation.useCustomGraphics ? (
              <img src={envelopeBackImg} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background: 'linear-gradient(155deg, #EFE4CE 0%, #E4D3B0 55%, #D9C393 100%)',
                }}
              />
            )}
          </div>

          {/* LETTER — stays inside the envelope frame the whole time. Once the flap
              opens, it peeks up slightly further out of the front pocket, but never
              slides out far enough to overlap the envelope or the text below it. */}
          <div
            className="absolute inset-0 rounded-[6px] overflow-hidden"
            style={{ zIndex: 10 }}
          >
            <div
              className="absolute left-1/2 top-0 h-[96%] w-[82%] ease-out"
              style={{
                transform: `translate(-50%, ${letterPeek ? '5%' : '36%'})`,
                transitionProperty: 'transform',
                transitionDuration: `${T_PEEK_DURATION}ms`,
                transitionTimingFunction: 'cubic-bezier(.22, 1, .36, 1)',
              }}
            >
              <WeddingLetter />
            </div>
          </div>

          {/* FRONT POCKET */}
          <div
            className="absolute inset-x-0 bottom-0 h-[120%] overflow-hidden"
            style={{
              zIndex: 20,
              clipPath: 'polygon(0% 100%, 0% 34%, 50% 58%, 100% 34%, 100% 100%)',
              borderBottomLeftRadius: '6px',
              borderBottomRightRadius: '6px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            {invitation.useCustomGraphics ? (
              <img src={envelopeFrontImg} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: 'linear-gradient(165deg, #E9DABC 0%, #DCC393 100%)' }}
              />
            )}
          </div>

          {/* FLAP */}
          <div
            className="preserve-3d absolute inset-x-0 top-0 h-[64%]"
            style={{
              zIndex: 30,
              transformOrigin: 'top center',
              transform: `rotateX(${flapOpen ? '-158deg' : '0deg'})`,
              transitionProperty: 'transform',
              transitionDuration: `${T_FLAP_DURATION}ms`,
              transitionTimingFunction: 'cubic-bezier(.77, 0, .18, 1)',
            }}
          >
            <div
              className="backface-hidden absolute inset-0 overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 82%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset',
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
              }}
            >
              {invitation.useCustomGraphics ? (
                <img src={envelopeFlapImg} alt="" className="h-full w-full object-cover" />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background: 'linear-gradient(200deg, #F0E4CB 0%, #DFC79C 70%, #D2B683 100%)',
                  }}
                />
              )}
            </div>
          </div>

          {/* WAX SEAL */}
          <div
            className="absolute left-1/2 top-[36%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-12 sm:w-12"
            style={{
              zIndex: 40,
              background: invitation.useCustomGraphics
                ? undefined
                : 'radial-gradient(circle at 35% 30%, #A56656 0%, #8B5142 55%, #713A2E 100%)',
              boxShadow: '0 3px 8px rgba(74,59,46,0.35), inset 0 1px 1px rgba(255,255,255,0.25)',
              opacity: sealVisible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${sealVisible ? 1 : 1.08})`,
              transitionProperty: 'opacity, transform',
              transitionDuration: `${T_SEAL}ms`,
              transitionTimingFunction: 'ease-out',
              overflow: 'hidden',
            }}
          >
            {invitation.useCustomGraphics ? (
              <img src={waxSealImg} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="font-script text-sm text-champagne/90 sm:text-base">{invitation.initials}</span>
            )}
          </div>
        </div>
      </button>

      <div className="mt-7 flex flex-col items-center gap-1 sm:mt-9">
        <p className="font-script text-3xl text-umber sm:text-4xl">{invitation.initials}</p>
        <p
          className={[
            'mt-1 font-sans text-[11px] uppercase tracking-[0.3em] text-gold transition-opacity duration-300 sm:text-xs',
            stage === 'idle' ? 'animate-pulse-soft' : 'opacity-40',
          ].join(' ')}
        >
          {stage === 'idle' ? 'Tap to Open' : 'Opening…'}
        </p>
      </div>
    </div>
  );
}
