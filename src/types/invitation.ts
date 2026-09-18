export interface ItineraryItem {
  id: string;
  title: string;
  time: string;
  description?: string;
  icon?: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  quranVerseArabic: string;
  quranVerseEnglish: string;
  quranReference: string;
  bismillahArabic: string;
  eventDate: string; // ISO string or format e.g. "2026-11-20T17:00:00"
  eventDateFormatted: string; // e.g. "Friday, November 20, 2026"
  islamicDateFormatted: string; // e.g. "10 Jumada al-Awwal 1448 AH"
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  dressCode?: string;
  selectedAudioId: string;
  themeId: 'royal-andalusian' | 'minimalist-atelier' | 'botanical-oasis';
  itinerary: ItineraryItem[];
  rsvpPhone?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  src: string;
  artist?: string;
}
