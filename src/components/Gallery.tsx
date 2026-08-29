import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralBouquet } from './FloralBouquet';

const sizeClasses: Record<string, string> = {
  hero: 'col-span-2 row-span-2 aspect-square sm:aspect-[4/3]',
  square: 'col-span-1 row-span-1 aspect-square',
  portrait: 'col-span-1 row-span-2 aspect-[3/4]',
};

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = invitation.gallery;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, prev, next]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream px-6 py-20 sm:py-28">
      <FloralBouquet className="pointer-events-none absolute left-1 top-1 h-20 w-20 sm:h-28 sm:w-28" />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">A Few Moments</p>
        <h2 className="mt-3 font-script text-4xl text-umber sm:text-5xl">Gallery</h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-2xl auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className={[
              'group relative overflow-hidden rounded-sm border border-gold-soft/25 shadow-soft',
              sizeClasses[img.size],
            ].join(' ')}
            aria-label={`View photo: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20 sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <motion.img
              key={images[openIndex].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-h-[80vh] max-w-full rounded-sm object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition hover:bg-ivory/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
