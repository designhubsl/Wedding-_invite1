import { useEffect, useState } from 'react';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeRemaining(targetISO: string): TimeRemaining {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isPast: false,
  };
}

export function useCountdown(targetISO: string): TimeRemaining {
  const [remaining, setRemaining] = useState<TimeRemaining>(() => computeRemaining(targetISO));

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(computeRemaining(targetISO));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetISO]);

  return remaining;
}
