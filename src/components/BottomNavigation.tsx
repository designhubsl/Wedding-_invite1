import { useEffect, useState } from 'react';
import { Home, CalendarHeart, Images, MapPinned, Gift } from 'lucide-react';

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'event', label: 'Event', icon: CalendarHeart },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'location', label: 'Location', icon: MapPinned },
  { id: 'rsvp', label: 'RSVP', icon: Gift },
];

export function BottomNavigation() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Section navigation"
      className={[
        'fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        'sm:bottom-6',
      ].join(' ')}
    >
      <ul
        className={[
          'flex w-full max-w-sm items-center justify-between gap-1 rounded-full border border-gold-soft/40',
          'bg-ivory/85 px-3 py-2 shadow-soft backdrop-blur-md',
          'sm:w-auto sm:gap-2 sm:px-4',
        ].join(' ')}
      >
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 font-sans text-[10px] uppercase tracking-wide transition-colors sm:flex-row sm:gap-1.5',
                  isActive ? 'text-gold' : 'text-umber-light hover:text-umber',
                ].join(' ')}
              >
                <Icon
                  className={`h-4 w-4 transition-transform ${isActive ? 'scale-110' : ''}`}
                  strokeWidth={isActive ? 2 : 1.5}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
