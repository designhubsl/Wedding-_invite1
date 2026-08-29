import floralCornerImg from '../assets/graphics/floral-corner.svg';
import { invitation } from '../data/invitation';

interface FloralBouquetProps {
  className?: string;
  flip?: boolean;
  rotate?: number;
}

/**
 * A filled, illustrative rose-and-leaf corner spray — blush roses with
 * sage leaves — used where the design calls for a warmer, more
 * "stationery illustration" feel than the thin gold line-art.
 *
 * Set `invitation.useCustomGraphics = true` (src/data/invitation.ts) once
 * you've replaced src/assets/graphics/floral-corner.png with your own
 * Photoshop/Illustrator export to switch from the built-in SVG artwork
 * to your image everywhere this component is used.
 */
export function FloralBouquet({ className = '', flip = false, rotate = 0 }: FloralBouquetProps) {
  const transform = [flip ? 'scale(-1,1)' : '', rotate ? `rotate(${rotate}deg)` : '']
    .filter(Boolean)
    .join(' ');

  if (invitation.useCustomFloralGraphics) {
    return (
      <img
        src={floralCornerImg}
        alt=""
        className={className}
        style={{ transform }}
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      style={{ transform }}
      fill="none"
      aria-hidden="true"
    >
      {/* leaves / stems */}
      <path d="M6 6 C 40 10, 60 30, 58 60" stroke="#8C9A85" strokeWidth="1.4" opacity="0.65" />
      <path d="M6 6 C 20 26, 22 46, 10 64" stroke="#8C9A85" strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="26" cy="20" rx="12" ry="6" fill="#8C9A85" opacity="0.45" transform="rotate(35 26 20)" />
      <ellipse cx="44" cy="38" rx="13" ry="6" fill="#7C8B74" opacity="0.4" transform="rotate(55 44 38)" />
      <ellipse cx="16" cy="46" rx="10" ry="5" fill="#8C9A85" opacity="0.4" transform="rotate(100 16 46)" />

      {/* rose 1 (large) */}
      <g transform="translate(30,26)">
        <circle r="13" fill="#E8CFC9" opacity="0.9" />
        <circle r="9" fill="#E3C2BB" opacity="0.9" />
        <circle r="9" cx="3" cy="-2" fill="#EAD2CB" opacity="0.85" />
        <circle r="5.5" fill="#D9AFA6" opacity="0.9" />
      </g>

      {/* rose 2 (small bud) */}
      <g transform="translate(55,14)">
        <circle r="7" fill="#EAD2CB" opacity="0.85" />
        <circle r="4.5" fill="#DCB2A8" opacity="0.9" />
      </g>

      {/* rose 3 (small, lower) */}
      <g transform="translate(14,58)">
        <circle r="6" fill="#E8CFC9" opacity="0.8" />
        <circle r="3.6" fill="#D9AFA6" opacity="0.85" />
      </g>

      {/* tiny gold accents */}
      <circle cx="46" cy="6" r="1.6" fill="#B8985E" opacity="0.6" />
      <circle cx="6" cy="34" r="1.6" fill="#B8985E" opacity="0.55" />
    </svg>
  );
}
