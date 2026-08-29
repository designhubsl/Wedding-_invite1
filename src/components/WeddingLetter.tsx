import { invitation } from '../data/invitation';
import { FloralDecoration } from './FloralDecoration';

/**
 * The physical "letter" paper that lives inside the envelope.
 * Purely presentational — all motion is handled by the parent
 * EnvelopeOpening component via transform on the wrapping element.
 */
export function WeddingLetter() {
  return (
    <div
      className="letter-texture relative flex h-full w-full flex-col items-center justify-center rounded-[2px] border border-gold-soft/40 bg-ivory px-4 py-6 text-center shadow-paper sm:px-6 sm:py-8"
      style={{
        boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 3px 10px rgba(74,59,46,0.12)',
      }}
    >
      <FloralDecoration
        variant="sprig"
        className="pointer-events-none absolute -top-1 left-2 h-10 w-6 text-sage sm:h-14 sm:w-8"
      />
      <FloralDecoration
        variant="sprig"
        flip
        className="pointer-events-none absolute -top-1 right-2 h-10 w-6 text-sage sm:h-14 sm:w-8"
      />

      <p className="font-serif text-[10px] italic tracking-wide text-umber-light sm:text-xs">
        With great joy,
      </p>

      <p className="mt-2 font-script text-2xl leading-tight text-umber sm:text-4xl">
        {invitation.groom}
      </p>
      <span className="my-1 font-script text-lg text-gold sm:text-2xl">&amp;</span>
      <p className="font-script text-2xl leading-tight text-umber sm:text-4xl">
        {invitation.bride}
      </p>

      <div className="my-3 h-px w-10 bg-gold-soft/60 sm:w-14" />

      <p className="max-w-[220px] font-serif text-[11px] leading-relaxed tracking-wide text-umber-light sm:max-w-xs sm:text-sm">
        We invite you to celebrate
        <br /> our wedding
      </p>
    </div>
  );
}
