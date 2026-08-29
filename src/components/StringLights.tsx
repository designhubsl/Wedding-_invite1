export function StringLights({ className = '' }: { className?: string }) {
  const bulbs = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 400 90" className={className} fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 10 C 60 55, 340 55, 400 10"
        stroke="#B8985E"
        strokeWidth="1.2"
        opacity="0.55"
      />
      {bulbs.map((_, i) => {
        const t = i / (bulbs.length - 1);
        const x = 8 + t * 384;
        // approximate the sag of the curve
        const y = 10 + Math.sin(t * Math.PI) * 46;
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y + 8} stroke="#B8985E" strokeWidth="0.8" opacity="0.5" />
            <circle cx={x} cy={y + 12} r="3.4" fill="#E9C878" opacity="0.9" />
            <circle cx={x} cy={y + 12} r="6.5" fill="#E9C878" opacity="0.18" />
          </g>
        );
      })}
    </svg>
  );
}
