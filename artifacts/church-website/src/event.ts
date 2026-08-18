import { z } from "zod/v4";

export const ScheduleItem = z.object({
  time: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
});

// Single source of truth for the event shape returned by the API.
// Every new field is nullable/optional so existing events (which don't
// have detail data yet) validate and render fine.
export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  time: z.string(),
  endTime: z.string().nullable().optional(),
  location: z.string(),
  address: z.string().nullable().optional(),
  mapUrl: z.string().nullable().optional(),
  parkingInfo: z.string().nullable().optional(),
  category: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),

  organizer: z.string().nullable().optional(),
  audience: z.string().nullable().optional(),
  cost: z.string().nullable().optional(),

  whatToExpect: z.array(z.string()).nullable().optional(),
  schedule: z.array(ScheduleItem).nullable().optional(),

  speakerName: z.string().nullable().optional(),
  speakerRole: z.string().nullable().optional(),
  speakerImageUrl: z.string().nullable().optional(),
  speakerBio: z.string().nullable().optional(),
  speakerContact: z.string().nullable().optional(),

  registrationRequired: z.boolean().nullable().optional(),
  registrationUrl: z.string().nullable().optional(),
  registrationDeadline: z.string().nullable().optional(),
  availableSeats: z.number().nullable().optional(),

  contactPhone: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  contactWhatsapp: z.string().nullable().optional(),
});

export const ListEventsQueryParams = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
  upcoming: z.coerce.boolean().optional(),
});

// Listing keeps returning full event objects (cheap enough at this scale,
// and lets the "related events" section on the detail page reuse the same
// hook/data without a second shape to maintain).
export const ListEventsResponse = z.array(EventSchema);

export const GetEventParams = z.object({
  id: z.coerce.number().int().positive(),
});

export const GetEventResponse = EventSchema;

/**
 * Integration notes:
 * - This is a drop-in replacement for the existing events zod file the
 *   router (`GetEventResponse.parse(event)` / `ListEventsResponse.parse(paged)`)
 *   already imports from — no router changes needed.
 * - After merging, regenerate the orval client
 *   (`@workspace/api-client-react`) so `Event` picks up the new fields.
 */