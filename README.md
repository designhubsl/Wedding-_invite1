# Digital Wedding Invitation

A premium, mobile-first digital wedding invitation prototype built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Features a fully interactive, hand-built CSS 3D envelope-opening animation (no video/GIF).

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Customizing for a different couple

All wedding content lives in one place:

```
src/data/invitation.ts
```

Edit names, date, venue, story timeline, gallery images, RSVP deadline, and the Google Maps URL there — every component reads from this file.

## Background music

Drop an MP3 at `public/audio/wedding-theme.mp3` (or update `musicSrc` in `src/data/invitation.ts`). Music never autoplays on load — it only starts if the user has just tapped the envelope, and can always be paused from the floating music button.

## RSVP submissions (saved to a Google Sheet)

By default the RSVP form is a local-only demo — responses aren't saved
anywhere. To collect them into a Google Sheet (free, unlimited, and easy
for non-technical clients to check):

1. Open `google-apps-script/rsvp-to-sheet.gs` — it has full step-by-step
   setup instructions in the comment at the top.
2. Follow those steps in Google Sheets (Extensions → Apps Script → paste →
   deploy as web app).
3. Paste the resulting web app URL into `rsvpEndpoint` in
   `src/data/invitation.ts`.

Every RSVP submission then appears as a new row in that sheet in real
time — Timestamp, Name, Guests, Attending, Message. For a new client,
just duplicate the sheet and redeploy the script (a couple of minutes),
then drop their unique URL into their copy of `invitation.ts`.



Add `?to=Guest+Name` to the URL and that guest's name appears on the
envelope screen and the hero section automatically:

```
https://yoursite.com/?to=Kavindu+Perera
https://yoursite.com/?to=The+Fernando+Family
```

Generate one link per guest (a spreadsheet with a name column + a formula
that appends `?to=` + URL-encoded name works well) and send each guest
their own link via WhatsApp/SMS/email. Same deployed site, no rebuilding
per guest. If no `?to=` is present, it falls back to the generic
"Together with their families" wording.

## Countdown

Controlled by `weddingDateISO` in `src/data/invitation.ts` — keep it in
sync with the human-readable `weddingDate`/`ceremonyTime` fields. It lives
in the Hero section under the venue name.



```
src/
├── components/
│   ├── EnvelopeOpening.tsx    # the core opening interaction
│   ├── WeddingLetter.tsx      # the paper letter inside the envelope
│   ├── HeroInvitation.tsx
│   ├── OurStory.tsx
│   ├── EventDetails.tsx
│   ├── Gallery.tsx
│   ├── Location.tsx
│   ├── RSVP.tsx
│   ├── MusicPlayer.tsx
│   ├── BottomNavigation.tsx
│   ├── ThankYou.tsx
│   └── FloralDecoration.tsx   # shared inline-SVG floral motif
├── data/invitation.ts
├── hooks/useReducedMotion.ts
├── styles/wedding.css
├── App.tsx
└── main.tsx
```

## Notes

- Respects `prefers-reduced-motion` with a simplified opening sequence.
- Gallery images are Unsplash placeholders — swap `src/data/invitation.ts` gallery entries with real photos.
- The map in the Location section is a styled placeholder; wire up a real embed (e.g. Google Maps iframe) when ready, keeping `invitation.mapsUrl` as the single source for the "Open in Google Maps" link.
