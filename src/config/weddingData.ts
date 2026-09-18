export interface WeddingDetails {
  brideName: string;
  groomName: string;
  bismillahArabic: string;
  quranVerseArabic: string;
  quranVerseEnglish: string;
  quranReference: string;
  eventDateFormatted: string; // e.g., "Saturday, October 3, 2026"
  eventTimeFormatted: string; // e.g., "7:00 PM – 10:00 PM"
  islamicDateFormatted: string; // e.g., "20 Rabi' al-Awwal 1448 AH"
  venueName: string;
  venueHall: string;
  venueAddress: string;
  mapsUrl: string;
  audioUrl: string;
}

export const WEDDING_DATA: WeddingDetails = {
  brideName: 'Hafsa Salman',
  groomName: 'Abdul Rehman',
  bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  quranVerseArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quranVerseEnglish: '"And among His signs is that He created for you mates from among yourselves, that you may find peace in them; and He placed between you affection and mercy."',
  quranReference: 'Surah Ar-Rum 30:21',
  eventDateFormatted: 'Saturday, October 3, 2026',
  eventTimeFormatted: '7:00 PM – 10:00 PM',
  islamicDateFormatted: '20 Rabi\' al-Awwal 1448 AH',
  venueName: 'NESCOM Officers Mess',
  venueHall: 'Hall 2 (2nd Floor)',
  venueAddress: 'Sector H-11, Islamabad',
  mapsUrl: 'https://maps.google.com/?q=NESCOM+Officers+Mess+H-11+Islamabad',
  // Soothing, delicate classical acoustic strings/oud audio stream
  audioUrl: 'https://cdn.freesound.org/previews/573/573381_11861866-lq.mp3',
};
