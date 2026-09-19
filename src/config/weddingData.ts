import myMusic from '../assets/audio/indila_1min.mp3';

export interface WeddingDetails {
  brideName: string;
  groomName: string;
  bismillahArabic: string;
  quranVerseArabic: string;
  quranVerseEnglish: string;
  quranReference: string;
  subVerseArabic: string;
  subVerseEnglish: string;
  invitationText: string;
  eventDateFormatted: string;
  eventTimeFormatted: string;
  islamicDateFormatted: string;
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
  quranReference: 'Surah Ar-Rum [30:21]',
  subVerseArabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا',
  subVerseEnglish: '"And We created you in pairs"',
  invitationText: 'Under the grace of Almighty Allah and with the blessings of our beloved parents, we cordially invite you to share in the joy of our Nikkah ceremony & wedding celebration.',
  eventDateFormatted: 'Saturday, October 3, 2026',
  eventTimeFormatted: '7:00 PM – 10:00 PM',
  islamicDateFormatted: '20 Rabi\' al-Awwal 1448 AH',
  venueName: 'NESCOM Officers Mess',
  venueHall: 'Hall 2 (2nd Floor)',
  venueAddress: 'Sector H-11, Islamabad',
  mapsUrl: 'https://maps.google.com/?q=NESCOM+Officers+Mess+H-11+Islamabad',
  // Atmospheric, royal instrumental oud & strings
  audioUrl: myMusic,
};
