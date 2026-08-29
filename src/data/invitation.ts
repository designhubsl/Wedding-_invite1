// Single source of truth for all invitation content.
// Swap these values to reuse the template for a different couple.

export const invitation = {
  groom: 'Lasith',
  bride: 'Sanduni',
  initials: 'S & L',
  weddingDate: '24 September 2026',
  // ISO datetime used by the countdown — keep in sync with weddingDate/ceremonyTime above.
  weddingDateISO: '2026-09-24T17:00:00+05:30',
  weddingDateShort: { day: 'THURSDAY', date: '24', month: 'SEPTEMBER', year: '2026' },
  ceremonyTime: '5:00 PM',
  poruwaTime: '4:00 PM',
  receptionTime: '7:00 PM',
  dinnerTime: '8:00 PM',
  venueName: 'The Grand Balcony',
  venueAddress: 'No. 123, Galle Road',
  city: 'Colombo, Sri Lanka',
  dressCode: 'Semi Formal',
  rsvpBy: '10th September 2026',
  // Paste your Google Apps Script web app URL here (see google-apps-script/rsvp-to-sheet.gs),
  // or any other form endpoint (Formspree, Getform, etc). Leave empty to keep the RSVP
  // form as a local-only demo — nothing gets saved anywhere until this is set.
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbz1OT2GiAcfTppJYwAbGOSQDMzYka4QVFBNNR4MN-Hv-dqb1ARAqpIGr11nH4JRKttq/exec',

  // Set to true once you've replaced the placeholder files in
  // src/assets/graphics/ with your own Photoshop/Illustrator exports
  // (same filenames). Leave false to keep the built-in CSS/SVG artwork.
  useCustomFloralGraphics: true,
  useCustomGraphics: false,
  mapsUrl: 'https://maps.app.goo.gl/bZ78bFYudYJWKGkj8',
  musicSrc: '/audio/wedding-theme.mp3',
  songTitle: 'Perfect',
  songArtist: 'Ed Sheeran',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8344708289637!2d79.8487098!3d6.9103869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963a3454407%3A0xc8db851055016fba!2sGranbell%20Hotel%20Colombo!5e0!3m2!1sen!2slk!4v1787981130377!5m2!1sen!2slk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin',

  story: [
    {
      year: '2018',
      title: 'We Met',
      text: 'It all started with a smile.',
    },
    {
      year: '2020',
      title: 'We Fell in Love',
      text: 'And that bond grew stronger every day.',
    },
    {
      year: '2025',
      title: 'We Said Yes',
      text: 'The beginning of our forever.',
    },
  ],

  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      alt: 'Supun and Nihinsa laughing together outdoors',
      size: 'hero' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      alt: 'Hands with wedding rings',
      size: 'square' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80',
      alt: 'Bride portrait in soft light',
      size: 'portrait' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      alt: 'Couple walking together',
      size: 'square' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
      alt: 'Wedding florals detail',
      size: 'square' as const,
    },
    {
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      alt: 'Couple portrait at golden hour',
      size: 'portrait' as const,
    },
  ],
};

export type Invitation = typeof invitation;
