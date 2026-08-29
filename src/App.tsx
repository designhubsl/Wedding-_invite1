import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { HeroInvitation } from './components/HeroInvitation';
import { OurStory } from './components/OurStory';
import { EventDetails } from './components/EventDetails';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { RSVP } from './components/RSVP';
import { ThankYou } from './components/ThankYou';
import { BottomNavigation } from './components/BottomNavigation';
import { MusicPlayer } from './components/MusicPlayer';
import { MusicProvider, useMusic } from './context/MusicContext';

function AppShell() {
  const [opened, setOpened] = useState(false);
  const { requestAutoStart } = useMusic();

  const handleComplete = useCallback(() => {
    setOpened(true);
    // Safe to auto-start here: this fires as a direct result of the
    // user's own tap on the envelope moments earlier.
    requestAutoStart();
  }, [requestAutoStart]);

  return (
    <div className="min-h-[100dvh] bg-[#DED2B8] sm:flex sm:items-center sm:justify-center sm:py-10">
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-3xl bg-ivory sm:min-h-[92vh] sm:rounded-lg sm:shadow-2xl sm:overflow-hidden">
        <AnimatePresence>
          {!opened && <EnvelopeOpening key="envelope" onComplete={handleComplete} />}
        </AnimatePresence>

        {opened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <HeroInvitation />
            <OurStory />
            <EventDetails />
            <Gallery />
            <Location />
            <RSVP />
            <ThankYou />
            <BottomNavigation />
            <MusicPlayer variant="floating" />
          </motion.main>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <AppShell />
    </MusicProvider>
  );
}
