import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HeartHandshake, AlertCircle } from 'lucide-react';
import { invitation } from '../data/invitation';
import { FloralDecoration } from './FloralDecoration';

type Attendance = 'yes' | 'no';
type Status = 'idle' | 'submitting' | 'submitted' | 'error';

export function RSVP() {
  const formRef = useRef<HTMLFormElement>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');

  const handleRespond = async (choice: Attendance) => {
    const form = formRef.current;
    if (!form) return;

    // Native browser validation (e.g. required "Name" field).
    if (!form.reportValidity()) return;

    setAttendance(choice);
    setStatus('submitting');

    const formData = new FormData(form);
    formData.set('attending', choice === 'yes' ? 'Yes' : 'No');

    // No endpoint configured yet — keep it working as a local demo.
    if (!invitation.rsvpEndpoint) {
      window.setTimeout(() => setStatus('submitted'), 400);
      return;
    }

    try {
      // Try a normal request first (works if the endpoint sends CORS headers,
      // e.g. Formspree). No custom headers here on purpose — adding any
      // (like "Accept") turns this into a "non-simple" request and triggers
      // a CORS preflight, which Google Apps Script web apps don't handle.
      const res = await fetch(invitation.rsvpEndpoint, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('submitted');
    } catch {
      // Apps Script deployments often block reading the response
      // cross-origin even though the write itself succeeds. Fall back to a
      // "fire and forget" request: if it doesn't throw a network error, the
      // row still gets written to the sheet even though we can't read the
      // response body.
      try {
        await fetch(invitation.rsvpEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
        setStatus('submitted');
      } catch {
        setStatus('error');
      }
    }
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-cream px-6 py-20 sm:py-28">
      <FloralDecoration
        variant="corner"
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 text-sage/50 sm:h-32 sm:w-32"
      />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">Kindly Respond</p>
        <h2 className="mt-3 font-script text-4xl text-umber sm:text-5xl">RSVP</h2>
        <p className="mt-3 font-serif text-sm italic text-umber-light">
          Please respond by {invitation.rsvpBy}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md">
        <AnimatePresence mode="wait">
          {status === 'submitted' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center rounded-sm border border-gold-soft/30 bg-ivory px-6 py-10 text-center shadow-soft"
            >
              <CheckCircle2 className="h-9 w-9 text-sage-dark" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 font-script text-3xl text-umber">Thank You{name ? `, ${name}` : ''}!</h3>
              <p className="mt-2 max-w-xs font-serif text-sm text-umber-light">
                {attendance === 'yes'
                  ? 'Your response has been received. We cannot wait to celebrate with you.'
                  : "Your response has been received. You'll be in our thoughts on the day."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5 rounded-sm border border-gold-soft/30 bg-ivory px-6 py-8 shadow-soft sm:px-8"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="rsvp-name" className="font-sans text-[11px] uppercase tracking-[0.2em] text-umber-light">
                  Name
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-sm border border-gold-soft/40 bg-cream/40 px-4 py-2.5 font-serif text-sm text-umber outline-none transition focus:border-gold"
                  placeholder="Your full name"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="rsvp-guests" className="font-sans text-[11px] uppercase tracking-[0.2em] text-umber-light">
                  Number of Guests
                </label>
                <input
                  id="rsvp-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className="rounded-sm border border-gold-soft/40 bg-cream/40 px-4 py-2.5 font-serif text-sm text-umber outline-none transition focus:border-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="rsvp-message" className="font-sans text-[11px] uppercase tracking-[0.2em] text-umber-light">
                  Message
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  rows={3}
                  className="resize-none rounded-sm border border-gold-soft/40 bg-cream/40 px-4 py-2.5 font-serif text-sm text-umber outline-none transition focus:border-gold"
                  placeholder="A note for the couple (optional)"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-4 py-2.5 text-left">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                  <p className="font-serif text-xs text-red-700">
                    Something went wrong sending your response. Please try again.
                  </p>
                </div>
              )}

              <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleRespond('yes')}
                  disabled={status === 'submitting'}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sage-dark px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-ivory shadow-soft transition active:scale-95 disabled:opacity-60"
                >
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  {status === 'submitting' && attendance === 'yes' ? 'Sending…' : "Yes, I'll Be There"}
                </button>
                <button
                  type="button"
                  onClick={() => handleRespond('no')}
                  disabled={status === 'submitting'}
                  className="flex-1 rounded-full border border-umber-light/40 px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-umber-light transition active:scale-95 disabled:opacity-60"
                >
                  {status === 'submitting' && attendance === 'no' ? 'Sending…' : "Sorry, I Can't Attend"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
