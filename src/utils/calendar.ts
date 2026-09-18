import type { WeddingConfig } from '../types/invitation';

/**
 * Generates a Google Calendar direct event URL
 */
export function generateGoogleCalendarUrl(config: WeddingConfig): string {
  const startDate = new Date(config.eventDate);
  // Default duration: 5 hours
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const title = encodeURIComponent(`Nikkah Ceremony: ${config.brideName} & ${config.groomName}`);
  const details = encodeURIComponent(
    `You are warmly invited to celebrate the Nikkah & Wedding of ${config.brideName} & ${config.groomName}.\n\nVenue: ${config.venueName}, ${config.venueAddress}\nDress Code: ${config.dressCode || 'Formal'}`
  );
  const location = encodeURIComponent(`${config.venueName}, ${config.venueAddress}`);
  const dates = `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generates and triggers download of an .ics calendar file (for Apple Calendar, Outlook, etc.)
 */
export function downloadIcsFile(config: WeddingConfig): void {
  const startDate = new Date(config.eventDate);
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nikkah Invitation Digital//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:Nikkah Ceremony - ${config.brideName} & ${config.groomName}`,
    `DESCRIPTION:You are warmly invited to celebrate the Nikkah & Wedding of ${config.brideName} & ${config.groomName}.\\nVenue: ${config.venueName}`,
    `LOCATION:${config.venueName}, ${config.venueAddress}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Nikkah-${config.brideName.split(' ')[0]}-${config.groomName.split(' ')[0]}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
