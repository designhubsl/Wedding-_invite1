import { motion } from 'framer-motion';
import { Heart, Gem } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralDecoration } from './FloralDecoration';
import { FloralBouquet } from './FloralBouquet';

const icons = [Heart, Gem, Gem];

export function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-cream px-6 py-20 sm:py-28">
      <FloralBouquet className="pointer-events-none absolute left-1 top-1 h-20 w-20 sm:h-28 sm:w-28" />
      <FloralBouquet
        flip
        rotate={180}
        className="pointer-events-none absolute bottom-1 right-1 h-20 w-20 sm:h-28 sm:w-28"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">Our Journey</p>
        <h2 className="mt-3 font-script text-4xl text-umber sm:text-5xl">Our Story</h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-md">
        {/* vertical spine */}
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 border-l border-dashed border-gold-soft/50"
          aria-hidden="true"
        />

        <ol className="flex flex-col gap-14">
          {invitation.story.map((item, i) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/60 bg-ivory shadow-soft"
              >
                {(() => {
                  const Icon = icons[i] ?? Heart;
                  return <Icon className="h-4 w-4 text-sage-dark" strokeWidth={1.5} aria-hidden="true" />;
                })()}
              </motion.div>

              <p className="mt-4 font-display text-sm uppercase tracking-[0.25em] text-gold">
                {item.year}
              </p>
              <h3 className="mt-1 font-script text-2xl text-umber sm:text-3xl">{item.title}</h3>
              <p className="mt-2 max-w-[240px] font-serif text-sm italic text-umber-light">
                {item.text}
              </p>

              {i !== invitation.story.length - 1 && (
                <FloralDecoration
                  variant="divider"
                  className="mt-6 h-4 w-24 text-sage/60"
                />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
