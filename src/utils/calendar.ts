import type { WeddingDetails } from '../config/weddingData';

interface NormalizedEvent {
  title: string;
  description: string;
  location: string;
  startDateUtc: string; // e.g. 20261003T140000Z
  endDateUtc: string;   // e.g. 20261003T170000Z
  fileName: string;
}

/**
 * Normalizes event data from master WeddingDetails
 */
export function normalizeCalendarEvent(data: WeddingDetails): NormalizedEvent {
  const groom = data.groomName || 'Groom';
  const bride = data.brideName || 'Bride';
  const title = `Nikkah Ceremony: ${groom} & ${bride}`;

  const location = data.venueHall
    ? `${data.venueHall}, ${data.venueName}, ${data.venueAddress}`
    : `${data.venueName}, ${data.venueAddress}`;

  let description = `You are warmly invited to celebrate the Nikkah & Wedding of ${groom} & ${bride}.\n\nVenue: ${location}\nDate: ${data.eventDateFormatted}`;
  if (data.eventTimeFormatted) {
    description += `\nTiming: ${data.eventTimeFormatted}`;
  }
  if (data.mapsUrl) {
    description += `\nMap: ${data.mapsUrl}`;
  }

  // Event Date: Oct 3, 2026 7:00 PM - 10:00 PM PKT (UTC+5 -> 14:00 to 17:00 UTC)
  let startDateUtc = '20261003T140000Z';
  let endDateUtc = '20261003T170000Z';

  if (data.eventDateISO) {
    try {
      const d = new Date(data.eventDateISO);
      if (!isNaN(d.getTime())) {
        const endD = new Date(d.getTime() + 3 * 60 * 60 * 1000); // 3 hour duration
        const formatIso = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        startDateUtc = formatIso(d);
        endDateUtc = formatIso(endD);
      }
    } catch {
      // fallback
    }
  }

  const groomFirst = groom.split(' ')[0] || 'Groom';
  const brideFirst = bride.split(' ')[0] || 'Bride';

  return {
    title,
    description,
    location,
    startDateUtc,
    endDateUtc,
    fileName: `Nikkah-${groomFirst}-${brideFirst}.ics`,
  };
}

/**
 * Generates the standard Google Calendar URL
 */
export function generateGoogleCalendarUrl(data: WeddingDetails): string {
  const event = normalizeCalendarEvent(data);
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const dates = `${event.startDateUtc}/${event.endDateUtc}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generates and triggers download of an .ics calendar file
 * Opens native Apple Calendar on iOS (iPhone/iPad) and desktop calendar applications.
 */
export function downloadIcsFile(data: WeddingDetails): void {
  const event = normalizeCalendarEvent(data);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nikkah Invitation Digital//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@nikkah-invitation.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${event.startDateUtc}`,
    `DTEND:${event.endDateUtc}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', event.fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(link.href), 1000);
}

/**
 * Smart Universal Calendar Handler (100% Reliable):
 * - On iPhone / iPad (iOS): triggers .ics to open the native Apple Calendar event sheet.
 * - On Android phones (Samsung, Pixel, Xiaomi, etc.): navigates to Google Calendar (1-tap Save, syncs to Samsung Calendar).
 * - On Desktop / Laptop browsers: opens Google Calendar in a new tab.
 */
export function addToCalendar(data: WeddingDetails): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    // Triggers native Apple Calendar sheet on iOS
    downloadIcsFile(data);
  } else {
    // Google Calendar URL on Android & Desktop
    const webUrl = generateGoogleCalendarUrl(data);
    const isAndroid = /Android/i.test(ua);
    if (isAndroid) {
      window.location.href = webUrl;
    } else {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

/**
 * Backward compatibility alias
 */
export function openGoogleCalendar(data: WeddingDetails): void {
  addToCalendar(data);
}
