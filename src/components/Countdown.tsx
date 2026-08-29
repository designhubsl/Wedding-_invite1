import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { useCountdown } from '../hooks/useCountdown';

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(invitation.weddingDateISO);

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.15 }}
      className="mt-8"
      aria-live="off"
    >
      {isPast ? (
        <p className="font-script text-2xl text-gold">We're married!</p>
      ) : (
        <div className="flex items-center justify-center gap-2.5 sm:gap-4">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-2.5 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-gold-soft/40 bg-cream/60 shadow-soft sm:h-16 sm:w-16">
                  <span
                    className="font-display text-xl tabular-nums tracking-wide text-umber sm:text-2xl"
                    aria-label={`${u.value} ${u.label}`}
                  >
                    {pad(u.value)}
                  </span>
                </div>
                <span className="mt-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-umber-light sm:text-[10px]">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="pb-4 font-display text-lg text-gold-soft sm:pb-5">:</span>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
