import type { WeddingConfig } from '../types/invitation';
import type { WeddingDetails } from '../config/weddingData';

export type CalendarEventData = WeddingConfig | WeddingDetails;

interface NormalizedEvent {
  title: string;
  description: string;
  location: string;
  startDateUtc: string; // e.g. 20261003T140000Z
  endDateUtc: string;   // e.g. 20261003T170000Z
  fileName: string;
}

/**
 * Normalizes event data whether passed as WeddingDetails (gatefold/palace) or WeddingConfig
 */
export function normalizeCalendarEvent(data: CalendarEventData): NormalizedEvent {
  const bride = data.brideName || 'Bride';
  const groom = data.groomName || 'Groom';
  const title = `Nikkah Ceremony: ${bride} & ${groom}`;

  let location = '';
  if ('venueHall' in data && data.venueHall) {
    location = `${data.venueHall}, ${data.venueName}, ${data.venueAddress}`;
  } else {
    location = `${data.venueName}, ${data.venueAddress}`;
  }

  let description = `You are warmly invited to celebrate the Nikkah & Wedding of ${bride} & ${groom}.\n\nVenue: ${location}\nDate: ${data.eventDateFormatted}`;
  if ('eventTimeFormatted' in data && data.eventTimeFormatted) {
    description += `\nTiming: ${data.eventTimeFormatted}`;
  }
  if ('mapsUrl' in data && data.mapsUrl) {
    description += `\nMap: ${data.mapsUrl}`;
  }

  // Event Date: Oct 3, 2026 7:00 PM - 10:00 PM PKT (UTC+5 -> 14:00 to 17:00 UTC)
  let startDateUtc = '20261003T140000Z';
  let endDateUtc = '20261003T170000Z';

  if ('eventDate' in data && data.eventDate) {
    try {
      const d = new Date(data.eventDate);
      if (!isNaN(d.getTime())) {
        const endD = new Date(d.getTime() + 4 * 60 * 60 * 1000);
        const formatIso = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        startDateUtc = formatIso(d);
        endDateUtc = formatIso(endD);
      }
    } catch {
      // fallback to default
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
 * Generates the standard Google Calendar web URL
 */
export function generateGoogleCalendarUrl(data: CalendarEventData): string {
  const event = normalizeCalendarEvent(data);
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const dates = `${event.startDateUtc}/${event.endDateUtc}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generates the Android Intent URI for Google Calendar
 */
export function generateAndroidCalendarIntentUrl(data: CalendarEventData): string {
  const event = normalizeCalendarEvent(data);
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location);
  const dates = `${event.startDateUtc}/${event.endDateUtc}`;

  return `intent://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}#Intent;scheme=https;package=com.google.android.calendar;end`;
}

/**
 * Generates and triggers download of an .ics calendar file (for Apple Calendar, Outlook, iOS, macOS, Windows)
 */
export function downloadIcsFile(data: CalendarEventData): void {
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
 * Smart Calendar Handler:
 * Synchronously triggers the optimal calendar method based on device.
 * On Android: tries intent/direct Google Calendar app link.
 * On iOS/Desktop: opens Google Calendar web URL in new tab directly without popup blocker delay.
 */
export function openGoogleCalendar(data: CalendarEventData): void {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isAndroid = /android/i.test(userAgent);
  const webUrl = generateGoogleCalendarUrl(data);

  if (isAndroid) {
    // Android Chrome supports direct navigation or intent
    // Direct link to calendar.google.com lets Android system prompt "Open with Calendar"
    window.location.href = webUrl;
  } else {
    // iOS / Desktop: Open directly in user gesture
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }
}
