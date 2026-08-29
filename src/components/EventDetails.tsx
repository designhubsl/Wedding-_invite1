import { motion } from 'framer-motion';
import { Church, Wine, UtensilsCrossed, Shirt, CalendarCheck, MapPin, Flower2, Car } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralBouquet } from './FloralBouquet';

const details = [
  { icon: Church, label: 'Wedding Ceremony', value: invitation.ceremonyTime },
  { icon: Flower2, label: 'Poruwa Ceremony', value: invitation.poruwaTime },
  { icon: Wine, label: 'Reception', value: invitation.receptionTime },
  { icon: UtensilsCrossed, label: 'Lunch', value: invitation.dinnerTime },
  { icon: Car, label: 'Going Away', value: invitation.ceremonyTime },
  { icon: MapPin, label: 'Venue', value: `${invitation.venueName}, ${invitation.city}` },
  { icon: CalendarCheck, label: 'RSVP', value: `Kindly respond by ${invitation.rsvpBy}` },
];

export function EventDetails() {
  return (
    <section id="event" className="relative overflow-hidden bg-ivory px-6 py-20 sm:py-28">
      <FloralBouquet
        flip
        className="pointer-events-none absolute right-1 top-1 h-20 w-20 sm:h-28 sm:w-28"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">Save the details</p>
        <h2 className="mt-3 font-script text-4xl text-umber sm:text-5xl">Event Details</h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="flex items-start gap-4 rounded-sm border border-gold-soft/25 bg-cream/60 px-5 py-5 shadow-soft"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush/50">
              <d.icon className="h-4 w-4 text-umber" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">{d.label}</p>
              <p className="mt-1 font-serif text-base text-umber">{d.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
