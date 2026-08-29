interface FloralDecorationProps {
  className?: string;
  variant?: 'corner' | 'sprig' | 'divider';
  flip?: boolean;
}

/**
 * Restrained, hand-drawn-feeling line-art floral motif.
 * Rendered as inline SVG so it scales cleanly and never
 * needs an external image asset.
 */
export function FloralDecoration({ className = '', variant = 'corner', flip = false }: FloralDecorationProps) {
  const transform = flip ? 'scale(-1,1)' : undefined;

  if (variant === 'divider') {
    return (
      <svg
        viewBox="0 0 200 24"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 12 H80" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <path d="M120 12 H200" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <circle cx="100" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <path d="M92 12 C95 6, 105 6, 108 12 C105 18, 95 18, 92 12 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      </svg>
    );
  }

  if (variant === 'sprig') {
    return (
      <svg viewBox="0 0 80 120" className={className} fill="none" transform={transform} aria-hidden="true">
        <path d="M40 118 C38 90 42 60 40 20" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <path d="M40 90 C25 82 15 70 12 55" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M40 70 C55 62 65 50 68 35" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M40 45 C30 38 24 28 24 18" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <circle cx="40" cy="18" r="6" fill="currentColor" opacity="0.35" />
        <circle cx="12" cy="55" r="3.5" fill="currentColor" opacity="0.3" />
        <circle cx="68" cy="35" r="3.5" fill="currentColor" opacity="0.3" />
      </svg>
    );
  }

  // corner
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" transform={transform} aria-hidden="true">
      <path
        d="M4 4 C 30 6, 45 20, 46 46 C 47 70, 60 82, 84 84 C 108 86, 122 100, 124 124"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path d="M20 12 C 30 18, 34 28, 30 38" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <circle cx="46" cy="46" r="5" fill="currentColor" opacity="0.28" />
      <circle cx="84" cy="84" r="4" fill="currentColor" opacity="0.24" />
      <path d="M60 30 C 66 24, 76 24, 80 32 C 76 38, 66 38, 60 30 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <path d="M96 66 C 102 60, 112 60, 116 68 C 112 74, 102 74, 96 66 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
    </svg>
  );
}
