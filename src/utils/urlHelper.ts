/**
 * Extracts guest name from the URL query parameter `?to=...` or `?guest=...`
 */
export function getGuestNameFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('to') || params.get('guest') || params.get('name');
  if (!guest) return null;
  return decodeURIComponent(guest.replace(/\+/g, ' ')).trim();
}

/**
 * Builds a personalized shareable invitation link
 */
export function buildPersonalizedUrl(guestName: string): string {
  if (typeof window === 'undefined') return '';
  const baseUrl = window.location.origin + window.location.pathname;
  if (!guestName.trim()) return baseUrl;
  const param = encodeURIComponent(guestName.trim());
  return `${baseUrl}?to=${param}`;
}

/**
 * Generates a pre-filled WhatsApp share URL with personalized message
 */
export function generateWhatsAppShareLink(
  guestName: string,
  brideName: string,
  groomName: string
): string {
  const personalizedLink = buildPersonalizedUrl(guestName);
  const message = `✨ *Special Invitation* ✨\n\nDear ${guestName.trim()},\n\nYou are cordially invited to celebrate the Nikkah & Wedding ceremony of *${brideName}* & *${groomName}*.\n\nPlease open your personalized digital invitation card here:\n🔗 ${personalizedLink}\n\nWe look forward to celebrating with you! 🤍`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
