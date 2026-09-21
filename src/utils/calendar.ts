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
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';
  const title = `Nikkah Ceremony: ${bride} & ${groom}`;

  const location = data.venueHall
    ? `${data.venueHall}, ${data.venueName}, ${data.venueAddress}`
    : `${data.venueName}, ${data.venueAddress}`;

  let description = `You are warmly invited to celebrate the Nikkah & Wedding of ${bride} & ${groom}.\n\nVenue: ${location}\nDate: ${data.eventDateFormatted}`;
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

  const brideFirst = bride.split(' ')[0] || 'Bride';
  const groomFirst = groom.split(' ')[0] || 'Groom';

  return {
    title,
    description,
    location,
    startDateUtc,
    endDateUtc,
    fileName: `Nikkah-${brideFirst}-${groomFirst}.ics`,
  };
}

/**
 * Generates the standard Google Calendar web URL (ideal for web browsers)
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
 * Generates an Android Intent URI that opens the native Calendar app directly on Android phones
 * (Samsung Calendar on Samsung devices, Google Calendar on Pixel/others).
 */
export function generateAndroidCalendarIntent(data: WeddingDetails): string {
  const event = normalizeCalendarEvent(data);
  let beginTime = 0;
  let endTime = 0;

  if (data.eventDateISO) {
    try {
      const d = new Date(data.eventDateISO);
      if (!isNaN(d.getTime())) {
        beginTime = d.getTime();
        endTime = beginTime + 3 * 60 * 60 * 1000;
      }
    } catch {
      // fallback
    }
  }

  if (!beginTime) {
    beginTime = Date.parse('2026-10-03T19:00:00+05:00');
    endTime = beginTime + 3 * 60 * 60 * 1000;
  }

  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);

  return `intent://#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/event;S.title=${title};S.description=${description};S.eventLocation=${location};l.beginTime=${beginTime};l.endTime=${endTime};end`;
}

/**
 * Generates and triggers download of an .ics calendar file
 * Opens native Apple Calendar on iOS (iPhone/iPad) and calendar applications on macOS/Windows.
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
 * Smart Universal Calendar Handler:
 * - On iPhone / iPad (iOS): triggers .ics to open the native Apple Calendar event sheet.
 * - On Android phones (Samsung Galaxy, Google Pixel, Xiaomi, etc.): launches Android Calendar intent to open installed Calendar app.
 * - On Desktop / Laptop browsers: opens Google Calendar web in a new tab.
 */
export function addToCalendar(data: WeddingDetails): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    downloadIcsFile(data);
  } else if (isAndroid) {
    const intentUrl = generateAndroidCalendarIntent(data);
    window.location.href = intentUrl;
  } else {
    const webUrl = generateGoogleCalendarUrl(data);
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Backward compatibility alias
 */
export function openGoogleCalendar(data: WeddingDetails): void {
  addToCalendar(data);
}
