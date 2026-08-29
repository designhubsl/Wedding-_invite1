import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralBouquet } from './FloralBouquet';
import { Countdown } from './Countdown';
import { useGuestName } from '../hooks/useGuestName';

export function HeroInvitation() {
  const guestName = useGuestName();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <FloralBouquet className="pointer-events-none absolute left-1 top-1 h-24 w-24 sm:h-32 sm:w-32" />
      <FloralBouquet
        flip
        rotate={180}
        className="pointer-events-none absolute bottom-1 right-1 h-24 w-24 sm:h-32 sm:w-32"
      />

      {/* thin decorative border frame */}
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-gold-soft/40 sm:inset-8" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-sans text-[11px] uppercase tracking-[0.35em] text-umber-light sm:text-xs"
      >
        Together with their families
      </motion.p>

      {guestName && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-2 font-serif text-sm italic text-umber-light"
        >
          Especially inviting {guestName}
        </motion.p>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 font-script text-6xl leading-none text-umber sm:text-8xl"
      >
        {invitation.groom}
      </motion.h1>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="my-2 font-script text-3xl text-gold sm:text-4xl"
      >
        &amp;
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-script text-6xl leading-none text-umber sm:text-8xl"
      >
        {invitation.bride}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="mt-8 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-gold-soft" />
        <p className="font-display text-xs uppercase tracking-[0.3em] text-umber-light">
          Invite you to celebrate their wedding
        </p>
        <span className="h-px w-8 bg-gold-soft" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-10 flex flex-col items-center gap-1"
      >
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-sage-dark">
          {invitation.weddingDateShort.day}
        </p>
        <p className="font-display text-3xl tracking-wide text-umber sm:text-4xl">
          {invitation.weddingDateShort.date}
          <span className="mx-2 text-gold">|</span>
          {invitation.weddingDateShort.month}
          <span className="mx-2 text-gold">|</span>
          {invitation.weddingDateShort.year}
        </p>
        <p className="mt-1 font-serif text-sm italic text-umber-light">
          at {invitation.ceremonyTime}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="mt-6"
      >
        <p className="font-display text-lg tracking-wide text-umber sm:text-xl">
          {invitation.venueName}
        </p>
        <p className="font-serif text-sm text-umber-light">{invitation.city}</p>
      </motion.div>

      <Countdown />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-umber-light"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-pulse-soft" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
