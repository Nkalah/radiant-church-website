// src/lib/event-utils.ts

/**
 * Formats a single ISO time string into a readable time, e.g. "6:30 PM"
 */
export function formatEventTime(timeString: string): string {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Formats a start/end time pair into a single range, e.g. "6:30 PM – 8:00 PM"
 * Falls back to just the start time if no end time is provided.
 */
export function formatTimeRange(startTime: string, endTime?: string | null): string {
  const start = formatEventTime(startTime);
  if (!endTime) return start;
  const end = formatEventTime(endTime);
  return `${start} – ${end}`;
}

/**
 * Builds a Google Maps search URL from an address and/or location name.
 * Used for "Get Directions" links.
 */
export function getGoogleMapsUrl(
  address?: string | null,
  location?: string | null
): string {
  const query = [address, location].filter(Boolean).join(", ");
  const encoded = encodeURIComponent(query || "");
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}