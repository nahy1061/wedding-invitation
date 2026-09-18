import type { AudioTrack, WeddingConfig } from '../types/invitation';

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'andalusian-oud',
    title: 'Andalusian Serenade (Oud & Acoustic)',
    genre: 'Traditional & Melodic',
    artist: 'Arabesque Strings',
    src: 'https://cdn.freesound.org/previews/573/573381_11861866-lq.mp3', // Gentle acoustic instrumental
  },
  {
    id: 'sacred-strings',
    title: 'Sacred Harmony (Soft Strings & Flute)',
    genre: 'Calm & Spiritual',
    artist: 'Serenity Ensemble',
    src: 'https://cdn.freesound.org/previews/689/689047_11861866-lq.mp3',
  },
  {
    id: 'royal-piano',
    title: 'Grace & Eternity (Acoustic Piano)',
    genre: 'Romantic & Elegant',
    artist: 'Nocturne Piano',
    src: 'https://cdn.freesound.org/previews/612/612081_5674468-lq.mp3',
  },
];

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  brideName: 'Aasiyah Al-Mansoor',
  groomName: 'Zayd Tariq Khan',
  brideParents: 'Mr. & Mrs. Mansoor Ahmad',
  groomParents: 'Mr. & Mrs. Tariq Mahmood Khan',
  bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  quranVerseArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quranVerseEnglish: '"And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy."',
  quranReference: 'Surah Ar-Rum [30:21]',
  eventDate: '2026-11-20T17:30:00',
  eventDateFormatted: 'Friday, November 20, 2026',
  islamicDateFormatted: '10 Jumada al-Awwal 1448 AH',
  venueName: 'The Alhambra Grand Ballroom',
  venueAddress: '742 Royal Emerald Boulevard, Luxury Gardens, London',
  mapsUrl: 'https://maps.google.com/?q=The+Alhambra+Grand+Ballroom',
  dressCode: 'Black Tie & Traditional Formal Attire',
  selectedAudioId: 'andalusian-oud',
  themeId: 'royal-andalusian',
  rsvpPhone: '+44 7700 900077',
  itinerary: [
    {
      id: '1',
      title: 'Arrival & Welcome Refreshments',
      time: '05:30 PM',
      description: 'Guests gather for Arabic coffee, dates, and welcome mocktails in the foyer.',
    },
    {
      id: '2',
      title: 'Nikkah Religious Ceremony',
      time: '06:30 PM',
      description: 'Solemnization of the marriage contract & sermon of marriage (Khutbah al-Nikah).',
    },
    {
      id: '3',
      title: 'Dinner & Royal Banquet',
      time: '07:45 PM',
      description: 'A curated four-course gourmet dinner followed by desserts & celebration.',
    },
    {
      id: '4',
      title: 'Duas & Departure (Rukhsati)',
      time: '10:30 PM',
      description: 'Sending off the newlyweds with blessings, prayers, and heartfelt farewells.',
    },
  ],
};
