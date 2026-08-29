import { useMemo } from 'react';

/**
 * Reads the guest's name from the URL, e.g.
 *   https://yoursite.com/?to=Kavindu+Perera
 *   https://yoursite.com/?guest=Kavindu%20Perera
 *
 * Generate one unique link per guest (same site, just a different query
 * string) and each guest sees their own name on the envelope and invitation
 * — no separate builds or hosting needed per guest.
 */
export function useGuestName(): string | null {
  return useMemo(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('to') ?? params.get('guest');
    if (!raw) return null;
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  }, []);
}
