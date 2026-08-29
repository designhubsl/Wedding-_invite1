import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { FloralBouquet } from './FloralBouquet';
import { StringLights } from './StringLights';

export function ThankYou() {
  return (
    <section
      id="thank-you"
      className="relative overflow-hidden bg-[#333B2E] px-6 pb-24 pt-10 text-center text-cream sm:pb-32"
    >
      <StringLights className="absolute inset-x-0 top-0 h-16 w-full text-champagne sm:h-20" />

      <FloralBouquet className="pointer-events-none absolute left-1 top-16 h-24 w-24 opacity-90 sm:h-32 sm:w-32" />
      <FloralBouquet
        flip
        rotate={180}
        className="pointer-events-none absolute bottom-0 right-1 h-28 w-28 opacity-90 sm:h-36 sm:w-36"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="mt-16 sm:mt-20"
      >
        <h2 className="font-script text-5xl text-champagne sm:text-6xl">Thank You!</h2>
        <p className="mx-auto mt-5 max-w-xs font-serif text-sm italic leading-relaxed text-cream/80 sm:text-base">
          Your presence will make our day even more special.
        </p>

        <div className="mx-auto my-7 h-px w-14 bg-gold-soft/40" />

        <p className="font-display text-xl tracking-wide text-cream">
          {invitation.groom} &amp; {invitation.bride}
        </p>
      </motion.div>
    </section>
  );
}
