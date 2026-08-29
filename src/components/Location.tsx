import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralDecoration } from './FloralDecoration';

export function Location() {
  return (
    <section id="location" className="relative overflow-hidden bg-ivory px-6 py-20 sm:py-28">
      <FloralDecoration
        variant="corner"
        flip
        className="pointer-events-none absolute right-0 top-0 h-24 w-24 rotate-90 text-sage/50 sm:h-32 sm:w-32"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">Find Us</p>
        <h2 className="mt-3 font-script text-4xl text-umber sm:text-5xl">Location</h2>
        <p className="mt-4 font-display text-xl text-umber">{invitation.venueName}</p>
        <p className="font-serif text-sm text-umber-light">
          {invitation.venueAddress}, {invitation.city}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 max-w-lg overflow-hidden rounded-sm border border-gold-soft/30 shadow-soft"
      >
{/* Real embedded map once mapsEmbedSrc is set; styled placeholder otherwise. */}
{invitation.mapsEmbedSrc ? (
  <iframe
    src={invitation.mapsEmbedSrc}
    title={`Map showing ${invitation.venueName}`}
    className="h-56 w-full border-0 sm:h-72"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
) : (
  <div className="relative flex h-56 w-full items-center justify-center bg-[linear-gradient(135deg,#EAE0CC_0%,#E4D3B0_100%)] sm:h-72">
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          'linear-gradient(rgba(74,59,46,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,59,46,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
      aria-hidden="true"
    />
    <div className="relative flex flex-col items-center gap-2">
      <MapPin className="h-8 w-8 text-sage-dark" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-serif text-sm italic text-umber-light">Map preview</p>
    </div>
  </div>
)}

</motion.div>

      <div className="mt-8 flex justify-center">
        <a
          href={invitation.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold-soft bg-umber px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-ivory shadow-soft transition active:scale-95"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}
